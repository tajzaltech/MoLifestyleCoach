import { motion } from 'framer-motion';
import workspaceImage from '../assets/workspace.png';
import './Connect.css';

const Connect = () => {
    const fadeUp = {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: 'easeOut' }
    };

    const socialLinks = [
        {
            platform: 'YouTube',
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#FF0000" />
                    <path d="M12 10L22 16L12 22V10Z" fill="white" />
                </svg>
            ),
            title: 'Watch & Learn',
            description: 'Weekly insights on clarity, meaning, and psychology',
            url: 'https://www.youtube.com/@Molifestylecoach/videos',
            buttonText: 'Visit YouTube',
            gradient: 'linear-gradient(135deg, #FF0000 0%, #CC0000 100%)',
            color: '#FF0000'
        },
        {
            platform: 'Instagram',
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <defs>
                        <linearGradient id="ig-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#833AB4" />
                            <stop offset="50%" stopColor="#E1306C" />
                            <stop offset="100%" stopColor="#F56040" />
                        </linearGradient>
                    </defs>
                    <rect width="32" height="32" rx="8" fill="url(#ig-gradient)" />
                    <circle cx="16" cy="16" r="5" stroke="white" strokeWidth="2" fill="none" />
                    <circle cx="23" cy="9" r="1.5" fill="white" />
                    <rect x="7" y="7" width="18" height="18" rx="4" stroke="white" strokeWidth="2" fill="none" />
                </svg>
            ),
            title: 'Daily Insights',
            description: 'Reflections, quotes, and community updates',
            url: 'https://instagram.com/molifestylecoach',
            buttonText: ' On Instagram',
            gradient: 'linear-gradient(135deg, #833AB4 0%, #E1306C 50%, #F56040 100%)',
            color: '#E1306C'
        },
        {
            platform: 'Gmail',
            icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <rect width="32" height="32" rx="8" fill="#EA4335" />
                    <path d="M7 9V23H11V14L16 18L21 14V23H25V9H21L16 13L11 9H7Z" fill="white" />
                </svg>
            ),
            title: 'Direct Contact',
            description: 'For inquiries, collaborations, or personal guidance',
            url: 'mailto:hello@molifestylecoach.com',
            buttonText: 'Send Email',
            gradient: 'linear-gradient(135deg, #EA4335 0%, #C5221F 100%)',
            color: '#EA4335'
        }
    ];

    return (
        <div className="connect-page-new">
            {/* Hero Section */}
            <section className="connect-hero">
                <div className="connect-hero-pattern"></div>
                <div className="container">
                    <motion.div className="connect-hero-content" {...fadeUp}>
                        <span className="connect-badge">Let's Connect</span>
                        <h1>You Don't Have to<br />Do This Alone</h1>
                        <p className="connect-lead">
                            Whether you're seeking clarity, have questions about guidance,<br />
                            or just want to start a conversation—I'm here.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Booking Section - LIVE EXPERIENCE */}
            <section className="booking-section-live">
                <div className="booking-live-glow"></div>
                <div className="container">
                    <motion.div
                        className="booking-card-cinematic"
                        initial={{ opacity: 0, scale: 0.98, y: 30 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                    >
                        {/* Live Header Status */}
                        <div className="booking-live-header">
                            <div className="status-indicator">
                                <span className="pulsing-dot"></span>
                                <span className="status-label">Accepting New Clients This Week</span>
                            </div>
                            <div className="social-proof-banner">
                                <span className="proof-item">⭐ 4.9/5 Rating</span>
                                <span className="proof-dot"></span>
                                <span className="proof-item">👥 500+ Lives Impacted</span>
                            </div>
                        </div>

                        <div className="booking-inner-grid">
                            {/* LEFT: CRAFTING THE JOURNEY */}
                            <div className="booking-narrative">
                                <span className="premium-accent-tag">1-TO-1 SESSIONS</span>
                                <h2>Your Architecture of <span>Clarity</span></h2>
                                <p className="narrative-text">
                                    Move beyond simple advice. Experience a <strong>rigorous self-discovery session</strong>
                                    grounded in existential psychology.
                                </p>

                                <div className="key-pillars">
                                    <motion.div className="pillar-node" whileHover={{ x: 10 }}>
                                        <div className="node-icon-svg">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="node-info">
                                            <h4>Psychological Audit</h4>
                                            <p>We map your internal architecture with surgical precision.</p>
                                        </div>
                                    </motion.div>
                                    <motion.div className="pillar-node" whileHover={{ x: 10 }}>
                                        <div className="node-icon-svg">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                            </svg>
                                        </div>
                                        <div className="node-info">
                                            <h4>Meaning Roadmap</h4>
                                            <p>Create a concrete path toward your unique existential 'Why'.</p>
                                        </div>
                                    </motion.div>
                                    <motion.div className="pillar-node" whileHover={{ x: 10 }}>
                                        <div className="node-icon-svg">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <div className="node-info">
                                            <h4>Safe Space</h4>
                                            <p>A 100% confidential environment for your deepest work.</p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* RIGHT: INTERACTIVE ACTION BOX */}
                            <div className="booking-focus-box">
                                <div className="glass-booking-card">
                                    <div className="icon-main-ref">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                            <line x1="16" y1="2" x2="16" y2="6" />
                                            <line x1="8" y1="2" x2="8" y2="6" />
                                            <line x1="3" y1="10" x2="21" y2="10" />
                                            <circle cx="12" cy="16" r="2" fill="currentColor" fillOpacity="0.8" />
                                        </svg>
                                    </div>
                                    <h3>Start Your Transformation</h3>
                                    <p>Select a 30-minute discovery slot to begin the process.</p>

                                    <motion.a
                                        href="https://calendly.com/molifestylecoaching/30min"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="cta-book-ultimate"
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        whileTap={{ scale: 0.97 }}
                                    >
                                        <span>Secure Your Session</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </motion.a>

                                    <div className="guarantee-line">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5zm-2 16l-4-4 1.41-1.41L10 15.17l7.59-7.59L19 9l-9 9z" />
                                        </svg>
                                        <span>Guaranteed Meaning-Centered Shift</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Social Connections */}
            <section className="social-section">
                <div className="container">
                    <motion.div className="section-header-connect" {...fadeUp}>
                        <h2>Other Ways to Connect</h2>
                        <p className="section-subtitle-connect">
                            Follow along, learn, and stay connected through these platforms
                        </p>
                    </motion.div>

                    <div className="social-grid">
                        {socialLinks.map((link, index) => (
                            <motion.div
                                key={index}
                                className="social-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                style={{ '--card-gradient': link.gradient }}
                            >
                                <div className="social-card-header">
                                    <div className="social-icon-wrapper">
                                        {link.icon}
                                    </div>
                                    <div>
                                        <h3>{link.title}</h3>
                                        <span className="social-platform">{link.platform}</span>
                                    </div>
                                </div>

                                <p className="social-description">{link.description}</p>

                                <a
                                    href={link.url}
                                    target={link.platform === 'Email' ? '_self' : '_blank'}
                                    rel={link.platform === 'Email' ? '' : 'noopener noreferrer'}
                                    className="btn-social"
                                    style={{ background: link.gradient }}
                                >
                                    {link.buttonText}
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Reach Out */}
            <section className="why-reach-section">
                <div className="container">
                    <div className="why-reach-grid">
                        <motion.div
                            className="why-reach-image"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <img src={workspaceImage} alt="Calm workspace" className="reach-image" />
                        </motion.div>

                        <motion.div
                            className="why-reach-content"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2>Why People Reach Out</h2>
                            <p className="why-intro">
                                You don't need to have everything figured out to start. Most people who reach
                                out are in one of these situations:
                            </p>

                            <div className="why-reasons-architectural">
                                <div className="reason-node">
                                    <div className="reason-icon-svg">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                            <line x1="12" y1="17" x2="12.01" y2="17" />
                                        </svg>
                                    </div>
                                    <div className="reason-text">
                                        <h4>Feeling Stuck</h4>
                                        <p>You know something needs to change, but you're not sure how.</p>
                                    </div>
                                </div>

                                <div className="reason-node">
                                    <div className="reason-icon-svg">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                        </svg>
                                    </div>
                                    <div className="reason-text">
                                        <h4>Seeking Clarity</h4>
                                        <p>Life feels overwhelming and you need to make sense of it all.</p>
                                    </div>
                                </div>

                                <div className="reason-node">
                                    <div className="reason-icon-svg">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10" />
                                            <line x1="22" y1="12" x2="18" y2="12" />
                                            <line x1="6" y1="12" x2="2" y2="12" />
                                            <line x1="12" y1="2" x2="12" y2="6" />
                                            <line x1="12" y1="22" x2="12" y2="18" />
                                        </svg>
                                    </div>
                                    <div className="reason-text">
                                        <h4>Looking for Meaning</h4>
                                        <p>Success isn't enough. You want work and life with purpose.</p>
                                    </div>
                                </div>

                                <div className="reason-node">
                                    <div className="reason-icon-svg">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                        </svg>
                                    </div>
                                    <div className="reason-text">
                                        <h4>Ready for Growth</h4>
                                        <p>You've done the surface work. Now you want depth.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Final Message */}
            <section className="connect-final">
                <div className="container">
                    <motion.div className="final-content" {...fadeUp}>
                        <h2>You Just Need a Place to Start</h2>
                        <p className="final-text">
                            Whether you book a session, watch a video, or send an email—<br />
                            taking that first step is what matters.
                        </p>
                        <p className="final-subtext">
                            I'm here when you're ready.
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Connect;
