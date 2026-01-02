import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import moazHero from '../assets/moaz-hero.png';
import lifestyleImage from '../assets/peace-architecture-v3.jpg';
import workspaceImage from '../assets/workspace.png';
import peaceArchitecture from '../assets/peace-architecture-v4.jpg';
import './About.css';

const About = () => {
    const [activeCredIndex, setActiveCredIndex] = useState(0);

    const fadeUp = {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const credentials = [
        {
            title: 'University of Aberdeen',
            description: 'I hold a Master’s degree in Psychological Studies (Mental Health), with formal training in counselling, wellbeing, and human behaviour.'
        },
        {
            title: 'MoLifestyle Approach',
            description: 'My work blends counselling, coaching, and logotherapy—focused on clarity, responsibility, and finding meaning in real life situations.'
        },
        {
            title: 'Customized Stage of Life',
            description: 'No fixed formula. Every session and plan is customised to your situation, goals, and current stage of life.'
        },
        {
            title: 'For Real-Life Struggles',
            description: 'Career confusion, emotional overwhelm, relationships, identity, purpose, direction—this work is designed for everyday human struggles.'
        },
        {
            title: 'Human-Centred Practitioner',
            description: 'Working with people across the world. The focus will be on you as a whole person, not just a problem — your life, your potential, and what truly matters to you.'
        },
        {
            title: 'The Safe Space',
            description: 'No pressure. No labels. No rushing. Just a safe, respectful space to think, speak, and understand yourself better.'
        },
        {
            title: 'Long-Term Impact',
            description: 'This isn’t about quick fixes. It’s about building long-term clarity, emotional stability, and inner strength.'
        }
    ];

    // Auto-cycle credentials
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveCredIndex((prev) => (prev === credentials.length - 1 ? 0 : prev + 1));
        }, 4000);
        return () => clearInterval(timer);
    }, [credentials.length]);

    return (
        <div className="about-page-new">
            {/* Cinematic Hero Section - Editorial Redesign */}
            <section className="about-hero-aesthetic">
                {/* Immersive Background Elements */}
                <div className="about-hero-glow"></div>
                <div className="hero-orb-luxury orb-1"></div>
                <div className="hero-orb-luxury orb-2"></div>

                <div className="container">
                    <div className="hero-editorial">
                        <motion.div
                            className="editorial-text-side"
                            initial="initial"
                            animate="animate"
                            variants={{
                                animate: {
                                    transition: {
                                        staggerChildren: 0.15
                                    }
                                }
                            }}
                        >
                            <motion.div
                                variants={{
                                    initial: { opacity: 0, x: -20 },
                                    animate: { opacity: 1, x: 0 }
                                }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <span className="aesthetic-badge-cinematic">
                                    <span className="badge-dot"></span>
                                    The Heart Behind the Work
                                </span>
                            </motion.div>

                            <motion.h1
                                className="editorial-headline-cinematic"
                                variants={{
                                    initial: { opacity: 0, y: 30 },
                                    animate: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                I don't give answers.<br />
                                I help you find <span className="italic-reveal">yours.</span>
                            </motion.h1>

                            <motion.div
                                className="hero-signature-line"
                                variants={{
                                    initial: { width: 0 },
                                    animate: { width: "100px" }
                                }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            ></motion.div>

                            <motion.p
                                className="editorial-lead-cinematic"
                                variants={{
                                    initial: { opacity: 0, y: 20 },
                                    animate: { opacity: 1, y: 0 }
                                }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            >
                                True guidance isn't about telling you what to do. It's about creating a safe,
                                <span className="highlight-text-premium"> reflective space</span> where your own clarity can finally emerge.
                            </motion.p>

                            <motion.div
                                className="hero-scroll-indicator"
                                variants={{
                                    initial: { opacity: 0 },
                                    animate: { opacity: 1 }
                                }}
                                transition={{ delay: 1, duration: 1 }}
                            >
                                <div className="scroll-line"></div>
                                <span>SCROLL TO DISCOVER</span>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="editorial-image-side"
                            initial={{ opacity: 0, scale: 0.9, x: 30 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        >
                            <div className="framed-portrait-aesthetic">
                                <motion.div
                                    className="portrait-main-wrapper"
                                    animate={{ y: [0, -15, 0] }}
                                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <img src={moazHero} alt="Moaz" className="portrait-img-refined" />
                                    <div className="portrait-glass-overlay"></div>
                                </motion.div>
                                <div className="portrait-frame-accent luxury-border"></div>
                                <div className="portrait-floating-badge">
                                    <span className="badge-icon">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                                    </span>
                                    <span className="badge-label">MoLifestyle</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why I Do This - Editorial Bento Redesign */}
            <section className="about-visual-story">
                <div className="container">
                    <motion.div
                        className="story-header-centered"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="aesthetic-badge-cinematic">The Mission</span>
                        <h2>Why I Do This</h2>
                        <p className="story-lead-max">
                            Transformation isn't about trying harder; it's about seeing clearer. My work is dedicated
                            to helping you bridge the gap between where you are and where you find meaning.
                        </p>
                    </motion.div>

                    <div className="motivation-bento-grid">
                        <motion.div
                            className="bento-tile tile-main"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <img src={peaceArchitecture} alt="Architecture of Peace" className="bento-bg-img" />
                            <div className="bento-overlay-content">
                                <h3>The Architecture of Peace</h3>
                                <p>We create the mental space required for honest reflection and unshakeable clarity.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bento-tile tile-vertical tile-layers-meaning"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            viewport={{ once: true }}
                        >
                            <img src={lifestyleImage} alt="Layers of Meaning" className="bento-bg-img img-full-height" />
                            <div className="bento-overlay-content">
                                <div className="bento-icon-gold">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <h4>Layers of Meaning</h4>
                                <p>Peeling back the societal expectations to find the truth that anchors your soul.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bento-tile tile-horizontal"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="bento-action-reveal">
                                <div className="reveal-content">
                                    <h4>Decoupling Success from Worth</h4>
                                    <p>Helping visionaries find a sense of self that isn't tied to their latest achievement.</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bento-tile tile-quote"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            viewport={{ once: true }}
                        >
                            <div className="bento-quote-inner">
                                <div className="quote-mark">"</div>
                                <p>Clarity is not found by looking harder, but by seeing differently.</p>
                                <cite>— The MoLifestyle Philosophy</cite>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Vibrant YouTube Showcase - Redesign */}
            <section className="about-youtube-vibrant">
                <div className="container">
                    <motion.div
                        className="youtube-card-vibrant"
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="vibrant-youtube-overlay"></div>
                        <div className="vibrant-content-grid">
                            <div className="vibrant-text">
                                <span className="vibrant-badge">Premium Content</span>
                                <h2>The <span>Video Insights</span> Series</h2>
                                <p>
                                    I believe in making psychological depth accessible. Every week, I share
                                    reflections, practical strategies, and deep dives into the science of
                                    meaning and human growth on my YouTube channel.
                                </p>
                                <motion.a
                                    href="https://youtube.com/@Molifestylecoach/videos"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-vibrant-yt"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                    Join the Community
                                </motion.a>
                            </div>

                            <div className="vibrant-visual-side">
                                <div className="youtube-glow-orb"></div>
                                <div className="yt-icon-massive">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Academic Foundation - Premium Carousel Redesign */}
            <section className="about-marquee-credentials dark-theme-section">
                <div className="container">
                    <div className="marquee-header">
                        <span className="aesthetic-badge-premium">Expertise & Ethics</span>
                        <h2 className="premium-dark-heading">Foundational Academic <span>Excellence</span></h2>
                    </div>

                    <div className="premium-carousel-wrapper">
                        <div className="premium-carousel-inner">
                            {credentials.map((cred, i) => {
                                // Calculate position relative to active index
                                let position = i - activeCredIndex;
                                if (position < -1) position = credentials.length + position;
                                if (position > credentials.length - 2) position = position - credentials.length;

                                return (
                                    <motion.div
                                        key={i}
                                        className={`premium-glass-card ${i === activeCredIndex ? 'active' : ''}`}
                                        animate={{
                                            x: position * 340, // 320 width + 20 gap
                                            scale: i === activeCredIndex ? 1.1 : 0.85,
                                            opacity: Math.abs(position) > 1 ? 0 : (i === activeCredIndex ? 1 : 0.4),
                                            zIndex: i === activeCredIndex ? 10 : 1
                                        }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="card-glass-glow"></div>
                                        <div className="card-content-refined">
                                            <h3>{cred.title}</h3>
                                            {cred.institution && <p className="card-inst-premium">{cred.institution}</p>}
                                            <p className="card-desc-premium">{cred.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Carousel Indicators */}
                        <div className="carousel-indicators-premium">
                            {credentials.map((_, i) => (
                                <button
                                    key={i}
                                    className={`indicator-dot ${i === activeCredIndex ? 'active' : ''}`}
                                    onClick={() => setActiveCredIndex(i)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Thought Section - Immersive Masterpiece */}
            <section className="about-kamal-finale">
                <div className="kamal-overlay"></div>
                <div className="container kamal-content-wrap">
                    <motion.div
                        className="kamal-text-block"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="kamal-headline">
                            Clarity is a<br />
                            <span>Destination.</span><br />
                            I help you find the way.
                        </h2>
                        <div className="kamal-line"></div>
                        <p className="kamal-lead">
                            Transformation doesn't come from a book. It comes from the courage to sit with
                            the truth until the path becomes clear. If you're ready for that kind of honesty,
                            I'm ready to walk with you.
                        </p>

                        <div className="kamal-cta-aesthetic">
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link to="/connect" className="kamal-main-btn">
                                    Start Your Reflection
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </motion.div>
                            <Link to="/guidance" className="kamal-secondary-link">See How We Work Together →</Link>
                        </div>
                    </motion.div>

                    <motion.div
                        className="kamal-visual-accent"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 0.1, x: 0 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                    >
                        <span className="floating-text">CLARITY</span>
                        <span className="floating-text">MEANING</span>
                        <span className="floating-text">PURPOSE</span>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;
