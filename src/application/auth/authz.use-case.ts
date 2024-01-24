import { IPermissionRepository, IRoleRepository, Permission } from '@/domain';
import { IUseCase } from '@/shared';

interface IAuthzInputDto {
  userId: string;
}

interface IAuthzOutputDto {
  userId: string;
  permissions: Permission[];
}

export class AuthzUseCase implements IUseCase<IAuthzInputDto, IAuthzOutputDto> {
  constructor(
    private readonly roleRepository: IRoleRepository,
    private readonly permissionRepository: IPermissionRepository,
  ) {}
  async execute(input: IAuthzInputDto): Promise<IAuthzOutputDto> {
    const { userId } = input;

    const roles = await this.roleRepository.getMany({ userId });
    const permissions = await this.permissionRepository.getMany({ userId });

    return {
      userId,
      permissions: [
        ...roles.map((role) => role.permissions as Permission[]).flat(),
        ...permissions,
      ],
    };
  }
}
