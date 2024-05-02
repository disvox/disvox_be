import { Inject } from '@nestjs/common';

import { IUserRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { IAuthPayload, IAbility } from './interfaces';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';

interface IAuthInputDto extends IAuthPayload {}

interface IAuthOutputDto extends IAbility {}

export class AuthUseCase implements IUseCase<IAuthInputDto, any> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository, // private readonly abilityFactory: IAbilityFactory,
  ) {}
  async execute(input: IAuthInputDto): Promise<any> {
    const { userId } = input;

    const user = await this.userRepository.getOneWithPopulate({ id: userId });

    return user;
  }
}
