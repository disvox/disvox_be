import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber({}, { each: true })
  @IsArray()
  permissionIds: number[];
}
