import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-800 to-black py-4 shadow-lg relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-10 animate-pulse"></div>

      <div className="container mx-auto flex justify-between items-center relative z-10">
        {/* Logo with Animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Link to="/" className="text-3xl font-bold text-white tracking-widest">
            Tharun Kudikyala
          </Link>
        </motion.div>

        {/* Navigation Links */}
        <div className="space-x-6 flex items-center">
          {['Home', 'About', 'Projects', 'Contact'].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-white transition duration-300"
            >
              <Link to={`/${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} className="text-white font-semibold">
                {item}
              </Link>
            </motion.div>
          ))}

          {/* Resume Button */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black font-semibold px-4 py-2 rounded-lg shadow-lg hover:bg-gray-800 hover:text-white transition duration-300"
          >
            <a
              href="/tharun_kudikyala_resume.pdf"
              download="Tharun_Kudikyala_Resume.pdf"
              className="block"
            >
              Resume
            </a>
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
