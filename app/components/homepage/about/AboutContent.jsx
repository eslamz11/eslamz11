'use client';

import Image from "next/image";
import { useSettings } from "@/app/context/SettingsContext";

export default function AboutContent({ personalData }) {
  const { language, theme } = useSettings();

  // Get data based on current language
  const description = language === 'ar' && personalData.description_ar ? personalData.description_ar : personalData.description;

  return (
    <div id="about" className="my-12 lg:my-16 relative">
      {/* Side Label */}
      <div className={`hidden lg:flex flex-col items-center absolute top-16 ${language === 'ar' ? '-left-8' : '-right-8'}`}>
        <span className={`w-fit rotate-90 p-2 px-5 text-xl rounded-md transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#1a1443] text-white'
            : 'bg-white text-gray-900 border border-gray-200'
        }`}>
          {language === 'ar' ? 'من أنا' : 'ABOUT ME'}
        </span>
        <span className={`h-36 w-[2px] transition-colors duration-300 ${
          theme === 'dark' ? 'bg-[#1a1443]' : 'bg-gray-200'
        }`}></span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        {/* Text Content */}
        <div className="order-2 lg:order-1">
          <div className="mb-8">
            <h2 className="font-bold mb-3 text-[#16f2b3] text-3xl lg:text-4xl">
              {language === 'ar' ? 'من أنا؟' : 'Who I am?'}
            </h2>
            <div className="h-1.5 w-24 bg-gradient-to-r from-[#16f2b3] to-violet-500 rounded-full"></div>
          </div>

          <div className={`text-lg lg:text-xl leading-relaxed lg:leading-[2.2] transition-colors duration-300 ${
            theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <p className="font-medium tracking-wide">
              {description}
            </p>
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center items-start order-1 lg:order-2">
          <div className="relative group">
            {/* Simple gradient border */}
            <div className={`absolute -inset-1 rounded-2xl transition-opacity duration-300 ${
              theme === 'dark'
                ? 'bg-gradient-to-r from-pink-600 via-violet-600 to-[#16f2b3] opacity-30 group-hover:opacity-60'
                : 'bg-gradient-to-r from-pink-400 via-violet-400 to-emerald-400 opacity-20 group-hover:opacity-40'
            }`}></div>
            
            {/* Image Container */}
            <div className="relative">
              <Image
                src={personalData.profile || '/profile.png'}
                width={320}
                height={320}
                alt={personalData.name || 'Profile'}
                className={`rounded-2xl transition-all duration-500 group-hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'grayscale group-hover:grayscale-0'
                    : ''
                }`}
                style={{ width: 'auto', height: 'auto' }}
              />
              
              {/* Decorative corners */}
              <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-2xl transition-colors duration-300 ${
                theme === 'dark'
                  ? 'border-[#16f2b3]'
                  : 'border-violet-500'
              }`}></div>
              <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-2xl transition-colors duration-300 ${
                theme === 'dark'
                  ? 'border-[#16f2b3]'
                  : 'border-violet-500'
              }`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
