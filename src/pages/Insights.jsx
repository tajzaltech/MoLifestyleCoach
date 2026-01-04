import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Insights.css';

import { articles } from '../data/articles';

// Assets placeholders (using Unsplash for prototype)
const HERO_BG = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop";

const Insights = () => {
    const [activeBook, setActiveBook] = useState(null);
    const navigate = useNavigate();
    const [typedText, setTypedText] = useState('');
    const [isMindfulPaused, setIsMindfulPaused] = useState(false);
    const [timeContext, setTimeContext] = useState({ label: '', quote: '' });
    const [visitorCount, setVisitorCount] = useState(142);
    const [mindfulStep, setMindfulStep] = useState(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [parallax, setParallax] = useState({ x: 0, y: 0 });
    const audioRef = useRef(null);

    const mindfulMessages = [
        "Inhale slowly... hold the stillness.",
        "Exhale... release the weight.",
        "Deep breath in... feel the life within.",
        "Soft breath out... let go of everything.",
        "The noise of the world is fading away.",
        "You are exactly where you need to be.",
        "Focus on the gentle pulse of existence.",
        "Your vision is becoming crystal clear.",
        "Peace is not a destination, it is your nature.",
        "Feel the heartbeat of your own potential.",
        "The world is waiting for your best self.",
        "Carry this clarity into your next chapter."
    ];

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };

    const handleEndSession = () => {
        if (window.location.hash === '#zen') {
            window.history.back();
        } else {
            stopAudio();
            setIsMindfulPaused(false);
        }
    };

    const handleConnect = () => {
        stopAudio();
        setIsMindfulPaused(false);
        // Clear hash before navigating
        if (window.location.hash === '#zen') {
            window.history.replaceState(null, '', window.location.pathname);
        }
        navigate('/connect');
    };

    // Mouse tracking for Star-Dust & Parallax
    useEffect(() => {
        if (!isMindfulPaused) return;
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            setMousePos({ x: clientX, y: clientY });

            // Calculate parallax shift
            const moveX = (clientX - window.innerWidth / 2) / 50;
            const moveY = (clientY - window.innerHeight / 2) / 50;
            setParallax({ x: moveX, y: moveY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [isMindfulPaused]);

    // Audio Control Logic
    useEffect(() => {
        if (isMindfulPaused) {
            audioRef.current = new Audio('/Zen 1.mp3');
            audioRef.current.loop = true;
            audioRef.current.volume = 0;
            audioRef.current.play().catch(e => console.log("Audio play blocked", e));

            // Fade in
            let vol = 0;
            const fadeIn = setInterval(() => {
                if (vol < 0.4) {
                    vol += 0.05;
                    if (audioRef.current) audioRef.current.volume = vol;
                } else {
                    clearInterval(fadeIn);
                }
            }, 100);
        } else {
            if (audioRef.current) {
                // Fade out
                let vol = audioRef.current.volume;
                const fadeOut = setInterval(() => {
                    if (vol > 0.05) {
                        vol -= 0.05;
                        audioRef.current.volume = vol;
                    } else {
                        audioRef.current.pause();
                        audioRef.current = null;
                        clearInterval(fadeOut);
                    }
                }, 100);
            }
        }
        // Cleanup on unmount or state change
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, [isMindfulPaused]);

    useEffect(() => {
        let stepInterval;
        if (isMindfulPaused) {
            setMindfulStep(0);
            stepInterval = setInterval(() => {
                setMindfulStep(prev => (prev < mindfulMessages.length - 1 ? prev + 1 : prev));
            }, 4500); // Slower for "Sukoon"
        } else {
            setMindfulStep(0);
        }
        return () => clearInterval(stepInterval);
    }, [isMindfulPaused]);

    // Scroll Lock Logic
    useEffect(() => {
        if (isMindfulPaused) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isMindfulPaused]);

    // Sync Hash with Mindful Pause (Fixes Back Button)
    useEffect(() => {
        if (isMindfulPaused) {
            window.location.hash = 'zen';
        } else {
            if (window.location.hash === '#zen') {
                window.history.replaceState(null, '', window.location.pathname);
            }
        }

        const handlePopState = () => {
            if (window.location.hash !== '#zen') {
                setIsMindfulPaused(false);
                stopAudio();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [isMindfulPaused]);

    // Determines the time context for the user
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            setTimeContext({ label: 'Mornings of Impact', quote: 'The first hour of your day belongs to your mind. Protect it ruthlessly.' });
        } else if (hour >= 12 && hour < 17) {
            setTimeContext({ label: 'Afternoon Clarity', quote: 'Deep focus is a superpower. Channel your peak energy into what actually matters.' });
        } else if (hour >= 17 && hour < 21) {
            setTimeContext({ label: 'Evening Detachment', quote: 'The world can wait. Reclaim your peace and prepare for deep reflection.' });
        } else {
            setTimeContext({ label: 'Midnight Reflections', quote: 'The quiet of the night is where the soul finds its rhythm. Reflect, then rest.' });
        }

        // Simulate live visitor pulse
        const interval = setInterval(() => {
            setVisitorCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    // Typing animation effect for "Insights"
    useEffect(() => {
        const fullText = 'Insights';
        let currentIndex = 0;

        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setTypedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 150);

        return () => clearInterval(typingInterval);
    }, []);

    const fadeUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const resources = [
        {
            title: "The Clarity Workbook",
            desc: "A 20-page guided PDF to deconstruct your current confusion and map your core values.",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 0 0 0 2 2h12a2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        },
        {
            title: "Daily Zen Planner",
            desc: "A minimalist notion template for tracking energy, not just time. Designed for flow state.",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
        },
        {
            title: "Values Assessment Tool",
            desc: "Interactive worksheet to rank and define your top 5 core values.",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        },
        {
            title: "Burnout Recovery Protocol",
            desc: "A clinical roadmap for recovering from severe professional exhaustion.",
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
        }
    ];

    const books = [
        {
            title: "Man's Search for Meaning",
            author: "Viktor E. Frankl",
            cover: "https://covers.openlibrary.org/b/isbn/9780671023379-L.jpg",
            amazonLink: "https://www.amazon.co.uk/Mans-Search-Meaning-Viktor-Frankl/dp/0671023373",
            summary: "Viktor Frankl's memoir of life in Nazi death camps and his discovery of logotherapy. He argues that the primary drive in humans is not pleasure, but the discovery and pursuit of what they personally find meaningful. Even in the most extreme conditions, the last of human freedoms is the ability to choose one's attitude and way of life.",
            quote: "Everything can be taken from a man but one thing: the last of the human freedoms — to choose one’s attitude in any given set of circumstances, to choose one’s own way.",
            lessons: [
                "Meaning can be found in three things: work (heroic tasks), love (caring for another), and the attitude toward unavoidable suffering.",
                "Life is never made unbearable by circumstances, but only by lack of meaning and purpose.",
                "Success, like happiness, cannot be pursued; it must ensue as the unintended side effect of one's personal dedication to a cause greater than oneself.",
                "He who has a way to live can bear almost any how."
            ],
            takeaway: "Internal meaning is the ultimate anchor. If your 'Why' is strong enough, no external 'How' can break you."
        },
        {
            title: "Atomic Habits",
            author: "James Clear",
            cover: "https://covers.openlibrary.org/b/isbn/9781847941831-L.jpg",
            amazonLink: "https://www.amazon.co.uk/Atomic-Habits-Proven-Build-Break/dp/1847941834",
            summary: "A revolutionary guide to making tiny changes that compound into remarkable results. Clear explains that big goals shouldn't be your focus; instead, you should build systems—the atomic habits that lead to those goals. By understanding the cue, craving, response, and reward cycle, you can master your behavior and your life.",
            quote: "You do not rise to the level of your goals. You fall to the level of your systems.",
            lessons: [
                "The 1% Rule: Small improvements (1% daily) lead to massive compounding growth over time.",
                "Identity-Based Habits: Stop focusing on what you want to achieve; focus on the type of person you want to become.",
                "Environment Design: Make the cues for good habits obvious and the cues for bad habits invisible.",
                "The Plateau of Latent Potential: Breakthrough moments are often the result of many previous actions, which build up the potential required to unleash a major change."
            ],
            takeaway: "Your life is the sum of your habits. Master the systems, and the goals will take care of themselves."
        },
        {
            title: "Deep Work",
            author: "Cal Newport",
            cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
            amazonLink: "https://www.amazon.co.uk/Deep-Work-Focused-Success-Distracted/dp/1455586692",
            summary: "Cal Newport defines Deep Work as the ability to focus without distraction on a cognitively demanding task. In an age of constant connectivity and shallow distractions, the ability to engage in deep work is becoming increasingly rare and valuable. This book provides a rigorous training regimen to transform your mind and habits to support deep work.",
            quote: "Clarity about what matters provides clarity about what does not.",
            lessons: [
                "Shallow work vs. Deep work: Shallow work is non-cognitively demanding, logistical-style tasks, often performed while distracted. Deep work produces new value and is hard to replicate.",
                "The Deep Work Hypothesis: The ability to perform deep work is becoming increasingly rare at exactly the same time it is becoming increasingly valuable in our economy.",
                "Productive Meditation: Focus your attention on a single well-defined professional problem while you are occupied physically (walking, showering).",
                "Embrace Boredom: Abandon the need for constant stimulation to re-train your neural circuits for focus."
            ],
            takeaway: "Focus is the modern currency. To produce at your peak level, you must leave the shallow waters of distraction."
        },
        {
            title: "Thinking, Fast and Slow",
            author: "Daniel Kahneman",
            cover: "https://covers.openlibrary.org/b/isbn/9780141033570-L.jpg",
            amazonLink: "https://www.amazon.co.uk/Thinking-Fast-Slow-Daniel-Kahneman/dp/0141033576",
            summary: "Nobel laureate Daniel Kahneman takes us on a tour of the mind and explains the two systems that drive our thinking. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. Kahneman reveals where we can and cannot trust our intuitions and how we can tap into the benefits of slow thinking.",
            quote: "We can be blind to the obvious, and we are also blind to our blindness.",
            lessons: [
                "Loss Aversion: The psychological pain of losing is about twice as powerful as the pleasure of gaining.",
                "Anchoring Effect: The tendency to rely too heavily on the first piece of information offered (the 'anchor') when making decisions.",
                "Availability Heuristic: We judge the probability of an event based on how easily examples come to mind.",
                "Peak-End Rule: We judge an experience largely based on how we felt at its peak and at its end, rather than the total sum."
            ],
            takeaway: "Your brain is designed for survival, not logic. Recognize your biases to make truly rational decisions."
        },
        {
            title: "The Almanack of Naval Ravikant",
            author: "Eric Jorgenson",
            cover: "https://covers.openlibrary.org/b/isbn/9781544514215-L.jpg",
            amazonLink: "https://www.amazon.co.uk/Almanack-Naval-Ravikant-Wealth-Happiness/dp/1544514212",
            summary: "A collection of Naval Ravikant's wisdom on wealth creation and happiness. Naval argues that building wealth is a skill you can learn, and happiness is a choice you can make. He emphasizes the importance of leverage (code, media, capital), specific knowledge, and long-term thinking in achieving both financial freedom and mental peace.",
            quote: "Earn with your mind, not your time.",
            lessons: [
                "Leverage is the force multiplier of your effort. Use code, media, or capital to disconnect your output from your time.",
                "Specific Knowledge is the stuff you cannot be trained for. If the society can train you, it can train someone else and replace you.",
                "Happiness is the state when nothing is missing. It is a default state that we disrupt with our own desires.",
                "Foundational Reading: Read what you love until you love to read. Then read the classics and original sources."
            ],
            takeaway: "True wealth is having assets that earn while you sleep. True happiness is being at peace with the present moment."
        }
    ];

    const handleDownload = () => {
        alert("To access this premium resource, please join our newsletter if you haven't already. \n\n(Starting download...)");
    };

    const carouselRef = useRef(null);

    // Auto-Scroll Logic
    useEffect(() => {
        const carousel = carouselRef.current;
        if (!carousel) return;

        let animationId;
        const speed = 1; // Speed of scroll

        const startScrolling = () => {
            if (Math.ceil(carousel.scrollLeft) >= carousel.scrollWidth - carousel.clientWidth) {
                carousel.scrollLeft = 0;
            }
            carousel.scrollLeft += speed;
            animationId = requestAnimationFrame(startScrolling);
        };

        const stopScrolling = () => cancelAnimationFrame(animationId);

        const handleMouseEnter = () => stopScrolling();
        const handleMouseLeave = () => {
            animationId = requestAnimationFrame(startScrolling);
        };

        // Start
        animationId = requestAnimationFrame(startScrolling);

        carousel.addEventListener('mouseenter', handleMouseEnter);
        carousel.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup
        return () => {
            cancelAnimationFrame(animationId);
            if (carousel) {
                carousel.removeEventListener('mouseenter', handleMouseEnter);
                carousel.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, []);

    const extendedArticles = [...articles, ...articles]; // Double for longer scroll

    return (
        <div className="insights-page">


            {/* HERO SECTION - LIGHT MODE 3D */}
            <section className="insights-hero-light">
                {/* 3D Floating Elements */}
                <div className="glass-pane pane-1"></div>
                <div className="glass-pane pane-2"></div>
                <div className="glass-pane pane-3"></div>
                <div className="zen-light-streaks">
                    <div className="streak streak-1"></div>
                    <div className="streak streak-2"></div>
                </div>

                <div className="container">
                    <motion.div
                        className="hero-content-light"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <motion.div
                            className="wisdom-badge"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            <span className="badge-shine"></span>
                            The Wisdom Vault
                        </motion.div>

                        <h1 className="hero-title-light">
                            Premium{' '}
                            <span className="typed-text">
                                {typedText}
                                <span className="cursor-blink">|</span>
                            </span>
                            <br />
                            <span className="gradient-text">for Ambitious Minds</span>
                        </h1>

                        <motion.p
                            className="hero-desc-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                        >
                            Dive into curated psychological frameworks, mental models, and transformative essays.
                            <br />
                            Your sanctuary for intellectual growth and peak performance.
                        </motion.p>

                        <motion.div
                            className="hero-stats-light"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            <div className="stat-item">
                                <div className="stat-number">6</div>
                                <div className="stat-label">Deep Articles</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">8</div>
                                <div className="stat-label">Book Summaries</div>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <div className="stat-number">3</div>
                                <div className="stat-label">Free Resources</div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* --- THE CLARITY CHAMBER (LIVING REFLECTION) --- */}
            <section className="clarity-chamber-section">
                <div className="container">
                    <div className="chamber-inner">
                        {!isMindfulPaused && (
                            <motion.div
                                className="breathing-orb-container"
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="breathing-orb-glow"></div>
                                <div className="breathing-orb-liquid"></div>
                            </motion.div>
                        )}

                        <motion.div
                            className="chamber-content"
                            {...fadeUp}
                        >
                            <div className="time-context-label">
                                <span className="pulse-dot"></span>
                                {timeContext.label}
                            </div>
                            <h2 className="chamber-quote">"{timeContext.quote}"</h2>

                            <motion.button
                                className={`btn-mindful-pause ${isMindfulPaused ? 'active' : ''}`}
                                onClick={() => setIsMindfulPaused(!isMindfulPaused)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isMindfulPaused ? 'Reconnecting...' : 'Take a Mindful Second'}
                            </motion.button>

                            <div className="visitor-pulse">
                                <span className="count">{visitorCount}</span> minds reflecting with you right now
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {isMindfulPaused && (
                                <motion.div
                                    className="pause-overlay high-fidelity"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Central 3D Soul (Orb moved here for perfect centering and layering) */}
                                    <motion.div
                                        className="breathing-orb-container supernova-zen"
                                        animate={{ scale: [1.2, 1.3, 1.2] }}
                                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    >
                                        <div className="breathing-orb-glow"></div>
                                        <div className="zen-lotus-aura"></div>
                                        <div className="breathing-orb-liquid"></div>
                                    </motion.div>
                                    {/* Atmospheric God Rays */}
                                    <div className="zen-light-beams">
                                        {[...Array(5)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className={`light-beam beam-${i}`}
                                                animate={{
                                                    opacity: [0.1, 0.4, 0.1],
                                                    rotate: [i * 15, i * 15 + 5, i * 15]
                                                }}
                                                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                                            />
                                        ))}
                                    </div>

                                    {/* 3D Deep-Field Petals */}
                                    <div className="zen-deep-field">
                                        {[...Array(12)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className={`zen-petal petal-${i % 3}`}
                                                initial={{
                                                    x: Math.random() * window.innerWidth,
                                                    y: Math.random() * window.innerHeight,
                                                    rotate: Math.random() * 360,
                                                    scale: 0.5 + Math.random()
                                                }}
                                                animate={{
                                                    y: [null, -100, window.innerHeight + 100],
                                                    x: [null, Math.random() * 50, -Math.random() * 50],
                                                    rotate: [null, 180, 360]
                                                }}
                                                transition={{
                                                    duration: 10 + Math.random() * 15,
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                    delay: -Math.random() * 20
                                                }}
                                                style={{
                                                    filter: i % 2 === 0 ? 'blur(4px)' : 'none',
                                                    zIndex: i % 2 === 0 ? 1 : 10
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Star-Dust Background (Static for Stillness) */}
                                    <motion.div
                                        className="star-dust-emitter"
                                        initial={{ x: '50%', y: '50%' }}
                                    >
                                        {[...Array(6)].map((_, i) => (
                                            <motion.span
                                                key={i}
                                                className="star-sparkle"
                                                animate={{
                                                    scale: [0, 1.2, 0],
                                                    opacity: [0, 1, 0],
                                                    x: (Math.random() - 0.5) * 60,
                                                    y: (Math.random() - 0.5) * 60
                                                }}
                                                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                                            />
                                        ))}
                                    </motion.div>

                                    {/* Floating Light Particles */}
                                    <div className="mindful-particles">
                                        {[...Array(20)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="particle"
                                                initial={{
                                                    x: Math.random() * window.innerWidth,
                                                    y: Math.random() * window.innerHeight,
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    y: [null, -100, -200],
                                                    opacity: [0, 0.8, 0],
                                                    scale: [0, 1.5, 0]
                                                }}
                                                transition={{
                                                    duration: 4 + Math.random() * 4,
                                                    repeat: Infinity,
                                                    delay: Math.random() * 5
                                                }}
                                            />
                                        ))}
                                    </div>

                                    {/* Ambient Visualizer Wave */}
                                    <div className="mindful-visualizer">
                                        {[...Array(3)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="visualizer-wave"
                                                animate={{
                                                    height: [40, 80, 40],
                                                    opacity: [0.1, 0.3, 0.1]
                                                }}
                                                transition={{
                                                    duration: 3 + i,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <motion.div
                                        className="pause-reveal-content-v2"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{
                                            scale: 1,
                                            opacity: 1
                                        }}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <div className="mindful-message-container">
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={mindfulStep}
                                                    initial={{ y: 20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    exit={{ y: -20, opacity: 0 }}
                                                    transition={{ duration: 0.8 }}
                                                    className="mindful-message-display"
                                                >
                                                    {mindfulMessages[mindfulStep]}
                                                    <motion.span
                                                        className="heart-pulse-v3"
                                                        animate={{ scale: [1, 1.15, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                    >
                                                        💖
                                                    </motion.span>
                                                </motion.div>
                                            </AnimatePresence>
                                        </div>

                                        {mindfulStep === mindfulMessages.length - 1 && (
                                            <div className="mindful-actions-v3">
                                                <motion.button
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="btn-resume-magic"
                                                    onClick={handleEndSession}
                                                >
                                                    End Session
                                                </motion.button>
                                                <motion.button
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    className="btn-connect-zen"
                                                    onClick={handleConnect}
                                                >
                                                    Connect for Guidance
                                                </motion.button>
                                            </div>
                                        )}
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* CURATED ARTICLES */}
            <section className="curated-intelligence">
                <div className="container">
                    <div className="section-head-mb">
                        <span className="section-label">CURATED WISDOM</span>
                        <h2>The Insights Engine</h2>
                        <div className="section-divider"></div>
                        <p className="section-sub">A high-fidelity collection of psychological principles and deep-performance frameworks.</p>
                    </div>

                    <div className="intelligence-carousel-wrapper">
                        <div className="intelligence-carousel" ref={carouselRef}>
                            {extendedArticles.map((article, i) => (
                                <motion.div
                                    className="article-card-compact"
                                    key={i}
                                    whileHover={{ y: -8 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onClick={() => navigate(`/insights/article/${article.id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="article-image-compact">
                                        <div className="article-overlay-compact">
                                            <span className="article-tag-compact">{article.tag}</span>
                                        </div>
                                        <img src={article.image} alt={article.title} />
                                    </div>
                                    <div className="article-content-compact">
                                        <div className="meta-row">
                                            <span className="read-timestamp">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                                {article.readTime}
                                            </span>
                                        </div>
                                        <h3>{article.title}</h3>
                                        <button className="btn-read-article">
                                            Read Article
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        {/* Fade effect for carousel scroll hint */}
                        <div className="carousel-fade-right"></div>
                        <div className="carousel-fade-left"></div>
                    </div>
                </div>
            </section>


            {/* 3D LIBRARY SHELF */}
            <section className="library-section">
                <div className="container">
                    <div className="library-header">
                        <span className="section-label">THE FOUNDATION</span>
                        <h2>Interactive Library</h2>
                        <p>Tap on a book to open and read the summary.</p>
                    </div>

                    <div className="book-shelf-3d">
                        {books.map((book, i) => (
                            <div
                                className="book-container-3d"
                                key={i}
                                onClick={() => setActiveBook(book)}
                            >
                                <motion.div
                                    className="book-3d"
                                    initial={false}
                                    whileHover="hover"
                                >
                                    <div className="book-cover-3d">
                                        <img src={book.cover} alt={book.title} />
                                        <div className="book-shine"></div>
                                    </div>
                                    <div className="book-spine"></div>
                                    <div className="book-inner-page">
                                        <h4>{book.title}</h4>
                                        <p>Click to read summary...</p>
                                    </div>
                                    <div className="book-pages"></div>
                                    <div className="book-back-cover"></div>
                                </motion.div>
                                <div className="book-shadow"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BOOK READER MODAL */}
            <AnimatePresence>
                {activeBook && (
                    <motion.div
                        className="book-reader-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setActiveBook(null)}
                    >
                        <motion.div
                            className="book-reader-modal"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="reader-close" onClick={() => setActiveBook(null)}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                            </button>
                            <div className="reader-layout">
                                <div className="reader-cover">
                                    <img src={activeBook.cover} alt={activeBook.title} />
                                </div>
                                <div className="reader-content">
                                    <span className="reader-subtitle">IMPACT SUMMARY</span>
                                    <h2>{activeBook.title}</h2>
                                    <span className="reader-author">by {activeBook.author}</span>

                                    <div className="reader-quote">
                                        "{activeBook.quote}"
                                    </div>

                                    <div className="reader-sections">
                                        <div className="reader-section">
                                            <h4>Core Concept</h4>
                                            <p>{activeBook.summary}</p>
                                        </div>

                                        <div className="reader-section">
                                            <h4>Key Lessons</h4>
                                            <ul className="lessons-list">
                                                {activeBook.lessons.map((lesson, idx) => (
                                                    <li key={idx}>
                                                        <span className="bullet"></span>
                                                        {lesson}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="reader-section highlight">
                                            <h4>Actionable Takeaway</h4>
                                            <p>{activeBook.takeaway}</p>
                                        </div>
                                    </div>

                                    <div className="reader-actions">
                                        <button
                                            className="btn-mark-read"
                                            onClick={() => setActiveBook(null)}
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                                            I've Internalized This
                                        </button>

                                        {activeBook.amazonLink && (
                                            <a
                                                href={activeBook.amazonLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn-amazon-link"
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                                                Get on Amazon
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}


                {/* STRATEGIC FRAMEWORKS GALLERY */}
                <section className="mental-models-section">
                    <div className="container">
                        <motion.div
                            className="models-header"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="section-badge-accent">INTELLECTUAL ARCHITECTURE</span>
                            <h2 className="models-title">Strategic Frameworks for Peak Performance</h2>
                            <p className="models-desc">
                                Reconstruct your strategic backbone with the analytical tools used by history's most effective minds.
                            </p>
                        </motion.div>

                        <div className="models-grid">
                            <motion.div
                                className="model-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                whileHover={{ y: -8, rotateY: 5 }}
                            >
                                <div className="model-icon-wrapper">
                                    <div className="model-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                    </div>
                                </div>
                                <h3>First Principles Thinking</h3>
                                <p>Break down complex problems to their fundamental truths. Rebuild from the ground up.</p>
                                <span className="model-tag">Strategy</span>
                            </motion.div>

                            <motion.div
                                className="model-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                whileHover={{ y: -8, rotateY: 5 }}
                            >
                                <div className="model-icon-wrapper">
                                    <div className="model-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                                    </div>
                                </div>
                                <h3>Pareto Principle</h3>
                                <p>80% of results come from 20% of efforts. Focus ruthlessly on what moves the needle.</p>
                                <span className="model-tag">Productivity</span>
                            </motion.div>

                            <motion.div
                                className="model-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                whileHover={{ y: -8, rotateY: 5 }}
                            >
                                <div className="model-icon-wrapper">
                                    <div className="model-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 2v6h6M21.5 22v-6h-6" /><path d="M22 11.5A10 10 0 0 0 3.2 7.2M2 12.5a10 10 0 0 0 18.8 4.2" /></svg>
                                    </div>
                                </div>
                                <h3>Inversion</h3>
                                <p>Instead of asking how to succeed, ask what causes failure—then avoid it.</p>
                                <span className="model-tag">Decision Making</span>
                            </motion.div>

                            <motion.div
                                className="model-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                whileHover={{ y: -8, rotateY: 5 }}
                            >
                                <div className="model-icon-wrapper">
                                    <div className="model-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                                    </div>
                                </div>
                                <h3>Compound Effect</h3>
                                <p>Small consistent actions create exponential results. Time is your ally or your enemy.</p>
                                <span className="model-tag">Growth</span>
                            </motion.div>

                            <motion.div
                                className="model-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ y: -8, rotateY: 5 }}
                            >
                                <div className="model-icon-wrapper">
                                    <div className="model-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6M3 22v-6h6M21 13a9 9 0 1 1-3-7.7L21 8M3 11a9 9 0 0 1 3-7.7L3 6" /></svg>
                                    </div>
                                </div>
                                <h3>Feedback Loops</h3>
                                <p>What you measure improves. Create systems that give you real-time data on progress.</p>
                                <span className="model-tag">Systems</span>
                            </motion.div>

                            <motion.div
                                className="model-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ y: -8, rotateY: 5 }}
                            >
                                <div className="model-icon-wrapper">
                                    <div className="model-icon">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z" /></svg>
                                    </div>
                                </div>
                                <h3>Probabilistic Thinking</h3>
                                <p>Think in bets, not certainties. Estimate odds and position yourself for asymmetric upside.</p>
                                <span className="model-tag">Risk Management</span>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </AnimatePresence>
        </div>
    );
};

export default Insights;
