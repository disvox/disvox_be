import { Inject } from '@nestjs/common';

import { IRoleRepository, Permission, Role } from '@/domain';
import { IUseCase } from '@/shared';
import { ROLE_REPOSITORY_TOKEN } from '@/infrastructure';

interface ICreateRoleDto {
  name: string;
  permissionIds: number[];
}

interface ICreatedRoleDto {
  id: number;
  name: string;
  permissions: Permission[];
}

export class CreateRoleUseCase
  implements IUseCase<ICreateRoleDto, ICreatedRoleDto>
{
  constructor(
    @Inject(ROLE_REPOSITORY_TOKEN)
    private readonly repository: IRoleRepository,
  ) {}

  public async execute(input: ICreateRoleDto): Promise<ICreatedRoleDto> {
    const role = new Role();

    role.name = input.name;

    return this.repository.createWithPermissionIds(role, input.permissionIds);
  }
}
