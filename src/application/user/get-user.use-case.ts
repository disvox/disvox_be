import { IUserRepository, User } from '@/domain';
import { IUseCase } from '@/shared';
import { AuthUseCase } from '../auth';

interface IGetUserInputDto extends Partial<User> {
  userId: string;
}

export class GetUserUseCase implements IUseCase<IGetUserInputDto, User | null> {
  constructor(
    private readonly authUseCase: AuthUseCase,
    private readonly repository: IUserRepository,
  ) {}

  async execute(input: IGetUserInputDto): Promise<User | null> {
    const { userId, ...restInput } = input;
    const ability = await this.authUseCase.execute({ userId });

    return this.repository.getOne({});
  }
}
