import {
  Body,
  Controller,
  Post,
  Headers,
  UnauthorizedException,
} from '@nestjs/common';

import { DocumentationService } from './documentation.service';

import { GenerateDocDto } from './dto/generate-doc.dto';

@Controller('api/v1/ai/documentation')
export class DocumentationController {
  constructor(private readonly documentationService: DocumentationService) {}

  @Post()
  async generate(
    @Body() body: GenerateDocDto,

    @Headers('x-stacklens-client')
    clientSecret: string,
  ) {
    if (clientSecret !== process.env.STACKLENS_CLIENT_SECRET) {
      throw new UnauthorizedException();
    }

    const result = await this.documentationService.generateDocumentation(
      body.code,
      body.language,
    );

    return {
      success: true,
      result,
    };
  }
}
