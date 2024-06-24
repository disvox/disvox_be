import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import {
  CREATE_PERMISSION_USE_CASE_TOKEN,
  CreatePermissionUseCase,
} from '@/application';
import { CreatePermissionDto, PermissionResponseDto } from './dtos';
import {
  ApiExceptionResponse,
  ESwaggerDescription,
  SWAGGER_SETTINGS,
} from '../shared';

@ApiTags(SWAGGER_SETTINGS.TAGS.PERMISSION)
@ApiExceptionResponse()
@Controller()
export class PermissionController {
  constructor(
    @Inject(CREATE_PERMISSION_USE_CASE_TOKEN)
    private readonly createPermissionUseCase: CreatePermissionUseCase,
  ) {}

  @ApiCreatedResponse({
    type: PermissionResponseDto,
    description: ESwaggerDescription.Created,
  })
  @ApiBody({ type: CreatePermissionDto })
  @Post()
  createPermission(
    @Body() input: CreatePermissionDto,
  ): Promise<PermissionResponseDto> {
    return this.createPermissionUseCase.execute(input);
  }
}
