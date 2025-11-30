'use client';

import { useSettings } from '@/app/context/SettingsContext';
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export default function SkillsContent({ skills }) {
  const { language } = useSettings();

  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl  opacity-20"></div>

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
            {language === 'ar' ? 'المهارات' : 'Skills'}
          </span>
          <span className="w-24 h-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
        </div>
      </div>

      <div className="w-full my-12" dir="ltr">
        <Marquee
          gradient={false}
          speed={80}
          pauseOnHover={true}
          pauseOnClick={true}
          delay={0}
          play={true}
          direction={language === 'ar' ? 'right' : 'left'}
        >
          {skills.map((skill, id) => {
            // استخراج البيانات من المهارة
            const skillName = typeof skill === 'string' ? skill : (skill?.name || '');
            const skillNameAr = typeof skill === 'object' && skill?.name_ar ? skill.name_ar : '';
            const displayName = language === 'ar' && skillNameAr ? skillNameAr : skillName;
            const skillImage = typeof skill === 'object' && skill?.image ? skill.image : null;
            
            // استخدام صورة المهارة إذا كانت موجودة، وإلا استخدام skillsImage utility
            const imageSrc = skillImage || (skillsImage(skillName)?.src || null);
            
            return (
              <div className="w-36 h-36 flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer overflow-hidden"
                key={id}>
                {imageSrc ? (
                  // عرض الصورة فقط - تملأ المربع بالكامل
                  <div className="relative w-full h-full rounded-lg border shadow-none shadow-gray-50 group-hover:border-violet-500 transition-all duration-500 overflow-hidden" style={{ 
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--background-secondary)'
                  }}>
                    <Image
                      src={imageSrc}
                      alt={displayName || 'Skill'}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="144px"
                    />
                  </div>
                ) : (
                  // إذا لم توجد صورة، عرض أيقونة بديلة
                  <div className="relative w-full h-full rounded-lg border shadow-none shadow-gray-50 group-hover:border-violet-500 transition-all duration-500 overflow-hidden flex items-center justify-center" style={{ 
                    borderColor: 'var(--border-color)',
                    backgroundColor: 'var(--background-secondary)'
                  }}>
                    <div className="w-20 h-20 bg-gradient-to-r from-violet-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {displayName ? displayName.charAt(0).toUpperCase() : '?'}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* اسم المهارة */}
                {displayName && (
                  <div className="absolute -bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold text-center truncate">
                      {displayName}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}

