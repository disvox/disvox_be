import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Validate } from 'class-validator';

import { EAction, ESubject } from '@/application';
import { ConditionValidator } from '../../../shared';

export class CreatePermissionDto {
  @ApiProperty()
  @IsEnum(EAction)
  action: EAction;

  @ApiProperty()
  @IsEnum(ESubject)
  subject: ESubject;

  @ApiProperty()
  @Validate(ConditionValidator)
  conditions: object;

  @ApiProperty()
  inverted: boolean;
}
