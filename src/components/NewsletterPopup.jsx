import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import './NewsletterPopup.css';

const EMAILJS_SERVICE_ID = 'service_l3nven3';
const EMAILJS_TEMPLATE_ID = 'template_9r0u6xa';
const EMAILJS_PUBLIC_KEY = 'c_29_znZcZODeVkjm';

const NewsletterPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if already seen/subscribed
        const seen = localStorage.getItem('molifestyle_newsletter_seen');
        // if (seen) return; // Temporarily disabled for testing

        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 2000); // Reduced to 2 seconds for testing

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem('molifestyle_newsletter_seen', 'true');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email) return;

        try {
            setLoading(true);

            // Prepare template parameters
            // Prepare template parameters
            const templateParams = {
                to_name: email.split('@')[0],
                user_email: email,
                reply_to: email, // Often required
                message: 'New newsletter subscription',
            };

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams,
                EMAILJS_PUBLIC_KEY
            );

            console.log('Subscribed successfully:', email);
            setSubmitted(true);

            // Auto close after success message
            setTimeout(() => {
                handleClose();
            }, 3000);

        } catch (err) {
            console.error('Failed to subscribe:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="newsletter-backdrop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="newsletter-modal"
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="newsletter-close" onClick={handleClose}>×</button>

                        <div className="newsletter-content">
                            <span className="newsletter-badge">Stay Connected</span>
                            <h2>For when life<br /><span>feels confusing</span></h2>
                            <p>
                                Join our community receiving weekly psychological insights,
                                practical tools, and honest reflections on living with purpose.
                            </p>

                            {!submitted ? (
                                <form className="newsletter-form" onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                    />
                                    <button type="submit" disabled={loading}>
                                        {loading ? 'Subscribing...' : 'Subscribe'}
                                    </button>
                                    {error && <p className="newsletter-error" style={{ color: '#ef4444', fontSize: '12px', marginTop: '8px' }}>{error}</p>}
                                </form>
                            ) : (
                                <div className="newsletter-success">
                                    <div className="success-icon">✓</div>
                                    <p>You're in! Welcome to the journey.</p>
                                </div>
                            )}

                            <p className="newsletter-disclaimer">No spam. Unsubscribe anytime.</p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default NewsletterPopup;
