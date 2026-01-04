import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from '../pages/Home';
import About from '../pages/About';
import Guidance from '../pages/Guidance';
import Connect from '../pages/Connect';
import Insights from '../pages/Insights';
import ArticleDetail from '../pages/ArticleDetail';

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1] // Cinematic luxury ease
            }}
        >
            {children}
        </motion.div>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/guidance" element={<PageWrapper><Guidance /></PageWrapper>} />
                <Route path="/insights" element={<PageWrapper><Insights /></PageWrapper>} />
                <Route path="/insights/article/:id" element={<PageWrapper><ArticleDetail /></PageWrapper>} />
                <Route path="/connect" element={<PageWrapper><Connect /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
