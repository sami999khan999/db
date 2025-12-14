// Category Form Component - Creates new categories
// Provides form fields for name, slug (auto-generated), description, color, and active status
// Handles form submission, validation, slug generation, and error states

"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { Category, CreateCategoryRequest } from "@/types";
import { categoryService } from "@/services/categoryService";

interface CategoryFormProps {
  onCategoryCreated?: () => void;
  className?: string;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  onCategoryCreated,
  className = "",
}) => {
  const [formData, setFormData] = useState<CreateCategoryRequest>({
    name: "",
    slug: "",
    description: "",
    color: "#6366f1",
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await categoryService.createCategory(formData);
      setFormData({
        name: "",
        slug: "",
        description: "",
        color: "#6366f1",
        isActive: true,
      });
      onCategoryCreated?.();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleInputChange =
    (field: keyof CreateCategoryRequest) =>
    (value: CreateCategoryRequest[keyof CreateCategoryRequest]) => {
      if (field === "name") {
        const nameValue = value as string;
        const slug = generateSlug(nameValue);
        setFormData((prev) => ({
          ...prev,
          name: nameValue,
          slug: slug,
        }));
      } else {
        setFormData((prev) => ({ ...prev, [field]: value }));
      }
    };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Create Category
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange("name")}
          required
          placeholder="Category Name"
        />

        <FormField
          label="Slug"
          name="slug"
          type="text"
          value={formData.slug}
          onChange={handleInputChange("slug")}
          required
          placeholder="category-slug"
        />

        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={formData.description || ""}
          onChange={handleInputChange("description")}
          placeholder="Category description (optional)"
        />

        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Color
          </label>
          <div className="flex items-center space-x-3">
            <input
              id="color"
              name="color"
              type="color"
              value={formData.color || "#6366f1"}
              onChange={(e) => handleInputChange("color")(e.target.value)}
              className="h-10 w-20 border border-gray-300 rounded cursor-pointer"
            />
            <input
              type="text"
              value={formData.color || "#6366f1"}
              onChange={(e) => handleInputChange("color")(e.target.value)}
              placeholder="#6366f1"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => handleInputChange("isActive")(e.target.checked)}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-sm font-medium text-gray-700">Active</span>
          </label>
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create Category"}
        </Button>
      </form>
    </div>
  );
};
