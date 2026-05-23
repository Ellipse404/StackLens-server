import { IsString, MaxLength } from 'class-validator';

export class GenerateDocDto {
  @IsString()
  language!: string;

  @IsString()
  @MaxLength(25000)
  code!: string;
}
