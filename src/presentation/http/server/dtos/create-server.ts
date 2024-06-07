import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateServerDto {
  @ApiProperty()
  @MaxLength(20)
  @IsString()
  name: string;
}
