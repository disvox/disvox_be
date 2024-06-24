import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  CREATE_PERMISSION_USE_CASE_TOKEN,
  CreatePermissionUseCase,
  GET_PERMISSIONS_USE_CASE_TOKEN,
  GetPermissionsUseCase,
} from '@/application';
import { CreatePermissionDto, PermissionResponseDto } from './dtos';
import {
  ApiExceptionResponse,
  ESwaggerDescription,
  JwtAuthGuard,
  SWAGGER_SETTINGS,
} from '../shared';

@ApiTags(SWAGGER_SETTINGS.TAGS.PERMISSION)
@ApiExceptionResponse()
@UseGuards(JwtAuthGuard)
@Controller()
export class PermissionController {
  constructor(
    @Inject(CREATE_PERMISSION_USE_CASE_TOKEN)
    private readonly createPermissionUseCase: CreatePermissionUseCase,
    @Inject(GET_PERMISSIONS_USE_CASE_TOKEN)
    private readonly getPermissionsUseCase: GetPermissionsUseCase,
  ) {}

  @ApiCreatedResponse({
    type: PermissionResponseDto,
    description: ESwaggerDescription.Created,
  })
  @ApiBody({ type: CreatePermissionDto })
  @Post()
  createPermission(@Body() input: CreatePermissionDto) {
    return this.createPermissionUseCase.execute(input);
  }

  @ApiOkResponse({
    type: PermissionResponseDto,
    isArray: true,
    description: ESwaggerDescription.OK,
  })
  @Get()
  getPermissions() {
    return this.getPermissionsUseCase.execute();
  }
}
