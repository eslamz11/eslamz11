'use client';

import { useSettings } from '@/app/context/SettingsContext';
import ProjectCard from '../components/homepage/projects/project-card';
import PremiumProjectCard from '../components/homepage/projects/premium-project-card';
import Link from 'next/link';
import { FaHome, FaRocket } from 'react-icons/fa';

export default function ProjectsPageContent({ projects }) {
  const { language, theme } = useSettings();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#0d1224]' : 'bg-gray-50'
    }`}>
      {/* Simple Background - No blur */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-violet-600 rounded-full opacity-5 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full opacity-5 pointer-events-none"></div>
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back to Home Button */}
          <div className="max-w-6xl mx-auto mb-12">
            <Link href="/">
              <button className="group bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2">
                <FaHome className="text-lg" />
                <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
              </button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="text-center">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-violet-600 to-pink-600 p-5 rounded-2xl shadow-lg hover:scale-110 transition-transform duration-300">
                  <FaRocket className="text-white text-3xl" />
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-[#16f2b3] via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  {language === 'ar' ? 'جميع المشاريع' : 'All Projects'}
                </span>
              </h1>
              <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {language === 'ar' 
                  ? 'استكشف مجموعة أعمالي الكاملة من المشاريع، والتي تعرض الخبرة عبر مختلف التقنيات والحلول المبتكرة.'
                  : 'Explore my complete portfolio of projects, showcasing expertise across various technologies and innovative solutions.'}
              </p>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className={`rounded-2xl p-12 max-w-md mx-auto border shadow-lg transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#1a1443] to-[#0a0d37] border-[#1b2c68a0]'
                  : 'bg-white border-gray-200'
              }`}>
                <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaRocket className="text-3xl text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {language === 'ar' ? 'لا توجد مشاريع بعد' : 'No Projects Yet'}
                </h3>
                <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {language === 'ar' ? 'المشاريع قادمة قريباً. ابق على اتصال!' : 'Projects coming soon. Stay tuned!'}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {projects.map((project) => (
                  <div key={project.id}>
                    {project.type === 'premium' ? (
                      <PremiumProjectCard project={project} />
                    ) : (
                      <ProjectCard project={project} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="max-w-5xl mx-auto mt-20">
            <div className={`rounded-2xl p-10 md:p-16 text-center border shadow-xl transition-all duration-300 hover:shadow-2xl ${
              theme === 'dark'
                ? 'bg-gradient-to-br from-[#1a1443] to-[#0a0d37] border-[#1b2c68a0]'
                : 'bg-gradient-to-br from-white to-violet-50 border-violet-200'
            }`}>
              <div className="mb-6">
                <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-600/30 text-[#16f2b3]'
                    : 'bg-gradient-to-r from-violet-100 to-pink-100 border border-violet-300 text-violet-700'
                }`}>
                  {language === 'ar' ? '💡 لنبدأ الآن' : '💡 Let\'s Start'}
                </span>
              </div>
              <h2 className={`text-3xl md:text-5xl font-extrabold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {language === 'ar' ? 'هل لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
              </h2>
              <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {language === 'ar' 
                  ? 'دعنا نتعاون لتحويل رؤيتك إلى واقع. أنا هنا للمساعدة في بناء حلول مبتكرة.'
                  : "Let's collaborate to turn your vision into reality. I'm here to help build innovative solutions."}
              </p>
              <Link href="/#contact">
                <button className="bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold px-10 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl text-lg">
                  <span>{language === 'ar' ? 'تواصل معي الآن' : 'Start a Project Now'}</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
