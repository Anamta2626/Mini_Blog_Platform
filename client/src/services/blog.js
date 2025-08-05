import axios from "axios";
const API = import.meta.env.VITE_BACKEND_URL;

export const createBlog = async (formData, token) => {
  const res = await axios.post(`${API}/api/blogs`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
