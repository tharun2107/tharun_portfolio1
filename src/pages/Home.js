import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import * as THREE from 'three';

// Load and Animate GLTF Model
const Model = () => {
  const { scene, error } = useGLTF('/models/model.glb');  // Ensure the correct path

  // Log error to the console if the model is not loading
  if (error) {
    console.error("Error loading model:", error);
  }

  const modelRef = useRef();

  // Apply materials and animations to the model
  scene?.traverse((child) => {
    if (child.isMesh) {
      child.material.opacity = 1;
      child.material.transparent = true;
      child.material.emissiveIntensity = 0.2;
    }
  });

  // Animate the model (rotation and scaling)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.02;
      modelRef.current.position.y = Math.sin(time * 2) * 0.5;
      const scale = 1 + Math.sin(time * 3) * 0.1;
      modelRef.current.scale.set(scale, scale, scale);
    }
  });

  return <primitive ref={modelRef} object={scene} />;
};

// Particle system (optional)
const Particles = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('three-bg').appendChild(renderer.domElement);

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

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.002;
      particles.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

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

  return <div id="three-bg" />;
};

const Hero = () => {
  return (
    <div className="h-screen relative flex items-center justify-start bg-gradient-to-r from-gray-800 to-black text-white overflow-hidden">
      {/* 3D Canvas for the Model */}
      <Canvas className="absolute top-0 left-0 w-full h-full z-0">
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} color="#00ffcc" />
        <directionalLight position={[-10, -10, -10]} color="#ff00ff" />
        <OrbitControls autoRotate autoRotateSpeed={2} />
        <Model /> {/* 3D Model */}
      </Canvas>

      {/* Particles (Stars) */}
      

      {/* Hero Text Section */}
          <div className="relative z-10 text-left p-10">
              
        <motion.h1
          className="text-5xl font-bold"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Hi, I'm Tharun Kudikyala
        </motion.h1>
        <motion.p
          className="mt-4 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          MERN Stack Developer
        </motion.p>
        <motion.div
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Link
            to="/projects"
            className="bg-primary py-2 px-6 rounded-md hover:bg-opacity-90"
          >
            View My Projects
          </Link>
          <Link
            to="/contact"
            className="bg-primary py-2 px-6 rounded-md hover:bg-opacity-90"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
