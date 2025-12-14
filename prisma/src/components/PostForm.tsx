// Post Form Component - Creates new posts
// Provides form fields for title, description, author dropdown, and category checkboxes
// Handles form submission, validation, data loading, and error states

"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { Dropdown } from "./Dropdown";
import { postService } from "@/services/postService";
import { userService } from "@/services/userService";
import { categoryService } from "@/services/categoryService";
import { Post, CreatePostRequest, User, Category } from "@/types";

interface PostFormProps {
  onPostCreated?: () => void;
  className?: string;
}

export const PostForm: React.FC<PostFormProps> = ({
  onPostCreated,
  className = "",
}) => {
  const [formData, setFormData] = useState<CreatePostRequest>({
    title: "",
    description: "",
    authorId: "",
    categoryIds: [],
  });
  const [users, setUsers] = useState<User[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [usersData, categoriesData] = await Promise.all([
          userService.getUsers(),
          categoryService.getCategories(),
        ]);
        setUsers(usersData);
        setCategories(categoriesData.filter((cat) => cat.isActive));
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setDataLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await postService.createPost(formData);
      setFormData({
        title: "",
        description: "",
        authorId: "",
        categoryIds: [],
      });
      onPostCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof CreatePostRequest) => (value: string | string[]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  const userOptions = users.map((user) => ({
    value: user.id,
    label: user.name ? `${user.name} (${user.email})` : user.email,
  }));

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  if (dataLoading) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        <div className="text-center py-4 text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Create Post</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange("title")}
          required
          placeholder="Post Title"
        />

        <FormField
          label="Description"
          name="description"
          type="textarea"
          value={formData.description}
          onChange={handleInputChange("description")}
          required
          placeholder="Post description"
        />

        <Dropdown
          label="Author"
          name="authorId"
          value={formData.authorId}
          onChange={handleInputChange("authorId")}
          options={userOptions}
          required
          placeholder="Select an author"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categories
          </label>
          <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-300 rounded-md p-2">
            {categoryOptions.map((category) => (
              <label key={category.value} className="flex items-center">
                <input
                  type="checkbox"
                  checked={
                    formData.categoryIds?.includes(category.value) || false
                  }
                  onChange={(e) => {
                    const currentIds = formData.categoryIds || [];
                    if (e.target.checked) {
                      handleInputChange("categoryIds")([
                        ...currentIds,
                        category.value,
                      ]);
                    } else {
                      handleInputChange("categoryIds")(
                        currentIds.filter((id) => id !== category.value)
                      );
                    }
                  }}
                  className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || users.length === 0}
          className="w-full"
        >
          {loading ? "Creating..." : "Create Post"}
        </Button>

        {users.length === 0 && (
          <p className="mt-2 text-sm text-gray-500 text-center">
            No users available. Please create a user first.
          </p>
        )}
      </form>
    </div>
  );
};
