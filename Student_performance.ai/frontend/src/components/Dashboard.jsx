import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const Dashboard = ({ result }) => {
  if (!result) return null;

  const chartData = [
    { name: 'Study', value: result.metrics?.studyHours || 0, color: '#6366f1' },
    { name: 'Attendance', value: result.metrics?.attendance || 0, color: '#22d3ee' },
    { name: 'Performance', value: result.metrics?.performance || 0, color: '#a855f7' },
  ];

  const pieData = [
    { name: 'Stress', value: result.metrics?.stressLevel || 5, fill: '#f43f5e' },
    { name: 'Stability', value: 10 - (result.metrics?.stressLevel || 5), fill: '#10b981' },
  ];

  return (
    <div className="dashboard-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
        style={{ marginBottom: '2rem', textAlign: 'center', borderTop: `4px solid ${result.prediction === 'PASS' ? '#10b981' : '#f43f5e'}` }}
      >
        <div style={{ fontSize: '1.2rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>AI Prediction</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          {result.prediction === 'PASS' ? (
            <CheckCircle color="#10b981" size={48} />
          ) : (
            <XCircle color="#f43f5e" size={48} />
          )}
          <h1 style={{ margin: 0, background: result.prediction === 'PASS' ? '#10b981' : '#f43f5e', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {result.prediction}
          </h1>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card">
          <h3>Academic Metrics</h3>
          <div style={{ height: '250px', marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip 
                  contentStyle={{ background: '#1e293b', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass-card">
          <h3>Stress vs Stability</h3>
          <div style={{ height: '250px', marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={pieData} 
                  innerRadius={60} 
                  outerRadius={80} 
                  paddingAngle={5} 
                  dataKey="value"
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Stress Level: {result.metrics?.stressLevel}/10
          </p>
        </motion.div>
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        className="glass-card"
        style={{ background: 'rgba(99, 102, 241, 0.1)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <Lightbulb color="#f59e0b" />
          <h3>AI Personalized Suggestions</h3>
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {result.suggestions.map((suggestion, idx) => (
            <div key={idx} style={{ 
              padding: '1rem', 
              background: 'rgba(255, 255, 255, 0.05)', 
              borderRadius: '0.75rem',
              borderLeft: '4px solid var(--primary)'
            }}>
              {suggestion}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
