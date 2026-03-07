import { pickups, type InsertPickup, type Pickup } from "./schema";
import { z } from "zod";

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  pickups: {
    list: {
      method: "GET" as const,
      path: "/api/pickups" as const,
      responses: {
        200: z.array(z.custom<Pickup>()),
      },
    },
    create: {
      method: "POST" as const,
      path: "/api/pickups" as const,
      input: z.object({
        itemName: z.string(),
        category: z.string(),
        weight: z.number().or(z.string().transform(Number)),
        estimatedValue: z.number().or(z.string().transform(Number)).optional(),
        ownerId: z.string(), // We get this from the client since we don't have server-side auth yet
      }),
      responses: {
        201: z.custom<Pickup>(),
        400: errorSchemas.validation,
      },
    },
  },
  scan: {
    process: {
      method: "POST" as const,
      path: "/api/scan" as const,
      input: z.object({
        image: z.string(), // base64 string
      }),
      responses: {
        200: z.object({
          category: z.string(),
          problem: z.string(),
        }),
        400: errorSchemas.validation,
      },
    },
  },
  impact: {
    get: {
      method: "GET" as const,
      path: "/api/impact/:userId" as const,
      responses: {
        200: z.object({
          co2Saved: z.number(),
          waterSaved: z.number(),
          treesPlanted: z.number(),
          totalWeight: z.number(),
        }),
        404: errorSchemas.notFound,
      },
    },
  },
};

export function buildUrl(
  path: string,
  params?: Record<string, string | number>
): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
