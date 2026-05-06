const { OpenAI } = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv');

dotenv.config();

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

const getOpenAIResponse = async (prompt) => {
    try {
        if (!openai) return "OpenAI API Key is missing. Please check your .env file.";
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [{ role: "user", content: prompt }],
        });
        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Error:", error);
        return "Error from OpenAI service.";
    }
};

const getGeminiResponse = async (prompt) => {
    try {
        if (!genAI) return "Gemini API Key is missing. Please check your .env file.";
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Error from Gemini service.";
    }
};

module.exports = { getOpenAIResponse, getGeminiResponse };
