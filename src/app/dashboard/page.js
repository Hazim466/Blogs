"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('http://localhost:5000/blog/all');
        const data = await response.json();
        setBlogs(data.blogs);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("role");
    router.push("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-box">
        <h1 className="dashboard-title">User Dashboard</h1>

        <button
          onClick={handleLogout}
          className="logout-button"
        >
          Logout
        </button>

        <div>
          {blogs.length === 0 ? (
            <p className="no-blogs-text">No blogs available to display.</p>
          ) : (
            blogs.map((blog, index) => (
              <div
                key={index}
                className="blog-card"
              >
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-content">{blog.content}</p>
                <img src={`/assets/${blog.image}`} alt="Blog Image" />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .dashboard-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f7aef8, #92a8d1, #034f84);
        }

        .dashboard-box {
          background-color: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 800px;
          text-align: center;
        }

        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 30px;
        }

        .logout-button {
          background-color: #e53e3e;
          color: white;
          padding: 12px 24px;
          border-radius: 6px;
          font-size: 1rem;
          margin-bottom: 24px;
          cursor: pointer;
          border: none;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .logout-button:hover {
          background-color: #c53030;
          transform: scale(1.05);
        }

        .no-blogs-text {
          color: #718096;
          font-size: 1.2rem;
        }

        .blog-card {
          background-color: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 24px;
          box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .blog-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
        }

        .blog-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #2d3748;
          margin-bottom: 12px;
        }

        .blog-content {
          font-size: 1rem;
          color: #4a5568;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .dashboard-box {
            padding: 30px;
          }

          .dashboard-title {
            font-size: 2rem;
          }

          .blog-title {
            font-size: 1.6rem;
          }

          .blog-content {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
