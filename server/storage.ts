import { db } from "./db";
import { pickups, type InsertPickup, type Pickup } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getPickups(): Promise<Pickup[]>;
  getPickupsByUser(userId: string): Promise<Pickup[]>;
  createPickup(pickup: InsertPickup): Promise<Pickup>;
}

export class DatabaseStorage implements IStorage {
  async getPickups(): Promise<Pickup[]> {
    return await db.select().from(pickups);
  }

  async getPickupsByUser(userId: string): Promise<Pickup[]> {
    return await db.select().from(pickups).where(eq(pickups.ownerId, userId));
  }

  async createPickup(pickup: InsertPickup): Promise<Pickup> {
    const [newPickup] = await db.insert(pickups).values(pickup).returning();
    return newPickup;
  }
}

export const storage = new DatabaseStorage();
