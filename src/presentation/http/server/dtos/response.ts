import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ServerResponseDto {
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  name: string;

  @Expose({ name: 'ownerId' })
  @ApiProperty()
  owner_id: number;
}
