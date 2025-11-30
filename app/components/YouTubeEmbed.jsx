'use client';

/**
 * YouTube Embed Component
 * Converts YouTube URLs to embeddable format and displays them
 */

function getYouTubeId(url) {
    if (!url) return null;

    // Handle different YouTube URL formats
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/shorts\/([^&\n?#]+)/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    return null;
}

export default function YouTubeEmbed({ url, title = "YouTube video" }) {
    const videoId = getYouTubeId(url);

    if (!videoId) {
        return (
            <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-10"></div>
                <div className="relative bg-red-50 border-2 border-red-200 text-red-700 px-5 py-4 rounded-xl">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-0.5">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-sm">Invalid YouTube URL</p>
                            <p className="text-xs mt-1 opacity-80">Please provide a valid YouTube video URL</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 rounded-xl opacity-0 group-hover/video:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none"></div>
            
            {/* Video Container */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl ring-2 ring-slate-200 dark:ring-slate-700 group-hover/video:ring-red-500/50 transition-all duration-300">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full border-0"
                />
            </div>
        </div>
    );
}
