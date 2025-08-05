import { useContext, useEffect, useState } from "react";
import { fetchBlogs, deleteBlog } from "../services/blog";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [blogs, setBlogs] = useState([]);

  const getMyBlogs = async () => {
    const res = await fetchBlogs();

    console.log("Fetched Blogs:", res.data); // ✅ All blogs from DB

    res.data.forEach((blog) => {
      console.log("Blog Author ID:", blog?.author?._id);
    });

    console.log("Logged-in User ID:", user?.user?.id); // ✅ Current user ID

    const myBlogs = res.data.filter(
      (blog) => blog?.author?._id?.toString() === user?.user?.id?.toString()
    );

    setBlogs(myBlogs);
  };

  useEffect(() => {
    getMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog(id, user.token);
      getMyBlogs();
    }
  };

  return (
    <div className="container">
      <h2>My Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-card">
            <h3>{blog.title}</h3>
            {blog.image && (
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${blog.image}`}
                alt={blog.title}
              />
            )}
            <p>{blog.content.slice(0, 100)}...</p>
            <div className="button-group">
              <Link to={`/edit/${blog._id}`} className="btn-link">Edit</Link>
              <button className="btn-link" onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
