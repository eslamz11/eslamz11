'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCode, FaExternalLinkAlt, FaArrowRight, FaStar } from 'react-icons/fa';
import { useSettings } from '@/app/context/SettingsContext';

function PremiumProjectCard({ project }) {
  const { language } = useSettings();

  const name = language === 'ar' && project.name_ar ? project.name_ar : project.name;
  const description = language === 'ar' && project.description_ar ? project.description_ar : project.description;
  const role = language === 'ar' && project.role_ar ? project.role_ar : project.role;

  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className="group relative overflow-hidden rounded-2xl transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
        style={{
          background: 'linear-gradient(135deg, var(--background-primary) 0%, var(--background-tertiary) 50%, var(--background-primary) 100%)',
        }}
      >

        {/* Premium Badge - Top Right */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 rounded-full shadow-2xl shadow-amber-500/50 animate-pulse">
          <FaStar className="text-white w-4 h-4" />
          <span className="text-white font-extrabold text-xs uppercase tracking-widest">
            {language === 'ar' ? 'مميز' : 'Premium'}
          </span>
        </div>

        {/* Animated border gradient - Premium version */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FFD700] via-[#16f2b3] to-pink-500 blur-sm"></div>
          <div className="absolute inset-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--background-primary) 0%, var(--background-tertiary) 50%, var(--background-primary) 100%)' }}></div>
        </div>

        {/* Static border - Premium color */}
        <div className="absolute inset-0 rounded-2xl border-2 border-[#FFD700]/50 group-hover:border-transparent transition-colors duration-500"></div>

        {/* Content wrapper */}
        <div className="relative z-10">
          {/* Image Section with enhanced overlay */}
          <div className="relative h-48 md:h-56 overflow-hidden rounded-t-2xl">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1224] via-[#0d1224]/60 to-transparent"></div>

            {/* Top gradient line - Premium colors */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] via-[#16f2b3] to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Action Icons */}
            <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              {project.demo && (
                <div className="bg-[#16f2b3]/90 backdrop-blur-sm p-2.5 rounded-xl hover:bg-[#16f2b3] hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaExternalLinkAlt className="text-[#0d1224] w-4 h-4" />
                </div>
              )}
              {project.code && (
                <div className="bg-violet-600/90 backdrop-blur-sm p-2.5 rounded-xl hover:bg-violet-600 hover:scale-110 transition-all duration-300 shadow-lg">
                  <FaCode className="text-white w-4 h-4" />
                </div>
              )}
            </div>

            {/* Role badge - Premium style */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-gradient-to-r from-[#FFD700] to-amber-500 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg border-2 border-white/30">
                <span className="text-white text-xs font-bold tracking-wide uppercase">
                  ⭐ {role}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title with animated arrow */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-extrabold group-hover:text-[#FFD700] transition-colors duration-300 flex-1 leading-tight" style={{ color: 'var(--text-primary)' }}>
                {name}
              </h3>
              <div className="mt-1 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 p-2 rounded-lg group-hover:from-amber-600/40 group-hover:to-yellow-600/40 transition-all duration-300">
                <FaArrowRight className="w-4 h-4 text-[#FFD700] transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base mb-4 line-clamp-2 leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
              {description}
            </p>

            {/* Technologies with enhanced styling - Premium version */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tools.slice(0, 4).map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-[#FFD700] text-xs font-semibold rounded-lg border-2 border-[#FFD700]/40 hover:border-[#FFD700] hover:bg-[#FFD700]/10 transition-all duration-300 backdrop-blur-sm shadow-md"
                  style={{ backgroundColor: 'var(--background-tertiary)' }}
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 4 && (
                <span
                  className="px-3 py-1.5 text-amber-400 text-xs font-semibold rounded-lg border-2 border-amber-400/40 backdrop-blur-sm shadow-md"
                  style={{ backgroundColor: 'var(--background-tertiary)' }}
                >
                  +{project.tools.length - 4}
                </span>
              )}
            </div>

            {/* Divider - Premium color */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#FFD700]/40 to-transparent mb-4 group-hover:via-[#FFD700]/60 transition-all duration-500"></div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[#FFD700] text-sm font-bold group-hover:underline decoration-2 underline-offset-4">
                  {language === 'ar' ? '✨ عرض المشروع' : '✨ View Project'}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#FFD700] animate-pulse"></div>
              </div>

              {/* Status dots - Premium colors */}
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 shadow-lg shadow-amber-500/50 animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-[#16f2b3] to-emerald-500 shadow-lg shadow-emerald-500/50 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 shadow-lg shadow-purple-500/50 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover glow effect - Premium version with golden glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFD700] via-[#16f2b3] to-violet-600 blur-3xl"></div>
        </div>

        {/* Sparkle effect on hover */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="w-32 h-32 bg-[#FFD700]/20 rounded-full blur-2xl animate-pulse"></div>
        </div>
      </div>
    </Link>
  );
}

export default PremiumProjectCard;

