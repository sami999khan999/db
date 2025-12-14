// Posts Table Component - Displays list of posts
// Shows post title, author details, categories (with colors), and creation date with delete functionality
// Handles data fetching, loading states, and post deletion

"use client";

import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { Post } from "@/types";
import { postService } from "@/services/postService";

interface PostsTableProps {
  refreshTrigger?: number;
  className?: string;
}

export const PostsTable: React.FC<PostsTableProps> = ({
  refreshTrigger,
  className = "",
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await postService.getPosts();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      await postService.deletePost(id);
      fetchPosts();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  const columns = [
    {
      key: "title",
      label: "Title",
    },
    {
      key: "author",
      label: "Author",
      render: (author: Post["author"]) => (
        <div>
          <div className="font-medium">{author.name || "N/A"}</div>
          <div className="text-sm text-gray-500">{author.email}</div>
        </div>
      ),
    },
    {
      key: "category",
      label: "Categories",
      render: (categories: Post["category"]) => (
        <div className="flex flex-wrap gap-1">
          {categories.length > 0 ? (
            categories.map((cat) => (
              <span
                key={cat.id}
                className="px-2 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: cat.color + "20",
                  color: cat.color,
                  border: `1px solid ${cat.color}`,
                }}
              >
                {cat.name}
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">No categories</span>
          )}
        </div>
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
        <div className="text-center py-8 text-gray-500">Loading posts...</div>
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
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Posts</h2>
      <Table
        columns={columns}
        data={posts}
        onDelete={handleDelete}
        emptyMessage="No posts found"
      />
    </div>
  );
};
