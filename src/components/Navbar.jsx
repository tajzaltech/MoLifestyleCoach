import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useZen } from '../context/ZenContext';
import './Navbar.css';

const Navbar = () => {
    const { isZenMode, toggleZenMode } = useZen();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-content">
                <button
                    className={`navbar-toggle ${mobileMenuOpen ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <Link to="/" className="navbar-brand">
                    MoLifestyle<span>Coach</span>
                </Link>

                <button
                    className={`zen-toggle-mini ${isZenMode ? 'active' : ''}`}
                    onClick={toggleZenMode}
                    title={isZenMode ? "Pause Stillness" : "Play Stillness"}
                >
                    {isZenMode ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="6" y="4" width="4" height="16" />
                            <rect x="14" y="4" width="4" height="16" />
                        </svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </button>

                <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
                    <Link to="/about" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        <span className="nav-text">About</span>
                        <span className="nav-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </span>
                    </Link>
                    <Link to="/insights" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        <span className="nav-text">Insights</span>
                        <span className="nav-icon">
                            {/* Lightbulb Icon for Insights */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5a6 6 0 0 0-11 0c0 1.5.5 2.5 1.5 3.5.8.8 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
                        </span>
                    </Link>
                    <Link to="/guidance" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        <span className="nav-text">Guidance</span>
                        <span className="nav-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"></polygon></svg>
                        </span>
                    </Link>
                    <a
                        href="https://youtube.com/@Molifestylecoach/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        <span className="nav-text">Watch</span>
                        <span className="nav-icon">
                            {/* YouTube Icon for Watch */}
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                        </span>
                    </a>
                    <Link
                        to="/connect"
                        className="btn btn-primary btn-nav"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Work With Me
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
