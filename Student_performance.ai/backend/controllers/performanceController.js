const { getGeminiResponse, getOpenAIResponse } = require('../services/aiService');

const getPrediction = async (req, res) => {
    try {
        const { studyHours, attendance, performance, stressLevel } = req.body;
        
        if (!studyHours || !attendance || !performance || !stressLevel) {
            return res.status(400).json({ error: "All student metrics are required." });
        }

        const file = req.file;

        const prompt = `
            Act as an educational analyst. Based on the following student details, predict if the student will PASS or FAIL and provide 3 personalized suggestions.
            Details:
            - Study Hours: ${studyHours}
            - Attendance Percentage: ${attendance}%
            - Assignment Performance: ${performance}/100
            - Stress Level: ${stressLevel}/10 (1 is low, 10 is high)
            ${file ? `- Additional context from file: ${file.originalname}` : ''}

            Format your response exactly as follows:
            PREDICTION: [PASS/FAIL]
            SUGGESTIONS:
            1. [Suggestion 1]
            2. [Suggestion 2]
            3. [Suggestion 3]
        `;

        // Default to Gemini for prediction
        const result = await getGeminiResponse(prompt);
        
        // Parse the result
        const predictionMatch = result.match(/PREDICTION:\s*(PASS|FAIL)/i);
        const prediction = predictionMatch ? predictionMatch[1].toUpperCase() : "UNKNOWN";
        
        const suggestionsMatch = result.split(/SUGGESTIONS:/i)[1];
        const suggestions = suggestionsMatch ? suggestionsMatch.trim().split('\n').map(s => s.replace(/^\d+\.\s*/, '').trim()) : [];

        res.json({
            prediction,
            suggestions,
            metrics: { studyHours, attendance, performance, stressLevel },
            rawResponse: result
        });
    } catch (error) {
        console.error("Prediction Error:", error);
        res.status(500).json({ error: "Failed to generate prediction." });
    }
};

const handleChatbot = async (req, res) => {
    try {
        const { message, modelType } = req.body; // modelType: 'gpt' or 'gemini'
        
        let response;
        if (modelType === 'gpt') {
            response = await getOpenAIResponse(message);
        } else {
            response = await getGeminiResponse(message);
        }

        res.json({ response });
    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ error: "Failed to get chatbot response." });
    }
};

module.exports = { getPrediction, handleChatbot };
