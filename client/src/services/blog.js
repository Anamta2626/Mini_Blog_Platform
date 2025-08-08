import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL;


export const fetchBlogs = async () => {
  try {
    const res = await axios.get(`${API}/api/blogs`);
    return res.data; // ✅ Make sure you're returning actual blog array here
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return []; // ✅ Return empty array in case of error
  }
};

// ✅ Create a new blog
export const createBlog = async (formData, token) => {
  const res = await axios.post(`${API}/api/blogs`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// ✅ Fetch a blog by ID

export const fetchBlogById = async (id) => {
  return await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs/${id}`);
};


// ✅ Delete a blog by ID
export const deleteBlog = async (id, token) => {
  const res = await axios.delete(`${API}/api/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
// Update an existing blog
export const updateBlog = async (id, formData, token) => {
  const res = await axios.put(`${API}/api/blogs/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
