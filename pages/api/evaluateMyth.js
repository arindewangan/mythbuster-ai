// pages/api/evaluateMyth.js
import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { myth } = req.body;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const prompt = `Evaluate the following health myth: "${myth}". Is it true or false? Provide a brief explanation.`;
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      res.status(200).json(text);
    } catch (error) {
      console.error('Error evaluating myth:', error);
      res.status(500).json({ error: 'Failed to evaluate myth' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
