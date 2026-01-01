import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import lifestyleImage from '../assets/lifestyle-window.png';
import heroMotivation from '../assets/hero-motivation.jpg';
import './Home.css';

const Home = () => {
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
            number: '01',
            title: 'Psychology-Informed Approach',
            description: 'Grounded in counseling principles and research. We don\'t just talk about goals; we understand the psychological patterns that drive your behavior and influence your growth.',
            accent: 'var(--accent)'
        },
        {
            number: '02',
            title: 'Meaning over Motivation',
            description: 'Motivation is fleeting; meaning is enduring. We follow Viktor Frankl\'s principles to help you discover a purpose that sustains you through life\'s inevitable challenges.',
            accent: '#2d4a5a'
        },
        {
            number: '03',
            title: 'Academic & Clinical Depth',
            description: 'With a Master\'s in Counselling, I bring a level of depth and ethical responsibility that goes far beyond generic life coaching. This is evidenced-based guidance for real progression.',
            accent: '#1a2b34'
        }
    ];

    return (
        <div className="home-page">
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

            {/* What Makes This Different */}
            <section className="features-section">
                <div className="container">
                    <motion.div
                        className="section-header-centered"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>What Makes This Different</h2>
                        <p className="section-subtitle-large">
                            Not motivational speaking. Not generic coaching. Not quick fixes.<br />
                            This is psychology-informed guidance for people who are ready to go deeper.
                        </p>
                    </motion.div>

                    <div className="diff-layout">
                        {features.map((feature, i) => (
                            <motion.div
                                key={i}
                                className={`diff-item ${i % 2 === 1 ? 'reverse' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            >
                                <div className="diff-number-side">
                                    <span className="diff-number-large" style={{ color: feature.accent }}>{feature.number}</span>
                                    <div className="diff-decoration" style={{ backgroundColor: feature.accent }}></div>
                                </div>
                                <div className="diff-content-side">
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                    <div className="diff-accent-line" style={{ backgroundColor: feature.accent }}></div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
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

            {/* Who This Is For */}
            <section className="for-you-section">
                <div className="container">
                    <motion.div
                        className="section-header-centered"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>Is This For You?</h2>
                        <p className="section-subtitle-large">
                            This work is for people who are tired of surface-level solutions<br />
                            and ready for real understanding.
                        </p>
                    </motion.div>

                    <div className="for-you-grid">
                        {[
                            {
                                title: 'You Feel Stuck',
                                desc: 'Life feels heavy. You\'re going through the motions but something\'s missing. You know there\'s more, but you can\'t quite see it.'
                            },
                            {
                                title: 'You Overthink Everything',
                                desc: 'Your mind won\'t quiet down. Analysis paralysis keeps you from moving forward. You need clarity, not more information.'
                            },
                            {
                                title: 'You Want More Meaning',
                                desc: 'Success doesn\'t feel like enough. You\'re searching for purpose, direction, and work that actually matters to you.'
                            },
                            {
                                title: 'You\'re Ready for Depth',
                                desc: 'You\'ve tried quick fixes and motivational content. Now you want real understanding and lasting change.'
                            }
                        ].map((card, i) => (
                            <motion.div
                                key={i}
                                className="for-you-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                            >
                                <div className="for-you-icon">→</div>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
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
