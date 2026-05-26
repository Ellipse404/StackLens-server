import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Post,
} from '@nestjs/common';

import { DocumentationService } from './documentation.service';

import { GenerateDocDto } from './dto/generate-doc.dto';

@Controller('docs')
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}

  @Post('generate')
  async generate(
    @Headers('x-stacklens-client')
    client: string,

    @Body()
    body: GenerateDocDto,
  ) {
    if (client !== 'vscode-extension') {
      throw new BadRequestException('Invalid request');
    }

    const documentation =
      await this.documentationService.generateDocumentation(body);

    return {
      success: true,

      documentation,
    };
  }
}
