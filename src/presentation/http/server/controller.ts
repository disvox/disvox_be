import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
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
import { ClsService } from 'nestjs-cls';

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
    private readonly cls: ClsService,
  ) {}

  @Get()
  async getServers(): Promise<any> {
    return this.getServersUseCase.execute({
      userId: this.cls.get('user.id'),
    });
  }

  @Post()
  async createServer(@Body() input: CreateServerDto): Promise<Server> {
    return this.createServerUseCase.execute({
      ...input,
      userId: this.cls.get('user.id'),
    });
  }
}
