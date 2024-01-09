import { UseCase } from '@/base';
import { UserRepository } from '@/domain/repositories';
import { CreateUserDto, CreatedUserDto } from '@/libs/dtos/user';
import { CreateUserMapper, CreatedUserMapper } from '@/libs/mappers';

export class CreateUserUseCase implements UseCase<CreateUserDto> {
  private createUserMapper: CreateUserMapper;
  private createdUserMapper: CreatedUserMapper;

  constructor(private readonly repository: UserRepository) {
    this.createUserMapper = new CreateUserMapper();
    this.createdUserMapper = new CreatedUserMapper();
  }

  public async execute(user: CreateUserDto): Promise<CreatedUserDto> {
    const entity = this.createUserMapper.map(user);
    const createdUser = await this.repository.create(entity);
    return this.createdUserMapper.map(createdUser);
  }
}
