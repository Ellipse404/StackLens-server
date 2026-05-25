/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';

import { groqClient } from '../../providers/groq/groq.provider';

@Injectable()
export class DocumentationService {
  // async generateDocumentation(payload: any) {
  //   const response = await groqClient.chat.completions.create({
  //     model: 'llama-3.3-70b-versatile',

  //     temperature: 0,
  //     max_tokens: 300, // TODO: exp
  //     messages: payload.messages,
  //   });

  //   return {
  //     documentation: (response.choices[0]?.message?.content || '').trim(),
  //   };
  // }

  async generateDocumentation(payload: any[]) {
    try {
      const response = await groqClient.chat.completions.create({
        model: 'llama-3.3-70b-versatile',

        temperature: 0,

        max_tokens: 300, //TODO: exp

        messages: payload?.messages,
      });

      return (response.choices[0]?.message?.content || '').trim();
    } catch (error: any) {
      // Retry once on rate limit
      if (error?.status === 429) {
        await new Promise((r) => setTimeout(r, 2000));

        const retry = await groqClient.chat.completions.create({
          model: 'llama-3.3-70b-versatile',

          temperature: 0,

          max_tokens: 300,

          messages: payload?.messages,
        });

        return (retry.choices[0]?.message?.content || '').trim();
      }

      throw error;
    }
  }
}
