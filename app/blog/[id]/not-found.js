import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1224] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl md:text-8xl font-bold text-[#16f2b3] mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">المدونة غير موجودة</h2>
        <p className="text-gray-400 mb-8 text-lg">
          عذراً، لم نتمكن من العثور على المدونة التي تبحث عنها
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          <FaArrowLeft />
          <span>العودة إلى المدونات</span>
        </Link>
      </div>
    </div>
  );
}

