import { relations } from "drizzle-orm";
import {
  boolean,
  pgEnum,
  pgTable,
  primaryKey,
  real,
  timestamp,
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

export const UserPreferencesTable = pgTable("user_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  email_updates: boolean().notNull().default(false),
  user_id: uuid("user_id")
    .references(() => UserTable.id)
    .notNull(),
});

export const PostsTable = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  avarage_rating: real("avarage_rating").notNull().default(0),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
  author_id: uuid("author_id")
    .references(() => UserTable.id)
    .notNull(),
});

export const CategoryTable = pgTable("categories", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
});

export const PostsCategoryTable = pgTable(
  "posts_category",
  {
    post_id: uuid("post_id").references(() => PostsTable.id, {
      onDelete: "cascade",
    }),
    category_id: uuid("category_id").references(() => CategoryTable.id, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return { id: primaryKey({ columns: [table.category_id, table.post_id] }) };
  }
);

export const UserTableRelations = relations(UserTable, ({ one, many }) => {
  return {
    preferences: one(UserPreferencesTable),
    posts: many(PostsTable),
  };
});

export const UserPreferencesTableRelations = relations(
  UserPreferencesTable,
  ({ one }) => {
    return {
      user: one(UserTable, {
        fields: [UserPreferencesTable.user_id],
        references: [UserTable.id],
      }),
    };
  }
);

export const PostsTableRelations = relations(PostsTable, ({ one, many }) => {
  return {
    author: one(UserTable, {
      fields: [PostsTable.author_id],
      references: [UserTable.id],
    }),
    postsCategory: many(PostsCategoryTable),
  };
});

export const CategoryTableRelations = relations(CategoryTable, ({ many }) => {
  return {
    postsCategory: many(PostsCategoryTable),
  };
});

export const PostsCategoryTableRelations = relations(
  PostsCategoryTable,
  ({ one }) => {
    return {
      post: one(PostsTable, {
        fields: [PostsCategoryTable.post_id],
        references: [PostsTable.id],
      }),
      category: one(CategoryTable, {
        fields: [PostsCategoryTable.category_id],
        references: [CategoryTable.id],
      }),
    };
  }
);
