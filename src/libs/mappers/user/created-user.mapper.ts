import { Mapper } from '@/base';
import { UserEntity } from '@/domain/entities';
import { CreatedUserDto } from '@/libs/dtos';

export class CreatedUserMapper implements Mapper<UserEntity, CreatedUserDto> {
  map(data: UserEntity): CreatedUserDto {
    const user = new CreatedUserDto();

    user.id = data.id;
    user.username = data.username;
    user.email = data.email;
    user.discriminator = data.discriminator;
    user.lastSeen = data.lastSeen;

    return user;
  }
  reverseMap(data: CreatedUserDto): UserEntity {
    const user = new UserEntity();

    user.id = data.id;
    user.username = data.username;
    user.email = data.email;
    user.discriminator = data.discriminator;
    user.lastSeen = data.lastSeen;

    return user;
  }
}
