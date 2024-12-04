"use client";

// Initialize admin credentials
if (!localStorage.getItem("admin")) {
  localStorage.setItem(
    "admin",
    JSON.stringify({ email: "admin@example.com", password: "admin123" })
  );
}

export default function Home() {
  return (
    <div className="home-container">
      <div className="content-box">
        <h1 className="title">Welcome to My Blog App</h1>
        <p className="description">
          Sign up or log in to explore the blogs!
        </p>
        <div className="button-container">
          <a href="/login" className="login-button">
            Login
          </a>
          <a href="/register" className="register-button">
            Register
          </a>
        </div>
      </div>

      {/* Internal CSS */}
      <style jsx>{`
        /* Main background and layout */
        .home-container {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #74c6e2, #7b80f5, #ff6fa4);
        }

        /* Content Box */
        .content-box {
          padding: 40px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 400px;
          width: 100%;
        }

        /* Title */
        .title {
          font-size: 3rem;
          font-weight: 800;
          color: #2d3748;
          margin-bottom: 20px;
        }

        /* Description */
        .description {
          font-size: 1.25rem;
          color: #4a5568;
          margin-top: 10px;
        }

        /* Button Container */
        .button-container {
          margin-top: 30px;
          display: flex;
          gap: 16px;
          justify-content: center;
        }

        /* Buttons */
        .login-button,
        .register-button {
          padding: 12px 24px;
          font-size: 1rem;
          font-weight: 600;
          text-align: center;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .login-button {
          background-color: #3182ce;
          color: white;
        }

        .register-button {
          background-color: #48bb78;
          color: white;
        }

        /* Hover Effects for Buttons */
        .login-button:hover,
        .register-button:hover {
          transform: scale(1.05);
        }

        .login-button:hover {
          background-color: #2b6cb0;
        }

        .register-button:hover {
          background-color: #38a169;
        }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .home-container {
            padding: 20px;
          }

          .content-box {
            padding: 30px;
          }

          .title {
            font-size: 2.5rem;
          }

          .description {
            font-size: 1.125rem;
          }

          .button-container {
            flex-direction: column;
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
