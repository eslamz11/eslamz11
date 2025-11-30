'use client';

import { useSettings } from '@/app/context/SettingsContext';
import BlogCard from "../components/homepage/blog/blog-card";
import PremiumBlogCard from "../components/homepage/blog/premium-blog-card";
import Link from 'next/link';
import { FaHome, FaBookOpen } from 'react-icons/fa';

export default function BlogsPageContent({ blogs }) {
  const { language } = useSettings();

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--background-primary)' }}>
      {/* Background Effects */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-pink-600 rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-violet-600 rounded-full filter blur-[150px] opacity-10 pointer-events-none"></div>
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Professional Back to Home Button */}
          <div className="max-w-6xl mx-auto mb-12">
            <Link href="/">
              <button className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-2">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-violet-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse"></div>
                  <div className="relative bg-gradient-to-br from-pink-600 via-rose-600 to-violet-600 p-5 rounded-full transform group-hover:scale-110 transition-transform duration-500">
                    <FaBookOpen className="text-white text-3xl" />
                  </div>
                </div>
              </div>

              {/* Title - Smaller */}
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-[#16f2b3] bg-clip-text text-transparent">
                    {language === 'ar' ? 'جميع المدونات' : 'All Blogs'}
                  </span>
                </h1>
                <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 hero-description" style={{ color: 'var(--text-muted)' }}>
                  {language === 'ar' 
                    ? 'تعمق في أفكاري ودروسي ورؤيتي حول التكنولوجيا والتطوير والابتكار.'
                    : 'Dive into my thoughts, tutorials, and insights about technology, development, and innovation.'}
                </p>
              </div>
            </div>
          </div>

          {/* Blogs Grid */}
          {blogs.length === 0 ? (
            /* Empty State */
            <div className="text-center py-20">
              <div className="rounded-2xl p-12 max-w-md mx-auto border transition-all duration-300" style={{ 
                background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
                borderColor: 'var(--border-color)'
              }}>
                <div className="w-20 h-20 bg-gradient-to-r from-pink-600 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FaBookOpen className="text-3xl text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ar' ? 'لا توجد مدونات بعد' : 'No Blogs Yet'}
                </h3>
                <p className="transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
                  {language === 'ar' ? 'المقالات قادمة قريباً. ابق على اتصال!' : 'Articles coming soon. Stay tuned!'}
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                {blogs.map((blog, index) => (
                  blog?.cover_image && (
                    <div key={index} className="animate-fadeIn">
                      {blog.type === 'premium' ? (
                        <PremiumBlogCard blog={blog} />
                      ) : (
                        <BlogCard blog={blog} />
                      )}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="max-w-5xl mx-auto mt-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 via-violet-600 to-[#16f2b3] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative rounded-3xl p-10 md:p-16 text-center border-2 transition-all duration-300" style={{ 
                background: 'linear-gradient(135deg, var(--background-secondary) 0%, var(--background-primary) 100%)',
                borderColor: 'var(--border-color)'
              }}>
                <div className="mb-6">
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-600/20 to-violet-600/20 border border-pink-600/30 text-[#16f2b3]">
                    {language === 'ar' ? '✨ لنتواصل' : '✨ Stay Connected'}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 transition-colors duration-300 text-center hero-description" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ar' ? 'هل تريد مناقشة فكرة؟' : 'Want to Discuss an Idea?'}
                </h2>
                <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed transition-colors duration-300 text-center hero-description" style={{ color: 'var(--text-muted)' }}>
                  {language === 'ar' 
                    ? 'أنا دائماً منفتح على الأفكار والتعاون والفرص الجديدة. دعنا نبني شيئاً مذهلاً معاً!'
                    : "I'm always open to new ideas, collaborations, and opportunities. Let's build something amazing together!"}
                </p>
                <Link href="/#contact">
                  <button className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 text-white font-bold px-10 py-5 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-pink-500/50 text-lg">
                    <span className="relative z-10">{language === 'ar' ? 'تواصل معي الآن' : 'Get in Touch Now'}</span>
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

