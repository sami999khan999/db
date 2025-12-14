// Categories Table Component - Displays list of categories
// Shows category name, slug, color, active status, and creation date with delete functionality
// Handles data fetching, loading states, and category deletion

"use client";

import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { Category } from "@/types";
import { categoryService } from "@/services/categoryService";

interface CategoriesTableProps {
  refreshTrigger?: number;
  className?: string;
}

export const CategoriesTable: React.FC<CategoriesTableProps> = ({
  refreshTrigger,
  className = "",
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await categoryService.getCategories();
      setCategories(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      await categoryService.deleteCategory(id);
      fetchCategories();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete category");
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "slug",
      label: "Slug",
    },
    {
      key: "color",
      label: "Color",
      render: (value: string) => (
        <div className="flex items-center space-x-2">
          <div
            className="w-4 h-4 rounded border border-gray-300"
            style={{ backgroundColor: value }}
          />
          <span className="text-sm">{value}</span>
        </div>
      ),
    },
    {
      key: "isActive",
      label: "Status",
      render: (value: boolean) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
  ];

  if (loading) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        <div className="text-center py-8 text-gray-500">
          Loading categories...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
        <div className="text-center py-8 text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Categories</h2>
      <Table
        columns={columns}
        data={categories}
        onDelete={handleDelete}
        emptyMessage="No categories found"
      />
    </div>
  );
};
