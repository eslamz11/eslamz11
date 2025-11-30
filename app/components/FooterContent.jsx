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
  FaHeart, 
  FaCode,
  FaEnvelope,
  FaArrowUp
} from 'react-icons/fa';
import { RiContactsFill } from 'react-icons/ri';
import { SiLeetcode } from 'react-icons/si';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

export default function FooterContent({ personalData }) {
  const { t, language } = useSettings();
  const currentYear = new Date().getFullYear();

  // Get data based on language
  const name = language === 'ar' && personalData?.name_ar ? personalData.name_ar : personalData?.name;
  const description = language === 'ar' && personalData?.description_ar ? personalData.description_ar : personalData?.description;
  const address = language === 'ar' && personalData?.address_ar ? personalData.address_ar : personalData?.address;

  const socialLinks = [
    { icon: BsGithub, href: personalData?.github, label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: BsLinkedin, href: personalData?.linkedIn, label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: BsTwitter, href: personalData?.twitter, label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: BsFacebook, href: personalData?.facebook, label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: BsStackOverflow, href: personalData?.stackOverflow, label: 'Stack Overflow', color: 'hover:text-orange-400' },
    { icon: SiLeetcode, href: personalData?.leetcode, label: 'LeetCode', color: 'hover:text-yellow-400' },
  ].filter(link => link.href);

  const quickLinks = [
    { name: t('about.title'), href: '/#about' },
    { name: t('nav.experience'), href: '/#experience' },
    { name: language === 'ar' ? 'المهارات' : 'Skills', href: '/#skills' },
    { name: t('nav.projects'), href: '/projects' },
    { name: t('nav.blogs'), href: '/blog' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <>
      <ScrollToTopButton />
      
      <footer className="relative overflow-hidden border-t transition-all duration-300" style={{ 
        background: 'linear-gradient(to bottom, var(--background-primary), var(--background-tertiary), var(--background-primary))',
        borderColor: 'var(--border-color)'
      }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600 rounded-full blur-[150px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full blur-[150px] opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent"></div>

        <div className="relative z-10 mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-12 lg:py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#16f2b3] via-violet-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300">
                  {name || 'Portfolio'}
                </h2>
              </Link>
              <p className="text-sm leading-relaxed mb-6 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                {description || (language === 'ar' ? 'بناء تجارب رقمية مذهلة بشغف وإبداع.' : 'Building amazing digital experiences with passion and creativity.')}
              </p>
              
              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <Link
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-110 hover:border-[#16f2b3] hover:shadow-lg hover:shadow-[#16f2b3]/20 group ${social.color}`}
                      style={{ 
                        background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
                        borderColor: 'var(--border-color)',
                        color: 'var(--text-muted)'
                      }}
                      aria-label={social.label}
                    >
                      <Icon className="text-lg group-hover:scale-110 transition-transform" />
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                <FaCode className="text-[#16f2b3]" />
                {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="hover:text-[#16f2b3] transition-all duration-300 flex items-center gap-2 group"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      <span className="w-0 h-0.5 bg-gradient-to-r from-[#16f2b3] to-violet-500 group-hover:w-4 transition-all duration-300"></span>
                      <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                <RiContactsFill className="text-[#16f2b3]" />
                {language === 'ar' ? 'تواصل معنا' : 'Get In Touch'}
              </h3>
              <ul className="space-y-4">
                {personalData?.email && (
                  <li className="flex items-start gap-3 group">
                    <MdEmail className="text-[#16f2b3] text-xl mt-1 group-hover:scale-110 transition-transform" />
                    <a
                      href={`mailto:${personalData.email}`}
                      className="hover:text-[#16f2b3] transition-colors break-all"
                      style={{ color: 'var(--text-muted)' }}
                      dir="ltr"
                    >
                      {personalData.email}
                    </a>
                  </li>
                )}
                {personalData?.phone && (
                  <li className="flex items-start gap-3 group">
                    <MdPhone className="text-[#16f2b3] text-xl mt-1 group-hover:scale-110 transition-transform" />
                    <a
                      href={`tel:${personalData.phone}`}
                      className="hover:text-[#16f2b3] transition-colors"
                      style={{ color: 'var(--text-muted)' }}
                      dir="ltr"
                    >
                      {personalData.phone}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="flex items-start gap-3 group">
                    <MdLocationOn className="text-[#16f2b3] text-xl mt-1 group-hover:scale-110 transition-transform" />
                    <span className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                      {address}
                    </span>
                  </li>
                )}
              </ul>
            </div>

            {/* Newsletter / CTA */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                <FaEnvelope className="text-[#16f2b3]" />
                {language === 'ar' ? 'لنتواصل' : "Let's Connect"}
              </h3>
              <p className="text-sm mb-6 transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                {language === 'ar' ? 'هل أنت مستعد لتحويل أفكارك إلى واقع؟ لنبدأ محادثة!' : "Ready to bring your ideas to life? Let's start a conversation!"}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl hover:shadow-violet-500/50"
              >
                <span>{t('hero.contactMe')}</span>
                <FaArrowUp className="rotate-45 text-sm" />
              </Link>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                <span>© {currentYear}</span>
                <span className="text-[#16f2b3] font-semibold">{name || 'Portfolio'}</span>
                <span>{language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                <span>{language === 'ar' ? 'صُنع بـ' : 'Made with'}</span>
                <FaHeart className="text-red-500 animate-pulse" />
                <span>{language === 'ar' ? 'بواسطة' : 'by'}</span>
                <span className="text-[#16f2b3] font-semibold">{name || 'Developer'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Gradient Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 via-pink-500 to-transparent animate-pulse"></div>
      </footer>
    </>
  );
}

