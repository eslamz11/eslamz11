'use client';

import { useSettings } from '@/app/context/SettingsContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaCode, FaExternalLinkAlt, FaGithub, FaCheck, FaTimes, FaDownload, FaBriefcase, FaPlay } from 'react-icons/fa';
import { BsStack } from 'react-icons/bs';
import { MdPerson } from 'react-icons/md';
import { useState, useEffect } from 'react';
import YouTubeEmbed from '@/app/components/YouTubeEmbed';

// Image Modal Component with Navigation
function ImageModal({ imageUrl, onClose, images, currentIndex, onNavigate, imageInfo }) {
  const hasMultipleImages = images && images.length > 1;
  const hasInfo = imageInfo && (imageInfo.title || imageInfo.description);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft' && hasMultipleImages) {
        onNavigate('prev');
      } else if (e.key === 'ArrowRight' && hasMultipleImages) {
        onNavigate('next');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [hasMultipleImages, onNavigate, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-[#16f2b3] transition-all duration-300 z-50 bg-black/60 hover:bg-black/80 p-3 rounded-full backdrop-blur-md shadow-xl hover:scale-110"
        title="Close (Esc)"
      >
        <FaTimes size={28} />
      </button>

      {/* Image Counter */}
      {hasMultipleImages && (
        <div className="absolute top-6 left-6 z-50">
            <div className="relative">
            <div className="relative bg-black/70 backdrop-blur-md text-white px-5 py-2.5 rounded-full font-bold shadow-xl border border-white/10">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {currentIndex + 1}
              </span>
              <span className="mx-2 text-white/50">/</span>
              <span className="text-white/80">{images.length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Previous Button */}
      {hasMultipleImages && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('prev');
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600 text-white p-5 rounded-full transition-all duration-300 hover:scale-110 z-50 group backdrop-blur-md shadow-xl border border-white/10"
          title="Previous (←)"
        >
          <FaArrowLeft size={24} className="group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Next Button */}
      {hasMultipleImages && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate('next');
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 text-white p-5 rounded-full transition-all duration-300 hover:scale-110 z-50 group backdrop-blur-md shadow-xl border border-white/10"
          title="Next (→)"
        >
          <FaArrowLeft size={24} className="rotate-180 group-hover:scale-110 transition-transform" />
        </button>
      )}

      {/* Main Content Container */}
      <div className="max-w-7xl w-full max-h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
        {/* Image Container */}
        <div className="flex-1 flex items-center justify-center mb-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl opacity-20"></div>
            <div className="relative">
              <Image
                src={imageUrl}
                alt={imageInfo?.title || `Image ${currentIndex + 1}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Image Info Panel */}
        {hasInfo && (
          <div className="relative mt-4 animate-fadeIn">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl opacity-30 blur"></div>
            <div className="relative bg-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/10 shadow-2xl max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-md opacity-50"></div>
                    <div className="relative p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex-1 min-w-0">
                  {imageInfo.title && (
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                      {imageInfo.title}
                    </h3>
                  )}
                  {imageInfo.description && (
                    <p className="text-base text-gray-300 leading-relaxed">
                      {imageInfo.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Decorative Bottom Line */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="h-0.5 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent rounded-full"></div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

export default function ProjectDetailContent({ project }) {
  const { language } = useSettings();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [allImagesData, setAllImagesData] = useState([]);
  const [currentImageInfo, setCurrentImageInfo] = useState(null);

  // Get translated content
  const name = language === 'ar' && project.name_ar ? project.name_ar : project.name;
  const description = language === 'ar' && project.description_ar ? project.description_ar : project.description;
  const role = language === 'ar' && project.role_ar ? project.role_ar : project.role;

  // تحويل tools إلى array إذا كانت string
  const toolsArray = Array.isArray(project.tools)
    ? project.tools
    : (typeof project.tools === 'string'
      ? project.tools.split(',').map(t => t.trim())
      : []);

  // Get videos array
  const videos = Array.isArray(project.videos) ? project.videos : [];

  // التأكد من وجود صورة
  const projectImage = project.image || '/image/placeholder.png';

  // Handle image navigation
  const openImageModal = (imageUrl, index, images, imagesData = []) => {
    setSelectedImage(imageUrl);
    setCurrentImageIndex(index);
    setAllImages(images);
    setAllImagesData(imagesData);
    
    // Set current image info
    if (imagesData && imagesData[index]) {
      setCurrentImageInfo(imagesData[index]);
    } else {
      setCurrentImageInfo(null);
    }
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setCurrentImageIndex(0);
    setAllImages([]);
    setAllImagesData([]);
    setCurrentImageInfo(null);
  };

  const navigateImage = (direction) => {
    if (!allImages || allImages.length === 0) return;

    let newIndex;
    if (direction === 'next') {
      newIndex = currentImageIndex === allImages.length - 1 ? 0 : currentImageIndex + 1;
    } else {
      newIndex = currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
    }
    
    setCurrentImageIndex(newIndex);
    setSelectedImage(allImages[newIndex]);
    
    // Update image info
    if (allImagesData && allImagesData[newIndex]) {
      setCurrentImageInfo(allImagesData[newIndex]);
    } else {
      setCurrentImageInfo(null);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--background-primary)' }}>
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={closeImageModal}
          images={allImages}
          currentIndex={currentImageIndex}
          onNavigate={navigateImage}
          imageInfo={currentImageInfo}
        />
      )}

      {/* Hero Section */}
      <div className="relative pt-28 pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-96 h-96 bg-violet-600 rounded-full opacity-5 top-0 left-1/4"></div>
          <div className="absolute w-96 h-96 bg-pink-600 rounded-full opacity-5 bottom-0 right-1/4"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Professional Back Button - Centered */}
          <div className="mb-12 flex justify-center">
            <Link href="/projects">
              <button className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-2">
                <FaBriefcase className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                <span>{language === 'ar' ? 'العودة للمشاريع' : 'Back to Projects'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </Link>
          </div>

          {/* Project Header */}
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#16f2b3] via-violet-400 to-pink-400 bg-clip-text text-transparent">
                  {name}
                </span>
              </h1>

              {/* Role Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600/20 to-pink-600/20 border border-violet-600/30 px-6 py-3 rounded-full">
                <MdPerson className="text-[#16f2b3]" size={24} />
                <span className="font-semibold text-lg transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{role}</span>
              </div>
            </div>

            {/* Main Image - Clickable */}
            <div
              className="relative rounded-3xl overflow-hidden border-2 transition-all duration-300 hover:border-[#16f2b3] cursor-pointer group mb-12"
              style={{ borderColor: 'var(--border-color)' }}
              onClick={() => {
                const galleryImages = project.project_images || [];
                const images = [projectImage, ...galleryImages.map(img => typeof img === 'string' ? img : img.url)];
                const imagesData = [
                  { title: name, description: description },
                  ...galleryImages.map(img => {
                    if (typeof img === 'string') {
                      return null;
                    }
                    return {
                      title: language === 'ar' && img.title_ar ? img.title_ar : img.title,
                      description: language === 'ar' && img.description_ar ? img.description_ar : img.description
                    };
                  })
                ];
                openImageModal(projectImage, 0, images, imagesData);
              }}
            >
              <div className="aspect-video relative">
                <Image
                  src={projectImage}
                  alt={name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
                {/* Overlay with zoom icon */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-[#16f2b3] p-4 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Links */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {project.demo && (
                <Link href={project.demo} target="_blank">
                  <button className="flex items-center gap-3 bg-gradient-to-r from-[#16f2b3] to-cyan-500 hover:from-cyan-500 hover:to-[#16f2b3] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                    <FaExternalLinkAlt size={20} />
                    <span>{language === 'ar' ? 'معاينة حية' : 'Live Demo'}</span>
                  </button>
                </Link>
              )}
              {project.code && (
                <Link href={project.code} target="_blank">
                  <button className="flex items-center gap-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-purple-600 hover:to-violet-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                    <FaGithub size={20} />
                    <span>{language === 'ar' ? 'الكود المصدري' : 'Source Code'}</span>
                  </button>
                </Link>
              )}
              {project.downloadLink && (
                <Link href={project.downloadLink} target="_blank">
                  <button className="flex items-center gap-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                    <FaDownload size={20} />
                    <span>{language === 'ar' ? 'تحميل' : 'Download'}</span>
                  </button>
                </Link>
              )}
            </div>

            {/* Overview Card - Full Width */}
            <div className="rounded-3xl p-8 md:p-10 border transition-all duration-300 mb-12 hover:border-[#16f2b3]/50 hover:shadow-xl hover:shadow-[#16f2b3]/10" style={{
              background: 'linear-gradient(135deg, var(--background-secondary), var(--background-primary))',
              borderColor: 'var(--border-color)'
            }}>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                <div className="p-3 bg-gradient-to-br from-[#16f2b3]/20 to-cyan-500/20 rounded-xl">
                  <FaCode className="text-[#16f2b3]" size={24} />
                </div>
                {language === 'ar' ? 'نظرة عامة' : 'Overview'}
              </h2>
              <p className="text-lg leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                {description}
              </p>
            </div>

            {/* Grid Layout for Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Technologies Card */}
              <div className="rounded-3xl p-8 border transition-all duration-300 hover:border-pink-500/50 hover:shadow-xl hover:shadow-pink-500/10" style={{
                background: 'linear-gradient(135deg, var(--background-secondary), var(--background-primary))',
                borderColor: 'var(--border-color)'
              }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                  <div className="p-3 bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-xl">
                    <BsStack className="text-pink-500" size={24} />
                  </div>
                  {language === 'ar' ? 'التقنيات المستخدمة' : 'Technologies Used'}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {toolsArray.map((tool, index) => (
                    <span
                      key={index}
                      className="group px-4 py-2 rounded-xl font-semibold text-base border-2 transition-all duration-300 hover:border-[#16f2b3] hover:shadow-lg hover:shadow-[#16f2b3]/30 hover:scale-105 cursor-default"
                      style={{
                        backgroundColor: 'var(--background-tertiary)',
                        color: 'var(--text-primary)',
                        borderColor: 'var(--border-color)'
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* My Role Card */}
              <div className="rounded-3xl p-8 border transition-all duration-300 hover:border-violet-500/50 hover:shadow-xl hover:shadow-violet-500/10" style={{
                background: 'linear-gradient(135deg, var(--background-secondary), var(--background-primary))',
                borderColor: 'var(--border-color)'
              }}>
                <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                  <div className="p-3 bg-gradient-to-br from-violet-600/20 to-purple-600/20 rounded-xl">
                    <MdPerson className="text-violet-500" size={28} />
                  </div>
                  {language === 'ar' ? 'دوري في المشروع' : 'My Role'}
                </h2>
                <p className="text-lg leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                  {role}
                </p>
              </div>
            </div>

            {/* Project Videos Section */}
            {videos && videos.length > 0 && (
              <div className="mb-12">
                {/* Section Header */}
                <div className="mb-10 text-center">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                      <div className="relative p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-lg">
                        <FaPlay className="text-white" size={28} />
                      </div>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    {language === 'ar' ? 'فيديوهات المشروع' : 'Project Videos'}
                  </h2>
                  <p className="mt-3 text-lg transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                    {language === 'ar' ? 'شاهد عرض توضيحي للمشروع' : 'Watch project demonstrations'}
                  </p>
                </div>

                {/* Videos Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {videos.map((video, index) => {
                    const videoTitle = language === 'ar' && video.title_ar ? video.title_ar : video.title;
                    const videoDesc = language === 'ar' && video.description_ar ? video.description_ar : video.description;

                    return (
                      <div
                        key={index}
                        className="group relative rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:shadow-red-500/30 hover:scale-[1.02]"
                        style={{
                          borderColor: 'var(--border-color)'
                        }}
                      >
                        {/* Gradient Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        {/* Card Content */}
                        <div className="relative rounded-3xl p-6 md:p-8" style={{
                          background: 'var(--background-primary)'
                        }}>
                          {/* Video Number Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-md opacity-60"></div>
                              <div className="relative bg-gradient-to-r from-red-500 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                {index + 1}
                              </div>
                            </div>
                          </div>

                          {/* Video Embed with Enhanced Styling */}
                          <div className="relative mb-6 group/video">
                            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-2xl opacity-0 group-hover/video:opacity-20 transition-opacity duration-300 blur"></div>
                            <div className="relative">
                              <YouTubeEmbed url={video.url} title={videoTitle} />
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="space-y-4">
                            {/* Title with Icon */}
                            <div className="flex items-start gap-3">
                              <div className="flex-shrink-0 mt-1">
                                <div className="p-2 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg">
                                  <FaPlay className="text-red-500" size={16} />
                                </div>
                              </div>
                              <h3 className="flex-1 text-xl md:text-2xl font-bold transition-colors duration-300 leading-tight" style={{ color: 'var(--text-primary)' }}>
                                {videoTitle}
                              </h3>
                            </div>

                            {/* Description */}
                            {videoDesc && (
                              <div className="pl-11">
                                <div className="relative">
                                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-pink-500 rounded-full"></div>
                                  <p className="pl-4 text-base leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                                    {videoDesc}
                                  </p>
                                </div>
                              </div>
                            )}

                            {/* Decorative Bottom Border */}
                            <div className="pt-4">
                              <div className="h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent rounded-full group-hover:via-pink-500/50 transition-all duration-500"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Decoration */}
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500/10 via-pink-500/10 to-purple-500/10 border border-red-500/20 rounded-full">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                      {videos.length} {language === 'ar' ? 'فيديو' : 'Video'}{videos.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Project Gallery */}
            {project.project_images && project.project_images.length > 0 && (
              <div className="mb-12">
                {/* Section Header */}
                <div className="mb-10 text-center">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                      <div className="relative p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    {language === 'ar' ? 'معرض الصور' : 'Project Gallery'}
                  </h2>
                  <p className="mt-3 text-lg transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                    {language === 'ar' ? 'اطلع على لقطات من المشروع' : 'Browse through project screenshots'}
                  </p>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {project.project_images.map((img, index) => {
                    // Handle both old format (string) and new format (object)
                    const imageUrl = typeof img === 'string' ? img : img.url;
                    const imageTitle = typeof img === 'object' && (language === 'ar' && img.title_ar ? img.title_ar : img.title);
                    const imageDesc = typeof img === 'object' && (language === 'ar' && img.description_ar ? img.description_ar : img.description);
                    
                    // Prepare images array for modal
                    const allGalleryImages = project.project_images.map(i => typeof i === 'string' ? i : i.url);
                    const modalImages = [projectImage, ...allGalleryImages];
                    const modalImagesData = [
                      { title: name, description: description },
                      ...project.project_images.map(i => {
                        if (typeof i === 'string') {
                          return null;
                        }
                        return {
                          title: language === 'ar' && i.title_ar ? i.title_ar : i.title,
                          description: language === 'ar' && i.description_ar ? i.description_ar : i.description
                        };
                      })
                    ];

                    return (
                      <div
                        key={index}
                        className="group relative rounded-3xl overflow-hidden border-2 transition-all duration-500 hover:border-transparent hover:shadow-2xl hover:shadow-purple-500/30 hover:scale-[1.02]"
                        style={{ borderColor: 'var(--border-color)' }}
                      >
                        {/* Gradient Border Effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                        
                        {/* Card Content */}
                        <div className="relative rounded-3xl overflow-hidden" style={{ background: 'var(--background-primary)' }}>
                          {/* Image Number Badge */}
                          <div className="absolute top-4 right-4 z-10">
                            <div className="relative">
                              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-md opacity-60"></div>
                              <div className="relative bg-gradient-to-r from-purple-500 to-pink-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                                {index + 1}
                              </div>
                            </div>
                          </div>

                          {/* Image Container */}
                          <div
                            onClick={() => openImageModal(imageUrl, index + 1, modalImages, modalImagesData)}
                            className="relative aspect-video overflow-hidden cursor-pointer group/img"
                          >
                            <Image
                              src={imageUrl}
                              alt={imageTitle || `${name} - Image ${index + 1}`}
                              fill
                              className="object-cover group-hover/img:scale-110 transition-transform duration-700"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-[#16f2b3] p-4 rounded-full transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300 shadow-xl">
                                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Image Info */}
                          {(imageTitle || imageDesc) && (
                            <div className="p-5 space-y-2">
                              {imageTitle && (
                                <h3 className="text-lg font-bold transition-colors duration-300 line-clamp-1" style={{ color: 'var(--text-primary)' }}>
                                  {imageTitle}
                                </h3>
                              )}
                              {imageDesc && (
                                <p className="text-sm leading-relaxed transition-colors duration-300 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                  {imageDesc}
                                </p>
                              )}
                              {/* Decorative Line */}
                              <div className="pt-2">
                                <div className="h-0.5 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-transparent rounded-full"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Decoration */}
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 border border-purple-500/20 rounded-full">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                      {project.project_images.length} {language === 'ar' ? 'صورة' : 'Image'}{project.project_images.length > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 border-t transition-colors duration-300" style={{ borderColor: 'var(--border-color)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 transition-colors duration-300 text-center hero-description" style={{ color: 'var(--text-primary)' }}>
              {language === 'ar' ? 'هل أعجبك هذا المشروع؟' : 'Like This Project?'}
            </h2>
            <p className="text-lg mb-8 transition-colors duration-300 text-center hero-description" style={{ color: 'var(--text-muted)' }}>
              {language === 'ar'
                ? 'دعنا نعمل معاً لإنشاء شيء مذهل!'
                : "Let's work together to create something amazing!"}
            </p>
            <Link href="/#contact">
              <button className="bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                {language === 'ar' ? 'تواصل معي' : 'Get in Touch'}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
