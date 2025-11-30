'use client';

import { useSettings } from '@/app/context/SettingsContext';
import Image from "next/image";

import lottieFile from '../../../assets/lottie/study.json';
import AnimationLottie from "../../helper/animation-lottie";
import IconRenderer from "../../helper/IconRenderer";
import GlowCard from "../../helper/glow-card";

export default function EducationContent({ educations }) {
  const { t, language } = useSettings();

  return (
    <div id="education" className="relative z-50 border-t my-12 lg:my-24 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
        loading="lazy"
      />
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent  w-full" />
        </div>
      </div>

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
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
              <AnimationLottie animationPath={lottieFile} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                educations.map((edu, index) => {
                  const title = language === 'ar' && edu.title_ar ? edu.title_ar : edu.title;
                  const institution = language === 'ar' && edu.institution_ar ? edu.institution_ar : edu.institution;

                  return (
                    <GlowCard key={index} identifier={`education-${index}`}>
                      <div className="p-3 relative">
                        <Image
                          src="/blur-23.svg"
                          alt="Hero"
                          width={1080}
                          height={200}
                          className="absolute bottom-0 opacity-80"
                          loading="lazy"
                        />

                        <div className="relative p-4 flex flex-col sm:flex-row items-center sm:items-start gap-5">
                          {/* Icon */}
                          <div className="shrink-0">
                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-600/20 to-pink-600/20 border border-violet-500/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                              <IconRenderer iconName={edu.icon} className="text-[#16f2b3]" size={26} defaultIcon="education" />
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 text-center sm:text-start w-full">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                              <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#16f2b3] transition-colors duration-300">
                                {title}
                              </h3>
                              <div className="inline-block px-3 py-1 rounded-full bg-[#16f2b3]/10 border border-[#16f2b3]/20 text-[#16f2b3] text-xs font-semibold tracking-wide whitespace-nowrap" dir="ltr">
                                {edu.duration}
                              </div>
                            </div>

                            <p className="text-sm sm:text-base font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                              {institution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </GlowCard>
                  );
                })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

