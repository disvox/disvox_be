import { Inject } from '@nestjs/common';

import { IUseCase } from '@/shared';
import { IUserRepository, User } from '@/domain';
import { generateRandomNDigitNumber } from '@/utils';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';

interface ICreateUserDto {
  username: string;
  email: string;
  avatarUrl: string;
}

interface ICreatedUserDto {
  id: number;
  username: string;
  discriminator: string;
  email: string;
  avatarUrl: string | null;
  lastSeen: Date | null;
}

export class CreateUserUseCase
  implements IUseCase<ICreateUserDto, ICreatedUserDto>
{
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly repository: IUserRepository,
  ) {}

  public async execute(input: ICreateUserDto): Promise<ICreatedUserDto> {
    const user = new User();

    user.username = input.username;
    user.discriminator = generateRandomNDigitNumber(4).toString();
    user.email = input.email;
    user.avatarUrl = input.avatarUrl;
    user.lastSeen = new Date();

    return this.repository.create(user);
  }
}
