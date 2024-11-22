// src/pages/Contact.js
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import emailjs from 'emailjs-com';

const Contact = () => {

    useEffect(() => {
        // Set up Three.js scene
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



    const handleSubmit = (e) => {
        e.preventDefault();

        // Get form data
       
        // Use EmailJS to send the email (using environment variables correctly)
        emailjs.sendForm(
            process.env.REACT_APP_SERVICE_ID,
            process.env.REACT_APP_TEMPLATE_ID,
            e.target,
            process.env.REACT_APP_USER_ID
        )
            .then((result) => {
                alert('Message Sent Successfully');
                console.log(result.text);
            }, (error) => {
                alert('Failed to send message');
                console.log(error.text);
            });
    };


    return (
        <section className="relative py-20 text-white">
            {/* Three.js Background */}
            <div id="three-bg" className="absolute top-0 left-0 w-full h-full"></div>

            <div className="container mx-auto relative z-10">
                <h2 className="text-4xl font-bold text-center">Get in Touch</h2>
                <motion.form
                    className="mt-10 max-w-lg mx-auto bg-gray-800 p-6 rounded-lg shadow-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <input
                            type="text"
                            name="from_name"
                            className="w-full p-3 rounded-md bg-gray-700 focus:outline-none"
                            placeholder="Your Name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            name="from_email"
                            className="w-full p-3 rounded-md bg-gray-700 focus:outline-none"
                            placeholder="Your Email"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <textarea
                            name="message"
                            className="w-full p-3 rounded-md bg-gray-700 focus:outline-none"
                            placeholder="Your Message"
                            required
                        ></textarea>
                    </div>
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        className="w-full bg-blue-600 py-3 rounded-md text-white"
                    >
                        Send Message
                    </motion.button>
                </motion.form>
            </div>
        </section>
    );
};

export default Contact;
