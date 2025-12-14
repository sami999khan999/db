// Category Service - Business Logic Layer
// Handles all category-related API calls and data management

import { Category, CreateCategoryRequest } from "@/types";

export const categoryService = {
  // Fetch all categories from the database
  async getCategories(): Promise<Category[]> {
    const response = await fetch("/api/categories");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  },

  // Create a new category with name, slug, description, color, and active status
  async createCategory(categoryData: CreateCategoryRequest): Promise<Category> {
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create category");
    }

    return response.json();
  },

  // Delete a category by their ID
  async deleteCategory(id: string): Promise<void> {
    const response = await fetch(`/api/categories?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete category");
    }
  },
};
