import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty()
  @IsString()
  action: string;

  @ApiProperty()
  @IsString()
  subject: string;

  @ApiProperty()
  fields: string[];

  @ApiProperty()
  conditions: string;

  @ApiProperty()
  inverted: boolean;

  @ApiProperty()
  system: boolean;
}
