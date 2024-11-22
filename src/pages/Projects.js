import { motion } from 'framer-motion';
import { useEffect } from 'react';
import projectImage from '../assets/expensetracker-image.jpeg'; // Add your project image here
import projectImage1 from '../assets/stylesphere.png';
import projectImage2 from '../assets/annseva.png';
import * as THREE from 'three';

const ProjectCard = ({ title, description, githubLink, liveLink, image }) => (
    <motion.div
        whileHover={{
            scale: 1.05,
            boxShadow: '0px 0px 20px rgba(0,0,0,0.2)', // Subtle glow effect on hover
            transition: { duration: 0.3 },
        }}
        className="bg-white shadow-lg rounded-lg p-5 transition duration-300 ease-in-out relative overflow-hidden"
    >
        <div className="relative">
            <img
                src={image}
                alt={title}
                className="rounded-lg object-cover w-full h-64 mb-4 transform transition duration-500 ease-in-out hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40 rounded-lg"></div>

            {/* 3D Star Effect */}
            <motion.div
                className="absolute inset-0 bg-cover bg-no-repeat"
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 2px)',
                    backgroundSize: '20px 20px',
                    transform: 'perspective(600px) rotateX(15deg) rotateY(-15deg)',
                }}
                initial={{
                    opacity: 0,
                    scale: 0.8,
                }}
                animate={{
                    opacity: 1,
                    scale: 1.2,
                    rotateX: [15, -15],  // Rotate 3D effect
                    rotateY: [-15, 15],  // Rotate 3D effect
                }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'reverse',
                    duration: 2,
                    ease: 'easeInOut',
                }}
            ></motion.div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        <p className="mt-3 text-gray-600">{description}</p>
        <div className="mt-4 flex justify-between items-center">
            <a
                href={githubLink}
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
            >
                GitHub
            </a>
            {liveLink && (
                <a
                    href={liveLink}
                    className="text-primary underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Live Demo
                </a>
            )}
        </div>
    </motion.div>
);

const Projects = () => {
    useEffect(() => {
        // Set up Three.js scene for particle background
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('three-bg').appendChild(renderer.domElement);

        // Create particles
        const particleGeometry = new THREE.BufferGeometry();
        const particleCount = 5000;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 2000;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 2000;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2000;
        }
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
        const particles = new THREE.Points(particleGeometry, particleMaterial);
        scene.add(particles);

        camera.position.z = 500;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.002;
            particles.rotation.y += 0.002;
            renderer.render(scene, camera);
        };

        animate();

        // Handle mouse movement for interactivity
        const handleMouseMove = (event) => {
            camera.position.x = (event.clientX / window.innerWidth) * 2 - 1;
            camera.position.y = -(event.clientY / window.innerHeight) * 2 + 1;
            camera.position.z = 500;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <section className="py-20 bg-gray-100 relative">
            <div id="three-bg" className="absolute top-0 left-0 w-full h-full z-0"></div>
            <div className="container mx-auto relative z-10">
                <h2 className="text-4xl font-bold text-center text-black-800">My Projects</h2>
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                >
                    {/* Add your project cards here */}
                    <ProjectCard
                        title="Expense Tracker"
                        description="The Expense Tracker is a MERN stack application that allows users to log, categorize, and track their daily expenses with the ability to filter by month, year, and category. It also offers features like graphical visualizations, PDF downloads, and Excel exports for expense management."
                        githubLink="https://github.com/tharun2107/expensetracker.git"
                        image={projectImage} // Add the project image
                    />
                    <ProjectCard
                        title="StyleSphere"
                        description="StyleSphere is a MERN stack e-commerce platform that enables users to browse and purchase fashion items, manage their accounts, and securely complete transactions with Razorpay integration. It also includes an admin panel for product management and user handling."
                        githubLink="https://github.com/tharun2107/Fashion.git"
                        image={projectImage1}
                    />
                    <ProjectCard
                        title="Annseva"
                        description="AnadhSeva is a MERN stack platform designed to connect food donors with recipients in need, offering seamless volunteer coordination and donation tracking. It aims to reduce food waste and provide essential resources to those in need through an efficient and transparent system."
                        githubLink="https://github.com/tharun2107/Anadhsevaapp.git"
                        liveLink="https://vercel-annad-seva-f.vercel.app/"
                        image={projectImage2}
                    />
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
