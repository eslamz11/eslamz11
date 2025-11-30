'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiMenu,
  HiX,
  HiBriefcase,
  HiAcademicCap,
  HiBookOpen,
  HiMail
} from 'react-icons/hi';
import { FaCode as FaCodeAlt } from 'react-icons/fa';
import { RiContactsFill } from 'react-icons/ri';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import { IoLanguage } from 'react-icons/io5';
import { useSettings } from '../context/SettingsContext';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();
  const { theme, language, toggleTheme, toggleLanguage, t } = useSettings();

  useEffect(() => {
    let rafId = null;
    let lastKnownScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastKnownScrollY = window.scrollY;
      
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          const currentScrollY = lastKnownScrollY;

          // Update scrolled state for styling
          setIsScrolled(currentScrollY > 20);

          // Show navbar only when at top of page
          if (currentScrollY < 10) {
            setIsNavbarVisible(true);
          }
          // Hide navbar when scrolled down
          else {
            setIsNavbarVisible(false);
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    // Close menu when route changes
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    // Prevent body scroll when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: t('nav.experience'), href: '/#experience', icon: HiBriefcase },
    { name: t('nav.education'), href: '/#education', icon: HiAcademicCap },
    { name: t('nav.projects'), href: '/projects', icon: FaCodeAlt },
    { name: t('nav.blogs'), href: '/blog', icon: HiBookOpen },
    { name: t('nav.contact'), href: '/#contact', icon: HiMail },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? theme === 'dark'
            ? 'bg-[#0d1224]/98 backdrop-blur-2xl border-b border-[#1b2c68a0] shadow-2xl shadow-[#16f2b3]/10'
            : 'bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-xl'
          : 'bg-transparent'
          } ${isNavbarVisible ? 'translate-y-0' : '-translate-y-full'
          }`}
        suppressHydrationWarning
      >
        {/* Decorative Top Gradient Line */}
        {isScrolled && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-violet-500 via-pink-500 to-transparent"></div>
        )}

        <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem]">
          <div className="flex items-center justify-between py-4 lg:py-5">
            {/* Left Side - Settings Icons */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${isScrolled
                  ? theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1a1443] to-[#0d1224] border border-[#1b2c68a0]'
                    : 'bg-gradient-to-br from-gray-100 to-white border border-gray-300'
                  : theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1a1443]/50 to-[#0d1224]/50 backdrop-blur-sm border border-[#1b2c68a0]/50'
                    : 'bg-gradient-to-br from-white/50 to-gray-100/50 backdrop-blur-sm border border-gray-300/50'
                  } hover:border-[#16f2b3] hover:shadow-lg hover:shadow-[#16f2b3]/20`}
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                <div className="relative" suppressHydrationWarning>
                  {theme === 'dark' ? (
                    <BsSun className="text-xl text-yellow-400 group-hover:text-yellow-300 transition-all duration-300 group-hover:rotate-180" />
                  ) : (
                    <BsMoonStars className="text-xl text-violet-500 group-hover:text-violet-600 transition-all duration-300 group-hover:rotate-12" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/0 to-pink-600/0 group-hover:from-violet-600/20 group-hover:to-pink-600/20 transition-all duration-300"></div>
              </button>

              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className={`relative group w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${isScrolled
                  ? theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1a1443] to-[#0d1224] border border-[#1b2c68a0]'
                    : 'bg-gradient-to-br from-gray-100 to-white border border-gray-300'
                  : theme === 'dark'
                    ? 'bg-gradient-to-br from-[#1a1443]/50 to-[#0d1224]/50 backdrop-blur-sm border border-[#1b2c68a0]/50'
                    : 'bg-gradient-to-br from-white/50 to-gray-100/50 backdrop-blur-sm border border-gray-300/50'
                  } hover:border-[#16f2b3] hover:shadow-lg hover:shadow-[#16f2b3]/20`}
                aria-label="Toggle language"
                suppressHydrationWarning
              >
                <div className="relative flex items-center gap-1" suppressHydrationWarning>
                  <IoLanguage className="text-xl text-[#16f2b3] group-hover:scale-110 transition-transform duration-300" />
                  <span
                    className={`text-[10px] font-bold transition-colors uppercase ${theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-600 group-hover:text-gray-900'
                      }`}
                    suppressHydrationWarning
                  >
                    {language}
                  </span>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/0 to-pink-600/0 group-hover:from-violet-600/20 group-hover:to-pink-600/20 transition-all duration-300"></div>
              </button>
            </div>

            {/* Desktop Menu */}
            <ul className="hidden lg:flex items-center gap-5">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 group ${active
                        ? 'text-[#16f2b3]'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-700 hover:text-gray-900'
                        }`}
                    >
                      {/* Background Glow for Active */}
                      {active && (
                        <>
                          <span className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-pink-600/20 rounded-xl blur-xl"></span>
                          <span className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-pink-600/10 rounded-xl"></span>
                        </>
                      )}

                      {/* Content */}
                      <span className="relative z-10 flex items-center gap-2">
                        <Icon className={`text-base transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
                        <span className="relative">
                          {link.name}
                          {active && (
                            <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#16f2b3] to-violet-500"></span>
                          )}
                        </span>
                      </span>

                      {/* Hover Effect */}
                      <span className={`absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/0 to-pink-600/0 group-hover:from-violet-600/10 group-hover:to-pink-600/10 transition-all duration-300 ${active ? 'opacity-100' : 'opacity-0'}`}></span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden relative w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ${isScrolled
                ? theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1a1443] to-[#0d1224] border border-[#1b2c68a0]'
                  : 'bg-gradient-to-br from-gray-100 to-white border border-gray-300'
                : theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1a1443]/50 to-[#0d1224]/50 backdrop-blur-sm border border-[#1b2c68a0]/50'
                  : 'bg-gradient-to-br from-white/50 to-gray-100/50 backdrop-blur-sm border border-gray-300/50'
                } ${isMenuOpen ? 'border-[#16f2b3]' : 'hover:border-[#16f2b3]'}`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <>
                  <HiX className="text-2xl text-[#16f2b3] transition-transform duration-300 rotate-90" />
                  <div className="absolute inset-0 bg-[#16f2b3]/10 rounded-xl animate-pulse"></div>
                </>
              ) : (
                <>
                  <HiMenu className={`text-2xl transition-colors ${theme === 'dark' ? 'text-white' : 'text-gray-700'
                    } group-hover:text-[#16f2b3]`} />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600/0 to-pink-600/0 hover:from-violet-600/20 hover:to-pink-600/20 transition-all duration-300"></div>
                </>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={closeMenu}
        ></div>

        {/* Mobile Menu Sidebar */}
        <div className={`absolute top-0 h-full w-80 max-w-[85vw] shadow-2xl transform transition-transform duration-300 ease-out 
          ${language === 'ar' ? 'left-0' : 'right-0'}
          ${theme === 'dark'
            ? 'bg-gradient-to-b from-[#0d1224] via-[#0a0d37] to-[#0d1224] border-[#1b2c68a0]'
            : 'bg-gradient-to-b from-white via-gray-50 to-white border-gray-300'
          } 
          ${language === 'ar' ? 'border-r' : 'border-l'}
          ${isMenuOpen
            ? 'translate-x-0'
            : language === 'ar' ? '-translate-x-full' : 'translate-x-full'
          }`}>
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600 rounded-full blur-[120px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600 rounded-full blur-[120px] opacity-20"></div>
          </div>

          {/* Menu Header */}
          <div className={`relative flex items-center justify-end p-6 border-b ${theme === 'dark' ? 'border-[#1b2c68a0]' : 'border-gray-200'
            }`}>

          </div>

          {/* Menu Items */}
          <nav className="relative p-6 overflow-y-auto h-[calc(100vh-100px)]">
            <ul className="space-y-4">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                const active = isActive(link.href);
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className={`group flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${active
                        ? 'bg-gradient-to-r from-violet-600/30 to-pink-600/30 border-2 border-[#16f2b3]/50 text-[#16f2b3] shadow-lg shadow-[#16f2b3]/20'
                        : theme === 'dark'
                          ? 'text-gray-300 hover:bg-[#1a1443] hover:text-white border-2 border-transparent'
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 border-2 border-transparent'
                        }`}
                    >
                      {/* Icon Container */}
                      <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${active
                        ? 'bg-gradient-to-br from-violet-600 to-pink-600 text-white shadow-xl scale-110'
                        : theme === 'dark'
                          ? 'bg-[#1a1443] text-gray-400 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-pink-600 group-hover:text-white group-hover:scale-110'
                          : 'bg-gray-100 text-gray-600 group-hover:bg-gradient-to-br group-hover:from-violet-600 group-hover:to-pink-600 group-hover:text-white group-hover:scale-110'
                        }`}>
                        <Icon className="text-xl" />
                        {active && (
                          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-pink-600 rounded-xl animate-ping opacity-30"></div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="flex-1">
                        <span className={`font-bold text-base block ${active ? 'text-[#16f2b3]' : ''}`}>
                          {link.name}
                        </span>
                        {active && (
                          <span className="text-xs text-gray-400 mt-1 block">Current page</span>
                        )}
                      </div>

                      {/* Active Indicator */}
                      {active && (
                        <div className="w-2 h-2 bg-[#16f2b3] rounded-full animate-pulse shadow-lg shadow-[#16f2b3]/50"></div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>


          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
