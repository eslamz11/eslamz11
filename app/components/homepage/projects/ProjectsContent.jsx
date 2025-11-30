'use client';

import { useSettings } from '@/app/context/SettingsContext';
import ProjectCard from './project-card';
import PremiumProjectCard from './premium-project-card';
import Link from 'next/link';

export default function ProjectsContent({ projects }) {
  const { language } = useSettings();

  return (
    <div id='projects' className="relative z-50 my-12 lg:my-24">
      {/* تأثيرات الخلفية */}
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>
      
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
          <span className="w-fit p-2 px-5 text-xl rounded-md transition-all duration-300" style={{ 
            backgroundColor: 'var(--background-secondary)',
            color: 'var(--text-primary)'
          }}>
            {language === 'ar' ? 'المشاريع' : 'PROJECTS'}
          </span>
          <span className="w-24 h-[2px] transition-colors duration-300" style={{ backgroundColor: 'var(--background-secondary)' }}></span>
        </div>
      </div>

      <div className="pt-8">
        {/* Grid layout للكروت - عرض 6 فقط */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {projects.slice(0, 6).map((project) => (
            <div key={project.id} className="animate-fadeIn">
              {project.type === 'premium' ? (
                <PremiumProjectCard project={project} />
              ) : (
                <ProjectCard project={project} />
              )}
            </div>
          ))}
        </div>

        {/* زر عرض المزيد - يظهر دائماً */}
        <div className="flex justify-center mt-8 lg:mt-12">
          <Link
            className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 px-3 md:px-8 py-3 md:py-4 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold"
            role="button"
            href="/projects"
          >
            <span>{language === 'ar' ? 'عرض جميع المشاريع' : 'View All Projects'}</span>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

