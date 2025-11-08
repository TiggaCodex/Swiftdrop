import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">SwiftDrop</h2>
          <p className="text-gray-400 mb-4">
            Fast, reliable, and transparent delivery platform with real-time
            tracking and nationwide reach.
          </p>
          <div className="flex space-x-4 text-xl">
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="Facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              className="hover:text-blue-400 transition"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="hover:text-pink-400 transition"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="hover:text-blue-500 transition"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/create-order"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Create Order
              </Link>
            </li>
            <li>
              <Link
                to="/track-delivery"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Track Delivery
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Signup
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-blue-400 transition-colors duration-200"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Contact Us</h3>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Email:</span>{" "}
            support@swiftdrop.com
          </p>
          <p className="text-gray-400 mb-2">
            <span className="font-semibold text-gray-200">Phone:</span>{" "}
            +234 811 496 5493, +234 706 269 8171
          </p>
          <p className="text-gray-400">
            <span className="font-semibold text-gray-200">Address:</span>{" "}
            Malhub, Ilofa Road, Ilorin, Kwara State, Nigeria
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} SwiftDrop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;