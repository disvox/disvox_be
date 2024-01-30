import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CreateRoleUseCase } from '@/application';

import { SWAGGER_SETTINGS } from '../shared';
import { CreateRoleDto, CreatedRoleDto } from './dtos';

@ApiTags(SWAGGER_SETTINGS.TAGS.ROLE)
@Controller('roles')
export class RoleController {
  constructor(private readonly createRoleUseCase: CreateRoleUseCase) {}

  @Post()
  @ApiBody({ type: CreateRoleDto })
  async createRole(@Body() input: CreateRoleDto): Promise<CreatedRoleDto> {
    return this.createRoleUseCase.execute(input);
  }
}
