'use client';

import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { useSettings } from '../../context/SettingsContext';

function ScrollToTopButton() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { language } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed ${language === 'ar' ? 'left-6' : 'right-6'} bottom-24 z-50 transition-all duration-700 ${
        showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}
    >
      <div className="relative">
        {/* Animated Ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse-slow opacity-75 blur-md"></div>
        
        {/* Button */}
        <button
          onClick={scrollToTop}
          className="relative bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white p-3 rounded-full shadow-2xl shadow-pink-500/50 transition-all duration-500 transform hover:scale-110 group border-2 border-white/20"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300" />
          
          {/* Shine effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
        </button>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-2 -left-2 w-2 h-2 bg-pink-400 rounded-full animate-float-1"></div>
          <div className="absolute -top-3 -right-1 w-1.5 h-1.5 bg-purple-400 rounded-full animate-float-2"></div>
          <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-pink-300 rounded-full animate-float-3"></div>
        </div>
      </div>
    </div>
  );
}

export default ScrollToTopButton;

