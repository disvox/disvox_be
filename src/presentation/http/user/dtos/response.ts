import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  username: string;

  @Expose()
  @ApiProperty()
  discriminator: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose({ name: 'avatarUrl' })
  @ApiProperty()
  avatar_url: string;

  @Expose({ name: 'lastSeen' })
  @ApiProperty()
  last_seen: string;
}
