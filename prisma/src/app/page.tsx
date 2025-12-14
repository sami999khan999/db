// Main Dashboard Page - Content Management System
// Integrates all forms and tables for users, categories, and posts
// Provides refresh functionality to keep data synchronized

"use client";

import React, { useState } from "react";
import { UserForm } from "@/components/UserForm";
import { CategoryForm } from "@/components/CategoryForm";
import { PostForm } from "@/components/PostForm";
import { UsersTable } from "@/components/UsersTable";
import { CategoriesTable } from "@/components/CategoriesTable";
import { PostsTable } from "@/components/PostsTable";

export default function Home() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const triggerRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Content Management System
        </h1>

        {/* Forms Section */}
        <div className="space-y-8 mb-12">
          {/* User Form - Full Width */}
          <UserForm onUserCreated={triggerRefresh} />

          {/* Category and Post Forms - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CategoryForm onCategoryCreated={triggerRefresh} />
            <PostForm onPostCreated={triggerRefresh} />
          </div>
        </div>

        {/* Tables Section - Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <UsersTable refreshTrigger={refreshTrigger} />
          <CategoriesTable refreshTrigger={refreshTrigger} />
          <PostsTable refreshTrigger={refreshTrigger} />
        </div>
      </div>
    </div>
  );
}
