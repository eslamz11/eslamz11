'use client';
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCode, FaExternalLinkAlt, FaArrowRight, FaStar } from 'react-icons/fa';
import { useSettings } from '@/app/context/SettingsContext';

function PremiumProjectCard({ project }) {
  const { language, theme } = useSettings();

  const name = language === 'ar' && project.name_ar ? project.name_ar : project.name;
  const description = language === 'ar' && project.description_ar ? project.description_ar : project.description;
  const role = language === 'ar' && project.role_ar ? project.role_ar : project.role;

  return (
    <Link href={`/projects/${project.id}`}>
      <div
        className={`group relative overflow-hidden rounded-xl transition-all duration-300 cursor-pointer hover:scale-[1.02] shadow-xl hover:shadow-2xl ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-[#1a1443] to-[#0a0d37] border-2 border-amber-500/50 hover:border-amber-500'
            : 'bg-gradient-to-br from-white to-amber-50 border-2 border-amber-300 hover:border-amber-400'
        }`}
      >
        {/* Premium Badge */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full shadow-lg">
          <FaStar className="text-white w-3 h-3" />
          <span className="text-white font-bold text-xs uppercase tracking-wider">
            {language === 'ar' ? 'مميز' : 'Premium'}
          </span>
        </div>

        {/* Image Section */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className={`absolute inset-0 transition-opacity duration-300 ${
            theme === 'dark'
              ? 'bg-gradient-to-t from-[#0d1224] via-[#0d1224]/60 to-transparent'
              : 'bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent group-hover:from-gray-900/90'
          }`}></div>

          {/* Top indicator line - Premium */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-[#16f2b3] to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Action Icons */}
          <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {project.demo && (
              <div className="bg-[#16f2b3] p-2 rounded-lg hover:scale-110 transition-transform duration-200 shadow-lg">
                <FaExternalLinkAlt className="text-gray-900 w-4 h-4" />
              </div>
            )}
            {project.code && (
              <div className="bg-violet-600 p-2 rounded-lg hover:scale-110 transition-transform duration-200 shadow-lg">
                <FaCode className="text-white w-4 h-4" />
              </div>
            )}
          </div>

          {/* Role badge - Premium */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-gradient-to-r from-amber-500 to-yellow-500 px-3 py-1.5 rounded-full shadow-lg border border-white/20">
              <span className="text-white text-xs font-bold tracking-wide uppercase">
                ⭐ {role}
              </span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5">
          {/* Title */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className={`text-xl font-bold group-hover:text-amber-500 transition-colors duration-200 flex-1 leading-tight ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {name}
            </h3>
            <div className={`p-2 rounded-lg transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-amber-600/20 group-hover:bg-amber-600/40'
                : 'bg-amber-100 group-hover:bg-amber-200'
            }`}>
              <FaArrowRight className="w-4 h-4 text-amber-500 transform group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>

          {/* Description */}
          <p className={`text-sm mb-4 line-clamp-2 leading-relaxed transition-colors duration-200 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {description}
          </p>

          {/* Technologies - Premium */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tools.slice(0, 4).map((tool, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-amber-900/30 text-amber-400 border border-amber-500/40 hover:border-amber-500'
                    : 'bg-amber-50 text-amber-700 border border-amber-300 hover:border-amber-500'
                }`}
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 4 && (
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${
                  theme === 'dark'
                    ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-500/40'
                    : 'bg-yellow-50 text-yellow-700 border border-yellow-300'
                }`}
              >
                +{project.tools.length - 4}
              </span>
            )}
          </div>

          {/* Divider - Premium */}
          <div className={`h-[1px] w-full mb-4 ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-transparent via-amber-500/40 to-transparent'
              : 'bg-gradient-to-r from-transparent via-amber-400 to-transparent'
          }`}></div>

          {/* Footer */}
          <div className="flex justify-between items-center">
            <span className="text-amber-500 text-sm font-bold group-hover:underline decoration-2 underline-offset-4">
              {language === 'ar' ? '✨ عرض المشروع' : '✨ View Project'}
            </span>

            {/* Status dots - Premium colors */}
            <div className="flex gap-1.5">
              <div className="h-2 w-2 rounded-full bg-amber-400"></div>
              <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
              <div className="h-2 w-2 rounded-full bg-violet-400"></div>
            </div>
          </div>
        </div>

        {/* Simple hover gradient overlay */}
        <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-amber-600/5 via-yellow-600/5 to-amber-600/5'
            : 'bg-gradient-to-r from-amber-100/30 via-yellow-100/30 to-amber-100/30'
        }`}></div>
      </div>
    </Link>
  );
}

export default PremiumProjectCard;
