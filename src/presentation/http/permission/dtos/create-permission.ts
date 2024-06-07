import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsObject } from 'class-validator';

import { EAction, ESubject } from '@/application';
export class CreatePermissionDto {
  @ApiProperty()
  @IsEnum(EAction)
  action: EAction;

  @ApiProperty()
  @IsEnum(ESubject)
  subject: ESubject;

  @ApiProperty()
  @IsObject()
  conditions: object;

  @ApiProperty()
  @IsBoolean()
  inverted: boolean;
}
