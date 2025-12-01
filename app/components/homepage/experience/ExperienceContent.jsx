'use client';

import { useSettings } from '@/app/context/SettingsContext';
import Image from "next/image";
import IconRenderer from "../../helper/IconRenderer";

export default function ExperienceContent({ experiences }) {
  const { t, language, theme } = useSettings();

  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10 opacity-50"
        loading="lazy"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
          <span className="w-fit p-2 px-5 text-xl rounded-md transition-all duration-300" style={{
            backgroundColor: 'var(--background-secondary)',
            color: 'var(--text-primary)'
          }}>
            {t('nav.experience')}
          </span>
          <span className="w-24 h-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-3/4 h-3/4">
              <Image
                src="/EXPERIENCE.webp"
                alt="Experience"
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
              {experiences.map((exp, index) => {
                const title = language === 'ar' && exp.title_ar ? exp.title_ar : exp.title;
                const company = language === 'ar' && exp.company_ar ? exp.company_ar : exp.company;

                return (
                  <article
                    key={index}
                    className={`group relative rounded-xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                      theme === 'dark'
                        ? 'bg-[#1a1443]/50 border-[#1b2c68a0] hover:border-violet-500/50 hover:shadow-violet-500/20'
                        : 'bg-white border-gray-200 hover:border-violet-400 hover:shadow-violet-200/50'
                    }`}
                  >
                    <div className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                      {/* Icon */}
                      <div className="shrink-0">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                          theme === 'dark'
                            ? 'bg-gradient-to-br from-violet-600/20 to-pink-600/20 border border-violet-500/30'
                            : 'bg-gradient-to-br from-violet-100 to-pink-100 border border-violet-300 shadow-md'
                        }`}>
                          <IconRenderer iconName={exp.icon} className="text-[#16f2b3]" size={26} defaultIcon="work" />
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
                              : 'bg-emerald-50 border border-emerald-200 text-emerald-700'
                          }`} dir="ltr">
                            {exp.duration}
                          </div>
                        </div>

                        <p className={`text-sm sm:text-base font-medium transition-colors duration-300 ${
                          theme === 'dark' 
                            ? 'text-gray-400 group-hover:text-white' 
                            : 'text-gray-600 group-hover:text-gray-900'
                        }`}>
                          {company}
                        </p>
                      </div>
                    </div>

                    {/* Simple gradient border effect on hover - CSS only */}
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-violet-600/5 via-pink-600/5 to-violet-600/5'
                        : 'bg-gradient-to-r from-violet-100/30 via-pink-100/30 to-violet-100/30'
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
