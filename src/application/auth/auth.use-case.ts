import { IUserRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { IAuthPayload, IAbilityFactory, IAbility } from './interfaces';

interface IAuthInputDto extends IAuthPayload {}

interface IAuthOutputDto extends IAbility {}

export class AuthUseCase implements IUseCase<IAuthInputDto, IAuthOutputDto> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly abilityFactory: IAbilityFactory,
  ) {}
  async execute(input: IAuthInputDto): Promise<IAuthOutputDto> {
    const { userId } = input;

    const user = await this.userRepository.getOneWithPopulate({ id: userId });

    const permissions = [
      ...user.roles.map((role) => role.permissions).flat(),
      ...user.permissions,
    ];

    return this.abilityFactory.defineAbility(permissions);
  }
}
