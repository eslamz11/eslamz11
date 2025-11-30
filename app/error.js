'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#16f2b3] to-violet-500 bg-clip-text text-transparent">
                Something went wrong!
            </h2>
            <p className="text-gray-400 mb-8 max-w-md">
                We apologize for the inconvenience. An unexpected error has occurred.
            </p>
            <button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                }
                className="px-6 py-3 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-medium hover:from-violet-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
            >
                Try again
            </button>
        </div>
    );
}
