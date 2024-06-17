import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { CREATE_ROLE_USE_CASE_TOKEN, CreateRoleUseCase } from '@/application';
import {
  ApiExceptionResponse,
  ESwaggerDescription,
  SWAGGER_SETTINGS,
} from '../shared';
import { CreateRoleDto, RoleResponseDto } from './dtos';

@ApiTags(SWAGGER_SETTINGS.TAGS.ROLE)
@ApiExceptionResponse()
@Controller()
export class RoleController {
  constructor(
    @Inject(CREATE_ROLE_USE_CASE_TOKEN)
    private readonly createRoleUseCase: CreateRoleUseCase,
  ) {}

  @ApiCreatedResponse({
    type: RoleResponseDto,
    description: ESwaggerDescription.Created,
  })
  @ApiBody({ type: CreateRoleDto })
  @Post()
  async createRole(@Body() input: CreateRoleDto): Promise<RoleResponseDto> {
    return this.createRoleUseCase.execute(input);
  }
}
