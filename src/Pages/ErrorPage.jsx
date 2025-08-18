import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-red-900 to-black text-white relative overflow-hidden">
      
      {/* Animated Background Circle */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: [0, 20, 0], opacity: 1 }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-40 h-40 bg-red-500 rounded-full blur-3xl opacity-30"
      ></motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: [0, -20, 0], opacity: 1 }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-52 h-52 bg-red-400 rounded-full blur-3xl opacity-20"
      ></motion.div>

      {/* Error Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center text-center z-10"
      >
        <FaExclamationTriangle className="text-red-500 text-7xl mb-4 animate-bounce" />

        <h1 className="text-6xl font-extrabold mb-2">404</h1>
        <p className="text-xl mb-6 text-gray-200">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-xl shadow-lg text-lg font-semibold transition"
          >
            ⬅ Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
