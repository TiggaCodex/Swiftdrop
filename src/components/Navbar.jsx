import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Theme setup
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }

    // Retrieve user session
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setLoggedInUser(user);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setLoggedInUser(null);
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-red-600 dark:text-red-400"
        >
          S & A SwiftDrop
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-red-600 dark:hover:text-red-400">
            Home
          </Link>
          <Link
            to="/create-order"
            className="hover:text-red-600 dark:hover:text-red-400"
          >
            Create Order
          </Link>
          <Link
            to="/track"
            className="hover:text-red-600 dark:hover:text-red-400"
          >
            Track
          </Link>
          <Link
            to="/deliveries"
            className="hover:text-red-600 dark:hover:text-red-400"
          >
            My Deliveries
          </Link>
          <Link
            to="/services"
            className="hover:text-red-600 dark:hover:text-red-400"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="hover:text-red-600 dark:hover:text-red-400"
          >
            Contact
          </Link>

          {/* Conditional rendering */}
          {loggedInUser ? (
            <>
              <span className="text-gray-700 dark:text-gray-300">
                Welcome,{" "}
                <span className="font-semibold text-red-500">
                  {loggedInUser.name}
                </span>{" "}
                👋
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
              >
                Signup
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-gray-700 dark:text-gray-200"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-6 pb-4 space-y-3">
          <Link
            to="/"
            className="block hover:text-red-600 dark:hover:text-red-400"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/create-order"
            className="block hover:text-red-600 dark:hover:text-red-400"
            onClick={() => setMenuOpen(false)}
          >
            Create Order
          </Link>
          <Link
            to="/track"
            className="block hover:text-red-600 dark:hover:text-red-400"
            onClick={() => setMenuOpen(false)}
          >
            Track
          </Link>
          <Link
            to="/deliveries"
            className="block hover:text-red-600 dark:hover:text-red-400"
            onClick={() => setMenuOpen(false)}
          >
            My Deliveries
          </Link>
          <Link
            to="/services"
            className="block hover:text-red-600 dark:hover:text-red-400"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="block hover:text-red-600 dark:hover:text-red-400"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>

          {loggedInUser ? (
            <>
              <span className="block text-gray-700 dark:text-gray-300 mt-2">
                Welcome,{" "}
                <span className="font-semibold text-red-500">
                  {loggedInUser.name}
                </span>{" "}
                👋
              </span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="block border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </Link>
            </>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="mt-2 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:scale-110 transition"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      )}
    </nav>
  );
}