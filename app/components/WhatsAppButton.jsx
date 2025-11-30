'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSettings } from '../context/SettingsContext';

export default function WhatsAppButton({ whatsappNumber }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { language, t } = useSettings();

  useEffect(() => {
    // Show button after 10 seconds with animation
    const timer = setTimeout(() => {
      setIsVisible(true);
      
      // Auto show tooltip after 1 second of button appearing
      setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 3 seconds
        setTimeout(() => {
          setShowTooltip(false);
        }, 3000);
      }, 1000);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Don't render if no WhatsApp number
  if (!whatsappNumber) return null;

  const handleWhatsAppClick = () => {
    const message = language === 'ar' 
      ? 'مرحباً! أنا مهتم بالتواصل معك.'
      : 'Hello! I am interested in connecting with you.';
    
    const url = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setShowTooltip(false);
  };

  return (
    <>
      {/* Main WhatsApp Button */}
      <div
        className={`fixed ${language === 'ar' ? 'left-6' : 'right-6'} bottom-6 z-50 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
        }`}
      >
        {/* Tooltip */}
        {showTooltip && !isExpanded && (
          <div
            className={`absolute bottom-20 ${language === 'ar' ? 'left-0' : 'right-0'} mb-2 animate-bounce-slow`}
          >
            <div className="relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-3 rounded-2xl shadow-2xl shadow-green-500/50 max-w-xs">
              <p className="text-sm font-bold whitespace-nowrap">
                💬 {t('whatsapp.tooltip')}
              </p>
              {/* Arrow */}
              <div className={`absolute -bottom-2 ${language === 'ar' ? 'left-6' : 'right-6'} w-4 h-4 bg-emerald-600 transform rotate-45`}></div>
            </div>
          </div>
        )}

        {/* Expanded Card */}
        {isExpanded && (
          <div
            className="absolute bottom-20 mb-2 animate-scale-in"
            style={{ [language === 'ar' ? 'left' : 'right']: '0' }}
          >
            <div className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 text-white p-6 rounded-3xl shadow-2xl shadow-green-500/50 w-72 border-2 border-white/20">
              {/* Close button */}
              <button
                onClick={toggleExpand}
                className="absolute top-3 right-3 p-1 hover:bg-white/20 rounded-full transition-all duration-300"
              >
                <IoClose className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="flex items-center gap-3 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-full animate-ping opacity-75"></div>
                  <div className="relative bg-white p-3 rounded-full">
                    <FaWhatsapp className="w-8 h-8 text-green-500" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {t('whatsapp.chatWithUs')}
                  </h3>
                  <p className="text-xs text-white/80">
                    {t('whatsapp.onlineNow')}
                  </p>
                </div>
              </div>

              <p className="text-sm mb-4 text-white/90">
                {t('whatsapp.description')}
              </p>

              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-white text-green-600 font-bold py-3 px-4 rounded-xl hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{t('whatsapp.startChat')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Button */}
        <div className="relative">
          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse-slow opacity-75 blur-md"></div>
          
          {/* Button */}
          <button
            onClick={isExpanded ? handleWhatsAppClick : toggleExpand}
            className="relative bg-gradient-to-br from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white p-3 rounded-full shadow-2xl shadow-green-500/50 transition-all duration-500 transform hover:scale-110 hover:rotate-12 group border-2 border-white/20"
            aria-label="WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Online indicator */}
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            
            {/* Shine effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer"></div>
          </button>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-float-1"></div>
            <div className="absolute -top-3 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-float-2"></div>
            <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-green-300 rounded-full animate-float-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}

