// User Service - Business Logic Layer
// Handles all user-related API calls and data management

import { User, CreateUserRequest } from "@/types";

export const userService = {
  // Fetch all users from the database
  async getUsers(): Promise<User[]> {
    const response = await fetch("/api/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return response.json();
  },

  // Create a new user with email and optional name
  async createUser(userData: CreateUserRequest): Promise<User> {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create user");
    }

    return response.json();
  },

  // Delete a user by their ID
  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`/api/users?id=${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete user");
    }
  },
};
