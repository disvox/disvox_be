import { IUseCase } from '@/shared';
import { IUserRepository, UserEntity } from '@/domain';
import { generateRandomNDigitNumber } from '@/utils';

interface ICreateUserDto {
  username: string;
  email: string;
  avatarUrl: string;
}

interface ICreatedUserDto {
  id: string;
  username: string;
  discriminator: string;
  email: string;
  lastSeen: Date;
}

export class CreateUserUseCase
  implements IUseCase<ICreateUserDto, ICreatedUserDto>
{
  constructor(private readonly repository: IUserRepository) {}

  public async execute(input: ICreateUserDto): Promise<ICreatedUserDto> {
    const user = new UserEntity();

    user.username = input.username;
    user.discriminator = generateRandomNDigitNumber(4).toString();
    user.email = input.email;
    user.avatarUrl = input.avatarUrl;
    user.lastSeen = new Date();

    return this.repository.create(user);
  }
}
