import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!foundUser) {
      setError("No account found with this email. Please sign up first.");
      return;
    }

    if (foundUser.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // ✅ Save user session globally
    localStorage.setItem("currentUser", JSON.stringify(foundUser));

    setMessage("✅ Login successful! Redirecting...");

    // ✅ Check for saved redirect route
    const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";

    // Clear redirectAfterLogin so it doesn't affect future logins
    localStorage.removeItem("redirectAfterLogin");

    // Redirect to intended page
    setTimeout(() => {
      navigate(redirectPath);
      window.location.reload();
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4 text-center">
          Login
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 dark:bg-red-900/40 dark:text-red-300 p-3 rounded">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-4 text-sm text-green-700 bg-green-100 dark:bg-green-900/40 dark:text-green-300 p-3 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoComplete="email"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-red-600 dark:text-red-400 font-semibold hover:underline"
          >
            Create one
          </button>
        </div>
      </div>
    </div>
  );
}