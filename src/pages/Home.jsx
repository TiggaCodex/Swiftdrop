import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  // Load logged-in user info
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.username) {
      setUsername(loggedInUser.username);
    }
  }, []);

  // Handle "Get Started" button click
  const handleGetStarted = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.username) {
      // ✅ User is logged in → Go to Create Order
      navigate("/create-order");
    } else {
      // ❌ Not logged in → Save redirect target and go to Login
      localStorage.setItem("redirectAfterLogin", "/create-order");
      navigate("/login");
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-24 px-6 text-center bg-gradient-to-r from-red-600 via-red-500 to-red-700 text-white">
        {username && (
          <motion.p
            className="text-xl mb-4 font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome back, <span className="text-yellow-300">{username}</span> 👋
          </motion.p>
        )}

        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          S & A SwiftDrop
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Fast, reliable, and affordable delivery — from door to door.
          Create orders, track deliveries, and manage logistics effortlessly.
        </motion.p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleGetStarted}
            className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/track")}
            className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-red-600 transition"
          >
            Track Delivery
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { step: "1", title: "Book Delivery", desc: "Enter sender and receiver details easily." },
            { step: "2", title: "We Pick & Ship", desc: "Our riders pick up and deliver on time." },
            { step: "3", title: "Track Easily", desc: "Use your tracking ID to monitor progress." },
          ].map(({ step, title, desc }) => (
            <motion.div
              key={step}
              className="bg-white dark:bg-gray-700 shadow-lg p-8 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-red-600 dark:text-red-400 text-5xl font-bold mb-4">{step}</div>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURED SERVICES */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Services</h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            {
              title: "Same-Day Delivery",
              desc: "Fast intra-city delivery within hours, available every day.",
            },
            {
              title: "Nationwide Shipping",
              desc: "Send packages across states with reliable, affordable rates.",
            },
            {
              title: "Global Shipping",
              desc: "Send packages globally at affordable rates.",
            },
          ].map(({ title, desc }) => (
            <motion.div
              key={title}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-8 hover:shadow-2xl transition"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
                {title}
              </h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/services")}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
          >
            View All Services
          </button>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">What Customers Say</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            { name: "Amina O.", comment: "SwiftDrop is my business lifeline — always fast and reliable!" },
            { name: "David K.", comment: "The tracking system is top-notch. I always know where my package is!" },
          ].map(({ name, comment }) => (
            <motion.div
              key={name}
              className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <p className="italic mb-4">“{comment}”</p>
              <h4 className="font-semibold text-red-600 dark:text-red-400">{name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">Need Help With a Delivery?</h2>
        <p className="mb-8 text-lg">Our support team is always ready to assist you.</p>
        <button
          onClick={() => navigate("/contact")}
          className="bg-white text-red-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Contact Support
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">S & A SwiftDrop</h3>
            <p className="text-sm text-gray-400">
              Fast, reliable, and transparent delivery with real-time tracking and nationwide reach.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Delivering speed, trust, and excellence across every mile.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-red-400">Home</a></li>
              <li><a href="/create-order" className="hover:text-red-400">Create Order</a></li>
              <li><a href="/track" className="hover:text-red-400">Track Delivery</a></li>
              <li><a href="/services" className="hover:text-red-400">Services</a></li>
              <li><a href="/login" className="hover:text-red-400">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Contact</h4>
            <p className="text-sm text-gray-400">📍 Malhub, Ilofa Road, Ilorin, Kwara State, Nigeria</p>
            <p className="text-sm text-gray-400">📞 +234 811 496 5493, +234 706 269 8171</p>
            <p className="text-sm text-gray-400">✉ support@S&Aswiftdrop.com</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="p-2 rounded-l-md border-none outline-none w-full text-gray-800"
              />
              <button className="bg-red-600 px-4 rounded-r-md text-white hover:bg-red-700">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} S & A SwiftDrop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}