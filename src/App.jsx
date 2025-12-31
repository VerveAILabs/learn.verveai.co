import { useState } from 'react'
import { Play, Sparkles, BookOpen, Wrench, ShieldCheck, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'

function App() {
    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="logo">
                    <Sparkles className="icon-gold" />
                    <span>Learn <strong>VerveAI</strong></span>
                </div>
                <div className="nav-links">
                    <a href="#courses">Courses</a>
                    <a href="#tools">AI Tools</a>
                    <a href="#guides">Guides</a>
                    <button className="btn-premium">Subscribe</button>
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

                <section className="features-grid">
                    <div className="feature-card">
                        <BookOpen className="icon" />
                        <h3>Premium Courses</h3>
                        <p>Deep dives into LLMs, Image Synthesis, and AI Workflow automation.</p>
                    </div>
                    <div className="feature-card">
                        <Wrench className="icon" />
                        <h3>Pro-Grade Tools</h3>
                        <p>Curated list of the best AI tools, battle-tested by industry experts.</p>
                    </div>
                    <div className="feature-card">
                        <Play className="icon" />
                        <h3>Video Guides</h3>
                        <p>Step-by-step tutorials on implementing AI into your business.</p>
                    </div>
                </section>

                <section className="subscription-hook">
                    <div className="glass-card">
                        <ShieldCheck className="icon-gold" />
                        <h2>Unlock Full Access</h2>
                        <p>Join 10,000+ professionals learning to lead with AI.</p>
                        <button className="btn-premium-large">Get Started Now <ChevronRight /></button>
                    </div>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 VerveAI. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default App
