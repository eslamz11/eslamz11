'use client';

import Link from 'next/link';
import { BiLogoLinkedin } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { FaFacebook, FaStackOverflow } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoMdCall } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";
import ContactForm from './contact-form';
import { useSettings } from '@/app/context/SettingsContext';

export default function ContactSectionContent({ personalData }) {
  const { language, theme } = useSettings();

  return (
    <div id="contact" className="my-12 lg:my-16 relative mt-24 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
      <div className={`hidden lg:flex flex-col items-center absolute top-24 ${language === 'ar' ? '-left-8' : '-right-8'}`}>
        <span className={`w-fit rotate-90 p-2 px-5 text-xl rounded-md transition-all duration-300 ${
          theme === 'dark'
            ? 'bg-[#1a1443] text-white'
            : 'bg-white text-gray-900 border border-gray-200'
        }`}>
          {language === 'ar' ? 'تواصل معي' : 'CONTACT'}
        </span>
        <span className={`h-36 w-[2px] transition-colors duration-300 ${
          theme === 'dark' ? 'bg-[#1a1443]' : 'bg-gray-200'
        }`}></span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        <ContactForm />
        
        <div className="lg:w-3/4">
          <div className="flex flex-col gap-5 lg:gap-9">
            <a
              href={`mailto:${personalData.email}`}
              className="text-sm md:text-xl flex items-center gap-3 group hover:translate-x-1 transition-transform duration-300"
            >
              <MdAlternateEmail
                className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 shadow-md ${
                  theme === 'dark' 
                    ? 'bg-[#8b98a5] text-gray-800 group-hover:bg-[#16f2b3]' 
                    : 'bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 group-hover:bg-[#16f2b3] group-hover:text-gray-800 border border-violet-200'
                }`}
                size={36}
              />
              <span className="group-hover:text-[#16f2b3] transition-colors">{personalData.email}</span>
            </a>
            
            <a
              href={`tel:${personalData.phone}`}
              className="text-sm md:text-xl flex items-center gap-3 group hover:translate-x-1 transition-transform duration-300"
            >
              <IoMdCall
                className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 shadow-md ${
                  theme === 'dark' 
                    ? 'bg-[#8b98a5] text-gray-800 group-hover:bg-[#16f2b3]' 
                    : 'bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-700 group-hover:bg-[#16f2b3] group-hover:text-gray-800 border border-emerald-200'
                }`}
                size={36}
              />
              <span className="group-hover:text-[#16f2b3] transition-colors">{personalData.phone}</span>
            </a>
            
            <div className="text-sm md:text-xl flex items-center gap-3 group">
              <CiLocationOn
                className={`p-2 rounded-full transition-all duration-300 group-hover:scale-110 shadow-md ${
                  theme === 'dark' 
                    ? 'bg-[#8b98a5] text-gray-800 group-hover:bg-[#16f2b3]' 
                    : 'bg-gradient-to-br from-pink-100 to-rose-100 text-pink-700 group-hover:bg-[#16f2b3] group-hover:text-gray-800 border border-pink-200'
                }`}
                size={36}
              />
              <span className="group-hover:text-[#16f2b3] transition-colors">{personalData.address}</span>
            </div>
          </div>
          
          <div className="mt-8 lg:mt-16 flex items-center gap-5 lg:gap-10">
            {personalData.github && (
              <Link target="_blank" href={personalData.github}>
                <IoLogoGithub
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-[#8b98a5] text-gray-800 hover:bg-[#16f2b3]'
                      : 'bg-gradient-to-br from-gray-100 to-slate-100 text-gray-800 hover:bg-[#16f2b3] hover:text-gray-900 border border-gray-300'
                  }`}
                  size={48}
                />
              </Link>
            )}
            {personalData.linkedIn && (
              <Link target="_blank" href={personalData.linkedIn}>
                <BiLogoLinkedin
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-[#8b98a5] text-gray-800 hover:bg-[#16f2b3]'
                      : 'bg-gradient-to-br from-blue-100 to-sky-100 text-blue-700 hover:bg-[#16f2b3] hover:text-gray-800 border border-blue-300'
                  }`}
                  size={48}
                />
              </Link>
            )}
            {personalData.twitter && (
              <Link target="_blank" href={personalData.twitter}>
                <FaXTwitter
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-[#8b98a5] text-gray-800 hover:bg-[#16f2b3]'
                      : 'bg-gradient-to-br from-slate-100 to-gray-100 text-slate-800 hover:bg-[#16f2b3] hover:text-gray-900 border border-slate-300'
                  }`}
                  size={48}
                />
              </Link>
            )}
            {personalData.stackOverflow && (
              <Link target="_blank" href={personalData.stackOverflow}>
                <FaStackOverflow
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-[#8b98a5] text-gray-800 hover:bg-[#16f2b3]'
                      : 'bg-gradient-to-br from-orange-100 to-amber-100 text-orange-700 hover:bg-[#16f2b3] hover:text-gray-800 border border-orange-300'
                  }`}
                  size={48}
                />
              </Link>
            )}
            {personalData.facebook && (
              <Link target="_blank" href={personalData.facebook}>
                <FaFacebook
                  className={`p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg ${
                    theme === 'dark'
                      ? 'bg-[#8b98a5] text-gray-800 hover:bg-[#16f2b3]'
                      : 'bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 hover:bg-[#16f2b3] hover:text-gray-800 border border-blue-300'
                  }`}
                  size={48}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
