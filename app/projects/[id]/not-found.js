import Link from 'next/link';
import { FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0d1224] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full blur-xl opacity-50"></div>
            <div className="relative bg-gradient-to-r from-yellow-600 to-orange-600 p-6 rounded-full">
              <FaExclamationTriangle className="text-white text-5xl" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Project Not Found
        </h2>
        <p className="text-gray-400 mb-8 text-lg">
          Sorry, the project you're looking for doesn't exist or has been removed.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/projects">
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 w-full sm:w-auto">
              <FaArrowLeft />
              <span>Back to Projects</span>
            </button>
          </Link>
          <Link href="/">
            <button className="flex items-center justify-center gap-2 border border-[#1b2c68a0] hover:border-[#16f2b3] text-gray-300 hover:text-[#16f2b3] font-medium px-6 py-3 rounded-lg transition-all duration-300 w-full sm:w-auto">
              <span>Go to Home</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

