// src/pages/About.js
import { motion } from 'framer-motion';
import img1 from '../assets/tharun_photo.jpg'; // Corrected image import
import * as THREE from 'three';
import { useEffect } from 'react';

const About = () => {
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

  return (
    <section className="py-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 relative">
      <div id="three-bg" className="absolute top-0 left-0 w-full h-full z-0" /> {/* Background for Three.js particles */}
      
      <motion.div
        className="container mx-auto flex flex-col md:flex-row items-center relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        {/* About Me Section */}
        <div className="md:w-1/3 flex justify-center">
        <img
  src={img1}
  alt="Tharun Kudikyala"
  className="rounded-full shadow-lg w-64 h-64 md:w-80 md:h-80 object-cover transform hover:scale-105 transition-transform duration-300"
/>

        </div>
        <div className="md:w-2/3 mt-8 md:mt-0 md:pl-10">
          <h2 className="text-5xl font-bold text-gray-100 mb-6">About Me</h2>
          <p className="mt-4 text-black-200 leading-relaxed text-lg">
            I’m a third-year Computer Science student specializing in Data Science with a passion for full-stack development.
            With a strong foundation in MERN stack technologies, I build efficient and scalable web applications.
            I’m always excited to explore new technologies and solve real-world problems through code.
          </p>

          {/* Skills Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-semibold text-gray-100 mb-4">Skills</h3>
            <ul className="list-disc pl-6 text-lg text-black-600">
              <li><strong>Languages</strong>: JavaScript, Java</li>
              <li><strong>Web Development</strong>: MERN Stack (MongoDB, Express.js, React, Node.js), HTML, CSS</li>
              <li><strong>Tools & Platforms</strong>: Git, GitHub</li>
            </ul>
          </div>

          {/* Certifications Section */}
          <div className="mt-12">
            <h3 className="text-3xl font-semibold text-gray-100 mb-4">Certifications</h3>
            <ul className="list-disc pl-6 text-lg text-black-600">
                          <li>Java and Advanced Java - E-Box Bootcamp</li>
                          <li>Web Technology-HTML, CSS , JavaScript and ES6 - E-Box Bootcamp</li>
              <li>Database Design and Programming with SQL - Oracle</li>
              <li>Advanced Data Structures through Java - E-Box Bootcamp</li>
              <li>Database Programming with PL/SQL - Oracle</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
