import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const ZenContext = createContext();

export const ZenProvider = ({ children }) => {
    // Default to false - user must click to enable
    const [isZenMode, setIsZenMode] = useState(false);
    const audioRef = useRef(new Audio('/Zen 1.mp3'));

    const hasInteractedRef = useRef(false);

    useEffect(() => {
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // Better error handling for audio
        audioRef.current.onerror = (e) => {
            console.error("Zen Mode Audio Error:", e);
        };

        // Attempt to play immediately if Zen mode is on
        if (isZenMode && !hasInteractedRef.current) {
            audioRef.current.play().catch(() => {
                // Silently fail - will retry on interaction
            });
        }

        // Browser policy: Autoplay only allowed after user interaction
        const handleInteraction = () => {
            if (!hasInteractedRef.current) {
                hasInteractedRef.current = true;
                if (isZenMode) {
                    audioRef.current.play().catch(e => {
                        console.error("Playback failed:", e);
                    });
                }
            }
        };

        // Listen to multiple interaction types
        window.addEventListener('click', handleInteraction, { once: true });
        window.addEventListener('touchstart', handleInteraction, { once: true });
        window.addEventListener('scroll', handleInteraction, { once: true });
        window.addEventListener('keydown', handleInteraction, { once: true });

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
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
