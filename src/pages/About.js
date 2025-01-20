import { motion } from 'framer-motion';
import img1 from '../assets/tharun_photo.jpg'; // Corrected image import
import { FaJava, FaJs, FaHtml5, FaCss3Alt, FaReact, FaNodeJs, FaGithub, FaCode, FaDatabase } from 'react-icons/fa';
import { SiMongodb, SiLeetcode, SiCodechef, SiCodeforces } from 'react-icons/si';
import * as THREE from 'three';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Ensure high resolution rendering
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

    // Handle resize to maintain responsiveness
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="py-20 relative">
      <div id="three-bg" className="absolute top-0 left-0 w-full h-full z-0" /> {/* Background for Three.js particles */}

      <motion.div
        className="container mx-auto flex flex-col md:flex-row items-center relative z-10 px-4 md:px-8 lg:px-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        {/* About Me Section */}
        <div className="w-full md:w-1/3 flex justify-center mb-8 md:mb-0">
          <img
            src={img1}
            alt="Tharun Kudikyala"
            className="rounded-full shadow-lg w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="w-full md:w-2/3 md:pl-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-100 mb-6 text-center md:text-left">About Me</h2>
          <p className="text-base sm:text-lg text-gray-100 leading-relaxed text-center md:text-left">
            A self-taught, passionate third-year Computer Science student, specializing in Data Science. I thrive in building robust and scalable web applications using the MERN stack. Constantly exploring new technologies, I enjoy tackling real-world challenges through efficient and clean code.
          </p>

          {/* Skills Section */}
          <div className="mt-12">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4 text-center md:text-left">Skills</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-3xl sm:text-4xl text-gray-300">
              <div className="flex items-center">
                <FaJava />
                <span className="ml-2 text-base sm:text-lg">Java</span>
              </div>
              <div className="flex items-center">
                <FaJs />
                <span className="ml-2 text-base sm:text-lg">JavaScript</span>
              </div>
              <div className="flex items-center">
                <FaHtml5 />
                <span className="ml-2 text-base sm:text-lg">HTML</span>
              </div>
              <div className="flex items-center">
                <FaCss3Alt />
                <span className="ml-2 text-base sm:text-lg">CSS</span>
              </div>
              <div className="flex items-center">
                <FaReact />
                <span className="ml-2 text-base sm:text-lg">React</span>
              </div>
              <div className="flex items-center">
                <FaNodeJs />
                <span className="ml-2 text-base sm:text-lg">Node.js</span>
              </div>
              <div className="flex items-center">
                <SiMongodb />
                <span className="ml-2 text-base sm:text-lg">MongoDB</span>
              </div>
              <div className="flex items-center">
                <FaGithub />
                <span className="ml-2 text-base sm:text-lg">Git</span>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mt-12">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4 text-center md:text-left">Certifications</h3>
            <ul className="list-disc pl-6 text-base sm:text-lg text-gray-300 text-center md:text-left">
              <li>Java and Advanced Java - E-Box Bootcamp</li>
              <li>Web Technology - E-Box Bootcamp</li>
              <li>Database Design and Programming with SQL - Oracle</li>
              <li>Advanced Data Structures through Java - E-Box Bootcamp</li>
              <li>Database Programming with PL/SQL - Oracle</li>
            </ul>
          </div>

          {/* Competitive Programming Profiles */}
          <div className="mt-12">
            <h3 className="text-2xl sm:text-3xl font-semibold text-gray-100 mb-4 text-center md:text-left">Competitive Programming</h3>
            <div className="flex justify-center md:justify-start space-x-4">
        <a href="https://leetcode.com/u/tharun2107/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
          <SiLeetcode className="w-8 h-8 sm:w-10 sm:h-10" />
        </a>
        <a href="https://www.codechef.com/users/tharun2107" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
          <SiCodechef className="w-8 h-8 sm:w-10 sm:h-10" />
        </a>
        {/* <a href="https://codeforces.com/profile/yourprofile" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
          <SiCodeforces className="w-8 h-8 sm:w-10 sm:h-10" />
        </a> */}
      </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
