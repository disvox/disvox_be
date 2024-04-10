import { IUserRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { IAuthPayload, IAbility } from './interfaces';

interface IAuthInputDto extends IAuthPayload {}

interface IAuthOutputDto extends IAbility {}

export class AuthUseCase implements IUseCase<IAuthInputDto, any> {
  constructor(
    private readonly userRepository: IUserRepository, // private readonly abilityFactory: IAbilityFactory,
  ) {}
  async execute(input: IAuthInputDto): Promise<any> {
    const { userId } = input;

    const user = await this.userRepository.getOneWithPopulate({ id: userId });

    return user;
  }
}
