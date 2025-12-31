import { useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Play, Sparkles, BookOpen, Wrench, ShieldCheck, ChevronRight, LogOut, User } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuth } from './context/AuthContext'
import Login from './pages/Login'
import ContentPage from './pages/ContentPage'
import './App.css'

function LandingPage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                    <Sparkles className="icon-gold" />
                    <span>Learn <strong>VerveAI</strong></span>
                </div>
                <div className="nav-links">
                    <a href="#courses">Courses</a>
                    <a href="#tools">AI Tools</a>
                    <a href="#guides">Guides</a>
                    {user ? (
                        <div className="user-menu">
                            <span className="user-email"><User size={16} /> {user.email}</span>
                            <button onClick={logout} className="btn-icon"><LogOut size={18} /></button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-premium">Login</Link>
                    )}
                </div>
            </nav>

            <main>
                <header className="hero">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="badge">PREMIUM PLATFORM</span>
                        <h1>Master the AI Revolution</h1>
                        <p>Exclusive access to premium courses, pro-grade AI tools, and expert-led video guides.</p>
                        <div className="hero-actions">
                            <button className="btn-primary">Browse Courses</button>
                            <button className="btn-outline">Watch Trailer</button>
                        </div>
                    </motion.div>
                </header>

                <section id="courses" className="features-grid">
                    <Link to="/content/llm-mastery" className="feature-card clickable">
                        <BookOpen className="icon" />
                        <h3>LLM Mastery</h3>
                        <p>Deep dives into LLMs, Image Synthesis, and AI Workflow automation.</p>
                        <span className="card-action">Start Learning <ChevronRight size={16} /></span>
                    </Link>
                    <Link to="/content/ai-tools-pro" className="feature-card clickable">
                        <Wrench className="icon" />
                        <h3>AI Tools Pro</h3>
                        <p>Curated list of the best AI tools, battle-tested by industry experts.</p>
                        <span className="card-action">View Tools <ChevronRight size={16} /></span>
                    </Link>
                    <Link to="/content/video-implementation" className="feature-card clickable">
                        <Play className="icon" />
                        <h3>Video Guides</h3>
                        <p>Step-by-step tutorials on implementing AI into your business.</p>
                        <span className="card-action">Watch Now <ChevronRight size={16} /></span>
                    </Link>
                </section>

                <section className="subscription-hook">
                    <div className="glass-card">
                        <ShieldCheck className="icon-gold" />
                        {user ? (
                            <>
                                <h2>Ready to Expand?</h2>
                                <p>Unlock all premium content with our free starter plan.</p>
                                <Link to="/content/starter-guide" className="btn-premium-large">Go to Dashboard <ChevronRight /></Link>
                            </>
                        ) : (
                            <>
                                <h2>Unlock Full Access</h2>
                                <p>Join 10,000+ professionals learning to lead with AI.</p>
                                <Link to="/login" className="btn-premium-large">Get Started Now <ChevronRight /></Link>
                            </>
                        )}
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 VerveAI. All rights reserved.</p>
            </footer>
        </div>
    )
}

function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/content/:slug" element={<ContentPage />} />
        </Routes>
    )
}

export default App
