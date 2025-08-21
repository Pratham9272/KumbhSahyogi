import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const hotels = pgTable("hotels", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  address: text("address").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  reviews: integer("reviews").default(0),
  verified: boolean("verified").default(false),
  imageUrl: text("image_url"),
  amenities: text("amenities").array(),
  distance: decimal("distance", { precision: 5, scale: 2 }),
});

export const medicalFacilities = pgTable("medical_facilities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  emergency24x7: boolean("emergency_24x7").default(false),
  distance: decimal("distance", { precision: 5, scale: 2 }),
  services: text("services").array(),
});

export const transportRoutes = pgTable("transport_routes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  fromLocation: text("from_location").notNull(),
  toLocation: text("to_location").notNull(),
  duration: integer("duration").notNull(), // in minutes
  cost: decimal("cost", { precision: 10, scale: 2 }),
  description: text("description"),
  active: boolean("active").default(true),
});

export const emergencyContacts = pgTable("emergency_contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  type: text("type").notNull(),
  available24x7: boolean("available_24x7").default(true),
});

export const sosAlerts = pgTable("sos_alerts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  timestamp: timestamp("timestamp").defaultNow(),
  status: text("status").default("active"),
  message: text("message"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertHotelSchema = createInsertSchema(hotels).omit({
  id: true,
});

export const insertMedicalFacilitySchema = createInsertSchema(medicalFacilities).omit({
  id: true,
});

export const insertTransportRouteSchema = createInsertSchema(transportRoutes).omit({
  id: true,
});

export const insertEmergencyContactSchema = createInsertSchema(emergencyContacts).omit({
  id: true,
});

export const insertSosAlertSchema = createInsertSchema(sosAlerts).omit({
  id: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Hotel = typeof hotels.$inferSelect;
export type MedicalFacility = typeof medicalFacilities.$inferSelect;
export type TransportRoute = typeof transportRoutes.$inferSelect;
export type EmergencyContact = typeof emergencyContacts.$inferSelect;
export type SosAlert = typeof sosAlerts.$inferSelect;
export type InsertHotel = z.infer<typeof insertHotelSchema>;
export type InsertMedicalFacility = z.infer<typeof insertMedicalFacilitySchema>;
export type InsertTransportRoute = z.infer<typeof insertTransportRouteSchema>;
export type InsertEmergencyContact = z.infer<typeof insertEmergencyContactSchema>;
export type InsertSosAlert = z.infer<typeof insertSosAlertSchema>;
