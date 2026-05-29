import OpenAI from 'openai';

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error('Missing Groq Credentials');
}

export const groqClient = new OpenAI({
  apiKey,
  baseURL: 'https://api.groq.com/openai/v1',
});
