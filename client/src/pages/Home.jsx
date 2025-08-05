import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/blog";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // optional loading state
  const [error, setError] = useState(null);     // optional error state

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const allBlogs = await fetchBlogs(); // fetchBlogs already returns res.data
        console.log("Fetched blogs:", allBlogs); // debugging
        setBlogs(allBlogs);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
        setLoading(false);
      }
    };
    getBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h2 style={{ marginBottom: "1.5rem" }}>All Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog._id}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
            }}
          >
            <h3 style={{ marginBottom: "0.5rem" }}>{blog.title}</h3>

            {blog.image && (
              <img
                src={
                  blog.image.includes("cloudinary") // check if cloudinary URL
                    ? blog.image
                    : `${import.meta.env.VITE_BACKEND_URL}/uploads/${blog.image}`
                }
                alt={blog.title}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "1rem",
                }}
              />
            )}

            <p style={{ marginBottom: "0.5rem" }}>
              {blog.content.slice(0, 150)}...
            </p>
            <Link to={`/blog/${blog._id}`}>Read more →</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
