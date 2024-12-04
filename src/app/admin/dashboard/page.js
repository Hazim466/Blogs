"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]); // Initialize blogs to an empty array
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(""); // New state for the image URL
  const [isLoading, setIsLoading] = useState(true); // Loading state for fetching blogs
  const fileInputRef = useRef(null); // Reference for the file input

  // Fetch blogs from the backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/blog/all");
      const data = await response.json();
      if (data && Array.isArray(data.blogs)) {
        setBlogs(data.blogs);
      } else {
        setBlogs([]); // Ensure blogs is an array
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]); // Handle fetch errors
    } finally {
      setIsLoading(false); // Stop loading after fetch
    }
  };

  // Fetch blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = async () => {

    const newBlog = { title, content, image };
    try {
      const response = await fetch("http://localhost:5000/blog/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });
      const data = await response.json();
      setBlogs([...blogs, data]); // Add the new blog to the state

      // Fetch the updated list of blogs
      fetchBlogs();

      // Clear input fields
      setTitle("");
      setContent("");
      setImage("");
      if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
    } catch (error) {
      console.error("Error adding blog:", error);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await fetch(`http://localhost:5000/blog/delete/${id}`, {
        method: "DELETE",
      });
      setBlogs(blogs.filter((blog) => blog._id !== id)); // Remove deleted blog from the state
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="blog-form">
          <h2 className="form-title">Add a New Blog</h2>
          <input
            type="text"
            placeholder="Blog Title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Blog Content"
            className="textarea-field"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          
          {/* File input field with useRef */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={(e) => setImage(e.target.files[0].name)}
         style={{marginBottom:"5px"}} />

          <button className="add-blog-btn" onClick={handleAddBlog}>
            Add Blog
          </button>
        </div>

        <div>
          <h2 className="blogs-list-title">Blogs List</h2>
          {isLoading ? (
            <p>Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="no-blogs">No blogs available. Add a new one!</p>
          ) : (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-content">{blog.content}</p>
                {blog.image && (
                  <img src={`/assets/${blog.image}`} alt="Blog Image" />
                )}
                <button
                  className="delete-blog-btn"
                  onClick={() => handleDeleteBlog(blog._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <footer className="footer">
        <p className="footer-text">
          © 2024 Admin Dashboard. All Rights Reserved.
        </p>
      </footer>

      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #74c6e2, #7b80f5, #ff6fa4);
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          padding: 20px;
        }
        .dashboard-card {
          width: 100%;
          max-width: 800px;
          background-color: white;
          padding: 30px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          margin-bottom: 40px;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .dashboard-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2d3748;
        }
        .logout-btn {
          background-color: #e53e3e;
          color: white;
          padding: 8px 16px;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 6px;
          border: none;
          transition: background-color 0.3s ease;
        }
        .logout-btn:hover {
          background-color: #c53030;
        }
        .form-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 10px;
        }
        .input-field,
        .textarea-field {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .input-field:focus,
        .textarea-field:focus {
          border-color: #3182ce;
          outline: none;
          box-shadow: 0 0 5px rgba(53, 152, 219, 0.6);
        }
        .add-blog-btn {
          width: 100%;
          padding: 12px;
          background-color: #48bb78;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          border: none;
          transition: background-color 0.3s ease;
        }
        .add-blog-btn:hover {
          background-color: #38a169;
        }
        .blogs-list-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 15px;
        }
        .no-blogs {
          text-align: center;
          color: #718096;
          font-size: 1.1rem;
        }
        .blog-card {
          background-color: white;
          padding: 20px;
          margin-bottom: 20px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: all 0.3s ease;
        }
        .blog-card:hover {
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        .blog-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 10px;
        }
        .blog-content {
          font-size: 1rem;
          color: #4a5568;
          margin-bottom: 15px;
        }
        .blog-image {
          width: 100%;
          max-height: 200px;
          object-fit: cover;
          border-radius: 8px;
          margin-top: 10px;
        }
        .delete-blog-btn {
          background-color: #e53e3e;
          color: white;
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          transition: background-color 0.3s ease;
          margin-left:50%;
          
        }
        .delete-blog-btn:hover {
          background-color: #c53030;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
        .footer-text {
          font-size: 1rem;
          color: #718096;
        }
      `}</style>
    </div>
  );
}
