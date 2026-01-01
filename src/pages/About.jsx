import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import moazHero from '../assets/moaz-hero.png';
import lifestyleImage from '../assets/lifestyle-window.png';
import workspaceImage from '../assets/workspace.png';
import './About.css';

const About = () => {
    const fadeUp = {
        initial: { opacity: 0, y: 15 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    };

    const credentials = [
        {
            title: 'Master\'s in Counselling',
            institution: 'University of Aberdeen',
            description: 'Refined understanding of human psychology and mental health.'
        },
        {
            title: 'Logotherapy Specialist',
            institution: 'Viktor Frankl Institute',
            description: 'Meaning-centered therapy focus: finding purpose in life.'
        },
        {
            title: 'Clarity Guide',
            institution: 'MoLifestyle Coach',
            description: 'Helping individuals navigate confusion and discover inner direction.'
        },
        {
            title: 'Meaning-Centered Coach',
            institution: 'Logotherapy Practice',
            description: 'Applying existential philosophy to practical life coaching.'
        },
        {
            title: 'Advanced Psychology',
            institution: 'Academic Research',
            description: 'Deep dive into behavioral patterns and cognitive development.'
        },
        {
            title: 'Humanistic Practitioner',
            institution: 'Global Outreach',
            description: 'Focusing on the whole person and their unique potential.'
        },
        {
            title: 'Ethical Guidance',
            institution: 'Professional Standards',
            description: 'Committed to the highest standards of mental health partnership.'
        }
    ];

    return (
        <div className="about-page-new">
            {/* Cinematic Hero Section - Editorial Redesign */}
            <section className="about-hero-aesthetic">
                <div className="about-hero-glow"></div>
                <div className="container">
                    <div className="hero-editorial">
                        <div className="editorial-text-side">
                            <motion.span
                                className="aesthetic-badge-cinematic"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                The Heart Behind the Work
                            </motion.span>
                            <motion.h1
                                className="editorial-headline-cinematic"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                            >
                                I don't give answers.<br />
                                I help you find <span>yours.</span>
                            </motion.h1>
                            <motion.p
                                className="editorial-lead-cinematic"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                True guidance isn't about telling you what to do. It's about creating a safe,
                                reflective space where your own clarity can finally emerge.
                            </motion.p>
                        </div>

                        <motion.div
                            className="editorial-image-side"
                            initial={{ opacity: 0, scale: 0.98, x: 20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                        >
                            <div className="framed-portrait-aesthetic">
                                <img src={moazHero} alt="Moaz" className="portrait-img-refined" />
                                <div className="portrait-frame-accent"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Visual Story Section */}
            <section className="about-visual-story">
                <div className="container">
                    <div className="story-grid-new">
                        <motion.div className="story-image-overlap" {...fadeUp}>
                            <img src={workspaceImage} alt="Consultation Space" className="story-main-img" />
                            <div className="serene-inset">
                                <img src={lifestyleImage} alt="Calm View" />
                            </div>
                        </motion.div>

                        <motion.div className="story-content-new" {...fadeUp}>
                            <h2>Why I Do This</h2>
                            <p>
                                After years of observing human patterns, I realized that most people are
                                stuck not because they lack motivation, but because they are disconnected
                                from their own sense of meaning.
                            </p>
                            <p>
                                My mission is to bridge that gap. By combining academic counselling roots
                                with real-world guidance, I help you uncover the layers that are clouding
                                your vision.
                            </p>
                            <div className="story-quote-new">
                                "Clarity is not found by looking harder, but by seeing differently."
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Aesthetic YouTube Section */}
            <section className="about-youtube-aesthetic">
                <div className="container">
                    <motion.div className="youtube-editorial-card" {...fadeUp}>
                        <div className="youtube-editorial-content">
                            <span className="aesthetic-badge">Video Insights</span>
                            <h2>Sharing the Journey on YouTube</h2>
                            <p>
                                I believe in making psychological depth accessible. Every week, I share
                                reflections, practical strategies, and deep dives into the science of
                                meaning and human growth.
                            </p>
                            <a
                                href="https://youtube.com/@Molifestylecoach/videos"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-youtube-aesthetic"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                </svg>
                                <span>Watch Latest Videos</span>
                            </a>
                        </div>
                        <div className="youtube-editorial-decoration">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Academic Foundation - Infinite Marquee */}
            <section className="about-marquee-credentials">
                <div className="marquee-header">
                    <span className="aesthetic-badge">Expertise & Ethics</span>
                    <h2>Foundational Academic Excellence</h2>
                </div>

                <div className="infinite-marquee-wrapper">
                    <div className="marquee-track">
                        {[...credentials, ...credentials].map((cred, i) => (
                            <div key={i} className="marquee-card">
                                <div className="card-inner">
                                    <span className="card-number">{(i % credentials.length) + 1}</span>
                                    <h3>{cred.title}</h3>
                                    <p className="card-inst">{cred.institution}</p>
                                    <p className="card-desc">{cred.description}</p>
                                </div>
                            </div>
                        ))}
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
