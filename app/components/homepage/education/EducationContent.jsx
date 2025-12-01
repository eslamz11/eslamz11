'use client';

import { useSettings } from '@/app/context/SettingsContext';
import Image from "next/image";
import IconRenderer from "../../helper/IconRenderer";

export default function EducationContent({ educations }) {
  const { t, language, theme } = useSettings();

  return (
    <div id="education" className="relative z-50 border-t my-12 lg:my-24 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-50"
        loading="lazy"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
          <span className="w-fit p-2 px-5 text-xl rounded-md transition-all duration-300" style={{
            backgroundColor: 'var(--background-secondary)',
            color: 'var(--text-primary)'
          }}>
            {t('nav.education')}
          </span>
          <span className="w-24 h-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <Image
                src="/EDUCATION.webp"
                alt="Education"
                width={500}
                height={500}
                className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500 ease-in-out"
                loading="lazy"
                priority={false}
              />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {educations.map((edu, index) => {
                const title = language === 'ar' && edu.title_ar ? edu.title_ar : edu.title;
                const institution = language === 'ar' && edu.institution_ar ? edu.institution_ar : edu.institution;

                return (
                  <article
                    key={index}
                    className={`group relative rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                      theme === 'dark'
                        ? 'bg-[#1a1443]/50 border-[#1b2c68a0] hover:border-blue-500/50 hover:shadow-blue-500/20'
                        : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-blue-200/50'
                    }`}
                  >
                    <div className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                      {/* Icon */}
                      <div className="shrink-0">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-violet-600/20 to-pink-600/20 border border-violet-500/30'
                            : 'bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-300 shadow-md'
                        }`}>
                          <IconRenderer iconName={edu.icon} className="text-[#16f2b3]" size={26} defaultIcon="education" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center sm:text-start w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                          <h3 className={`text-lg sm:text-xl font-bold group-hover:text-[#16f2b3] transition-colors duration-300 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {title}
                          </h3>
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap ${
                            theme === 'dark'
                              ? 'bg-[#16f2b3]/10 border border-[#16f2b3]/20 text-[#16f2b3]'
                              : 'bg-blue-50 border border-blue-200 text-blue-700'
                          }`} dir="ltr">
                            {edu.duration}
                          </div>
                        </div>

                        <p className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                          theme === 'dark' 
                            ? 'text-gray-400 group-hover:text-white' 
                            : 'text-gray-600 group-hover:text-gray-900'
                        }`}>
                          {institution}
                        </p>
                      </div>
                    </div>

                    {/* Simple gradient border effect on hover - CSS only */}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-blue-600/5'
                        : 'bg-gradient-to-r from-blue-100/30 via-indigo-100/30 to-blue-100/30'
                    }`}></div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
