import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GetUserUseCase } from '@/application';
import { JwtAuthGuard, SWAGGER_SETTINGS } from '../shared';

@Controller('users')
@ApiTags(SWAGGER_SETTINGS.TAGS.USER)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly getUserUseCase: GetUserUseCase) {}

  @Get(':id')
  async getUser(@Req() req: any) {
    return this.getUserUseCase.execute({ userId: req.user });
  }
}
