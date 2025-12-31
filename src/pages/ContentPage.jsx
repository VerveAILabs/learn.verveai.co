import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserSubscription, subscribeToFreePlan } from '../services/subscriptionService';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, ArrowLeft, PlayCircle } from 'lucide-react';

const ContentPage = () => {
    const { slug } = useParams();
    const { user } = useAuth();
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getUserSubscription(user.uid).then(sub => {
                setSubscription(sub);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleSubscribe = async () => {
        if (!user) return;
        const success = await subscribeToFreePlan(user.uid);
        if (success) {
            setSubscription({ status: 'active', plan: 'Free Learning Plan' });
        }
    };

    if (loading) return <div className="loading-state">Loading premium content...</div>;

    const hasAccess = subscription?.status === 'active';

    return (
        <div className="content-page-container">
            <nav className="content-nav">
                <Link to="/" className="back-link"><ArrowLeft size={20} /> Back to Hub</Link>
            </nav>

            <main className="content-main">
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="content-header"
                >
                    <span className="content-type-badge">PREMIUM GUIDE</span>
                    <h1>{slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</h1>
                    <p>Unlock the full potential of AI with this expert-led deep dive.</p>
                </motion.header>

                <div className="content-body">
                    {hasAccess ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="premium-content-revealed"
                        >
                            <div className="video-placeholder">
                                <PlayCircle size={64} className="play-icon" />
                                <p>Premium Video Class: {slug}</p>
                            </div>
                            <div className="text-content">
                                <h2>Introduction</h2>
                                <p>Welcome to the premium section. This content is dynamically loaded based on the slug: <strong>{slug}</strong>.</p>
                                <p>In this module, we will explore advanced implementation strategies that are only available to our subscribed members.</p>

                                <div className="pro-tips">
                                    <h3><CheckCircle size={20} /> Pro Tips</h3>
                                    <ul>
                                        <li>Always validate your AI outputs before production.</li>
                                        <li>Use semantic versioning for your prompt templates.</li>
                                        <li>Monitor latency across different regional endpoints.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <div className="locked-content-overlay">
                            <div className="lock-card">
                                <Lock size={48} className="lock-icon" />
                                <h2>This Content is Locked</h2>
                                <p>You need an active subscription to access this premium guide.</p>
                                {user ? (
                                    <button onClick={handleSubscribe} className="btn-premium">
                                        Unlock for $0 (Free Plan)
                                    </button>
                                ) : (
                                    <Link to="/login" className="btn-primary">
                                        Login to Unlock
                                    </Link>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default ContentPage;
