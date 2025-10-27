import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { PostsTable } from "../drizzle/schema";
import asyncHandler from "../utils/asyncHhandler";
import { HttpError } from "../utils/httpError";

export const postInsert = asyncHandler(async (req, res, next) => {
  const { title, avarage_rating = 0, author_id } = req.body;

  if (!title || !author_id) {
    throw new HttpError(404, "All fields required");
  }

  const post = await db
    .insert(PostsTable)
    .values({ title, avarage_rating, author_id })
    .returning({
      id: PostsTable.id,
      title: PostsTable.title,
      author_id: PostsTable.author_id,
    });

  res.status(200).json({ post });
});

export const postDelete = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    throw new HttpError(404, "Post id required");
  }

  const deleted = await db
    .delete(PostsTable)
    .where(eq(PostsTable.id, id))
    .returning({ id: PostsTable.id });

  if (deleted.length === 0) {
    throw new HttpError(404, "Post not found");
  }

  res.status(200).json({ message: "Post deleted successfully" });
});
