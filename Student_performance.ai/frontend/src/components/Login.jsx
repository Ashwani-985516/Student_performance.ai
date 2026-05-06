import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, ArrowRight, MessageSquare } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  const [step, setStep] = useState('input'); // 'input' or 'otp'
  const [formData, setFormData] = useState({ email: '', phone: '', otp: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (method === 'phone' && step === 'input') {
      setLoading(true);
      setTimeout(() => {
        setStep('otp');
        setLoading(false);
      }, 1500);
    } else {
      onLogin(formData);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '6rem auto' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)' }}>Login to access your dashboard</p>
        </div>

        <div style={{ 
          display: 'flex', 
          background: 'rgba(255,255,255,0.05)', 
          padding: '0.3rem', 
          borderRadius: '0.8rem',
          marginBottom: '2rem'
        }}>
          <button 
            onClick={() => { setMethod('email'); setStep('input'); }}
            style={{ flex: 1, padding: '0.6rem', border: 'none', borderRadius: '0.6rem', background: method === 'email' ? 'var(--primary)' : 'transparent', color: 'white', cursor: 'pointer' }}
          >
            Email
          </button>
          <button 
            onClick={() => { setMethod('phone'); setStep('input'); }}
            style={{ flex: 1, padding: '0.6rem', border: 'none', borderRadius: '0.6rem', background: method === 'phone' ? 'var(--primary)' : 'transparent', color: 'white', cursor: 'pointer' }}
          >
            Phone
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {method === 'email' ? (
              <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="form-group">
                  <label><Mail size={16} /> Email Address</label>
                  <input type="email" placeholder="student@example.com" required />
                </div>
                <div className="form-group">
                  <label><Lock size={16} /> Password (Enrollment No)</label>
                  <input type="password" placeholder="••••••••" required />
                </div>
              </motion.div>
            ) : (
              <motion.div key="phone" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {step === 'input' ? (
                  <div className="form-group">
                    <label><Phone size={16} /> Phone Number</label>
                    <input type="text" placeholder="+91 0000000000" required />
                  </div>
                ) : (
                  <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                    <div style={{ textAlign: 'center', marginBottom: '1.5rem', background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #10b981' }}>
                      <p style={{ fontSize: '0.8rem', color: '#10b981' }}>
                        <MessageSquare size={14} /> OTP sent to your WhatsApp!
                      </p>
                    </div>
                    <div className="form-group">
                      <label>Enter 6-digit OTP</label>
                      <input type="text" maxLength="6" placeholder="000000" required />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            {loading ? 'Processing...' : step === 'input' && method === 'phone' ? 'Send OTP' : 'Login Now'}
            <ArrowRight size={18} />
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
