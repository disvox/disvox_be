import { Inject } from '@nestjs/common';

import { IUserRepository, User } from '@/domain';
import { IUseCase } from '@/shared';
import { AuthUseCase } from '../auth';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';
import { AUTH_USE_CASE_TOKEN } from '../token';

interface IGetUserInputDto extends Partial<User> {
  userId: number;
}

export class GetUserUseCase implements IUseCase<IGetUserInputDto, User | null> {
  constructor(
    @Inject(AUTH_USE_CASE_TOKEN)
    private readonly authUseCase: AuthUseCase,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly repository: IUserRepository,
  ) {}

  async execute(input: IGetUserInputDto): Promise<User | null> {
    const { userId, ...restInput } = input;
    const ability = await this.authUseCase.execute({ userId });

    return this.repository.getOne({ id: 1 });
  }
}
