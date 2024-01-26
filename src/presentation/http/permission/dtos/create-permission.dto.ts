import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';

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
  conditions: any;

  @ApiProperty()
  inverted: boolean;

  @ApiProperty()
  system: boolean;
}
