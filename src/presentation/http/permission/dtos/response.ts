import { ApiProperty } from '@nestjs/swagger';

export class PermissionResponseDto {
  @ApiProperty({ example: 'read' })
  action: string;

  @ApiProperty({ example: 'server' })
  subject: string;

  @ApiProperty({ example: { user_id: '{current_user_id}' } })
  conditions: object;

  @ApiProperty({ example: false })
  inverted: boolean;
}
