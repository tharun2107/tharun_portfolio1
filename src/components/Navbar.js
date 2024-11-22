import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    return (
        <nav className="bg-gradient-to-r   py-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white">
                    Tharun Kudikyala
                </Link>

                {/* Navigation Links */}
                <div className="space-x-6 flex items-center">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        <Link to="/" className="text-white font-semibold">Home</Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        <Link to="/about" className="text-white font-semibold">About</Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        <Link to="/projects" className="text-white font-semibold">Projects</Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        <Link to="/contact" className="text-white font-semibold">Contact</Link>
                    </motion.div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
