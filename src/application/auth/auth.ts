import { Inject } from '@nestjs/common';
import { MongoAbility, createMongoAbility } from '@casl/ability';

import { EAction, ESubject, IUserRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';
import { IAuthPayload } from './interfaces';
import { replaceTemplateString } from '@/utils';
import { CURRENT_USER_ID } from './constants';

interface IAuthInputDto extends IAuthPayload {}

interface IAuthOutputDto extends MongoAbility {}

export class AuthUseCase implements IUseCase<IAuthInputDto, IAuthOutputDto> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository, // private readonly abilityFactory: IAbilityFactory,
  ) {}
  async execute(input: IAuthInputDto): Promise<IAuthOutputDto> {
    const { userId } = input;

    const { permissions } = await this.userRepository.getOneWithPopulate({
      id: userId,
    });

    const replaceTemplatePermissions = replaceTemplateString(permissions, {
      [CURRENT_USER_ID]: userId,
    });

    return createMongoAbility<[EAction, ESubject]>(replaceTemplatePermissions);
  }
}
