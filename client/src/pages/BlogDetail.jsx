import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBlogById } from "../services/blog";

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      const res = await fetchBlogById(id);
      setBlog(res.data);
    };
    getBlog();
  }, [id]);

  if (!blog) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1rem" }}>{blog.title}</h2>

      {blog.image && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${blog.image}`}
          alt={blog.title}
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "6px",
            marginBottom: "1rem",
          }}
        />
      )}

      <p style={{ marginBottom: "1rem" }}>{blog.content}</p>
      <p><strong>Author:</strong> {blog.author.name}</p>
    </div>
  );
};

export default BlogDetail;
