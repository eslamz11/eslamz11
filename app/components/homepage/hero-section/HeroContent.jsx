'use client';

import Image from "next/image";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import { useSettings } from "@/app/context/SettingsContext";

export default function HeroContent({ personalData, displaySkills }) {
  const { t, language, theme } = useSettings();

  // Get data based on current language
  const name = language === 'ar' && personalData.name_ar ? personalData.name_ar : personalData.name;
  const designation = language === 'ar' && personalData.designation_ar ? personalData.designation_ar : personalData.designation;

  return (
    <section className="relative flex flex-col items-center justify-between pt-24 pb-4 lg:pt-32 lg:pb-12">
      <Image
        src="/hero.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute -top-[98px] -z-10 opacity-50"
        priority
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className={`text-3xl font-bold leading-10 md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem] transition-colors duration-300 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {language === 'ar' ? 'مرحباً،' : 'Hello,'} <br />
            {language === 'ar' ? 'أنا ' : "I'm "}{' '}
            <span className="text-pink-500">{name}</span>
            {language === 'ar' ? '، أنا محترف في ' : ", I'm a Professional "}
            <span className="text-[#16f2b3]">{designation}</span>
            .
          </h1>

          <div className="my-12 flex items-center gap-5">
            {personalData.github && (
              <Link
                href={personalData.github}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-110 duration-200"
              >
                <BsGithub size={30} />
              </Link>
            )}
            {personalData.linkedIn && (
              <Link
                href={personalData.linkedIn}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-110 duration-200"
              >
                <BsLinkedin size={30} />
              </Link>
            )}
            {personalData.facebook && (
              <Link
                href={personalData.facebook}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-110 duration-200"
              >
                <FaFacebook size={30} />
              </Link>
            )}
            {personalData.leetcode && (
              <Link
                href={personalData.leetcode}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-110 duration-200"
              >
                <SiLeetcode size={30} />
              </Link>
            )}
            {personalData.twitter && (
              <Link
                href={personalData.twitter}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-110 duration-200"
              >
                <FaTwitterSquare size={30} />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600 hover:shadow-lg">
              <button className={`px-3 text-xs md:px-8 py-3 md:py-4 rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider transition-all duration-200 flex items-center gap-2 hover:gap-3 ${
                theme === 'dark' 
                  ? 'bg-[#0d1224] text-white' 
                  : 'bg-white text-gray-900'
              }`}>
                <span>{t('hero.contactMe')}</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            {personalData.resume && (
              <Link 
                className="flex items-center gap-2 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 hover:from-pink-600 hover:to-violet-700 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white transition-all duration-200 hover:shadow-lg" 
                role="button" 
                target="_blank" 
                href={personalData.resume}
              >
                <span>{language === 'ar' ? 'تحميل السيرة الذاتية' : 'Get Resume'}</span>
                <MdDownload size={16} />
              </Link>
            )}
          </div>

        </div>
        
        <div className={`order-1 lg:order-2 relative rounded-xl border transition-all duration-300 hover:scale-[1.01] shadow-lg hover:shadow-xl ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#1a1443] to-[#0a0d37] border-[#1b2c68a0]'
            : 'bg-gradient-to-br from-white to-gray-50 border-gray-300'
        }`}>
          <div className="flex flex-row">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[2px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          
          <div className="px-4 lg:px-8 py-5">
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400 transition-transform hover:scale-110"></div>
              <div className="h-3 w-3 rounded-full bg-orange-400 transition-transform hover:scale-110"></div>
              <div className="h-3 w-3 rounded-full bg-green-400 transition-transform hover:scale-110"></div>
            </div>
          </div>
          
          <div className={`overflow-hidden border-t-[2px] px-4 lg:px-8 py-4 lg:py-8 transition-colors duration-300 ${
            theme === 'dark' ? 'border-[#1b2c68a0]' : 'border-gray-200'
          }`}>
            <code className={`font-mono text-xs md:text-sm lg:text-base ${
              theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
            }`}>
              <div>
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2">{theme === 'dark' ? 'text-white' : 'text-gray-900'}</span>
                <span className="mr-2">coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2">name:</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{`'`}</span>
                <span className="text-amber-400">{personalData.name}</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span>skills:</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{`['`}</span>
                {displaySkills.map((skill, index) => {
                  const skillName = typeof skill === 'string' ? skill : (skill?.name || '');
                  return (
                    <span key={index}>
                      <span className="text-amber-400">{skillName}</span>
                      {index < displaySkills.length - 1 && (
                        <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{"', '"}</span>
                      )}
                    </span>
                  );
                })}
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{"'],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2">hardWorker:</span>
                <span className="text-orange-400">true</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2">quickLearner:</span>
                <span className="text-orange-400">true</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2">problemSolver:</span>
                <span className="text-orange-400">true</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                <span className="text-orange-400">function</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{'() {'}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2">hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2">problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2">skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div><span className="ml-8 lg:ml-16 mr-2">{`);`}</span></div>
              <div><span className="ml-4 lg:ml-8">{`};`}</span></div>
              <div><span>{`};`}</span></div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}
