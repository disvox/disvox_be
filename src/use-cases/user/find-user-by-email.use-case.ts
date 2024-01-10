import { UseCase } from '@/base';
import { UserRepository } from '@/domain/repositories';
import { CreateUserDto, CreatedUserDto } from '@/libs/dtos';
import { CreatedUserMapper } from '@/libs/mappers';

export class FindUserByEmailUseCase implements UseCase<CreatedUserDto> {
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(user: Partial<CreateUserDto>): Promise<CreatedUserDto> {
    const foundUser = await this.repository.getOne({ email: user.email });
    if (!foundUser) return null;
    return this.createdUserMapper.map(foundUser);
  }
}
