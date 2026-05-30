/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable } from '@nestjs/common';
import { groqClient } from '../../providers/groq/groq.provider';
import { geminiClient } from 'src/providers/gemini/gemini.provider';

interface GenerateDocumentationPayload {
  language: string;
  messages: any[];
}

@Injectable()
export class DocumentationService {
  async generateDocumentation(payload: GenerateDocumentationPayload) {
    try {
      return await this.generateWithGroq(payload);
    } catch (error: any) {
      console.warn('[StackLens]=> Groq failed. Falling back to Gemini...');
      console.error('Error =>', error);

      return await this.generateWithGemini(payload);
    }
  }

  private async generateWithGroq(payload: GenerateDocumentationPayload) {
    try {
      const response = await groqClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        temperature: 0,
        max_tokens: 300,
        messages: payload?.messages,
      });

      return (response.choices[0]?.message?.content || '').trim();
    } catch (error: any) {
      if (error?.status === 429) {
        console.warn('[StackLens] Groq rate limited. Retrying...');

        await new Promise((r) => setTimeout(r, 2000));

        const retry = await groqClient.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          temperature: 0,
          max_tokens: 300,
          messages: payload?.messages,
        });

        return (retry?.choices[0]?.message?.content || '').trim();
      }

      throw error;
    }
  }

  private async generateWithGemini(payload: GenerateDocumentationPayload) {
    const prompt = payload?.messages
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      .map((message) => `${message?.role?.toUpperCase()}:\n${message?.content}`)
      .join('\n\n');

    const result = await geminiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return (result?.text || '').trim();
  }
}
