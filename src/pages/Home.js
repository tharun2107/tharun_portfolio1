import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// Load and Animate GLTF Model
const Model = () => {
  const { scene, error } = useGLTF('/models/model.glb');  // Ensure the correct path

  if (error) {
    console.error("Error loading model:", error);
  }

  const modelRef = useRef();
  const [startPosition] = useState(new THREE.Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5));

  // Initial position and animation
  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.position.copy(startPosition);
      modelRef.current.scale.set(0, 0, 0);
    }
  }, [startPosition]);

  // Animate the model (rotation, scaling, and entrance)
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.02;
      modelRef.current.position.y = Math.sin(time * 2) * 0.5;
      const scale = 1 + Math.sin(time * 3) * 0.1;
      modelRef.current.scale.set(scale, scale, scale);

      // Animate entrance from a random position
      modelRef.current.position.lerp(new THREE.Vector3(0, 0, 0), 0.05);
      modelRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.05);
    }
  });

  return <primitive ref={modelRef} object={scene} />;
};

const Hero = () => {
  // Helper function to split text into spans for animation
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="inline-block"
      >
        {char}
      </motion.span>
    ));
  };

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

      {/* Hero Text Section */}
      <div className="relative z-10 text-left p-10">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1, rotate: 360 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          Hi, I'm Tharun Kudikyala
        </motion.h1>
        
        {/* Letter-by-letter animation for MERN Stack Developer */}
        <motion.p
          className="mt-4 text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {splitText("MERN Stack Developer")}
        </motion.p>
        
        <motion.div
          className="mt-6 flex space-x-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1, type: "spring", stiffness: 100 }}
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
  