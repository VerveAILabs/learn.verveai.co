import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, Github, Chrome } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to log in. Please check your credentials.');
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (err) {
            setError('Google login failed.');
        }
    };

    return (
        <div className="login-container">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="login-card"
            >
                <div className="login-header">
                    <Sparkles className="icon-gold" size={40} />
                    <h1>Welcome Back</h1>
                    <p>Continue your AI learning journey</p>
                </div>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <Mail size={18} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <Lock size={18} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn-login">Sign In</button>
                </form>

                <div className="divider">
                    <span>or continue with</span>
                </div>

                <div className="social-login">
                    <button onClick={handleGoogleLogin} className="btn-social">
                        <Chrome size={20} /> Google
                    </button>
                </div>

                <p className="auth-footer">
                    Don't have an account? <Link to="/signup">Sign up for free</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
