import { db } from "../drizzle/db";
import { UserTable } from "../drizzle/schema";
import asyncHandler from "../utils/asyncHhandler";
import { HttpError } from "../utils/httpError";

export const userInsert = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      throw new HttpError(400, "All fields are required");
    }

    const [user] = await db
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
          email_updates: true,
        },
      },
    },
  });

  if (!users) {
    throw new HttpError(404, "No users found");
  }

  res.status(200).json({ users });
});
