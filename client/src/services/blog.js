import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

// Add JWT to headers
const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Create blog
export const createBlog = (data, token) =>
  API.post("/blogs", data, authHeader(token));

// Get all blogs
export const fetchBlogs = () => API.get("/blogs");

// Get single blog
export const fetchBlogById = (id) => API.get(`/blogs/${id}`);

// Delete blog
export const deleteBlog = (id, token) =>
  API.delete(`/blogs/${id}`, authHeader(token));

// Update blog
export const updateBlog = (id, data, token) =>
  API.put(`/blogs/${id}`, data, authHeader(token));

// Get blogs by current user (optional: filter frontend-side)
