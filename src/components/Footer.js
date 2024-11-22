import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 py-6 mt-10">
            <div className="container mx-auto text-center">
                {/* Social Links */}
                <div className="flex justify-center space-x-4 mb-4">
                    <a
                        href="https://github.com/tharun2107"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://www.linkedin.com/in/tharun-kudikyala-37124727b/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition duration-300"
                    >
                        LinkedIn
                    </a>
                    {/* Add more links as needed */}
                </div>

                {/* Copyright */}
                <p className="text-gray-400">
                    &copy; {new Date().getFullYear()} Tharun Kudikyala. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
