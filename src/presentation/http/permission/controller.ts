import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import {
  CREATE_PERMISSION_USE_CASE_TOKEN,
  CreatePermissionUseCase,
} from '@/application';
import { CreatePermissionDto, CreatedPermissionDto } from './dtos';
import { SWAGGER_SETTINGS } from '../shared';

@Controller('permissions')
@ApiTags(SWAGGER_SETTINGS.TAGS.PERMISSION)
export class PermissionController {
  constructor(
    @Inject(CREATE_PERMISSION_USE_CASE_TOKEN)
    private readonly createPermissionUseCase: CreatePermissionUseCase,
  ) {}

  @Post()
  @ApiBody({ type: CreatePermissionDto })
  async create(
    @Body() input: CreatePermissionDto,
  ): Promise<CreatedPermissionDto> {
    return this.createPermissionUseCase.execute(input);
  }
}
