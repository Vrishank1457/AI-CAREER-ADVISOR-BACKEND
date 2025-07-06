
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { GoogleGenerativeAI } = require('@google/generative-ai');

require('dotenv').config();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/generate', async (req, res) => {
    const input = req.body.prompt;
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(input);
    res.json({ response: result.response.text() });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
    