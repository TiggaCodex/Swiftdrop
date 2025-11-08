import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import howItWorksImg from "../assets/how-it-works.png"; 
import coreServicesImg from "../assets/core-services.png";

export default function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.username) {
      setUsername(loggedInUser.username);
    }
  }, []);

  const handleGetStarted = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser && loggedInUser.username) {
      navigate("/create-order");
    } else {
      localStorage.setItem("redirectAfterLogin", "/create-order");
      navigate("/login");
    }
  };

  const handleSubscribe = () => {
    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    const savedEmails = JSON.parse(localStorage.getItem("subscribers")) || [];
    if (savedEmails.includes(email)) {
      alert("You're already subscribed!");
      return;
    }
    savedEmails.push(email);
    localStorage.setItem("subscribers", JSON.stringify(savedEmails));
    alert("🎉 Subscribed successfully!");
    setEmail("");
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
         SwiftDrop
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

        {/* 🖼 NEW IMAGE SECTION */}
        <motion.div
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={howItWorksImg}
            alt="How it works infographic"
            className="rounded-xl shadow-xl w-full"
          />
        </motion.div>

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

      {/* SERVICES */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-12">Our Core Services</h2>

        {/* 🖼 NEW IMAGE SECTION */}
        <motion.div
          className="max-w-5xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={coreServicesImg}
            alt="Core services illustration"
            className="rounded-xl shadow-lg w-full"
          />
        </motion.div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
          {[
            { title: "Same-Day Delivery", desc: "Fast intra-city delivery within hours." },
            { title: "Nationwide Shipping", desc: "Send packages across states affordably." },
            { title: "Global Shipping", desc: "Send packages globally at affordable rates." },
          ].map(({ title, desc }) => (
            <motion.div
              key={title}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-8 hover:shadow-2xl transition"
              whileHover={{ y: -5 }}
            >
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">{title}</h3>
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

      {/* FOOTER (unchanged) */}
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 text-center">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-3">SwiftDrop</h3>
            <p className="text-sm text-gray-400">
              Fast, reliable, and transparent delivery with real-time tracking and nationwide reach.
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
            <p className="text-sm text-gray-400">📍 Malhub, Ilofa Road, Ilorin, Kwara State</p>
            <p className="text-sm text-gray-400">📞 +234 811 496 5493</p>
            <p className="text-sm text-gray-400">✉ support@swiftdrop.com</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-l-md border-none outline-none w-full text-gray-800"
              />
              <button
                onClick={handleSubscribe}
                className="bg-red-600 px-4 rounded-r-md text-white hover:bg-red-700"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          © {new Date().getFullYear()} SwiftDrop. All rights reserved.
        </p>
      </footer>
    </div>
  );
}