import { Injectable } from '@nestjs/common';

import { groqClient } from '../../providers/groq/groq.provider';

@Injectable()
export class DocumentationService {
  async generateDocumentation(code: string, language: string) {
    const response = await groqClient.chat.completions.create({
      model: 'llama-3.3-70b-versatile',

      temperature: 0,

      messages: [
        {
          role: 'system',

          content: `
You are an elite software documentation AI.

Generate highly accurate production-grade documentation comments.

Rules:
- understand actual behavior
- infer intent from logic
- generate concise enterprise-level docs
- include params and returns
- NEVER generate generic comments
- return ONLY the documentation comment
`,
        },

        {
          role: 'user',

          content: `
Language:
${language}

Code:
${code}
`,
        },
      ],
    });

    return (response.choices[0]?.message?.content || '').trim();
  }
}
