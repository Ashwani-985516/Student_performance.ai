import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Hash, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import axios from 'axios';

const Onboarding = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    enrollmentNo: '',
    subject: '',
    gradYear: '',
    currentSem: '',
    endGraduation: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // In a real app, this would hit /api/register
      // For now, we'll simulate completion
      console.log("Onboarding Data:", formData);
      onComplete(formData);
    } catch (error) {
      alert("Error saving data");
    }
  };

  return (
    <div className="onboarding-container" style={{ maxWidth: '600px', margin: '4rem auto' }}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '60px', 
            height: '60px', 
            background: 'var(--primary)', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <User color="white" size={30} />
          </div>
          <h2>Student Onboarding</h2>
          <p style={{ color: 'var(--text-muted)' }}>Complete your profile to get started</p>
          
          {/* Progress Bar */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginTop: '1.5rem' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ 
                width: '40px', 
                height: '4px', 
                background: step >= i ? 'var(--primary)' : 'var(--glass-border)',
                borderRadius: '2px'
              }} />
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <div className="form-group">
                <label><User size={16} /> Full Name</label>
                <input name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label><Mail size={16} /> Email Address</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label><Phone size={16} /> Phone Number (WhatsApp)</label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 1234567890" required />
              </div>
              <button type="button" onClick={nextStep} className="btn-primary" style={{ width: '100%' }}>Next</button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <div className="form-group">
                <label><Hash size={16} /> Enrollment / Roll Number</label>
                <input name="enrollmentNo" value={formData.enrollmentNo} onChange={handleChange} placeholder="ENR123456" required />
              </div>
              <div className="form-group">
                <label><BookOpen size={16} /> Subject / Department</label>
                <input name="subject" value={formData.subject} onChange={handleChange} placeholder="Computer Science" required />
              </div>
              <div className="form-group">
                <label><GraduationCap size={16} /> Current Semester</label>
                <select name="currentSem" value={formData.currentSem} onChange={handleChange} required>
                  <option value="">Select Sem</option>
                  {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={prevStep} className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}>Back</button>
                <button type="button" onClick={nextStep} className="btn-primary" style={{ flex: 1 }}>Next</button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <div className="form-group">
                <label><Calendar size={16} /> Graduation Year</label>
                <input name="gradYear" type="number" value={formData.gradYear} onChange={handleChange} placeholder="2026" required />
              </div>
              <div className="form-group">
                <label><Calendar size={16} /> Graduation End Date (Expected)</label>
                <input name="endGraduation" type="date" value={formData.endGraduation} onChange={handleChange} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={prevStep} className="btn-primary" style={{ flex: 1, background: 'rgba(255,255,255,0.1)' }}>Back</button>
                <button type="submit" className="btn-primary" style={{ flex: 1 }}>Complete Onboarding</button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Onboarding;
