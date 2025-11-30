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
  const { t, language } = useSettings();

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
        className="absolute -top-[98px] -z-10"
        priority
      />

      <div className="grid grid-cols-1 items-start lg:grid-cols-2 lg:gap-12 gap-y-8">
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center p-2 pb-20 md:pb-10 lg:pt-10">
          <h1 className="text-3xl font-bold leading-10 md:font-extrabold lg:text-[2.6rem] lg:leading-[3.5rem] transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
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
                className="transition-all text-pink-500 hover:scale-125 duration-300"
              >
                <BsGithub size={30} />
              </Link>
            )}
            {personalData.linkedIn && (
              <Link
                href={personalData.linkedIn}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-125 duration-300"
              >
                <BsLinkedin size={30} />
              </Link>
            )}
            {personalData.facebook && (
              <Link
                href={personalData.facebook}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-125 duration-300"
              >
                <FaFacebook size={30} />
              </Link>
            )}
            {personalData.leetcode && (
              <Link
                href={personalData.leetcode}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-125 duration-300"
              >
                <SiLeetcode size={30} />
              </Link>
            )}
            {personalData.twitter && (
              <Link
                href={personalData.twitter}
                target='_blank'
                className="transition-all text-pink-500 hover:scale-125 duration-300"
              >
                <FaTwitterSquare size={30} />
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link href="#contact" className="bg-gradient-to-r to-pink-500 from-violet-600 p-[1px] rounded-full transition-all duration-300 hover:from-pink-500 hover:to-violet-600">
              <button className="px-3 text-xs md:px-8 py-3 md:py-4 rounded-full border-none text-center md:text-sm font-medium uppercase tracking-wider no-underline transition-all duration-200 ease-out md:font-semibold flex items-center gap-1 hover:gap-3" style={{ 
                backgroundColor: 'var(--background-primary)',
                color: 'var(--text-primary)'
              }}>
                <span>{t('hero.contactMe')}</span>
                <RiContactsFill size={16} />
              </button>
            </Link>

            {personalData.resume && (
              <Link className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold" role="button" target="_blank" href={personalData.resume}
              >
                <span>{language === 'ar' ? 'تحميل السيرة الذاتية' : 'Get Resume'}</span>
                <MdDownload size={16} />
              </Link>
            )}
          </div>

        </div>
        <div className="order-1 lg:order-2 relative rounded-lg border transition-all duration-500 hover:scale-[1.02] code-box-3d" style={{ 
          background: 'linear-gradient(145deg, var(--background-primary), var(--background-tertiary))',
          borderColor: 'var(--border-color)',
          boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.5),
            0 10px 30px rgba(22, 242, 179, 0.1),
            0 5px 15px rgba(168, 85, 247, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2)
          `,
          transform: 'perspective(1000px) rotateX(2deg) rotateY(-2deg)',
          transformStyle: 'preserve-3d'
        }}>
          <div className="flex flex-row" style={{
            filter: 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.3))'
          }}>
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500 to-violet-600"></div>
            <div className="h-[1px] w-full bg-gradient-to-r from-violet-600 to-transparent"></div>
          </div>
          <div className="px-4 lg:px-8 py-5" style={{
            transform: 'translateZ(10px)'
          }}>
            <div className="flex flex-row space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-400 window-button" style={{
                boxShadow: '0 2px 8px rgba(248, 113, 113, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}></div>
              <div className="h-3 w-3 rounded-full bg-orange-400 window-button" style={{
                boxShadow: '0 2px 8px rgba(251, 146, 60, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}></div>
              <div className="h-3 w-3 rounded-full bg-green-200 window-button" style={{
                boxShadow: '0 2px 8px rgba(187, 247, 208, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
              }}></div>
            </div>
          </div>
          <div className="overflow-hidden border-t-[2px] px-4 lg:px-8 py-4 lg:py-8 transition-colors duration-300" style={{ 
            borderColor: 'var(--border-color)',
            transform: 'translateZ(20px)',
            background: 'linear-gradient(180deg, rgba(22, 242, 179, 0.02) 0%, transparent 100%)'
          }}>
            <code className="font-mono text-xs md:text-sm lg:text-base" style={{
              textShadow: '0 0 10px rgba(22, 242, 179, 0.15)'
            }}>
              <div className="blink">
                <span className="mr-2 text-pink-500">const</span>
                <span className="mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>coder</span>
                <span className="mr-2 text-pink-500">=</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{'{'}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>name:</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{`'`}</span>
                <span className="text-amber-300">{personalData.name}</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{`',`}</span>
              </div>
              <div className="ml-4 lg:ml-8 mr-2">
                <span className="transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>skills:</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{`['`}</span>
                {displaySkills.map((skill, index) => {
                  const skillName = typeof skill === 'string' ? skill : (skill?.name || '');
                  return (
                    <span key={index}>
                      <span className="text-amber-300">{skillName}</span>
                      {index < displaySkills.length - 1 && (
                        <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{"', '"}</span>
                      )}
                    </span>
                  );
                })}
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{"'],"}</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>hardWorker:</span>
                <span className="text-orange-400">true</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>quickLearner:</span>
                <span className="text-orange-400">true</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>problemSolver:</span>
                <span className="text-orange-400">true</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>,</span>
              </div>
              <div>
                <span className="ml-4 lg:ml-8 mr-2 text-green-400">hireable:</span>
                <span className="text-orange-400">function</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{'() {'}</span>
              </div>
              <div>
                <span className="ml-8 lg:ml-16 mr-2 text-orange-400">return</span>
                <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{`(`}</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>hardWorker</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>problemSolver</span>
                <span className="text-amber-300">&amp;&amp;</span>
              </div>
              <div>
                <span className="ml-12 lg:ml-24 text-cyan-400">this.</span>
                <span className="mr-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>skills.length</span>
                <span className="mr-2 text-amber-300">&gt;=</span>
                <span className="text-orange-400">5</span>
              </div>
              <div><span className="ml-8 lg:ml-16 mr-2 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{`);`}</span></div>
              <div><span className="ml-4 lg:ml-8 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{`};`}</span></div>
              <div><span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{`};`}</span></div>
            </code>
          </div>
        </div>
      </div>
    </section>
  );
}

