"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // For admin login
    if (email === "admin" && password === "admin123") {
      const Admin = { email, password, role: "admin" };

      try {
        // Sending POST request to the backend for admin login
        const response = await fetch("http://localhost:5000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Admin),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Admin login successful!");
          router.push("/admin/dashboard");
        } else {
          alert(data.error || "Login failed.");
        }
      } catch (error) {
        console.error("Error during Admin Login:", error);
        alert("An error occurred during Admin Login.");
      }
    } else {
      // For normal user login
      const user = { email, password, role: "user" };

      try {
        // Sending POST request to the backend for user login
        const response = await fetch("http://localhost:5000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Login successful!");
          router.push("/dashboard");
        } else {
          alert(data.error || "Login failed.");
        }
      } catch (error) {
        console.error("Error during Login:", error);
        alert("An error occurred during Login.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="title">Login</h2>
        <div>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="login-button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #74c6e2, #7b80f5, #ff6fa4);
        }

        .login-box {
          background-color: white;
          padding: 40px;
          border-radius: 8px;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          max-width: 400px;
          width: 100%;
          text-align: center;
        }

        .title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 20px;
        }

        .input-field {
          width: 100%;
          padding: 14px;
          margin-bottom: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          transition: border 0.3s ease;
        }

        .input-field:focus {
          border-color: #3182ce;
          outline: none;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background-color: #3182ce;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .login-button:hover {
          background-color: #2b6cb0;
          transform: scale(1.05);
        }

        .login-button:focus {
          outline: none;
          ring: 2px solid #3182ce;
        }

        @media (max-width: 768px) {
          .login-box {
            padding: 30px;
          }

          .title {
            font-size: 2rem;
          }

          .input-field {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
