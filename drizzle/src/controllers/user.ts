import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { PostsTable, UserPreferencesTable, UserTable } from "../drizzle/schema";
import asyncHandler from "../utils/asyncHhandler";
import { HttpError } from "../utils/httpError";

export const userInsert = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new HttpError(400, "All fields are required");
    }

    const user = await db
      .insert(UserTable)
      .values({ name, email, password })
      .returning({ id: UserTable.id, name: UserTable.name });

    res.status(201).json({ user });
  } catch (err: any) {
    if (err.code === "23505") {
      throw new HttpError(409, "User already exists");
    }
    throw err;
  }
});

export const userQuery = asyncHandler(async (req, res, next) => {
  const users = await db.query.UserTable.findMany({
    columns: { id: true, name: true },
    with: {
      preferences: {
        columns: {
          id: true,
          email_updates: true,
          user_id: true,
        },
      },
      posts: {
        columns: {
          id: true,
          title: true,
          avarage_rating: true,
          created_at: true,
        },
      },
    },
  });

  if (!users) {
    throw new HttpError(404, "No users found");
  }

  res.status(200).json({ users });
});

export const userSelect = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const users = await db
    .select({
      name: UserTable.name,
      email: UserTable.email,
      email_updates: UserPreferencesTable.email_updates,
      user_id: UserPreferencesTable.user_id,
    })
    .from(UserTable)
    .leftJoin(
      UserPreferencesTable,
      eq(UserTable.id, UserPreferencesTable.user_id)
    )
    .where(eq(UserTable.id, id));

  const user = users[0];

  if (!user) {
    throw new HttpError(404, "User not found");
  }

  res.status(200).json({ user });
});

export const usersSelect = asyncHandler(async (req, res, next) => {
  const users = await db
    .select({
      id: UserTable.id,
      name: UserTable.name,
      email: UserTable.email,
      preferences: {
        id: UserPreferencesTable.id,
        email_updates: UserPreferencesTable.email_updates,
        user_id: UserPreferencesTable.user_id,
      },
      posts: {
        id: PostsTable.id,
        title: PostsTable.title,
        avarage_rating: PostsTable.avarage_rating,
        created_at: PostsTable.created_at,
      },
    })
    .from(UserTable)
    .leftJoin(
      UserPreferencesTable,
      eq(UserTable.id, UserPreferencesTable.user_id)
    )
    .leftJoin(PostsTable, eq(UserTable.id, PostsTable.author_id));

  if (users.length === 0) {
    throw new HttpError(404, "Users not found");
  }

  res.status(200).json({ users });
});
