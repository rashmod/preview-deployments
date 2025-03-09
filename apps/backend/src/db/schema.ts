import { pgTable, timestamp, text, serial, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const todoSchema = pgTable("Todo", {
  id: serial().primaryKey().notNull(),
  title: text().notNull(),
  completed: boolean().default(false).notNull(),
  createdAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp({ precision: 3, mode: "string" })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
