'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCode, FaExternalLinkAlt, FaArrowRight } from 'react-icons/fa';
import { useSettings } from '@/app/context/SettingsContext';

function ProjectCard({ project }) {
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

        {/* Animated border gradient */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#16f2b3] via-violet-600 to-pink-500 blur-sm"></div>
          <div className="absolute inset-[2px] rounded-2xl" style={{ background: 'linear-gradient(135deg, var(--background-primary) 0%, var(--background-tertiary) 50%, var(--background-primary) 100%)' }}></div>
        </div>

        {/* Static border */}
        <div className="absolute inset-0 rounded-2xl border-2 group-hover:border-transparent transition-colors duration-500" style={{ borderColor: 'var(--border-color)' }}></div>

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

            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#16f2b3] via-violet-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Action Icons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
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

            {/* Role badge */}
            <div className="absolute bottom-4 left-4">
              <div className="bg-gradient-to-r from-[#16f2b3] to-violet-600 px-4 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                <span className="text-white text-xs font-bold tracking-wide uppercase">
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Title with animated arrow */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-extrabold group-hover:text-[#16f2b3] transition-colors duration-300 flex-1 leading-tight" style={{ color: 'var(--text-primary)' }}>
                {name}
              </h3>
              <div className="mt-1 bg-gradient-to-br from-violet-600/20 to-pink-600/20 p-2 rounded-lg group-hover:from-violet-600/40 group-hover:to-pink-600/40 transition-all duration-300">
                <FaArrowRight className="w-4 h-4 text-[#16f2b3] transform group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>

            {/* Description */}
            <p className="text-sm md:text-base mb-4 line-clamp-2 leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>
              {description}
            </p>

            {/* Technologies with enhanced styling */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.tools.slice(0, 4).map((tool, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-[#16f2b3] text-xs font-semibold rounded-lg border border-[#16f2b3]/30 hover:border-[#16f2b3] hover:bg-[#16f2b3]/10 transition-all duration-300 backdrop-blur-sm"
                  style={{ backgroundColor: 'var(--background-tertiary)' }}
                >
                  {tool}
                </span>
              ))}
              {project.tools.length > 4 && (
                <span
                  className="px-3 py-1.5 text-violet-400 text-xs font-semibold rounded-lg border border-violet-400/30 backdrop-blur-sm"
                  style={{ backgroundColor: 'var(--background-tertiary)' }}
                >
                  +{project.tools.length - 4}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#16f2b3]/40 to-transparent mb-4 group-hover:via-[#16f2b3]/60 transition-all duration-500"></div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="text-[#16f2b3] text-sm font-bold group-hover:underline decoration-2 underline-offset-4">
                  {language === 'ar' ? 'عرض المشروع' : 'View Project'}
                </span>
                <div className="w-2 h-2 rounded-full bg-[#16f2b3] animate-pulse"></div>
              </div>

              {/* Status dots */}
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow-lg shadow-red-500/50"></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg shadow-orange-500/50"></div>
                <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-lg shadow-green-500/50"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#16f2b3] via-violet-600 to-pink-500 blur-3xl"></div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;