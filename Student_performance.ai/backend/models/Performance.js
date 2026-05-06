const mongoose = require('mongoose');

const PerformanceSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    studyHours: { type: Number, required: true },
    attendance: { type: Number, required: true },
    assignmentScore: { type: Number, required: true },
    stressLevel: { type: Number, required: true },
    
    prediction: { type: String, enum: ['PASS', 'FAIL', 'UNKNOWN'], default: 'UNKNOWN' },
    suggestions: [{ type: String }],
    
    fileUrl: { type: String },
    rawAIResponse: { type: String },
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Performance', PerformanceSchema);
