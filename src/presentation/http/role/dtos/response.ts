import { ApiProperty } from '@nestjs/swagger';

import { Permission } from '@/domain';
import { PermissionResponseDto } from '@/presentation/http/permission';

export class RoleResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => PermissionResponseDto })
  permissions: Permission[];
}
