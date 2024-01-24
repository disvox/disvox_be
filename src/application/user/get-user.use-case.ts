import { IUserRepository, User } from '@/domain';
import { IUseCase } from '@/shared';

interface IGetUserInputDto extends Partial<User> {}

export class GetUserUseCase implements IUseCase<IGetUserInputDto, User | null> {
  constructor(private readonly repository: IUserRepository) {}

  async execute(input: IGetUserInputDto): Promise<User | null> {
    const user = this.repository.getOne(input);
    if (!user) return null;
    return user;
  }
}
