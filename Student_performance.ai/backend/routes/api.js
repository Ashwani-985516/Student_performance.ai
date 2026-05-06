const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getPrediction, handleChatbot } = require('../controllers/performanceController');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Routes
router.post('/predict', upload.single('file'), getPrediction);
router.post('/chat', handleChatbot);

module.exports = router;
