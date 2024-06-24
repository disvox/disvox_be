import { Inject } from '@nestjs/common';

import { IPermissionRepository, Permission, EAction, ESubject } from '@/domain';
import { PERMISSION_REPOSITORY_TOKEN } from '@/infrastructure';
import { IUseCase } from '@/shared';

export interface ICreatePermissionInputDto {
  action: EAction;
  subject: ESubject;
  conditions: Record<string, any>;
  inverted: boolean;
}

export interface ICreatePermissionOutputDto {
  id: number;
  action: EAction;
  subject: ESubject;
  conditions: Record<string, any>;
  inverted: boolean;
}

export class CreatePermissionUseCase
  implements IUseCase<ICreatePermissionInputDto, ICreatePermissionOutputDto>
{
  constructor(
    @Inject(PERMISSION_REPOSITORY_TOKEN)
    private readonly repository: IPermissionRepository,
  ) {}

  public async execute(
    input: ICreatePermissionInputDto,
  ): Promise<ICreatePermissionOutputDto> {
    const permission = new Permission();

    permission.action = input.action;
    permission.subject = input.subject;
    permission.conditions = input.conditions;
    permission.inverted = input.inverted;

    return this.repository.create(permission);
  }
}
