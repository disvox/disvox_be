import { Inject } from '@nestjs/common';

import {
  IPermissionRepository,
  Permission,
  TConditionOperators,
  EAction,
  ESubject,
} from '@/domain';
import { IUseCase } from '@/shared';
import { PERMISSION_REPOSITORY_TOKEN } from '@/infrastructure';

export interface ICreatePermissionDto {
  action: EAction;
  subject: ESubject;
  conditions: {
    [key in TConditionOperators]?: Record<string, string>;
  };
  inverted: boolean;
}

interface ICreatedPermissionDto {
  id: number;
  action: EAction;
  subject: ESubject;
  conditions: Record<string, any>;
  inverted: boolean;
}

export class CreatePermissionUseCase
  implements IUseCase<ICreatePermissionDto, ICreatedPermissionDto>
{
  constructor(
    @Inject(PERMISSION_REPOSITORY_TOKEN)
    private readonly repository: IPermissionRepository,
  ) {}

  public async execute(
    input: ICreatePermissionDto,
  ): Promise<ICreatedPermissionDto> {
    const permission = new Permission();

    permission.action = input.action;
    permission.subject = input.subject;
    permission.conditions = input.conditions;
    permission.inverted = input.inverted;

    return this.repository.create(permission);
  }
}
