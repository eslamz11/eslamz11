'use client';

import Link from 'next/link';
import ScrollToTopButton from './helper/scroll-to-top-button';
import { useSettings } from '../context/SettingsContext';
import { 
  BsGithub, 
  BsLinkedin, 
  BsTwitter,
  BsFacebook,
  BsStackOverflow
} from 'react-icons/bs';
import { 
  FaEnvelope,
  FaArrowUp
} from 'react-icons/fa';
import { RiContactsFill } from 'react-icons/ri';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function FooterContent({ personalData }) {
  const { t, language } = useSettings();
  const currentYear = new Date().getFullYear();

  // Get data based on language
  const name = language === 'ar' && personalData?.name_ar ? personalData.name_ar : personalData?.name;
  const address = language === 'ar' && personalData?.address_ar ? personalData.address_ar : personalData?.address;

  const socialLinks = [
    { icon: BsGithub, href: personalData?.github, label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: BsLinkedin, href: personalData?.linkedIn, label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: BsTwitter, href: personalData?.twitter, label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: BsFacebook, href: personalData?.facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: BsStackOverflow, href: personalData?.stackOverflow, label: 'Stack Overflow', color: 'hover:text-orange-400' },
  ].filter(link => link.href);

  return (
    <>
      <ScrollToTopButton />
      
      <footer className="relative overflow-hidden border-t transition-colors duration-300" style={{ 
        background: 'var(--background-primary)',
        borderColor: 'var(--border-color)'
      }}>
        {/* Simple Background Gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600 rounded-full"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full"></div>
        </div>

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent opacity-50"></div>

        <div className="relative z-10 mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-12 lg:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-[#16f2b3] to-violet-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  {name || 'Portfolio'}
                </h2>
              </Link>
              
              {/* Social Links */}
              <div className="flex items-center gap-3 flex-wrap">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:shadow-lg group ${social.color}`}
                      style={{ 
                        backgroundColor: 'var(--background-secondary)',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-muted)'
                      }}
                      aria-label={social.label}
                    >
                      <Icon className="text-lg" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                <RiContactsFill className="text-[#16f2b3]" />
                {language === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
              </h3>
              <ul className="space-y-3">
                {personalData?.email && (
                  <li className="flex items-start gap-2.5 group">
                    <MdEmail className="text-[#16f2b3] text-lg mt-0.5 flex-shrink-0" />
                    <a
                      href={`mailto:${personalData.email}`}
                      className="hover:text-[#16f2b3] transition-colors text-sm break-all"
                      style={{ color: 'var(--text-muted)' }}
                      dir="ltr"
                    >
                      {personalData.email}
                    </a>
                  </li>
                )}
                {personalData?.phone && (
                  <li className="flex items-start gap-2.5 group">
                    <MdPhone className="text-[#16f2b3] text-lg mt-0.5 flex-shrink-0" />
                    <a
                      href={`tel:${personalData.phone}`}
                      className="hover:text-[#16f2b3] transition-colors text-sm"
                      style={{ color: 'var(--text-muted)' }}
                      dir="ltr"
                    >
                      {personalData.phone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="flex items-start gap-2.5 group">
                    <MdLocationOn className="text-[#16f2b3] text-lg mt-0.5 flex-shrink-0" />
                    <span className="transition-colors duration-300 text-sm" style={{ color: 'var(--text-muted)' }}>
                      {address}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* CTA Section */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                <FaEnvelope className="text-[#16f2b3]" />
                {language === 'ar' ? 'لنتواصل' : "Let's Connect"}
              </h3>
              <p className="text-sm mb-4 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                {language === 'ar' ? 'هل أنت مستعد لتحويل أفكارك إلى واقع؟ لنبدأ محادثة!' : "Ready to bring your ideas to life? Let's start a conversation!"}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm"
              >
                <span>{t('hero.contactMe')}</span>
                <FaArrowUp className="rotate-45 text-sm" />
              </Link>
            </div>
          </div>

          {/* Copyright Section - Integrated with grid */}
          <div className="mt-8 pt-8 border-t transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
            <div className="text-center">
              <p className="text-sm lg:text-base transition-colors duration-300 flex flex-wrap items-center justify-center gap-2" style={{ color: 'var(--text-muted)' }}>
               
                <span>{language === 'ar' ? 'جميع الحقوق محفوظة' : 'All rights reserved'}</span>
                <span>-</span>
                <span>{currentYear}</span> <span>©</span>
              </p>
            </div>
          </div>
        </div>

        {/* Simple Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#16f2b3] to-transparent opacity-30"></div>
      </footer>
    </>
  );
}
