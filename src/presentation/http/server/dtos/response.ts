import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ServerResponseDto {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty({ example: 'Server1' })
  name: string;

  @Expose({ name: 'ownerId' })
  @ApiProperty({ example: 1 })
  owner_id: number;
}
