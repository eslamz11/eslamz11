'use client';

import { useState, useEffect } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { useSettings } from '../context/SettingsContext';

export default function WhatsAppButton({ whatsappNumber }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { language, t } = useSettings();

  useEffect(() => {
    // Show button immediately
    setIsVisible(true);
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
  };

  return (
    <div
      className={`fixed ${language === 'ar' ? 'left-6' : 'right-6'} bottom-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20 pointer-events-none'
      }`}
    >
      {/* Expanded Card */}
      {isExpanded && (
        <div
          className="absolute bottom-20 mb-2 transition-all duration-300"
          style={{ [language === 'ar' ? 'left' : 'right']: '0' }}
        >
          <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 text-white p-5 rounded-2xl shadow-xl w-72 border border-white/20">
            {/* Close button */}
            <button
              onClick={toggleExpand}
              className="absolute top-2 right-2 p-1.5 hover:bg-white/20 rounded-full transition-all duration-200"
              aria-label="Close"
            >
              <IoClose className="w-5 h-5" />
            </button>

            {/* Content */}
            <div className="flex items-center gap-3 mb-4 mt-2">
              <div className="bg-white p-3 rounded-full">
                <FaWhatsapp className="w-7 h-7 text-green-600" />
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
              className="w-full bg-white text-green-600 font-bold py-2.5 px-4 rounded-xl hover:bg-green-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>{t('whatsapp.startChat')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={isExpanded ? handleWhatsAppClick : toggleExpand}
        className="relative bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
        
        {/* Online indicator */}
        <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
      </button>
    </div>
  );
}
