import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { GoogleGenAI, Modality } from "@google/genai";

// This is using Replit's AI Integrations service, which provides Gemini-compatible API access
const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.pickups.list.path, async (req, res) => {
    const allPickups = await storage.getPickups();
    res.json(allPickups);
  });

  app.post(api.pickups.create.path, async (req, res) => {
    try {
      const input = api.pickups.create.input.parse(req.body);
      const pickup = await storage.createPickup({
        ...input,
        weight: input.weight.toString(),
        estimatedValue: input.estimatedValue?.toString(),
        status: "Pending Pickup",
      });
      res.status(201).json(pickup);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.scan.process.path, async (req, res) => {
    try {
      const input = api.scan.process.input.parse(req.body);
      
      const prompt = `Analyze this image of e-waste. Return ONLY a JSON object with this exact structure, no markdown formatting or backticks:
{
  "item": "string (name of the item)",
  "type": "string (category e.g. Laptop, Battery, Mobile)",
  "weight_kg": number (estimated weight in kg),
  "estimated_value_inr": number (estimated value in INR)
}`;

      // Extract base64 data and mime type if passed as data URL
      let base64Data = input.image;
      let mimeType = "image/jpeg";
      
      if (input.image.startsWith('data:')) {
        const matches = input.image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          base64Data = matches[2];
        }
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          {
            role: "user",
            parts: [
              { text: prompt },
              {
                inlineData: {
                  data: base64Data,
                  mimeType: mimeType
                }
              }
            ]
          }
        ],
      });

      const text = response.text || "{}";
      const cleanedText = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      
      const result = JSON.parse(cleanedText);
      res.json(result);
    } catch (err) {
      console.error("Scan error:", err);
      res.status(400).json({ message: "Failed to process image with AI" });
    }
  });

  app.get(api.impact.get.path, async (req, res) => {
    try {
      const userId = req.params.userId;
      const userPickups = await storage.getPickupsByUser(userId);
      
      const totalWeight = userPickups.reduce((sum, p) => sum + Number(p.weight), 0);
      
      res.json({
        co2Saved: totalWeight * 2.5, // 2.5 kg CO2 per kg e-waste
        waterSaved: totalWeight * 10, // 10 L water per kg e-waste
        treesPlanted: totalWeight * 0.1, // 0.1 trees per kg e-waste
        totalWeight
      });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed DB with some examples
  const existing = await storage.getPickups();
  if (existing.length === 0) {
    await storage.createPickup({
      ownerId: "demo-user",
      itemName: "Old MacBook Pro",
      category: "Laptop",
      weight: "2.5",
      estimatedValue: "15000",
      status: "Completed",
    });
    await storage.createPickup({
      ownerId: "demo-user",
      itemName: "Broken iPhone 11",
      category: "Mobile",
      weight: "0.2",
      estimatedValue: "3000",
      status: "Completed",
    });
  }

  return httpServer;
}
