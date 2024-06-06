import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { CREATE_ROLE_USE_CASE_TOKEN, CreateRoleUseCase } from '@/application';

import { SWAGGER_SETTINGS } from '../shared';
import { CreateRoleDto, CreatedRoleDto } from './dtos';

@ApiTags(SWAGGER_SETTINGS.TAGS.ROLE)
@Controller('roles')
export class RoleController {
  constructor(
    @Inject(CREATE_ROLE_USE_CASE_TOKEN)
    private readonly createRoleUseCase: CreateRoleUseCase,
  ) {}

  @Post()
  @ApiBody({ type: CreateRoleDto })
  async createRole(@Body() input: CreateRoleDto): Promise<CreatedRoleDto> {
    return this.createRoleUseCase.execute(input);
  }
}
