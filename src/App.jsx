import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import AnimatedRoutes from './components/AnimatedRoutes';
import ReflectionAI from './components/ReflectionAI';
import { ZenProvider } from './context/ZenContext';
import './ZenMode.css';

function App() {
  return (
    <ZenProvider>
      <Router>
        <ScrollToTop />
        <Navbar />
        <main>
          <AnimatedRoutes />
        </main>
        <Footer />
        <ReflectionAI />
        <div className="zen-indicator">Ambient Stillness Active</div>
      </Router>
    </ZenProvider>
  );
}

export default App;
