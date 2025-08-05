import { useEffect, useState, useContext } from "react";
import { fetchBlogById, updateBlog } from "../services/blog";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const EditBlog = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await fetchBlogById(id);
        if (res && res.data) {
          console.log("Fetched Blog:", res.data);
          setFormData({
            title: res.data.title || "",
            content: res.data.content || "",
            image: null,
          });
        } else {
          console.error("No data found for blog:", res);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBlog();
  }, [id]);

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

    const updatedData = new FormData();
    updatedData.append("title", formData.title);
    updatedData.append("content", formData.content);
    if (formData.image) {
      updatedData.append("image", formData.image);
    }

    try {
      await updateBlog(id, updatedData, user.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  if (loading) {
    return <p>Loading blog data...</p>;
  }

  return (
    <div className="container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          value={formData.content}
          rows="8"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
