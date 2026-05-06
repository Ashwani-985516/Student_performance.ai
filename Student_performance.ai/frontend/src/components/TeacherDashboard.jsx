import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, GraduationCap, TrendingUp, AlertCircle, Calendar, ClipboardCheck, BookOpen, Send, Plus, Book } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // State for Attendance
  const [attendanceData, setAttendanceData] = useState({
    selectedClass: 'CS-A',
    totalHeld: 45,
    date: new Date().toISOString().split('T')[0]
  });

  // State for Marks
  const [marksData, setMarksData] = useState({
    subject: 'Data Structures',
    totalMarks: 100,
    students: [
      { id: 'ST001', name: 'Alice Johnson', marks: '' },
      { id: 'ST002', name: 'Bob Smith', marks: '' },
      { id: 'ST003', name: 'Charlie Brown', marks: '' },
    ]
  });

  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Final Project', startDate: '2026-05-01', endDate: '2026-05-30', status: 'Active' }
  ]);

  return (
    <div className="teacher-dashboard">
      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        <TabButton active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} icon={<TrendingUp size={18}/>} label="Overview" />
        <TabButton active={activeTab === 'attendance'} onClick={() => setActiveTab('attendance')} icon={<ClipboardCheck size={18}/>} label="Attendance" />
        <TabButton active={activeTab === 'marks'} onClick={() => setActiveTab('marks')} icon={<BookOpen size={18}/>} label="Marks Entry" />
        <TabButton active={activeTab === 'assignments'} onClick={() => setActiveTab('assignments')} icon={<Calendar size={18}/>} label="Assignments" />
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              <StatCard icon={<Users color="#6366f1" />} title="Total Students" value="48" color="rgba(99, 102, 241, 0.1)" />
              <StatCard icon={<GraduationCap color="#10b981" />} title="Pass Probability" value="78%" color="rgba(16, 185, 129, 0.1)" />
              <StatCard icon={<TrendingUp color="#22d3ee" />} title="Avg. Attendance" value="84%" color="rgba(34, 211, 238, 0.1)" />
              <StatCard icon={<AlertCircle color="#f43f5e" />} title="At Risk" value="12" color="rgba(244, 63, 94, 0.1)" />
            </div>
            {/* List and Chart */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem' }}>
              <StudentList />
              <ClassChart />
            </div>
          </motion.div>
        )}

        {activeTab === 'attendance' && (
          <motion.div key="attendance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
            <h3>Attendance Manager</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1.5rem' }}>
              <div className="form-group">
                <label>Select Class</label>
                <select value={attendanceData.selectedClass} onChange={(e) => setAttendanceData({...attendanceData, selectedClass: e.target.value})}>
                  <option value="CS-A">Computer Science - A</option>
                  <option value="CS-B">Computer Science - B</option>
                  <option value="IT-A">Information Tech - A</option>
                </select>
              </div>
              <div className="form-group">
                <label>Total Classes Held</label>
                <input type="number" value={attendanceData.totalHeld} onChange={(e) => setAttendanceData({...attendanceData, totalHeld: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={attendanceData.date} onChange={(e) => setAttendanceData({...attendanceData, date: e.target.value})} />
              </div>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <h4>Student Attendance</h4>
              <table style={{ width: '100%', marginTop: '1rem' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ padding: '1rem' }}><input type="checkbox" defaultChecked /> Select All</th>
                    <th>Student Name</th>
                    <th>Roll No</th>
                  </tr>
                </thead>
                <tbody>
                  {marksData.students.map(s => (
                    <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '1rem' }}><input type="checkbox" defaultChecked /></td>
                      <td>{s.name}</td>
                      <td>{s.id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="btn-primary" style={{ marginTop: '2rem' }}>Save Daily Attendance</button>
            </div>
          </motion.div>
        )}

        {activeTab === 'marks' && (
          <motion.div key="marks" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Marks Entry Portal</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input type="number" placeholder="Total Marks" value={marksData.totalMarks} onChange={(e) => setMarksData({...marksData, totalMarks: e.target.value})} style={{ width: '120px' }} />
                <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Set Total</button>
              </div>
            </div>
            <table style={{ width: '100%' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem' }}>Student ID</th>
                  <th>Name</th>
                  <th>Final Marks ({marksData.totalMarks})</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {marksData.students.map((s, idx) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '1rem' }}>{s.id}</td>
                    <td>{s.name}</td>
                    <td>
                      <input 
                        type="number" 
                        value={s.marks} 
                        onChange={(e) => {
                          const newStudents = [...marksData.students];
                          newStudents[idx].marks = e.target.value;
                          setMarksData({ ...marksData, students: newStudents });
                        }}
                        placeholder="Enter" 
                        style={{ width: '80px', padding: '0.4rem' }} 
                      />
                    </td>
                    <td>
                      <select 
                        value={s.grade || ''}
                        onChange={(e) => {
                          const newStudents = [...marksData.students];
                          newStudents[idx].grade = e.target.value;
                          setMarksData({ ...marksData, students: newStudents });
                        }}
                        style={{ padding: '0.4rem' }}
                      >
                        <option value="">Select</option>
                        <option value="A+">A+</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn-primary" style={{ marginTop: '2rem' }}>Generate Class Reports & Suggestions</button>
          </motion.div>
        )}

        {activeTab === 'assignments' && (
          <motion.div key="assignments" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h3>Assignment Manager</h3>
              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={18} /> New Assignment
              </button>
            </div>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {assignments.map(a => (
                <div key={a.id} style={{ 
                  padding: '1.5rem', 
                  background: 'rgba(255,255,255,0.03)', 
                  borderRadius: '1rem', 
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{ margin: 0 }}>{a.title}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      <Calendar size={12} /> {a.startDate} to {a.endDate}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ 
                      padding: '0.3rem 0.8rem', 
                      borderRadius: '1rem', 
                      background: 'rgba(16, 185, 129, 0.2)', 
                      color: '#10b981',
                      fontSize: '0.8rem'
                    }}>
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Components
const TabButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.6rem',
      padding: '0.8rem 1.5rem',
      borderRadius: '1rem',
      border: 'none',
      background: active ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
      color: 'white',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s'
    }}
  >
    {icon} {label}
  </button>
);

const StatCard = ({ icon, title, value, color }) => (
  <motion.div whileHover={{ scale: 1.05 }} className="glass-card" style={{ background: color, padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <div style={{ padding: '0.8rem', borderRadius: '12px', background: 'rgba(255,255,255,0.05)' }}>{icon}</div>
    <div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{title}</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{value}</div>
    </div>
  </motion.div>
);

const StudentList = () => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="glass-card">
    <h3>Top Performing Students</h3>
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.5rem' }}>
      <thead>
        <tr style={{ textAlign: 'left', color: 'var(--text-muted)', borderBottom: '1px solid var(--glass-border)' }}>
          <th style={{ padding: '1rem' }}>Name</th>
          <th>Score</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {[{id:1, name:'Alice', score:92, status:'PASS'}, {id:2, name:'Bob', score:65, status:'FAIL'}].map(s => (
          <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
            <td style={{ padding: '1rem' }}>{s.name}</td>
            <td>{s.score}%</td>
            <td><span style={{ color: s.status === 'PASS' ? '#10b981' : '#f43f5e' }}>{s.status}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  </motion.div>
);

const ClassChart = () => (
  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="glass-card">
    <h3>Class Trend</h3>
    <div style={{ height: '250px', marginTop: '2rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[{w:'W1', v:65}, {w:'W2', v:75}, {w:'W3', v:82}]}>
          <Area type="monotone" dataKey="v" stroke="#6366f1" fill="rgba(99, 102, 241, 0.2)" />
          <XAxis dataKey="w" stroke="#94a3b8" />
          <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid var(--glass-border)' }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </motion.div>
);

export default TeacherDashboard;
