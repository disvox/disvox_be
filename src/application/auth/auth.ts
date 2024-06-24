import { Inject } from '@nestjs/common';
import { MongoAbility, createMongoAbility } from '@casl/ability';
import { ClsService } from 'nestjs-cls';

import { EAction, ESubject, IUserRepository } from '@/domain';
import { IUseCase } from '@/shared';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';
import { replaceTemplateString } from '@/utils';
import { IAuthPayload } from './interfaces';
import { CURRENT_USER_ID } from './constants';

export interface IAuthInputDto extends IAuthPayload {}

export interface IAuthOutputDto extends MongoAbility {}

export class AuthUseCase implements IUseCase<IAuthInputDto, IAuthOutputDto> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    private readonly cls: ClsService,
  ) {}
  async execute(): Promise<IAuthOutputDto> {
    const { permissions } = await this.userRepository.getOneWithPopulate({
      id: this.cls.get('user.id'),
    });

    const replaceTemplatePermissions = replaceTemplateString(permissions, {
      [CURRENT_USER_ID]: this.cls.get('user.id'),
    });

    return createMongoAbility<[EAction, ESubject]>(replaceTemplatePermissions);
  }
}
