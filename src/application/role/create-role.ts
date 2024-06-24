import { Inject } from '@nestjs/common';

import { IRoleRepository, Permission, Role } from '@/domain';
import { IUseCase } from '@/shared';
import { ROLE_REPOSITORY_TOKEN } from '@/infrastructure';

export interface ICreateRoleInputDto {
  name: string;
  permissionIds: number[];
}

export interface ICreateRoleOutputDto {
  id: number;
  name: string;
  permissions: Permission[];
}

export class CreateRoleUseCase
  implements IUseCase<ICreateRoleInputDto, ICreateRoleOutputDto>
{
  constructor(
    @Inject(ROLE_REPOSITORY_TOKEN)
    private readonly repository: IRoleRepository,
  ) {}

  public async execute(
    input: ICreateRoleInputDto,
  ): Promise<ICreateRoleOutputDto> {
    const role = new Role();

    role.name = input.name;

    return this.repository.createWithPermissionIds(role, input.permissionIds);
  }
}
