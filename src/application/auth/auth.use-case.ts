import { IUserRepository, Permission } from '@/domain';
import { IUseCase } from '@/shared';
import { IAuthPayload } from './interfaces/payload.interface';

interface IAuthInputDto extends IAuthPayload {}

interface IAuthOutputDto {
  permissions: Permission[];
}

export class AuthUseCase implements IUseCase<IAuthInputDto, IAuthOutputDto> {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(input: IAuthInputDto): Promise<IAuthOutputDto> {
    const { userId } = input;

    const user = await this.userRepository.getOneWithPopulate(
      { id: userId },
      { roles: true, permissions: true },
    );
    console.log(user.roles);

    return {
      permissions: [],
      // permissions: [
      //   ...roles.map((role) => role.permissions as Permission[]).flat(),
      //   ...permissions,
      // ],
    };
  }
}
