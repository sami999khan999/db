// Content Management System - Type Definitions
// Centralized TypeScript interfaces for all entities in the CMS

// User entity types - defines user structure and creation payload
export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  name?: string;
}

// Category entity types - defines category structure with slug and color
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  description?: string;
  color?: string;
  isActive?: boolean;
}

// Post entity types - defines post structure with relationships to users and categories
export interface Post {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author: {
    id: string;
    name: string | null;
    email: string;
  };
  category: {
    id: string;
    name: string;
    color: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  description: string;
  authorId: string;
  categoryIds?: string[];
}

// Common UI component types - reusable across the application
export interface DropdownOption {
  value: string;
  label: string;
}

export interface TableColumn {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}
