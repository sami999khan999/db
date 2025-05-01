import {
  boolean,
  pgEnum,
  pgTable,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const UserRoll = pgEnum("user_role", ["ADMIN", "USER"]);

export const UserTable = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 100 }).notNull(),
    roll: UserRoll().default("USER").notNull(),
  },
  (table) => {
    return {
      email_index: uniqueIndex("email_index").on(table.email),
    };
  }
);

export const UserPreferencesTable = pgTable("userPreferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  email_updates: boolean().notNull().default(false),
  user_id: uuid("user_id")
    .references(() => UserTable.id)
    .notNull(),
});
