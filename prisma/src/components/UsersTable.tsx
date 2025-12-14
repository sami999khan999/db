// Users Table Component - Displays list of users
// Shows user name, email, and creation date with delete functionality
// Handles data fetching, loading states, and user deletion

"use client";

import React, { useState, useEffect } from "react";
import { Table } from "./Table";
import { User } from "@/types";
import { userService } from "@/services/userService";

interface UsersTableProps {
  refreshTrigger?: number;
  className?: string;
}

export const UsersTable: React.FC<UsersTableProps> = ({
  refreshTrigger,
  className = "",
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await userService.deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete user");
    }
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (value: string | null) => value || "N/A",
    },
    {
      key: "email",
      label: "Email",
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
        <div className="text-center py-8 text-gray-500">Loading users...</div>
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
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Users</h2>
      <Table
        columns={columns}
        data={users}
        onDelete={handleDelete}
        emptyMessage="No users found"
      />
    </div>
  );
};
