import { IsArray, IsString } from 'class-validator';

export class GenerateDocDto {
  @IsString()
  language!: string;

  @IsArray()
  messages!: any[];
}
