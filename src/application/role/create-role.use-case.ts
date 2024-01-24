import { IRoleRepository, Role } from '@/domain';
import { IUseCase } from '@/shared';

interface ICreateRoleDto {
  name: string;
}

interface ICreatedRoleDto {
  id: string;
  name: string;
  isGlobal: boolean;
}

export class CreateRoleUseCase
  implements IUseCase<ICreateRoleDto, ICreatedRoleDto>
{
  constructor(private readonly repository: IRoleRepository) {}

  public async execute(input: ICreateRoleDto): Promise<ICreatedRoleDto> {
    const role = new Role();

    role.name = input.name;
    role.isGlobal = false;

    return this.repository.create(role);
  }
}
