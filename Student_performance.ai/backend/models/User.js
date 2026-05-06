const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true }, // Enrollment No as initial password
    role: { type: String, enum: ['student', 'teacher'], default: 'student' },
    profileComplete: { type: Boolean, default: false },
    
    // Student specific fields
    enrollmentNo: { type: String },
    subject: { type: String },
    gradYear: { type: Number },
    currentSem: { type: Number },
    endGraduation: { type: Date },
    
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
