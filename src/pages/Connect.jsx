import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import workspaceImage from '../assets/workspace.png';
import './Connect.css';

const LiveClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="live-clock-bento">
            <span className="clock-time">
                {time.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZone: 'Europe/London'
                })}
            </span>
            <span className="clock-zone">GMT • UK</span>
        </div>
    );
};

const Connect = () => {
    const fadeUp = {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    };

    const sessionPillars = [
        {
            title: 'A Safe Space to Speak',
            desc: 'Talk openly, at your pace. You’ll be met with calm, care, and zero judgement.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="21" />
                    <circle cx="12" cy="22" r="1" />
                </svg>
            )
        },
        {
            title: 'Finding Clarity',
            desc: 'We slow things down and work out what’s really going on.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                    <path d="M11 8v6M8 11h6" />
                </svg>
            )
        },
        {
            title: 'A Plan That Fits You',
            desc: 'Practical, personalised direction shaped around your life, needs, and reality.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M9 16l2 2 4-4" />
                </svg>
            )
        },
        {
            title: 'Steady Support',
            desc: 'We review progress and adjust your plan as you move forward.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 15v2" />
                    <path d="M12 7v2" />
                </svg>
            )
        }
    ];

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
            {/* World-Class Connect Bento Hero */}
            <section className="connect-hero-bento">
                <div className="container">
                    <div className="bento-hero-grid">

                        {/* THE HEADLINE TILE (Large) */}
                        <motion.div
                            className="bento-tile-cinematic tile-hero-main"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="aesthetic-badge-minimal">Gateway to Clarity</span>
                            <h1>Let's Bridge the <span className="stroke-text">Gap.</span></h1>
                            <p className="bento-lead">
                                Your journey to an unshakeable sense of meaning starts with a single, honest conversation.
                            </p>
                        </motion.div>

                        {/* LIVE AVAILABILITY TILE */}
                        <motion.div
                            className="bento-tile-cinematic tile-availability"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="availability-status">
                                <div className="pulse-dot active"></div>
                                <span>Accepting New Clients</span>
                            </div>
                            <LiveClock />
                        </motion.div>

                        {/* MASTER BOOKING TILE (Call to Action) */}
                        <motion.div
                            className="bento-tile-cinematic tile-master-cta"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="cta-icon-float">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path d="M12 2v20M2 12h20" />
                                </svg>
                            </div>
                            <h3>Private Consultation</h3>
                            <p>Bespoke 1-to-1 session designed for your personal evolution.</p>
                            <a href="https://wa.me/441234567890" target="_blank" rel="noopener noreferrer" className="btn-bento-primary">
                                Secure Your Slot
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </a>
                        </motion.div>

                        {/* PHILOSOPHY SNAP TILE */}
                        <motion.div
                            className="bento-tile-cinematic tile-philosophy"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="quote-icon">“</div>
                            <p>Clarity isn't found; it's architected.</p>
                            <span className="philosophy-tag">The MoLifestyle Creed</span>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Compact 1-to-1 Sessions - 70/30 Split */}
            <section className="booking-section-compact">
                <div className="container">
                    <motion.div
                        className="sessions-split-layout"
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                        viewport={{ once: true }}
                    >
                        {/* LEFT SIDE (70%): Narrative & Pillars */}
                        <div className="sessions-main-content">
                            <span className="premium-label">1-TO-1 SESSIONS</span>
                            <h2 className="sessions-compact-title">A space to talk things through</h2>
                            <p className="sessions-compact-desc">
                                If life feels heavy, confusing, or stuck, these sessions give you a calm space to talk openly,
                                feel heard, and slowly make sense of what’s going on — without pressure or judgement.
                            </p>

                            <div className="pillars-compact-grid">
                                {sessionPillars.map((pillar, i) => (
                                    <div key={i} className="pillar-item-mini">
                                        <div className="pillar-icon-mini">{pillar.icon}</div>
                                        <div className="pillar-text-mini">
                                            <h4>{pillar.title}</h4>
                                            <p>{pillar.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT SIDE (30%): The Action Hub */}
                        <div className="sessions-action-hub">
                            <div className="action-hub-inner">
                                <div className="live-status-pill">
                                    <span className="dot-pulse-mini"></span>
                                    <span>Available This Week</span>
                                </div>
                                <h3>Ready to begin?</h3>
                                <p>Select your discovery slot to start the process.</p>

                                <motion.a
                                    href="https://calendly.com/molifestylecoaching/30min"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-compact-book"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Book Discovery
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </motion.a>
                                <span className="confidential-tag">100% Confidential & Secure</span>
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
                                whileHover={{ y: -10, scale: 1.02 }}
                                viewport={{ once: true }}
                                transition={{
                                    opacity: { duration: 0.6, delay: index * 0.1 },
                                    y: { duration: 0.6, delay: index * 0.1 },
                                    default: { type: 'spring', stiffness: 300, damping: 25 }
                                }}
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

            {/* Why Reach Out - Refined Editorial Design */}
            <section className="why-reach-section">
                <div className="container">
                    <div className="why-reach-grid">
                        <motion.div
                            className="why-reach-visual"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <div className="reach-portrait-frame">
                                <img src={workspaceImage} alt="Consultation Space" className="reach-image-refined" />
                                <div className="reach-image-accent"></div>
                            </div>
                        </motion.div>

                        <div className="why-reach-content-refined">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="premium-label">COMMON STARTING POINTS</span>
                                <h2>Why People Reach Out</h2>
                                <p className="why-intro-refined">
                                    You don't need to have everything figured out to start. Most people who reach
                                    out are in one of these situations:
                                </p>
                            </motion.div>

                            <div className="why-reasons-refined-grid">
                                {[
                                    {
                                        title: 'Feeling Stuck',
                                        desc: 'You know something needs to change, but you\'re not sure how.',
                                        icon: (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <circle cx="12" cy="12" r="10" />
                                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                                                <line x1="12" y1="17" x2="12.01" y2="17" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: 'Seeking Clarity',
                                        desc: 'Life feels overwhelming and you need to make sense of it all.',
                                        icon: (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: 'Looking for Meaning',
                                        desc: 'Success isn\'t enough. You want work and life with purpose.',
                                        icon: (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="22" y1="12" x2="18" y2="12" />
                                                <line x1="6" y1="12" x2="2" y2="12" />
                                                <line x1="12" y1="2" x2="12" y2="6" />
                                                <line x1="12" y1="22" x2="12" y2="18" />
                                            </svg>
                                        )
                                    },
                                    {
                                        title: 'Ready for Growth',
                                        desc: 'You\'ve done the surface work. Now you want depth.',
                                        icon: (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                            </svg>
                                        )
                                    }
                                ].map((reason, i) => (
                                    <motion.div
                                        key={i}
                                        className="reason-card-aesthetic"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ y: -5, borderColor: 'var(--accent)' }}
                                        transition={{ duration: 0.5, delay: i * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="reason-icon-accent">{reason.icon}</div>
                                        <div className="reason-info-aesthetic">
                                            <h4>{reason.title}</h4>
                                            <p>{reason.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
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
