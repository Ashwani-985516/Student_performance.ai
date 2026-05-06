const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    classId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    totalHeld: { type: Number, required: true },
    presentStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const AssignmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalMarks: { type: Number, default: 100 },
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = {
    Attendance: mongoose.model('Attendance', AttendanceSchema),
    Assignment: mongoose.model('Assignment', AssignmentSchema)
};
