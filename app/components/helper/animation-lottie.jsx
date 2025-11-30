"use client"

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-64 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin"></div>
    </div>
  )
});

const AnimationLottie = ({ animationPath, width }) => {
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldAnimate(!prefersReducedMotion);

    // Listen for changes to reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setShouldAnimate(!e.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: shouldAnimate,
    animationData: animationPath,
    style: {
      width: width || '95%',
    },
    // Reduce frame rate on mobile for better performance
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
      progressiveLoad: true,
    }
  };

  if (!shouldAnimate) {
    // Return static first frame for reduced motion
    return (
      <div className="w-full h-64 flex items-center justify-center opacity-50">
        <Lottie {...defaultOptions} autoplay={false} loop={false} />
      </div>
    );
  }

  return (
    <Lottie {...defaultOptions} />
  );
};

export default AnimationLottie;