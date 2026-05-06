import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb, Youtube, Book, Layout, Send, Rocket } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import axios from 'axios';

const StudentReportView = ({ report }) => {
  const [feedback, setFeedback] = useState('');
  const [idea, setIdea] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!report) return (
    <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
      <Layout size={48} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
      <h3>No Report Available Yet</h3>
      <p style={{ color: 'var(--text-muted)' }}>Your teacher hasn't uploaded your performance report yet. Please check back later.</p>
    </div>
  );

  const chartData = [
    { name: 'Study', value: report.metrics?.studyHours || 0, color: '#6366f1' },
    { name: 'Attendance', value: report.metrics?.attendance || 0, color: '#22d3ee' },
    { name: 'Performance', value: report.metrics?.performance || 0, color: '#a855f7' },
  ];

  const handleSubmitFeedback = async () => {
    try {
      // Mock API call
      console.log("Feedback:", feedback, "Idea:", idea);
      setSubmitted(true);
      setFeedback('');
      setIdea('');
    } catch (e) {
      alert("Error submitting data");
    }
  };

  return (
    <div className="report-view">
      {/* Prediction Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
        style={{ marginBottom: '2rem', textAlign: 'center', borderTop: `4px solid ${report.prediction === 'PASS' ? '#10b981' : '#f43f5e'}` }}
      >
        <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Your Academic Status</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          {report.prediction === 'PASS' ? <CheckCircle color="#10b981" size={48} /> : <XCircle color="#f43f5e" size={48} />}
          <h1 style={{ margin: 0, background: report.prediction === 'PASS' ? '#10b981' : '#f43f5e', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {report.prediction}
          </h1>
        </div>
      </motion.div>

      {/* Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <div className="glass-card">
          <h3>Metrics Overview</h3>
          <div style={{ height: '200px', marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid var(--glass-border)' }} />
                <Bar dataKey="value">
                  {chartData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card">
          <h3>Personalized AI Resources</h3>
          <div style={{ display: 'grid', gap: '0.8rem', marginTop: '1rem' }}>
            <ResourceItem icon={<Youtube color="#ef4444" />} label="YouTube Source" text="Advanced DSA Tutorials" />
            <ResourceItem icon={<Book color="#3b82f6" />} label="Recommended Book" text="Cracking the Coding Interview" />
            <ResourceItem icon={<Rocket color="#a855f7" />} label="AI Tool" text="ChatGPT for Code Debugging" />
          </div>
        </div>
      </div>

      {/* Response & Ideas Section */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ background: 'rgba(99, 102, 241, 0.05)' }}>
        <h3>Your Thoughts & Ideas</h3>
        {submitted ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#10b981' }}>
            <CheckCircle size={32} style={{ marginBottom: '0.5rem' }} />
            <p>Thank you! Your feedback and ideas have been submitted to your teacher.</p>
            <button onClick={() => setSubmitted(false)} className="btn-primary" style={{ marginTop: '1rem' }}>Submit More</button>
          </div>
        ) : (
          <div style={{ marginTop: '1.5rem' }}>
            <div className="form-group">
              <label>Give Your Response</label>
              <textarea 
                value={feedback} 
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="How do you feel about this report?"
                style={{ width: '100%', height: '80px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--glass-border)', borderRadius: '0.8rem', padding: '1rem', color: 'white' }}
              />
            </div>
            <div className="form-group">
              <label>Submit Your Ideas</label>
              <textarea 
                value={idea} 
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Share any ideas for improvement or new features..."
                style={{ width: '100%', height: '80px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid var(--glass-border)', borderRadius: '0.8rem', padding: '1rem', color: 'white' }}
              />
            </div>
            <button onClick={handleSubmitFeedback} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Send size={18} /> Submit to Teacher
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const ResourceItem = ({ icon, label, text }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.8rem', border: '1px solid var(--glass-border)' }}>
    {icon}
    <div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{label}</div>
      <div style={{ fontSize: '0.9rem' }}>{text}</div>
    </div>
  </div>
);

export default StudentReportView;
