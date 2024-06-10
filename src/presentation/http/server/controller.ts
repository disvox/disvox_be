import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  CREATE_SERVER_USE_CASE_TOKEN,
  CreateServerUseCase,
  GET_SERVERS_USE_CASE_TOKEN,
  GetServersUseCase,
} from '@/application';
import { JwtAuthGuard, SWAGGER_SETTINGS } from '../shared';
import { Server } from '@/domain';
import { CreateServerDto, ServerResponseDto } from './dtos';
import { SerializeClass } from '../../shared';

@ApiTags(SWAGGER_SETTINGS.TAGS.SERVER)
@UseGuards(JwtAuthGuard)
@SerializeClass(ServerResponseDto)
@Controller()
export class ServerController {
  constructor(
    @Inject(GET_SERVERS_USE_CASE_TOKEN)
    private readonly getServersUseCase: GetServersUseCase,
    @Inject(CREATE_SERVER_USE_CASE_TOKEN)
    private readonly createServerUseCase: CreateServerUseCase,
  ) {}

  @Get()
  async getServers(@Req() req: any): Promise<any> {
    return this.getServersUseCase.execute({ userId: req.user });
  }

  @Post()
  async createServer(
    @Req() req: any,
    @Body() input: CreateServerDto,
  ): Promise<Server> {
    return this.createServerUseCase.execute({ ...input, userId: req.user });
  }
}
