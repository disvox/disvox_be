import { Mapper } from '@/base';
import { UserEntity } from '@/domain/entities';
import { CreateUserDto } from '@/libs/dtos';
import { generateRandom4DigitNumber } from '@/libs/utils';

export class CreateUserMapper implements Mapper<CreateUserDto, UserEntity> {
  public map(data: CreateUserDto): UserEntity {
    const user = new UserEntity();

    user.username = data.username;
    user.email = data.email;
    user.discriminator = generateRandom4DigitNumber().toString();
    user.lastSeen = new Date();

    return user;
  }

  public reverseMap(data: UserEntity): CreateUserDto {
    const user = new CreateUserDto();

    user.id = data.id;
    user.username = data.username;
    user.email = data.email;

    return user;
  }
}
