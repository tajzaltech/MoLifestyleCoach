import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { processReflectiveQuery, getGreeting } from '../utils/reflectionEngine';
import './ReflectionAI.css';

const TypewriterText = ({ text, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 10); // Very fast typing for premium feel
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, onComplete]);

    return <p>{displayedText}</p>;
};

const ReflectionAI = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [userMessagesCount, setUserMessagesCount] = useState(0);
    const messagesEndRef = useRef(null);

    const toggleChat = () => {
        if (!isOpen) {
            // Reset for a fresh session upon opening
            setMessages([]);
            setUserMessagesCount(0);
            setInputValue('');
        }
        setIsOpen(!isOpen);
    };

    // Auto-scroll to bottom of messages
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize with greeting when messages are cleared (usually on open)
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const greeting = getGreeting();
            setMessages([{
                type: 'ai',
                text: greeting,
                timestamp: new Date(),
                isTyping: true
            }]);
        }
    }, [isOpen, messages.length]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = {
            type: 'user',
            text: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsThinking(true);

        // Simulate thinking delay for premium feel
        setTimeout(() => {
            const aiResponse = processReflectiveQuery(userMessage.text);
            const nextCount = userMessagesCount + 1;
            setUserMessagesCount(nextCount);

            const aiMessage = {
                type: 'ai',
                text: aiResponse.response,
                category: aiResponse.category,
                suggestedActions: nextCount >= 3 ? aiResponse.suggestedActions : null,
                timestamp: new Date(),
                isTyping: true // Mark as typing initially
            };

            setMessages(prev => [...prev, aiMessage]);
            setIsThinking(false);
        }, 1500);
    };

    const handleTypewriterComplete = (index) => {
        setMessages(prev => prev.map((msg, i) =>
            i === index ? { ...msg, isTyping: false } : msg
        ));
    };

    const handleQuickPrompt = (prompt) => {
        setInputValue(prompt);
    };

    const quickPrompts = [
        "I feel lost in my career",
        "What is my purpose?",
        "I'm overwhelmed with anxiety",
        "How do I find clarity?"
    ];

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                className="reflection-fab"
                onClick={toggleChat}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                    boxShadow: isOpen
                        ? '0 0 30px rgba(29, 56, 71, 0.4)'
                        : '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M18 6L6 18M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="sparkles"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </motion.svg>
                    )}
                </AnimatePresence>

                {!isOpen && (
                    <motion.span
                        className="fab-pulse"
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.5, 0, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}
            </motion.button>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="reflection-chat-container"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Header */}
                        <div className="reflection-header">
                            <div className="header-content">
                                <div className="header-avatar">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                    </svg>
                                </div>
                                <div className="header-text">
                                    <h3>MO AI</h3>
                                    <p>Grounded in MoLifestyle Philosophy</p>
                                </div>
                            </div>
                            <motion.button
                                className="header-close"
                                onClick={toggleChat}
                                whileHover={{ rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M18 6L6 18M6 6l12 12" />
                                </svg>
                            </motion.button>
                        </div>

                        {/* Messages Area */}
                        <div className="reflection-messages">
                            <AnimatePresence>
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={index}
                                        className={`message ${message.type}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {message.type === 'ai' && (
                                            <div className="message-avatar">
                                                <svg viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="message-content">
                                            {message.type === 'ai' && message.isTyping ? (
                                                <TypewriterText
                                                    text={message.text}
                                                    onComplete={() => handleTypewriterComplete(index)}
                                                />
                                            ) : (
                                                <p>{message.text}</p>
                                            )}

                                            {message.suggestedActions && !message.isTyping && (
                                                <motion.div
                                                    className="message-actions"
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.4 }}
                                                >
                                                    {message.suggestedActions.map((action, i) => (
                                                        <Link
                                                            key={i}
                                                            to={action.link}
                                                            className="action-link"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            {action.label} →
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* Thinking Indicator */}
                            {isThinking && (
                                <motion.div
                                    className="message ai thinking"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    <div className="message-avatar">
                                        <svg viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <div className="message-content">
                                        <div className="thinking-dots">
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Prompts */}
                        {messages.length <= 1 && (
                            <motion.div
                                className="quick-prompts"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {quickPrompts.map((prompt, i) => (
                                    <motion.button
                                        key={i}
                                        className="quick-prompt-btn"
                                        onClick={() => handleQuickPrompt(prompt)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {prompt}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}

                        {/* Input Area */}
                        <form className="reflection-input-area" onSubmit={handleSubmit}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Share what's on your mind..."
                                className="reflection-input"
                                disabled={isThinking}
                            />
                            <motion.button
                                type="submit"
                                className="send-btn"
                                disabled={!inputValue.trim() || isThinking}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                </svg>
                            </motion.button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ReflectionAI;
