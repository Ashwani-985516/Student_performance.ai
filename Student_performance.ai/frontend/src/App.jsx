import React, { useState } from 'react';
import StudentReportView from './components/StudentReportView';
import TeacherDashboard from './components/TeacherDashboard';
import Onboarding from './components/Onboarding';
import Login from './components/Login';
import Chatbot from './components/Chatbot';
import './styles/App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, LogOut } from 'lucide-react';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('student');
  
  // Mock report data for demonstration
  const [mockReport, setMockReport] = useState({
    prediction: 'PASS',
    metrics: { studyHours: 25, attendance: 88, performance: 92, stressLevel: 3 },
    suggestions: [
      "Keep up the great consistency!",
      "Explore advanced algorithms on YouTube",
      "Check out 'Clean Code' book"
    ]
  });

  const handleLogin = (data) => {
    setUser({ ...data, role: role, profileComplete: role === 'teacher' });
  };

  const handleOnboardingComplete = (data) => {
    setUser({ ...user, profileComplete: true, ...data });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return (
      <div className="container">
        <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <h1>AI Student Performance System</h1>
          <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.05)', padding: '0.4rem', borderRadius: '1rem', border: '1px solid var(--glass-border)' }}>
            <button onClick={() => setRole('student')} className={`btn-toggle ${role === 'student' ? 'active' : ''}`}><User size={16}/> Student</button>
            <button onClick={() => setRole('teacher')} className={`btn-toggle ${role === 'teacher' ? 'active' : ''}`}><Users size={16}/> Teacher</button>
          </div>
        </header>
        <Login onLogin={handleLogin} />
      </div>
    );
  }

  if (user.role === 'student' && !user.profileComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="container">
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 style={{ fontSize: '1.8rem', margin: 0 }}>AI Student Performance</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome, {user.name || user.email || 'User'}</p>
        </div>
        <button onClick={handleLogout} className="btn-primary" style={{ background: 'rgba(244, 63, 94, 0.1)', color: '#f43f5e', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
          <LogOut size={18} /> Logout
        </button>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {user.role === 'student' ? (
            <motion.div key="student" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <StudentReportView report={mockReport} />
            </motion.div>
          ) : (
            <motion.div key="teacher" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <TeacherDashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Chatbot />
    </div>
  );
}

export default App;
