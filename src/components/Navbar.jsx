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
                        About
                    </Link>
                    <Link to="/guidance" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        Guidance
                    </Link>
                    <a
                        href="https://youtube.com/@Molifestylecoach/videos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="navbar-link"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Watch
                    </a>
                    <Link to="/connect" className="navbar-link" onClick={() => setMobileMenuOpen(false)}>
                        Connect
                    </Link>

                    <a
                        href="https://calendly.com/molifestylecoaching/30min"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-nav"
                    >
                        Work With Me
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
