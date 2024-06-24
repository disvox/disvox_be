import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GET_USER_USE_CASE_TOKEN, GetUserUseCase } from '@/application';
import { JwtAuthGuard, SWAGGER_SETTINGS } from '../shared';
import { SerializeClass } from '@/presentation/shared';
import { UserResponseDto } from './dtos';

@Controller()
@ApiTags(SWAGGER_SETTINGS.TAGS.USER)
@SerializeClass(UserResponseDto)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    @Inject(GET_USER_USE_CASE_TOKEN)
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Get(':id')
  async getUser() {
    return this.getUserUseCase.execute();
  }
}
