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
    const [midnightQuoteIndex, setMidnightQuoteIndex] = useState(0);
    const audioRef = useRef(null);
    const canvasRef = useRef(null);

    const midnightQuotes = [
        "The quiet of the night is where the soul finds its rhythm. Reflect, then rest.",
        "In darkness, we find the light of our deepest thoughts.",
        "The moon whispers secrets to those who listen in silence.",
        "Midnight is not an end—it is a portal to your inner truth.",
        "Stillness speaks louder than the chaos of daylight."
    ];

    const mindfulMessages = [
        "🌬️ Inhale slowly... hold the stillness.",
        "🍂 Exhale... release the weight.",
        "🌿 Deep breath in... feel the life within.",
        "🕊️ Soft breath out... let go of everything.",
        "🌌 The noise of the world is fading away.",
        "🧘‍♂️ You are exactly where you need to be.",
        "💓 Focus on the gentle pulse of existence.",
        "💎 Your vision is becoming crystal clear.",
        "🌊 Peace is not a destination, it is your nature.",
        "❤️‍🔥 Feel the heartbeat of your own potential.",
        "🌏 The world is waiting for your best self.",
        "🌅 Carry this clarity into your next chapter."
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

    // --- Dynamic Quotes Database ---
    const morningQuotes = [
        "The first hour of your day belongs to your mind. Protect it ruthlessly.",
        "Win the morning, win the day. Your momentum starts now.",
        "Clarity comes from silence. Embrace the quiet start.",
        "Set your intention. Today is a canvas awaiting your stroke."
    ];

    const afternoonQuotes = [
        "Deep focus is a superpower. Channel your energy.",
        "Momentum is built one focused block at a time.",
        "Avoid the noise. Seek the signal.",
        "Your best work happens when you are fully present."
    ];

    const eveningQuotes = [
        "The world can wait. Reclaim your peace.",
        "Reflect on what went well. Learn from what didn't.",
        "Disconnect to reconnect with yourself.",
        "Prepare your mind for deep rest."
    ];

    const allDayQuotes = {
        morning: morningQuotes,
        afternoon: afternoonQuotes,
        evening: eveningQuotes,
        midnight: midnightQuotes
    };

    // Determines the Time Context & Active Quote Pool
    useEffect(() => {
        const hour = new Date().getHours();
        let currentLabel = '';
        let currentPool = [];

        if (hour >= 5 && hour < 12) {
            currentLabel = 'Mornings of Impact';
            currentPool = morningQuotes;
        } else if (hour >= 12 && hour < 17) {
            currentLabel = 'Afternoon Clarity';
            currentPool = afternoonQuotes;
        } else if (hour >= 17 && hour < 21) {
            currentLabel = 'Evening Detachment';
            currentPool = eveningQuotes;
        } else {
            currentLabel = 'Midnight Reflection';
            currentPool = midnightQuotes;
        }

        // Set initial or rotated quote
        // Use modulus to cycle through the specific pool based on the shared index
        const quoteToShow = currentPool[midnightQuoteIndex % currentPool.length];

        setTimeContext({
            label: currentLabel,
            quote: quoteToShow
        });

        // Simulate live visitor pulse
        const interval = setInterval(() => {
            setVisitorCount(prev => prev + (Math.random() > 0.5 ? 1 : -1));
        }, 3000);

        return () => clearInterval(interval);
    }, [midnightQuoteIndex]); // Updates whenever index changes (every 4s)

    // Global Rotation Timer (Run 24/7)
    useEffect(() => {
        const quoteInterval = setInterval(() => {
            setMidnightQuoteIndex((prev) => prev + 1); // Just increment indefinitely, we mod it above
        }, 4000); // Requested: Every 4 seconds

        return () => clearInterval(quoteInterval);
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

    const dailyChallenges = [
        {
            id: 1,
            title: "The Digital Minimalist",
            task: "Switch your phone to grayscale for the next 4 hours.",
            psychology: "Grayscale reduces the dopamine hit from vibrant app icons, lowering the urge for mindless scrolling.",
            label: "Dopamine Detox"
        },
        {
            id: 2,
            title: "The Negative Inversion",
            task: "Identify one goal and write down exactly how to fail at it.",
            psychology: "Inversion reveals hidden risks and self-sabotaging behaviors that logical planning often misses.",
            label: "Mental Modeling"
        },
        {
            id: 3,
            title: "The Zero-Option Block",
            task: "Go 60 minutes without any external input (no music, podcasts, or scrolling).",
            psychology: "Default Mode Network activation allows the brain to process unresolved thoughts and spark creativity.",
            label: "Cognitive Depth"
        },
        {
            id: 4,
            title: "The Observation Anchor",
            task: "Watch a single object in your room for 2 full minutes without judgement.",
            psychology: "Strengthens the prefrontal cortex by training voluntary attention against habitual distraction.",
            label: "Mindful Focus"
        },
        {
            id: 5,
            title: "The Courageous No",
            task: "Say 'no' to one minor request that doesn't align with your priority.",
            psychology: "Boundaries are a form of psychological hygiene, reducing resentment and preserving focused energy.",
            label: "Priority Alignment"
        }
    ];

    const [challengeOfDay, setChallengeOfDay] = useState(dailyChallenges[0]);
    const [challengeState, setChallengeState] = useState('idle'); // idle, in-progress, completed

    useEffect(() => {
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
        setChallengeOfDay(dailyChallenges[dayOfYear % dailyChallenges.length]);
    }, []);

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

    // --- GOLDEN SYNAPSE ANIMATION LOGIC ---
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        let mouse = { x: null, y: null };

        // resize
        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        };

        const initParticles = () => {
            particles = [];
            const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100); // Responsive count
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.6, // Slow subtle movement
                    vy: (Math.random() - 0.5) * 0.6,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw connections
            particles.forEach((p, i) => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw Particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(29, 56, 71, 0.12)'; // Ultra-low opacity
                ctx.fill();

                // Connect to other particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(29, 56, 71, ${0.08 - dist / 120 * 0.08})`; // Barely visible connections
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }

                // Connect to Mouse
                if (mouse.x) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(29, 56, 71, ${0.15 - dist / 150 * 0.15})`; // Subtle mouse reaction
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(animate);
        };

        // Mouse Listeners
        const onMouseMove = (e) => {
            // Adjust for canvas position if needed, usually e.clientX/Y works for full screen hero
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const onMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);

        handleResize(); // Init
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            if (canvas) {
                canvas.removeEventListener('mousemove', onMouseMove);
                canvas.removeEventListener('mouseleave', onMouseLeave);
            }
        };
    }, []);

    return (
        <div className="insights-page">


            {/* HERO SECTION - THE 3D PRISM (ACCENT THEME) */}
            <section className="insights-hero-3d">
                {/* 3D Background Layer */}
                <div className="hero-3d-elements">
                    <div className="wisdom-gyroscope">
                        <div className="gyro-ring ring-1"></div>
                        <div className="gyro-ring ring-2"></div>
                        <div className="gyro-ring ring-3"></div>
                        <div className="gyro-core"></div>
                    </div>
                </div>

                {/* Light Mesh for Softness */}
                <div className="hero-mesh-bg-soft">
                    <div className="mesh-orb orb-1"></div>
                    <div className="mesh-orb orb-2"></div>
                </div>

                <div className="container relative-z text-center">
                    <motion.div
                        className="hero-content-premium"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            className="wisdom-badge-premium"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <span className="sparkle-icon"></span>
                            The Wisdom Vault
                        </motion.div>

                        <h1 className="hero-title-premium">
                            <span className="title-lead">Curated Wisdom</span>
                            <br />
                            <span className="text-liquid-accent">For The Ambitious</span>
                        </h1>

                        <motion.p
                            className="hero-desc-premium"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 1 }}
                        >
                            A sanctuary for intellectual growth.
                            <br />
                            Explore mental models, psychology, and peak performance.
                        </motion.p>
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
                            <AnimatePresence mode="wait">
                                <motion.h2
                                    key={timeContext.quote}
                                    className="chamber-quote"
                                    initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                                    transition={{ duration: 0.8, ease: "easeInOut" }}
                                >
                                    "{timeContext.quote}"
                                </motion.h2>
                            </AnimatePresence>

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
                                    {/* Precision Back/Close Button for Mobile/Desktop */}
                                    <motion.button
                                        className="btn-close-zen"
                                        onClick={handleEndSession}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="19" y1="12" x2="5" y2="12"></line>
                                            <polyline points="12 19 5 12 12 5"></polyline>
                                        </svg>
                                        <span>Back</span>
                                    </motion.button>
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
                                                    initial={{ y: 15, opacity: 0, filter: 'blur(12px)', scale: 0.95 }}
                                                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                                                    exit={{ y: -15, opacity: 0, filter: 'blur(12px)', scale: 1.05 }}
                                                    transition={{ duration: 1.2, ease: "easeInOut" }}
                                                    className="mindful-message-display"
                                                >
                                                    {mindfulMessages[mindfulStep]}
                                                    <motion.span
                                                        className="heart-pulse-v3"
                                                        animate={{ scale: [1, 1.15, 1] }}
                                                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                    >
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
                    <div className="section-head-premium text-center mb-16">
                        <motion.span
                            className="section-badge-glass"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            CURATED WISDOM
                        </motion.span>
                        <motion.h2
                            className="section-title-premium"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            The Insights Engine
                        </motion.h2>
                        <motion.div
                            className="section-divider-center"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        ></motion.div>
                        <motion.p
                            className="section-desc-premium"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            A high-fidelity collection of psychological principles and deep-performance frameworks.
                        </motion.p>
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
                    <div className="section-head-premium text-center mb-16">
                        <motion.span
                            className="section-badge-glass"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            THE FOUNDATION
                        </motion.span>
                        <motion.h2
                            className="section-title-premium"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Interactive Library
                        </motion.h2>
                        <motion.div
                            className="section-divider-center"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        ></motion.div>
                        <motion.p
                            className="section-desc-premium"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Tap on a book to unlock its core insights and apply them to your life.
                        </motion.p>
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
{/* THE DAILY MICRO-CHALLENGE (ACTIONABLE WISDOM) */}
                <section className="daily-challenge-section">
                    <div className="container">
                        <AnimatePresence mode="wait">
                            {challengeState === 'idle' && (
                                <motion.div
                                    key="idle"
                                    className="challenge-premium-card"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="challenge-card-glow"></div>
                                    <div className="challenge-header">
                                        <div className="live-badge-premium">
                                            <span className="pulse-chip"></span>
                                            Challenge of the Day
                                        </div>
                                        <span className="challenge-pillar-label">{challengeOfDay.label}</span>
                                    </div>
                                    <div className="challenge-body">
                                        <h2 className="challenge-title-main">{challengeOfDay.title}</h2>
                                        <p className="challenge-task-instruction">{challengeOfDay.task}</p>
                                        <div className="psychology-insight-box">
                                            <div className="insight-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M12 16h.01M12 8h.01M12 12h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                                                </svg>
                                            </div>
                                            <div className="insight-text">
                                                <strong>The Science:</strong> {challengeOfDay.psychology}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="challenge-footer">
                                        <motion.button
                                            className="btn-complete-challenge"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setChallengeState('in-progress')}
                                        >
                                            Accept Challenge
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M5 12l5 5L20 7" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {challengeState === 'in-progress' && (
                                <motion.div
                                    key="in-progress"
                                    className="challenge-premium-card in-progress-mode"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <div className="focus-bg-animation"></div>
                                    <div className="challenge-header">
                                        <div className="focus-badge-premium">
                                            <span className="breathing-dot"></span>
                                            Focus Mode Active
                                        </div>
                                        <button className="btn-cancel-challenge" onClick={() => setChallengeState('idle')}>Cancel</button>
                                    </div>
                                    <div className="challenge-body">
                                        <span className="focus-target-label">YOUR MISSION</span>
                                        <h2 className="challenge-title-focus">{challengeOfDay.task}</h2>
                                        <div className="focus-motivation-box">
                                            "Flow is the result of focused intention. You are currently reconstructive your neural pathways."
                                        </div>
                                    </div>
                                    <div className="challenge-footer">
                                        <motion.button
                                            className="btn-finish-challenge"
                                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setChallengeState('completed')}
                                        >
                                            Mission Accomplished
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                <path d="M20 6L9 17L4 12" />
                                            </svg>
                                        </motion.button>
                                    </div>
                                </motion.div>
                            )}

                            {challengeState === 'completed' && (
                                <motion.div
                                    key="completed"
                                    className="challenge-premium-card success-state"
                                    initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ type: "spring", damping: 12 }}
                                >
                                    <div className="success-confetti-bg"></div>
                                    <div className="success-content text-center">
                                        <div className="success-icon-wrapper">
                                            <motion.div
                                                className="success-checkmark"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 0.8, delay: 0.2 }}
                                            >
                                                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                    <motion.path d="M20 6L9 17L4 12" />
                                                </svg>
                                            </motion.div>
                                        </div>
                                        <h2 className="success-title">Elite Mindset Unlocked</h2>
                                        <p className="success-msg">You didn't just read wisdom—you lived it. That is the distinction of an elite mind.</p>
                                        <div className="impact-earned-badge">
                                            +1 Cognitive Resilience
                                        </div>
                                        <button className="btn-reset-challenge" onClick={() => setChallengeState('idle')}>
                                            Back to Vault
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* STRATEGIC FRAMEWORKS GALLERY */}
                <section className="mental-models-section">
                    <div className="container">
                        <div className="section-head-premium text-center mb-16">
                            <motion.span
                                className="section-badge-glass"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                INTELLECTUAL ARCHITECTURE
                            </motion.span>
                            <motion.h2
                                className="section-title-premium"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                            >
                                Strategic Frameworks
                            </motion.h2>
                            <motion.div
                                className="section-divider-center"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            ></motion.div>
                            <motion.p
                                className="section-desc-premium"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                Reconstruct your strategic backbone with the analytical tools used by history's most effective minds.
                            </motion.p>
                        </div>

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
