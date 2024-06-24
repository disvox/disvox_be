import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsObject } from 'class-validator';

import { EAction, ESubject } from '@/domain';
export class CreatePermissionDto {
  @ApiProperty({ example: EAction.Read })
  @IsEnum(EAction)
  action: EAction;

  @ApiProperty({ example: ESubject.Server })
  @IsEnum(ESubject)
  subject: ESubject;

  @ApiProperty()
  @IsObject()
  conditions: Record<string, any>;

  @ApiProperty({ example: false })
  @IsBoolean()
  inverted: boolean;
}
