import { Inject } from '@nestjs/common';

import { IUserRepository, User } from '@/domain';
import { HttpException, IUseCase } from '@/shared';
import { AuthUseCase } from '../auth';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';
import { AUTH_USE_CASE_TOKEN } from '../token';
import { ExceptionCode } from '../exception-codes';

interface IGetUserInputDto extends Partial<User> {}

export interface IGetUserOutputDto extends User {}

export class GetUserUseCase
  implements IUseCase<IGetUserInputDto, IGetUserOutputDto>
{
  constructor(
    @Inject(AUTH_USE_CASE_TOKEN)
    private readonly authUseCase: AuthUseCase,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly repository: IUserRepository,
  ) {}

  async execute(): Promise<IGetUserOutputDto> {
    const ability = await this.authUseCase.execute();

    const user = await this.repository.getOne({ id: 1 });

    if (!user)
      throw new HttpException({
        statusCode: 404,
        code: ExceptionCode.UserNotFound,
        message: 'User not found',
      });

    return user;
  }
}
