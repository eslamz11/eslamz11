'use client';

import { useSettings } from '@/app/context/SettingsContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight, FaStar, FaClock, FaCalendar } from 'react-icons/fa';
import { BsHeartFill } from 'react-icons/bs';
import { FaCommentAlt } from 'react-icons/fa';

function PremiumBlogCard({ blog }) {
  const { language } = useSettings();

  const title = language === 'ar' && blog.title_ar ? blog.title_ar : blog.title;
  const description = language === 'ar' && blog.description_ar ? blog.description_ar : blog.description;

  return (
    <Link href={`/blog/${blog.id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(135deg, var(--background-primary) 0%, var(--background-tertiary) 50%, var(--background-primary) 100%)',
        }}
      >

        {/* Premium Badge - Top Right */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 rounded-full shadow-2xl shadow-pink-500/50 animate-pulse">
          <FaStar className="text-white w-4 h-4" />
          <span className="text-white font-extrabold text-xs uppercase tracking-widest">
            {language === 'ar' ? 'مميز' : 'Premium'}
          </span>
        </div>

        {/* Animated border gradient - Premium version */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-400 to-violet-600 blur-sm"></div>
          <div className="absolute inset-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--background-primary) 0%, var(--background-tertiary) 50%, var(--background-primary) 100%)' }}></div>
        </div>

        {/* Static border - Premium color */}
        <div className="absolute inset-0 rounded-2xl border-2 border-pink-500/50 group-hover:border-transparent transition-colors duration-500"></div>

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Image Section with enhanced overlay */}
          <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
            <Image
              src={blog.cover_image}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-[#0d1224]/60 to-transparent"></div>

            {/* Top gradient line - Premium colors */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Stats on hover */}
            {(blog.public_reactions_count || blog.comments_count) && (
              <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                {blog.public_reactions_count > 0 && (
                  <div className="bg-pink-600/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                    <BsHeartFill className="text-white w-3 h-3" />
                    <span className="text-white text-xs font-bold">{blog.public_reactions_count}</span>
                  </div>
                )}
                {blog.comments_count > 0 && (
                  <div className="bg-violet-600/90 backdrop-blur-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                    <FaCommentAlt className="text-white w-3 h-3" />
                    <span className="text-white text-xs font-bold">{blog.comments_count}</span>
                  </div>
                )}
              </div>
            )}

            {/* Reading time badge - Premium style */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg border-2 border-white/30 flex items-center gap-2">
                <FaClock className="text-white w-3 h-3" />
                <span className="text-white text-xs font-bold tracking-wide">
                  {language === 'ar' ? `⏱️ ${blog.reading_time_minutes || 5} دقيقة` : `⏱️ ${blog.reading_time_minutes || 5} min`}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Date with Premium styling */}
            <div className="flex items-center gap-2 mb-3 text-pink-500">
              <FaCalendar className="w-3.5 h-3.5" />
              <span className="text-xs font-semibold">
                {new Date(blog.published_at).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Title with animated arrow */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-extrabold group-hover:text-pink-500 transition-colors duration-300 flex-1 leading-tight line-clamp-2" style={{ color: 'var(--text-primary)' }}>
                {title}
              </h3>
              <div className="mt-1 bg-gradient-to-br from-pink-600/20 to-rose-600/20 p-2 rounded-lg group-hover:from-pink-600/40 group-hover:to-rose-600/40 transition-all duration-300">
                <FaArrowRight className="w-4 h-4 text-pink-500 transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base mb-4 line-clamp-2 leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
              {description}
            </p>

            {/* Divider - Premium color */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-pink-500/40 to-transparent mb-4 group-hover:via-pink-500/60 transition-all duration-500"></div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-pink-500 text-sm font-bold group-hover:underline decoration-2 underline-offset-4">
                  {language === 'ar' ? '💖 قراءة المقال' : '💖 Read Article'}
                </span>
                <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse"></div>
              </div>

              {/* Status dots - Premium colors */}
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 shadow-lg shadow-pink-500/50 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg shadow-rose-500/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 shadow-lg shadow-purple-500/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover glow effect - Premium version with pink glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-400 to-violet-600 blur-3xl"></div>
        </div>

        {/* Sparkle effect on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="w-32 h-32 bg-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
    </Link>
  );
}

export default PremiumBlogCard;

