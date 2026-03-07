import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pickups = pgTable("pickups", {
  id: serial("id").primaryKey(),
  ownerId: text("owner_id").notNull(),
  itemName: text("item_name").notNull(),
  category: text("category").notNull(),
  weight: numeric("weight").notNull(),
  estimatedValue: numeric("estimated_value"),
  status: text("status").default("Pending Pickup").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPickupSchema = createInsertSchema(pickups).omit({ id: true, createdAt: true });

export type InsertPickup = z.infer<typeof insertPickupSchema>;
export type Pickup = typeof pickups.$inferSelect;

export const scanResponseSchema = z.object({
  category: z.string(),
  problem: z.string(),
});
export type ScanResponse = z.infer<typeof scanResponseSchema>;
