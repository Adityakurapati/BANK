'use client'

import { useState } from "react";

export function FullscreenButton() {
        const [isFullscreen, setIsFullscreen] = useState(false);

        const toggleFullScreen = () => {
                if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen();
                        setIsFullscreen(true);
                } else if (document.exitFullscreen) {
                        document.exitFullscreen();
                        setIsFullscreen(false);
                }
        };

        return (
                <button
                        onClick={toggleFullScreen}
                        className="fixed bottom-4 right-4 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
                >
                        {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </button>
        );
}
