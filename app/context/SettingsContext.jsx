'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import enTranslations from '../translations/en.json';
import arTranslations from '../translations/ar.json';

const SettingsContext = createContext();

const translations = {
  en: enTranslations,
  ar: arTranslations
};

export function SettingsProvider({ children }) {
  // Initialize with default values (same on server and client to avoid hydration mismatch)
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);

  // Load saved settings from localStorage after mount (client-side only)
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLanguage = localStorage.getItem('language') || 'en';
    
    // Update state
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    
    // Apply theme to document - default to dark
    if (savedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
    
    // Apply language direction
    if (savedLanguage === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    if (newTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    
    console.log(`🌐 Switching language from ${language} to ${newLanguage}`);
    
    // Show loading animation
    setIsTranslating(true);
    
    // Update state and save to localStorage
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Apply RTL for Arabic, LTR for English
    if (newLanguage === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }
    
    // Hide loading animation after smooth transition
    setTimeout(() => {
      setIsTranslating(false);
    }, 1000);
  };

  // Helper function to get translation
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <SettingsContext.Provider value={{ 
      theme, 
      language, 
      isTranslating,
      toggleTheme, 
      toggleLanguage,
      t
    }}>
      {/* Translation Loading Overlay */}
      {isTranslating && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ 
          backgroundColor: theme === 'dark' ? 'rgba(13, 18, 36, 0.95)' : 'rgba(248, 250, 252, 0.95)',
          backdropFilter: 'blur(10px)'
        }}>
          <div className="flex flex-col items-center gap-6">
            {/* Spinner Animation */}
            <div className="relative w-24 h-24">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#16f2b3] border-r-violet-500 animate-spin"></div>
              {/* Inner rotating ring */}
              <div className="absolute inset-3 rounded-full border-4 border-transparent border-t-pink-500 border-l-violet-400 animate-spin-reverse"></div>
              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-10 h-10 text-[#16f2b3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
            </div>
            
            {/* Loading Text */}
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#16f2b3] via-violet-400 to-pink-400 bg-clip-text text-transparent">
                {language === 'en' ? 'جاري التحميل...' : 'Loading...'}
              </h3>
              <p className="text-sm transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                {language === 'en' ? 'التبديل إلى الإنجليزية...' : 'Switching to Arabic...'}
              </p>
            </div>
            
            {/* Progress dots */}
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#16f2b3] animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-3 h-3 rounded-full bg-violet-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
      
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}

