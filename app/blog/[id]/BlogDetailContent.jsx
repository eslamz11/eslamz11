'use client';

import { useSettings } from '@/app/context/SettingsContext';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowLeft, FaClock, FaCalendar, FaTag, FaUser, FaTimes, FaBookOpen } from 'react-icons/fa';
import { timeConverter } from '@/utils/time-converter';
import { useState } from 'react';

// معالجة المحتوى مع دعم Markdown
function parseContent(content) {
  if (!content) return [];

  const lines = content.split('\n');
  const parsedContent = [];
  let currentParagraph = '';

  for (let line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      if (currentParagraph) {
        parsedContent.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      continue;
    }

    if (trimmedLine.startsWith('# ')) {
      if (currentParagraph) {
        parsedContent.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      parsedContent.push({ type: 'h1', content: trimmedLine.substring(2) });
    } else if (trimmedLine.startsWith('## ')) {
      if (currentParagraph) {
        parsedContent.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      parsedContent.push({ type: 'h2', content: trimmedLine.substring(3) });
    } else if (trimmedLine.startsWith('### ')) {
      if (currentParagraph) {
        parsedContent.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      parsedContent.push({ type: 'h3', content: trimmedLine.substring(4) });
    }
    else if (trimmedLine.includes('![') && trimmedLine.includes('](')) {
      if (currentParagraph) {
        parsedContent.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let match;
      while ((match = imageRegex.exec(trimmedLine)) !== null) {
        parsedContent.push({ type: 'image', alt: match[1], url: match[2] });
      }
    }
    else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (currentParagraph) {
        parsedContent.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      parsedContent.push({ type: 'list', content: trimmedLine.substring(2) });
    }
    else if (trimmedLine.startsWith('```')) {
      if (currentParagraph) {
        parsedContent.push({ type: 'paragraph', content: currentParagraph });
        currentParagraph = '';
      }
      parsedContent.push({ type: 'code', content: trimmedLine.replace(/```/g, '') });
    }
    else {
      currentParagraph += (currentParagraph ? ' ' : '') + trimmedLine;
    }
  }

  if (currentParagraph) {
    parsedContent.push({ type: 'paragraph', content: currentParagraph });
  }

  return parsedContent;
}

// Image Modal Component
function ImageModal({ imageUrl, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-[#16f2b3] transition-colors duration-200"
      >
        <FaTimes size={32} />
      </button>
      <div className="max-w-7xl max-h-[90vh] overflow-auto">
        <img
          src={imageUrl}
          alt="Full size"
          className="w-full h-auto"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}

export default function BlogDetailContent({ blog }) {
  const { language } = useSettings();
  const [selectedImage, setSelectedImage] = useState(null);

  // Get translated content
  const title = language === 'ar' && blog.title_ar ? blog.title_ar : blog.title;
  const description = language === 'ar' && blog.description_ar ? blog.description_ar : blog.description;
  const content = language === 'ar' && blog.content_ar ? blog.content_ar : blog.content;

  // معالجة المحتوى
  const parsedContent = parseContent(content);

  // معالجة التاجز
  const tagsArray = Array.isArray(blog.tags)
    ? blog.tags
    : (typeof blog.tags === 'string'
      ? blog.tags.split(',').map(t => t.trim()).filter(t => t)
      : []);

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: 'var(--background-primary)' }}>
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Hero Section */}
      <div className="relative pt-28 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute w-[500px] h-[500px] bg-pink-600 rounded-full blur-[150px] opacity-10 top-0 right-1/4"></div>
          <div className="absolute w-[500px] h-[500px] bg-violet-600 rounded-full blur-[150px] opacity-10 bottom-0 left-1/4"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Professional Back Button */}
          <div className="max-w-4xl mx-auto mb-12 flex justify-center">
            <Link href="/blog">
              <button className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-700 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center gap-2">
                <FaBookOpen className="text-lg group-hover:rotate-12 transition-transform duration-300" />
                <span>{language === 'ar' ? 'العودة للمدونات' : 'Back to Blogs'}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
              </button>
            </Link>
          </div>

          {/* Blog Header */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-violet-400 to-[#16f2b3] bg-clip-text text-transparent">
                {title}
              </span>
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <FaCalendar className="text-[#16f2b3]" />
                <span>{timeConverter(blog.published_at)}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                <FaClock className="text-[#16f2b3]" />
                <span>{language === 'ar' ? `${blog.reading_time_minutes || 5} دقيقة` : `${blog.reading_time_minutes || 5} Min Read`}</span>
              </div>
              {blog.author_name && (
                <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                  <FaUser className="text-[#16f2b3]" />
                  <span>{blog.author_name}</span>
                </div>
              )}
            </div>

            {/* Cover Image - Clickable */}
            {blog.cover_image && (
              <div
                className="relative rounded-3xl overflow-hidden border-2 cursor-pointer transition-all duration-300 hover:border-[#16f2b3] group"
                style={{ borderColor: 'var(--border-color)' }}
                onClick={() => setSelectedImage(blog.cover_image)}
              >
                <div className="aspect-video relative">
                  <Image
                    src={blog.cover_image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    priority
                  />
                  {/* Overlay with zoom icon */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#16f2b3] p-3 rounded-full">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="max-w-4xl mx-auto">
            {/* Author Card */}
            {(blog.author_name || blog.author_avatar) && (
              <div className="rounded-2xl p-6 border mb-8 transition-all duration-300" style={{
                background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
                borderColor: 'var(--border-color)'
              }}>
                <div className="flex items-center gap-4">
                  {blog.author_avatar && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#16f2b3]">
                      <Image
                        src={blog.author_avatar}
                        alt={blog.author_name || 'Author'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-lg transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>{blog.author_name}</p>
                    <p className="text-sm transition-colors duration-300" style={{ color: 'var(--text-muted)' }}>{timeConverter(blog.published_at)}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Description Card */}
            <div className="rounded-2xl p-8 border mb-8 transition-all duration-300" style={{
              background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
              borderColor: 'var(--border-color)'
            }}>
              <p className="text-lg leading-relaxed transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                {description}
              </p>
            </div>

            {/* Main Content */}
            <div className="rounded-2xl p-8 md:p-10 border mb-8 transition-all duration-300" style={{
              background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
              borderColor: 'var(--border-color)'
            }}>
              <div className="prose prose-lg max-w-none">
                {parsedContent.map((block, index) => {
                  switch (block.type) {
                    case 'h1':
                      return (
                        <h1 key={index} className="text-3xl md:text-4xl font-bold mb-6 mt-8 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                          {block.content}
                        </h1>
                      );
                    case 'h2':
                      return (
                        <h2 key={index} className="text-2xl md:text-3xl font-bold mb-4 mt-6 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                          {block.content}
                        </h2>
                      );
                    case 'h3':
                      return (
                        <h3 key={index} className="text-xl md:text-2xl font-semibold mb-3 mt-4 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                          {block.content}
                        </h3>
                      );
                    case 'paragraph':
                      return (
                        <p key={index} className="text-lg leading-relaxed mb-4 transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                          {block.content}
                        </p>
                      );
                    case 'list':
                      return (
                        <li key={index} className="text-lg mb-2 ml-6 transition-colors duration-300" style={{ color: 'var(--text-secondary)' }}>
                          {block.content}
                        </li>
                      );
                    case 'image':
                      return (
                        <div
                          key={index}
                          className="my-8 rounded-xl overflow-hidden border-2 cursor-pointer hover:border-[#16f2b3] transition-all duration-300"
                          style={{ borderColor: 'var(--border-color)' }}
                          onClick={() => setSelectedImage(block.url)}
                        >
                          <div className="relative aspect-video">
                            <Image
                              src={block.url}
                              alt={block.alt || 'Blog image'}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </div>
                      );
                    case 'code':
                      return (
                        <pre key={index} className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto my-4">
                          <code className="text-sm">{block.content}</code>
                        </pre>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>

            {/* Tags */}
            {tagsArray.length > 0 && (
              <div className="rounded-2xl p-6 border mb-8 transition-all duration-300" style={{
                background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
                borderColor: 'var(--border-color)'
              }}>
                <div className="flex items-center gap-3 mb-4">
                  <FaTag className="text-[#16f2b3]" />
                  <h3 className="text-lg font-semibold transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                    {language === 'ar' ? 'الوسوم' : 'Tags'}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tagsArray.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-300 hover:border-[#16f2b3]"
                      style={{
                        backgroundColor: 'var(--background-tertiary)',
                        color: 'var(--text-primary)',
                        borderColor: 'var(--border-color)'
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Image Gallery */}
            {blog.content_images && blog.content_images.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
                  {language === 'ar' ? 'معرض الصور' : 'Image Gallery'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {blog.content_images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className="relative aspect-video rounded-xl overflow-hidden border-2 cursor-pointer group transition-all duration-300 hover:border-[#16f2b3]"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <Image
                        src={img}
                        alt={`${title} - Image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Overlay with zoom icon */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#16f2b3] p-2 rounded-full">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* External Link */}
            {blog.url && (
              <div className="rounded-2xl p-6 border mb-8 transition-all duration-300" style={{
                background: 'linear-gradient(to bottom right, var(--background-secondary), var(--background-primary))',
                borderColor: 'var(--border-color)'
              }}>
                <Link href={blog.url} target="_blank">
                  <button className="w-full bg-gradient-to-r from-[#16f2b3] to-cyan-500 hover:from-cyan-500 hover:to-[#16f2b3] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                    {language === 'ar' ? 'اقرأ المقال الأصلي' : 'Read Original Article'}
                  </button>
                </Link>
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
              {language === 'ar' ? 'هل استمتعت بهذه المقالة؟' : 'Enjoyed This Article?'}
            </h2>
            <p className="text-lg mb-8 transition-colors duration-300 text-center hero-description" style={{ color: 'var(--text-muted)' }}>
              {language === 'ar'
                ? 'دعنا نبقى على تواصل ونناقش المزيد من الأفكار الرائعة!'
                : "Let's stay connected and discuss more amazing ideas!"}
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

