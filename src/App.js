import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Footer from './components/Footer';
import './index.css'; // or './styles/tailwind.css' if that's where it's located

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Navbar will be persistent across all pages */}
        <Navbar />

        {/* Define routes for different sections of the portfolio */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer will be persistent across all pages */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
