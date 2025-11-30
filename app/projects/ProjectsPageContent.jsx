'use client';

import { useSettings } from '@/app/context/SettingsContext';
import ProjectCard from '../components/homepage/projects/project-card';
import PremiumProjectCard from '../components/homepage/projects/premium-project-card';
import Link from 'next/link';
import { FaHome, FaRocket } from 'react-icons/fa';

export default function ProjectsPageContent({ projects }) {
  const { language } = useSettings();

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--background-primary)' }}>
      {/* Background Effects */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-violet-600 rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-pink-600 rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Professional Back to Home Button */}
          <div className="max-w-6xl mx-auto mb-12">
            <Link href="/">
              <button className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-2">
                <FaHome className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </Link>
          </div>

          {/* Hero Section - Compact */}
          <div className="max-w-5xl mx-auto mb-12">
            <div className="text-center">
              {/* Icon - Smaller */}
              <div className="flex justify-center mb-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-violet-600 via-purple-600 to-pink-600 p-5 rounded-full transform group-hover:scale-110 transition-transform duration-500">
                    <FaRocket className="text-white text-3xl" />
                  </div>
                </div>
              </div>

              {/* Title - Smaller */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-[#16f2b3] via-violet-400 to-pink-400 bg-clip-text text-transparent">
                    {language === 'ar' ? 'جميع المشاريع' : 'All Projects'}
                  </span>
                </h1>
                <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 hero-description" style={{ color: 'var(--text-muted)' }}>
                  {language === 'ar' 
                    ? 'استكشف مجموعة أعمالي الكاملة من المشاريع، والتي تعرض الخبرة عبر مختلف التقنيات والحلول المبتكرة.'
                    : 'Explore my complete portfolio of projects, showcasing expertise across various technologies and innovative solutions.'}
                </p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="rounded-2xl p-12 max-w-md mx-auto border transition-all duration-300" style={{ 
                background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
                borderColor: 'var(--border-color)'
              }}>
                <div className="w-20 h-20 bg-gradient-to-r from-violet-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaRocket className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ar' ? 'لا توجد مشاريع بعد' : 'No Projects Yet'}
                </h3>
                <p className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                  {language === 'ar' ? 'المشاريع قادمة قريباً. ابق على اتصال!' : 'Projects coming soon. Stay tuned!'}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="animate-fadeIn">
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
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 via-pink-600 to-[#16f2b3] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative rounded-3xl p-10 md:p-16 text-center border-2 transition-all duration-300" style={{ 
                background: 'linear-gradient(135deg, var(--background-secondary) 0%, var(--background-primary) 100%)',
                borderColor: 'var(--border-color)'
              }}>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-600/30 text-[#16f2b3]">
                    {language === 'ar' ? '💡 لنبدأ الآن' : '💡 Let\'s Start'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 transition-colors duration-300 text-center hero-description" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ar' ? 'هل لديك مشروع في ذهنك؟' : 'Have a Project in Mind?'}
                </h2>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 text-center hero-description" style={{ color: 'var(--text-muted)' }}>
                  {language === 'ar' 
                    ? 'دعنا نتعاون لتحويل رؤيتك إلى واقع. أنا هنا للمساعدة في بناء حلول مبتكرة.'
                    : "Let's collaborate to turn your vision into reality. I'm here to help build innovative solutions."}
                </p>
                <Link href="/#contact">
                  <button className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-violet-500/50 text-lg">
                    <span className="relative z-10">{language === 'ar' ? 'تواصل معي الآن' : 'Start a Project Now'}</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

