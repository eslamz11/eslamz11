'use client';

import Image from "next/image";
import { useSettings } from "@/app/context/SettingsContext";

export default function AboutContent({ personalData }) {
  const { language } = useSettings();

  // Get data based on current language
  const description = language === 'ar' && personalData.description_ar ? personalData.description_ar : personalData.description;

  return (
    <div id="about" className="my-12 lg:my-16 relative">
      <div className={`hidden lg:flex flex-col items-center absolute top-16 ${language === 'ar' ? '-left-8' : '-right-8'}`}>
        <span className="w-fit rotate-90 p-2 px-5 text-xl rounded-md transition-all duration-300" style={{ 
          backgroundColor: 'var(--background-secondary)',
          color: 'var(--text-primary)'
        }}>
          {language === 'ar' ? 'من أنا' : 'ABOUT ME'}
        </span>
        <span className="h-36 w-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="order-2 lg:order-1">
          <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
            {language === 'ar' ? 'من أنا؟' : 'Who I am?'}
          </p>
          <p className="text-sm lg:text-lg transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        </div>
        <div className="flex justify-center order-1 lg:order-2">
          <div className="relative group">
            {/* Animated border glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-violet-600 to-[#16f2b3] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-500 animate-pulse"></div>
            
            {/* Image */}
            <div className="relative">
              <Image
                src={personalData.profile || '/profile.png'}
                width={280}
                height={280}
                alt={personalData.name || 'Profile'}
                className="rounded-lg cursor-pointer theme-image"
                style={{ width: 'auto', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

