import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GET_USER_USE_CASE_TOKEN, GetUserUseCase } from '@/application';
import { JwtAuthGuard, SWAGGER_SETTINGS } from '../shared';

@Controller()
@ApiTags(SWAGGER_SETTINGS.TAGS.USER)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    @Inject(GET_USER_USE_CASE_TOKEN)
    private readonly getUserUseCase: GetUserUseCase,
  ) {}

  @Get(':id')
  async getUser(@Req() req: any) {
    return this.getUserUseCase.execute({ userId: req.user });
  }
}
