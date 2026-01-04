import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';
import './ArticleDetail.css';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [reflection, setReflection] = useState('');
    const containerRef = useRef(null);
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
                <div className="container article-layout-grid">

                    {/* Right Sidebar - Moved Top for Float Layout */}
                    <aside className="article-sidebar">
                        <div className="sidebar-sticky-wrap">
                            <motion.div
                                className="sidebar-widget"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.7 }}
                                whileHover={{ y: -5 }}
                            >
                                <h4 className="widget-title">Explore More</h4>
                                <div className="related-articles-mini">
                                    {articles.filter(a => a.id !== id).slice(0, 2).map(item => (
                                        <div
                                            key={item.id}
                                            className="related-item-mini"
                                            onClick={() => navigate(`/insights/article/${item.id}`)}
                                        >
                                            <div className="mini-img-wrap">
                                                <img src={item.image} alt={item.title} />
                                            </div>
                                            <div className="mini-info">
                                                <span className="mini-tag">{item.tag}</span>
                                                <h5>{item.title}</h5>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                className="sidebar-widget reflection-widget"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="widget-header-flex">
                                    <div className="widget-icon-small">✍️</div>
                                    <h4 className="widget-title no-margin">Quick Reflection</h4>
                                </div>
                                <p className="reflection-prompt">How does this insight apply to your current situation?</p>
                                <div className="reflection-input-area">
                                    <textarea
                                        className="reflection-textarea"
                                        placeholder="Start typing your thoughts..."
                                        value={reflection}
                                        onChange={(e) => setReflection(e.target.value)}
                                    />
                                    {reflection && (
                                        <button
                                            className="btn-clear-reflection"
                                            onClick={() => setReflection('')}
                                        >
                                            Clear Note
                                        </button>
                                    )}
                                </div>
                            </motion.div>

                            <motion.div
                                className="sidebar-widget wisdom-capsule-widget"
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.9 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="capsule-icon">💠</div>
                                <h4 className="widget-title">Wisdom Capsule</h4>
                                <div className="capsule-content">
                                    <p className="capsule-quote">"The best revenge is to be unlike him who performed the injury."</p>
                                    <span className="capsule-author">— Marcus Aurelius</span>
                                </div>
                            </motion.div>

                            <motion.div
                                className="sidebar-widget coaching-cta-widget"
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: 1 }}
                                whileHover={{ y: -5, scale: 1.02 }}
                            >
                                <div className="cta-widget-inner">
                                    <div className="cta-icon-3d">✨</div>
                                    <h4>Ready for Clarity?</h4>
                                    <p>Work directly with Moaz to transform these insights into action.</p>
                                    <button
                                        className="btn-sidebar-cta"
                                        onClick={() => navigate('/connect')}
                                    >
                                        Schedule a Session
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    </aside>

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
                                        initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
                                        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        {block.text}
                                    </motion.h3>
                                );
                            }

                            if (block.type === 'p') {
                                return (
                                    <motion.p
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-30px" }}
                                        transition={{ duration: 0.7, delay: 0.1 }}
                                    >
                                        {block.text}
                                    </motion.p>
                                );
                            }

                            if (block.type === 'quote') {
                                return (
                                    <motion.div
                                        className="quote-card-clean"
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="quote-icon-simple">"</div>
                                        <div className="quote-accent-bar"></div>
                                        <blockquote>{block.text}</blockquote>
                                    </motion.div>
                                );
                            }

                            if (block.type === 'img') {
                                return (
                                    <motion.div
                                        className="article-image-block"
                                        key={index}
                                        initial={{ opacity: 0, scale: 1.05, y: 30 }}
                                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    >
                                        <div className="image-simple-wrapper">
                                            <img src={block.src} alt="Article visual" />
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
        </div>
    );
};

export default ArticleDetail;
