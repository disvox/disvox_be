import { Inject } from '@nestjs/common';
import { MongoAbility, createMongoAbility } from '@casl/ability';

import { EAction, ESubject, IUserRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';
import { IAuthPayload } from './interfaces';

interface IAuthInputDto extends IAuthPayload {}

interface IAuthOutputDto extends MongoAbility {}

export class AuthUseCase implements IUseCase<IAuthInputDto, IAuthOutputDto> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository, // private readonly abilityFactory: IAbilityFactory,
  ) {}
  async execute(input: IAuthInputDto): Promise<IAuthOutputDto> {
    const { userId } = input;

    const user = await this.userRepository.getOneWithPopulate({ id: userId });

    return createMongoAbility<[EAction, ESubject]>(user.permissions);
  }
}
