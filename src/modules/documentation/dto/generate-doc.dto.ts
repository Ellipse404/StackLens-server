import { IsArray } from 'class-validator';

export class GenerateDocDto {
  @IsArray()
  messages!: any[];
}
