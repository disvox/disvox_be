import { IUserRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { IAuthPayload, IAbilityFactory, IAbility } from './interfaces';
import { PureAbility } from '@casl/ability';
import { createPrismaAbility } from '@casl/prisma';

interface IAuthInputDto extends IAuthPayload {}

interface IAuthOutputDto extends IAbility {}

export class AuthUseCase implements IUseCase<IAuthInputDto, any> {
  constructor(
    private readonly userRepository: IUserRepository, // private readonly abilityFactory: IAbilityFactory,
  ) {}
  async execute(input: IAuthInputDto): Promise<any> {
    const { userId } = input;

    const user = await this.userRepository.getOneWithPopulate({ id: userId });

    const permissions = [
      ...user.roles.map((role) => role.permissions).flat(),
      ...user.permissions,
    ];
    const parsePermissions = permissions.map((permission) => {
      const parseConditions = JSON.parse(permission.conditions);
      return {
        ...permission,
        conditions: parseConditions,
      };
    });

    const ability = createPrismaAbility(parsePermissions);

    return ability;
  }
}
