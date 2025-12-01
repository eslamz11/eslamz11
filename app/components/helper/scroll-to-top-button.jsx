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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`fixed ${language === 'ar' ? 'left-6' : 'right-6'} bottom-24 z-50 transition-all duration-300 ${
        showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="bg-gradient-to-br from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
      >
        <FaArrowUp className="w-6 h-6" />
      </button>
    </div>
  );
}

export default ScrollToTopButton;
