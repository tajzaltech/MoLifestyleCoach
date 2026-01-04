import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import './ArticleDetail.css';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scrollProgress, setScrollProgress] = useState(0);

    const article = articles.find(a => a.id === id);

    useEffect(() => {
        if (!article) {
            navigate('/insights');
            return;
        }

        window.scrollTo(0, 0);

        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [article, navigate]);

    if (!article) return null;

    return (
        <div className="article-detail-page">
            {/* Reading Progress Bar */}
            <div className="reading-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

            {/* Close Button */}
            <motion.button
                className="article-close-floating"
                onClick={() => navigate('/insights')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </motion.button>

            {/* Parallax Hero */}
            <div className="article-hero-parallax">
                <div className="hero-image-wrapper">
                    <motion.img
                        src={article.image}
                        alt={article.title}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
                <div className="hero-gradient-overlay"></div>

                {/* 3D Floating Elements */}
                <div className="floating-shape shape-1"></div>
                <div className="floating-shape shape-2"></div>
                <div className="floating-shape shape-3"></div>

                <motion.div
                    className="hero-content-center"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    <span className="article-tag-hero">{article.tag}</span>
                    <h1>{article.title}</h1>
                    <div className="article-meta-hero">
                        <span>{article.readTime}</span>
                        <span className="dot">•</span>
                        <span>Premium Insight</span>
                    </div>
                </motion.div>
            </div>

            {/* Article Body */}
            <div className="article-body-container">
                <motion.div
                    className="article-content-inner"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    {/* Lead Paragraph */}
                    <p className="article-lead-text">{article.desc}</p>
                    <div className="article-divider"></div>

                    {/* Dynamic Content Rendering */}
                    {article.content && article.content.map((block, index) => {
                        if (block.type === 'h3') {
                            return (
                                <motion.h3
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {block.text}
                                </motion.h3>
                            );
                        }

                        if (block.type === 'p') {
                            return (
                                <motion.p
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {block.text}
                                </motion.p>
                            );
                        }

                        if (block.type === 'quote') {
                            return (
                                <motion.div
                                    className="quote-card-3d"
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                    whileHover={{ y: -5, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
                                >
                                    <div className="quote-icon">"</div>
                                    <blockquote>{block.text}</blockquote>
                                    <div className="quote-shine"></div>
                                </motion.div>
                            );
                        }

                        if (block.type === 'img') {
                            return (
                                <motion.div
                                    className="article-image-block"
                                    key={index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7 }}
                                >
                                    <div className="image-3d-wrapper">
                                        <img src={block.src} alt="Article visual" />
                                        <div className="image-reflection"></div>
                                    </div>
                                    {block.caption && <span className="image-caption">{block.caption}</span>}
                                </motion.div>
                            );
                        }

                        return null;
                    })}

                    {/* End Footer */}
                    <div className="article-end-section">
                        <div className="end-divider"></div>
                        <p className="end-text">End of Article</p>
                        <div className="brand-signature">MoLifestyle Coach</div>
                        <motion.button
                            className="btn-back-to-insights"
                            onClick={() => navigate('/insights')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            ← Back to Wisdom Vault
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ArticleDetail;
