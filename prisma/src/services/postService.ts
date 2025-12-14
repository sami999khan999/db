// Post Service - Business Logic Layer
// Handles all post-related API calls and data management

import { Post, CreatePostRequest } from "@/types";

export const postService = {
  // Fetch all posts with author and category relationships
  async getPosts(): Promise<Post[]> {
    const response = await fetch("/api/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  },

  // Create a new post with title, description, author, and optional categories
  async createPost(postData: CreatePostRequest): Promise<Post> {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create post");
    }

    return response.json();
  },

  // Delete a post by their ID
  async deletePost(id: string): Promise<void> {
    const response = await fetch(`/api/posts?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete post");
    }
  },
};
