// User Form Component - Creates new users
// Provides form fields for email (required) and name (optional)
// Handles form submission, validation, and error states

"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { FormField } from "./FormField";
import { User, CreateUserRequest } from "@/types";
import { userService } from "@/services/userService";

interface UserFormProps {
  onUserCreated?: () => void;
  className?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  onUserCreated,
  className = "",
}) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    email: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await userService.createUser(formData);
      setFormData({ email: "", name: "" });
      onUserCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof CreateUserRequest) => (value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

  return (
    <div className={`bg-white p-6 rounded-lg shadow-md ${className}`}>
      <h2 className="text-xl font-semibold mb-4 text-gray-900">Create User</h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange("email")}
          required
          placeholder="user@example.com"
        />

        <FormField
          label="Name"
          name="name"
          type="text"
          value={formData.name || ""}
          onChange={handleInputChange("name")}
          placeholder="John Doe"
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Creating..." : "Create User"}
        </Button>
      </form>
    </div>
  );
};
