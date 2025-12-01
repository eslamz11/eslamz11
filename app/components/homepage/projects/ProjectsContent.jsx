'use client';

import { useSettings } from '@/app/context/SettingsContext';
import ProjectCard from './project-card';
import PremiumProjectCard from './premium-project-card';
import Link from 'next/link';

export default function ProjectsContent({ projects }) {
  const { language, theme } = useSettings();

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24">
      {/* Section Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className={`w-24 h-[2px] transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#1a1443]' : 'bg-gray-200'
          }`}></span>
          <span className={`w-fit p-2 px-5 text-xl rounded-md transition-all duration-300 ${
            theme === 'dark'
              ? 'bg-[#1a1443] text-white'
              : 'bg-white text-gray-900 border border-gray-200'
          }`}>
            {language === 'ar' ? 'المشاريع' : 'PROJECTS'}
          </span>
          <span className={`w-24 h-[2px] transition-colors duration-300 ${
            theme === 'dark' ? 'bg-[#1a1443]' : 'bg-gray-200'
          }`}></span>
        </div>
      </div>

      <div className="pt-8">
        {/* Grid layout - عرض 6 مشاريع */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.slice(0, 6).map((project) => (
            <div key={project.id}>
              {project.type === 'premium' ? (
                <PremiumProjectCard project={project} />
              ) : (
                <ProjectCard project={project} />
              )}
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <Link
            className="flex items-center gap-2 hover:gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 px-6 md:px-10 py-3 md:py-3.5 text-center text-sm md:text-base font-semibold uppercase tracking-wide text-white transition-all duration-300 hover:shadow-xl hover:scale-105"
            role="button"
            href="/projects"
          >
            <span>{language === 'ar' ? 'عرض جميع المشاريع' : 'View All Projects'}</span>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
