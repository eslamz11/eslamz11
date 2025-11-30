'use client';

import { Inter } from "next/font/google";
import "./css/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1224] text-white px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#16f2b3] to-violet-500 bg-clip-text text-transparent">
                        Critical Error
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md">
                        A critical error occurred in the application. Please try refreshing the page.
                    </p>
                    <button
                        onClick={() => reset()}
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-violet-600 to-pink-600 text-white font-bold hover:from-violet-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-violet-500/25"
                    >
                        Refresh Page
                    </button>
                </div>
            </body>
        </html>
    );
}
