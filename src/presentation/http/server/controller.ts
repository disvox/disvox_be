import { Controller, Get, Inject, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GET_SERVERS_USE_CASE_TOKEN, GetServersUseCase } from '@/application';
import { JwtAuthGuard, SWAGGER_SETTINGS } from '../shared';

@ApiTags(SWAGGER_SETTINGS.TAGS.SERVER)
@UseGuards(JwtAuthGuard)
@Controller('servers')
export class ServerController {
  constructor(
    @Inject(GET_SERVERS_USE_CASE_TOKEN)
    private readonly getServersUseCase: GetServersUseCase,
  ) {}

  @Get()
  async getServers(@Req() req: any): Promise<any> {
    return this.getServersUseCase.execute({ userId: req.user });
  }
}
