import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../services/blog";
import { AuthContext } from "../context/AuthContext";

const CreateBlog = () => {
  const [formData, setFormData] = useState({ title: "", content: "", image: null });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const blogData = new FormData();
      blogData.append("title", formData.title);
      blogData.append("content", formData.content);
      if (formData.image) blogData.append("image", formData.image);
      blogData.append("author", user.userId); 

      await createBlog(blogData, user.token);
      navigate("/dashboard");
    } catch (error) {
      alert("Failed to create blog");
    }
  };

  return (
    <div className="container">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="content" placeholder="Content" rows="8" onChange={handleChange} required />
        <input type="file" name="image" accept="image/*" onChange={handleChange} />
        <button type="submit">Post Blog</button>
      </form>
    </div>
  );
};

export default CreateBlog;
