import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const validEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleCreateAccount = (ev) => {
    ev.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim() || !email.trim() || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (!validEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check for duplicate email
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      setError("An account with this email already exists. Please login or use another email.");
      return;
    }

    // Create new user object
    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
    };

    // Save new user to users array
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Automatically log the user in
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setSuccess("Account created successfully! Redirecting to homepage...");
    setTimeout(() => {
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
          Create Account
        </h2>

        {error && <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded">{error}</div>}
        {success && <div className="mb-4 text-sm text-green-700 bg-green-100 p-3 rounded">{success}</div>}

        <form onSubmit={handleCreateAccount} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full p-3 border rounded-md"
            autoComplete="name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full p-3 border rounded-md"
            autoComplete="email"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password (min 6 chars)"
            className="w-full p-3 border rounded-md"
            autoComplete="new-password"
          />
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            placeholder="Confirm password"
            className="w-full p-3 border rounded-md"
            autoComplete="new-password"
          />

          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition"
          >
            Create Account
          </button>
        </form>

        <div className="mt-4 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-red-600 font-semibold hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}