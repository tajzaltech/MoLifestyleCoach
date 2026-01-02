import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ZenContext = createContext();

export const ZenProvider = ({ children }) => {
    // Default to true as per user request (Auto-start)
    const [isZenMode, setIsZenMode] = useState(true);
    const audioRef = useRef(new Audio('/zen sound.mp3'));

    useEffect(() => {
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // Better error handling for audio
        audioRef.current.onerror = (e) => {
            console.error("Zen Mode Audio Error:", e);
        };

        // Browser policy: Autoplay only allowed after user interaction
        const handleInteraction = () => {
            if (isZenMode) {
                audioRef.current.play().catch(e => {
                    if (e.name !== 'NotAllowedError') {
                        console.error("Playback failed:", e);
                    }
                });
            }
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('scroll', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('scroll', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, [isZenMode]);

    useEffect(() => {
        if (isZenMode) {
            document.body.classList.add('zen-mode');
            audioRef.current.play().catch(e => {
                // NotAllowedError is expected before interaction
                if (e.name !== 'NotAllowedError') {
                    console.log("Initial play blocked or failed", e);
                }
            });
        } else {
            document.body.classList.remove('zen-mode');
            audioRef.current.pause();
        }
    }, [isZenMode]);

    const toggleZenMode = () => {
        setIsZenMode(prev => !prev);
    };

    return (
        <ZenContext.Provider value={{ isZenMode, toggleZenMode }}>
            {children}
        </ZenContext.Provider>
    );
};

export const useZen = () => {
    const context = useContext(ZenContext);
    if (!context) {
        throw new Error('useZen must be used within a ZenProvider');
    }
    return context;
};
