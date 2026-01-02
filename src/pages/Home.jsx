import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import lifestyleImage from '../assets/lifestyle-window.png';
import heroMotivation from '../assets/hero-motivation.jpg';
import quote1 from '../assets/motivational_1.png';
import quote2 from '../assets/motivational_2.png';
import quote3 from '../assets/motivational_3.png';
import quote4 from '../assets/motivational_4.png';
import quote5 from '../assets/motivational_5.png';
import quote6 from '../assets/motivational_6.png';
import quote7 from '../assets/workspace.png';
import './Home.css';
import NewsletterPopup from '../components/NewsletterPopup';

import { useState, useEffect } from 'react';

const Home = () => {
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

    const fadeUp = {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' }
    };

    const cardVariants = {
        initial: { opacity: 0, y: 12 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: 'easeOut',
                delay: i * 0.1
            }
        })
    };

    // Featured YouTube video
    const youtubeVideos = [
        'https://www.youtube.com/embed/OhmKLid27_8',
    ];

    const features = [
        {
            title: 'Psychology-Informed Approach',
            description: 'Grounded in counseling principles and research. We don\'t just talk about goals; we understand the psychological patterns that drive your behavior and influence your growth.',
            accent: 'var(--accent)'
        },
        {
            title: 'Meaning over Motivation',
            description: 'Motivation is fleeting; meaning is enduring. We follow Viktor Frankl\'s principles to help you discover a purpose that sustains you through life\'s inevitable challenges.',
            accent: '#2d4a5a'
        },
        {
            title: 'Academic & Clinical Depth',
            description: 'With a Master\'s in Counselling, I bring a level of depth and ethical responsibility that goes far beyond generic life coaching. This is evidenced-based guidance for real progression.',
            accent: '#1a2b34'
        },
        {
            title: 'Holistic Integration',
            description: 'We don\'t look at challenges in isolation. We integrate your professional ambitions, personal relationships, and mental well-being into a singular, cohesive architecture of life.',
            accent: 'var(--accent)'
        }
    ];

    // Auto-cycle features
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveFeatureIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [features.length]);

    return (
        <div className="home-page">
            <NewsletterPopup />
            {/* Kamal Hero Section - Immersive Masterpiece */}
            <section className="hero-kamal-home">
                <div className="kamal-home-overlay"></div>

                <div className="kamal-visual-bg">
                    <motion.span
                        className="kamal-float-text"
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 0.05, x: 0 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        CLARITY
                    </motion.span>
                    <motion.span
                        className="kamal-float-text right"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 0.05, x: 0 }}
                        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
                    >
                        PURPOSE
                    </motion.span>
                </div>

                <div className="container">
                    <div className="kamal-hero-grid">
                        <motion.div className="kamal-hero-content" {...fadeUp}>
                            <span className="kamal-badge">Premium Psychology-Informed Coaching</span>
                            <h1 className="kamal-hero-headline">
                                Find <span>Clarity.</span><br />
                                Discover <span>Meaning</span><br />
                                Live with <span>Purpose.</span>
                            </h1>
                            <div className="kamal-hero-divider"></div>
                            <p className="kamal-hero-lead">
                                Move from confusion to clarity with guidance grounded in
                                <strong> academic psychology</strong> and existential depth.
                                We don't just coach; we transform your understanding.
                            </p>

                            <div className="kamal-btn-group">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link to="/guidance" className="kamal-cta-primary">
                                        Explore the Journey
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </motion.div>
                                <Link to="/connect" className="kamal-cta-secondary">Schedule a Session</Link>
                            </div>
                        </motion.div>

                        <motion.div
                            className="kamal-hero-visual"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                        >
                            <div className="kamal-image-frame">
                                <img src={heroMotivation} alt="Growth and transformation" className="kamal-hero-img" />
                                <div className="kamal-img-accent"></div>
                                <div className="kamal-quote-tag">
                                    <p>"Growth begins where comfort ends"</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* YouTube Videos Section */}
            <section className="youtube-showcase">
                <div className="container">
                    <motion.div
                        className="section-header-centered"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="youtube-badge">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <rect width="24" height="24" rx="6" fill="#FF0000" />
                                <path d="M9.5 7.5L16 12L9.5 16.5V7.5Z" fill="white" />
                            </svg>
                            <span>Watch & Learn</span>
                        </div>
                        <h2>Latest From YouTube</h2>
                        <p className="section-subtitle-large">
                            Weekly insights on finding clarity, understanding yourself better, and navigating<br />
                            life's complexities with meaning and purpose.
                        </p>
                    </motion.div>

                    <motion.div
                        className="youtube-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="youtube-embed-wrapper">
                            <iframe
                                src={youtubeVideos[0]}
                                title="Latest YouTube Videos"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="youtube-iframe"
                            ></iframe>
                        </div>

                        <div className="youtube-cta-card">
                            <h3>Join the Community</h3>
                            <p>
                                Over at my YouTube channel, I share practical psychology, meaning-centered reflections,
                                and honest conversations about life, mental health, and personal growth.
                            </p>
                            <ul className="youtube-highlights">
                                <li>✓ Weekly video insights</li>
                                <li>✓ Psychological frameworks explained</li>
                                <li>✓ Real-life application strategies</li>
                                <li>✓ Q&A with the community</li>
                            </ul>
                            <a
                                href="https://www.youtube.com/@Molifestylecoach/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-youtube-full"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M8 6L14 10L8 14V6Z" fill="currentColor" />
                                </svg>
                                Subscribe on YouTube
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* What Makes This Different - Premium Carousel Redesign */}
            {/* The Distinction - Horizontal Drag Section */}
            <section className="distinction-section">

                <div className="container">
                    <div className="distinction-header">
                        <span className="aesthetic-badge-premium">THE DISTINCTION</span>
                        <h2>What Makes This <span>Different</span></h2>
                    </div>
                </div>

                <div className="distinction-drag-wrapper">
                    <motion.div
                        className="distinction-track"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            ease: "linear",
                            duration: 15, /* Faster scroll speed */
                            repeat: Infinity
                        }}
                    >
                        {/* Duplicate content for seamless loop */}
                        {[...features, ...features].map((feature, i) => (
                            <motion.div key={i} className="distinction-card">
                                {/* Number removed per request */}
                                <div className="distinction-content">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Transformation Journey */}
            <section className="journey-preview">
                <div className="container">
                    <div className="journey-grid">
                        <motion.div
                            className="journey-content"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2>From Confusion to Clarity</h2>
                            <p className="journey-intro">
                                The journey isn't about having all the answers. It's about asking the right questions,
                                understanding your patterns, and discovering the meaning that guides you forward.
                            </p>

                            <div className="journey-steps-mini">
                                <div className="mini-step">
                                    <span className="mini-number">01</span>
                                    <div>
                                        <h4>Deep Understanding</h4>
                                        <p>We explore what's truly happening beneath the surface</p>
                                    </div>
                                </div>
                                <div className="mini-step">
                                    <span className="mini-number">02</span>
                                    <div>
                                        <h4>Meaning Discovery</h4>
                                        <p>Uncover your values, purpose, and what truly matters</p>
                                    </div>
                                </div>
                                <div className="mini-step">
                                    <span className="mini-number">03</span>
                                    <div>
                                        <h4>Meaningful Action</h4>
                                        <p>Create realistic steps that align with who you are</p>
                                    </div>
                                </div>
                            </div>

                            <Link to="/guidance" className="btn btn-primary">
                                Explore the Full Journey
                            </Link>
                        </motion.div>

                        <motion.div
                            className="journey-visual"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={lifestyleImage} alt="Calm reflection" className="journey-image" />
                            <div className="journey-quote-overlay">
                                <blockquote>
                                    "Between stimulus and response there is a space. In that space is our power to choose."
                                    <cite>— Viktor Frankl</cite>
                                </blockquote>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Daily Wisdom - Infinite Marquee Section */}
            <section className="daily-wisdom-section">
                <div className="daily-wisdom-header">
                    <span className="aesthetic-badge-premium">Daily Reflection</span>
                    <h2 className="wisdom-title">Elevate Your <span>Perspective</span></h2>
                </div>

                <div className="marquee-wrapper">
                    <motion.div
                        className="marquee-track"
                        animate={{ x: [0, -1920] }}
                        transition={{
                            duration: 30,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    >
                        {[
                            { img: quote1, text: "Clarity is the precursor to transformation." },
                            { img: quote2, text: "Meaning is discovered, not created." },
                            { img: quote3, text: "Silence is the architecture of peace." },
                            { img: quote4, text: "Your potential is limited only by your perspective." },
                            { img: quote5, text: "Purpose anchors the soul in the storm." },
                            { img: quote6, text: "Success without depth is an empty vessel." },
                            { img: quote7, text: "The journey inward is the most important one." },
                            // Duplicate for infinite effect
                            { img: quote1, text: "Clarity is the precursor to transformation." },
                            { img: quote2, text: "Meaning is discovered, not created." },
                            { img: quote3, text: "Silence is the architecture of peace." }
                        ].map((item, i) => (
                            <div key={i} className="wisdom-card">
                                <img src={item.img} alt="Wisdom" className="wisdom-img" />
                                <div className="wisdom-overlay">
                                    <div className="wisdom-quote-mark">"</div>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Is This For You Section - Editorial Redesign */}
            <section className="for-you-premium">
                <div className="container">
                    <motion.div
                        className="section-header-centered"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="aesthetic-badge-premium">The Right Fit</span>
                        <h2 className="premium-dark-heading">Is This <span>For You?</span></h2>
                        <p className="text-white-muted">
                            This work is for those who have moved beyond seeking answers <br />
                            and are ready to find themselves.
                        </p>
                    </motion.div>

                    <div className="for-you-luxury-grid">
                        {[
                            {
                                title: 'The Stuck Visionary',
                                desc: 'You are capable and driven, but your recent success feels hollow. You are seeking the "Why" that anchors your power.',
                                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2v20m10-10H2" /><circle cx="12" cy="12" r="3" /><path d="M17 7l-1.5 1.5M8.5 15.5L7 17M17 17l-1.5-1.5M8.5 8.5L7 7" /></svg>
                            },
                            {
                                title: 'The Chronic Overthinker',
                                desc: 'Your mind is your greatest tool, but lately, it has become your cage. You need clarity to turn noise into decisive action.',
                                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" /><line x1="16" y1="8" x2="2" y2="22" /><line x1="17.5" y1="15" x2="9" y2="15" /></svg>
                            },
                            {
                                title: 'The Depth Seeker',
                                desc: 'You have outgrown superficial self-help. You are ready for a grounded, philosophical approach to your life\'s architecture.',
                                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 8v4m0 4h.01" /></svg>
                            },
                            {
                                title: 'The Transition Architect',
                                desc: 'You are at a crossroad. You need a trusted reflection to ensure your next move is aligned with your soul, not just your CV.',
                                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 11l5-5 5 5M7 17l5-5 5 5" /></svg>
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                className="for-you-card-luxury"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -10 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <div className="card-glass-glow"></div>
                                <div className="card-luxury-content">
                                    <div className="luxury-icon-wrapper">
                                        {card.icon}
                                    </div>
                                    <h3>{card.title}</h3>
                                    <p>{card.desc}</p>
                                    <div className="card-luxury-footer">
                                        <div className="footer-line"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Final CTA */}
            <section className="home-cta">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Ready to Start?</h2>
                        <p className="cta-lead">
                            You don't have to have everything figured out.<br />
                            You just need a place to begin.
                        </p>
                        <div className="cta-buttons-home">
                            <Link to="/connect" className="btn btn-primary btn-lg">
                                Book Your First Session
                            </Link>
                            <Link to="/about" className="btn btn-secondary btn-lg">
                                Learn About Moaz
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
