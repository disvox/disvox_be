import { ApiProperty } from '@nestjs/swagger';

import { Permission } from '@/domain';

class PermissionDto {
  @ApiProperty()
  action: string;

  @ApiProperty()
  subject: string;

  @ApiProperty()
  conditions: string;

  @ApiProperty()
  inverted: boolean;

  @ApiProperty()
  system: boolean;
}

export class CreatedRoleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  isGlobal: boolean;

  @ApiProperty({ type: () => PermissionDto })
  permissions: Permission[];
}
