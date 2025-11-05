import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Same-Day Delivery 🚀",
    desc: "Need it there fast? Our same-day service gets your parcels delivered within hours — safe, reliable, and hassle-free.",
    img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1200&q=80",
    bg: "from-red-600 to-red-800",
  },
  {
    title: "Nationwide Shipping 🌍",
    desc: "Send packages across Nigeria with confidence. Affordable, fast, and fully trackable.",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
    bg: "from-blue-600 to-blue-800",
  },
  {
    title: "Corporate Logistics 📦",
    desc: "Partner with SwiftDrop for bulk deliveries, e-commerce fulfillment, and business logistics solutions.",
    img: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d3?auto=format&fit=crop&w=1200&q=80",
    bg: "from-gray-800 to-gray-900",
  },
];

export default function Services() {
  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* HERO SLIDER */}
      <div className="relative h-[80vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className={`absolute inset-0 flex flex-col items-center justify-center text-center bg-gradient-to-r ${slides[index].bg} text-white`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url(${slides[index].img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              {slides[index].title}
            </motion.h1>
            <motion.p
              className="max-w-2xl mx-auto text-lg md:text-xl mb-6 px-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {slides[index].desc}
            </motion.p>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 w-full flex justify-center gap-3">
          {slides.map((_, i) => (
            <div
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
                i === index ? "bg-white w-6" : "bg-gray-400"
              }`}
            ></div>
          ))}
        </div>
      </div>

      {/* SERVICES GRID */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 text-red-600 dark:text-red-400">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Express Pickup",
              desc: "Book a pickup and our rider arrives at your doorstep within minutes.",
            },
            {
              title: "Bulk Orders",
              desc: "Send multiple deliveries at once — perfect for vendors and businesses.",
            },
            {
              title: "Return Logistics",
              desc: "Simplify product returns and customer exchanges seamlessly.",
            },
          ].map(({ title, desc }) => (
            <motion.div
              key={title}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md hover:shadow-xl transition"
            >
              <h3 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-3">
                {title}
              </h3>
              <p>{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience SwiftDrop?</h2>
        <p className="mb-8 text-lg">
          Get started today and enjoy reliable delivery at your fingertips.
        </p>
        <button
          onClick={() => (window.location.href = "/create-order")}
          className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Create an Order
        </button>
      </section>
    </div>
  );
}