import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('Missing Flash Credentials');
}

export const geminiClient = new GoogleGenAI({
  apiKey,
});
