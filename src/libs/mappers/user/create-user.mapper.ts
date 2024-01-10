import { Mapper } from '@/base';
import { UserEntity } from '@/domain/entities';
import { CreateUserDto } from '@/libs/dtos';
import { generateRandom4DigitNumber } from '@/libs/utils';

export class CreateUserMapper implements Mapper<CreateUserDto, UserEntity> {
  public map(data: CreateUserDto): UserEntity {
    const user = new UserEntity();

    user.username = data.name;
    user.email = data.email;
    user.avatarUrl = data.avatarUrl;
    user.discriminator = generateRandom4DigitNumber().toString();

    return user;
  }

  public reverseMap(data: UserEntity): CreateUserDto {
    const user = new CreateUserDto();

    user.id = data.id;
    user.name = data.username;
    user.email = data.email;
    user.avatarUrl = data.avatarUrl;

    return user;
  }
}
