import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/blog";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const allBlogs = await fetchBlogs();
        console.log("Fetched blogs:", allBlogs);
        setBlogs(allBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };

    getBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container" style={{ padding: "1rem" }}>
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
                  blog.image?.startsWith("http")
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
              {blog.content.length > 150
                ? `${blog.content.slice(0, 150)}...`
                : blog.content}
            </p>
            <Link to={`/blog/${blog._id}`}>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Read More</button>
            </Link>

          </div>
        ))
      )}
    </div>
  );
};

export default Home;
