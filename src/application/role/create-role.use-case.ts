import { IRoleRepository, Permission, Role } from '@/domain';
import { IUseCase } from '@/shared';

interface ICreateRoleDto {
  name: string;
  permissionIds: string[];
}

interface ICreatedRoleDto {
  id: number;
  name: string;
  isGlobal: boolean;
  permissions: Permission[];
}

export class CreateRoleUseCase
  implements IUseCase<ICreateRoleDto, ICreatedRoleDto>
{
  constructor(private readonly repository: IRoleRepository) {}

  public async execute(input: ICreateRoleDto): Promise<ICreatedRoleDto> {
    const role = new Role();

    role.name = input.name;
    role.isGlobal = true;

    return this.repository.createWithPermissionIds(role, input.permissionIds);
  }
}
