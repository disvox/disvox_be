import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsObject } from 'class-validator';

import { EAction, ESubject } from '@/domain';
export class CreatePermissionDto {
  @ApiProperty()
  @IsEnum(EAction)
  action: EAction;

  @ApiProperty()
  @IsEnum(ESubject)
  subject: ESubject;

  @ApiProperty()
  @IsObject()
  conditions: Record<string, any>;

  @ApiProperty()
  @IsBoolean()
  inverted: boolean;
}
