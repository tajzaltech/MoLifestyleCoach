import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import './Guidance.css';

const Guidance = () => {
    const slideUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    const bentoItems = [
        {
            size: 'large',
            title: 'The Psychological Audit',
            tag: '01. DISCOVERY',
            desc: 'We map out your internal architecture. Discovering the hidden scripts that govern your decisions and identifying precisely where the confusion originates.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M11 8v6M8 11h6" />
                </svg>
            )
        },
        {
            size: 'small',
            title: 'Logotherapy Focus',
            tag: '02. MEANING',
            desc: 'Finding a "Why" that stands against any life challenge.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            )
        },
        {
            size: 'medium',
            title: 'Action Integration',
            tag: '03. SHIFT',
            desc: 'Converting profound realizations into repeatable, daily habits that stick.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="m13 2-2 10h8l-4 10" />
                </svg>
            )
        },
        {
            size: 'medium',
            title: 'Sustained Growth',
            tag: '04. EVOLUTION',
            desc: 'Building a self-governing system of clarity and purpose for the long term.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 20V10M12 10l4 4M12 10L8 14M4 20h16" />
                    <path d="M12 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                </svg>
            )
        }
    ];

    const youtubeDiscovery = [
        {
            title: 'The Psychology of Meaning',
            desc: 'Exploring Viktor Frankl\'s profound principles and how they apply to your daily challenges.',
            link: 'https://www.youtube.com/watch?v=OhmKLid27_8',
            tag: 'Core Concept'
        },
        {
            title: 'Escaping the Comfort Zone',
            desc: 'Why growth only happens at the edges of your security. A deep dive into transformation.',
            link: 'https://www.youtube.com/@Molifestylecoach/videos',
            tag: 'Actionable Wisdom'
        },
        {
            title: 'Finding Your North Star',
            desc: 'A guide to uncovering the unique purpose that anchors your life through any storm.',
            link: 'https://www.youtube.com/@Molifestylecoach/videos',
            tag: 'Existential Depth'
        }
    ];

    const heroSlides = [
        {
            image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
            title: 'Clarity is a',
            highlight: 'Decision.',
            sub: 'Premium psychological guidance for the modern visionary.'
        },
        {
            image: 'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=1200',
            title: 'Your Future is',
            highlight: 'Unwritten.',
            sub: 'Navigate life transitions with existential depth and precision.'
        },
        {
            image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
            title: 'The Power of',
            highlight: 'Purpose.',
            sub: 'Find meaning in the chaos and lead with unshakeable focus.'
        }
    ];

    const [activeSlide, setActiveSlide] = useState(0);

    // AUTO-SLIDE LOGIC
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
        }, 5000); // 5 Seconds per slide

        return () => clearInterval(timer);
    }, [heroSlides.length]);

    return (
        <div className="guidance-kamal-refined">
            {/* 1. CINEMATIC SLIDER HERO */}
            <section className="guidance-slider-hero">
                <div className="slider-container-kamal">
                    {heroSlides.map((slide, index) => (
                        <motion.div
                            key={index}
                            className={`hero-slide ${index === activeSlide ? 'active' : ''}`}
                            initial={{ opacity: 0 }}
                            animate={{
                                opacity: index === activeSlide ? 1 : 0,
                                x: (index - activeSlide) * 100 + '%'
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="slide-image-wrapper">
                                <img src={slide.image} alt={slide.title} className="slide-img" />
                                <div className="slide-overlay"></div>
                            </div>

                            <div className="container">
                                <div className="slide-content-kamal">
                                    <motion.span
                                        className="ultimate-tag-light"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={index === activeSlide ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.3 }}
                                    >
                                        THE JOURNEY TO CLARITY
                                    </motion.span>
                                    <motion.h1
                                        className="ultimate-display-light"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={index === activeSlide ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {slide.title} <span>{slide.highlight}</span>
                                    </motion.h1>
                                    <motion.p
                                        className="ultimate-lead-light"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={index === activeSlide ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5 }}
                                    >
                                        {slide.sub}
                                    </motion.p>
                                    <motion.div
                                        className="ultimate-hero-btns"
                                        initial={{ opacity: 0 }}
                                        animate={index === activeSlide ? { opacity: 1 } : {}}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <Link to="/connect" className="btn-kamal-primary">Book Your Discovery</Link>
                                        <a href="#youtube-discovery" className="link-kamal-sub">Watch the Wisdom ↓</a>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {/* SLIDER NAVIGATION */}
                    <div className="slider-nav-kamal">
                        <div className="container">
                            <div className="nav-dots">
                                {heroSlides.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`nav-dot ${i === activeSlide ? 'active' : ''}`}
                                        onClick={() => setActiveSlide(i)}
                                    ></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE PHILOSOPHY (SPOTLIGHT) */}
            <section className="philosophy-spotlight-light">
                <div className="container">
                    <div className="philosophy-card-light">
                        <motion.div className="philosophy-content" {...slideUp}>
                            <span className="section-label-light">CORE PHILOSOPHY</span>
                            <h2>Depth Over <span>Distance.</span></h2>
                            <p>
                                Grounded in <strong>Master's-level psychology</strong> and the wisdom
                                of Logotherapy, we don't just solve problems; we find the
                                meaning that anchors your soul.
                            </p>
                            <div className="philosophy-pills-light">
                                <span>Academic Rigor</span>
                                <span>Meaning-Centered</span>
                                <span>Existential Depth</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. YOUTUBE DEEP DISCOVERY - NEW MEGA SECTION */}
            <section id="youtube-discovery" className="youtube-mega-section">
                <div className="container">
                    <motion.div className="header-left-kamal" {...slideUp}>
                        <span className="ultimate-tag-light">DEEP DISCOVERY</span>
                        <h2>Watch the <span>Transformations</span></h2>
                        <p className="section-lead-max">
                            My YouTube channel is a living library of psychology-informed wisdom.
                            Each video is designed to challenge your perspective and provide
                            the tools for a meaningful life.
                        </p>
                    </motion.div>

                    <div className="youtube-wisdom-grid">
                        {youtubeDiscovery.map((video, i) => (
                            <motion.div
                                key={i}
                                className="youtube-wisdom-card"
                                whileHover={{ y: -10 }}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="yt-card-top">
                                    <span className="yt-tag">{video.tag}</span>
                                    <div className="yt-icon-play">
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                            <path d="M8 5v14l11-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3>{video.title}</h3>
                                <p>{video.desc}</p>
                                <a href={video.link} target="_blank" rel="noopener noreferrer" className="yt-link">
                                    Watch Full Video →
                                </a>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div className="yt-channel-cta" {...slideUp}>
                        <div className="cta-channel-box">
                            <h4>Join the Community</h4>
                            <p>Subscribe to explore deeper topics on psychology, meaning, and life transitions.</p>
                            <a href="https://youtube.com/@Molifestylecoach" target="_blank" rel="noopener noreferrer" className="btn-yt-sub">
                                Visit YouTube Channel
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. THE BENTO METHODOLOGY */}
            <section className="bento-methodology-light">
                <div className="container">
                    <motion.div className="method-header-light" {...slideUp}>
                        <span className="ultimate-tag-light">METHODOLOGY</span>
                        <h2>A Precise Map of <span>Growth</span></h2>
                    </motion.div>

                    <div className="bento-grid-refined">
                        {bentoItems.map((item, i) => (
                            <motion.div
                                key={i}
                                className={`bento-card-refined ${item.size}`}
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="bento-top-refined">
                                    <span className="bento-num">{item.tag}</span>
                                    <span className="bento-icon-ref">{item.icon}</span>
                                </div>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. WHY MOLIFESTYLE? - EXTREME REDESIGN */}
            <section className="why-molifestyle-extreme">
                <div className="container">
                    <motion.div className="why-header-kamal" {...slideUp}>
                        <span className="ultimate-tag-light">THE DIFFERENCE</span>
                        <h2>Why <span>MoLifestyle?</span></h2>
                    </motion.div>

                    <div className="why-grid-kamal">
                        <motion.div
                            className="why-node"
                            {...slideUp}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="node-num-art">01</span>
                            <h3>Academic Foundation</h3>
                            <p>
                                Grounded in a **Master's in Counselling Psychology**, my approach
                                blends clinical rigor with life-changing coaching strategies.
                            </p>
                        </motion.div>

                        <motion.div
                            className="why-node featured"
                            {...slideUp}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="node-num-art">02</span>
                            <h3>Existential Depth</h3>
                            <p>
                                Based on **Logotherapy**, we don't just fix problems; we find the
                                fundamental meaning that makes the solution obvious.
                            </p>
                            <div className="node-aura"></div>
                        </motion.div>

                        <motion.div
                            className="why-node"
                            {...slideUp}
                            transition={{ delay: 0.3 }}
                        >
                            <span className="node-num-art">03</span>
                            <h3>Human Paradox</h3>
                            <p>
                                We embrace the complexity of being human. A space where
                                **honesty is the primary tool** for transformation.
                            </p>
                        </motion.div>
                    </div>

                    {/* INTERACTIVE QUOTE BAR */}
                    <motion.div className="why-quote-bar" {...slideUp}>
                        <div className="quote-bar-inner">
                            <p>"A man who knows his 'Why' can survive almost any 'How'."</p>
                            <cite>— Inspired by Viktor Frankl</cite>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 6. GRAND FINALE CTA */}
            <section className="ultimate-finale-light">
                <div className="container">
                    <motion.div className="finale-card-light" {...slideUp}>
                        <h2>Ready to See Further?</h2>
                        <p>Your transformation doesn't need more time. It needs more clarity.</p>
                        <div className="finale-actions">
                            <Link to="/connect" className="btn-kamal-primary">Book Your Session</Link>
                            <Link to="/about" className="link-kamal-sub">About My Journey →</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Guidance;
