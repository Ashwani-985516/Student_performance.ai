import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Brain, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const StudentForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    studyHours: '',
    attendance: '',
    performance: '',
    stressLevel: '5'
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('studyHours', formData.studyHours);
    data.append('attendance', formData.attendance);
    data.append('performance', formData.performance);
    data.append('stressLevel', formData.stressLevel);
    if (file) data.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/predict', data);
      onResult(response.data);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to get prediction. Check backend status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <Brain color="#6366f1" size={32} />
        <h2>Student Data Analysis</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Study Hours (per week)</label>
          <input 
            type="number" 
            name="studyHours" 
            value={formData.studyHours} 
            onChange={handleChange} 
            placeholder="e.g. 20" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Attendance Percentage</label>
          <input 
            type="number" 
            name="attendance" 
            value={formData.attendance} 
            onChange={handleChange} 
            placeholder="e.g. 85" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Assignment Performance (0-100)</label>
          <input 
            type="number" 
            name="performance" 
            value={formData.performance} 
            onChange={handleChange} 
            placeholder="e.g. 75" 
            required 
          />
        </div>

        <div className="form-group">
          <label>Stress Level (1-10): {formData.stressLevel}</label>
          <input 
            type="range" 
            name="stressLevel" 
            min="1" 
            max="10" 
            value={formData.stressLevel} 
            onChange={handleChange} 
          />
        </div>

        <div className="form-group">
          <label>Upload Study Material (Optional)</label>
          <div style={{ 
            border: '2px dashed var(--glass-border)', 
            padding: '1rem', 
            borderRadius: '0.5rem',
            textAlign: 'center',
            cursor: 'pointer'
          }}>
            <input 
              type="file" 
              onChange={handleFileChange} 
              style={{ display: 'none' }} 
              id="file-upload" 
            />
            <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
              <Upload size={24} style={{ marginBottom: '0.5rem' }} />
              <p>{file ? file.name : "Click to upload file"}</p>
            </label>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginTop: '1rem' }}>
          {loading ? "Analyzing..." : "Generate AI Prediction"}
        </button>
      </form>
    </motion.div>
  );
};

export default StudentForm;
