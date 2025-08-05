import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="card">
      <h3>{blog.title}</h3>
      
      {blog.image && (
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${blog.image}`}
          alt={blog.title}
          style={{ height: "200px", objectFit: "cover", width: "100%" }}
        />
      )}
      
      <p>
        {blog.content.length > 150
          ? blog.content.slice(0, 150) + "..."
          : blog.content}
      </p>
      
      <p>
        <strong>Author:</strong> {blog.author.name}
      </p>
      
      <Link to={`/blog/${blog._id}`}>
        <button>Read More</button>
      </Link>
    </div>
  );
};

export default BlogCard;
