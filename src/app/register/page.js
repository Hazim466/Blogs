"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const user = { email, password, role: "user" };

    try {
      // Sending POST request to the backend
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        router.push("/login");
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="title">Register</h2>
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
            className="register-button"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        .register-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #ff6fa4, #7b80f5, #74c6e2);
        }

        .register-box {
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
          border-color: #38a169;
          outline: none;
        }

        .register-button {
          width: 100%;
          padding: 12px;
          background-color: #38a169;
          color: white;
          font-size: 1.1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .register-button:hover {
          background-color: #2f855a;
          transform: scale(1.05);
        }

        .register-button:focus {
          outline: none;
          ring: 2px solid #38a169;
        }

        @media (max-width: 768px) {
          .register-box {
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
