import { db } from "../drizzle/db";
import { UserPreferencesTable } from "../drizzle/schema";
import asyncHandler from "../utils/asyncHhandler";
import { HttpError } from "../utils/httpError";

export const userPreferencesInsert = asyncHandler(async (req, res, next) => {
  const { email_updates = false, user_id } = req.body;

  try {
    const preferences = await db
      .insert(UserPreferencesTable)
      .values({ email_updates, user_id })
      .returning({
        id: UserPreferencesTable.id,
        email_updates: UserPreferencesTable.email_updates,
        user_id: UserPreferencesTable.user_id,
      });

    res.status(200).json({ preferences });
  } catch (err: any) {
    if (err.code === "23505") {
      throw new HttpError(404, "Preference already exists for this user");
    }
  }
});
