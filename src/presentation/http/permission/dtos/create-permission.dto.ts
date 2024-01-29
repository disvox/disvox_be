import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Validate } from 'class-validator';

import { EAction, ESubject } from '@/application';
import { ConditionValidator } from '../../../shared';

export class CreatePermissionDto {
  @ApiProperty()
  @IsEnum(EAction)
  action: string;

  @ApiProperty()
  @IsEnum(ESubject)
  subject: string;

  @ApiProperty()
  @Validate(ConditionValidator)
  conditions: object;

  @ApiProperty()
  inverted: boolean;

  @ApiProperty()
  system: boolean;
}
