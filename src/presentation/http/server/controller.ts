import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  CREATE_SERVER_USE_CASE_TOKEN,
  CreateServerUseCase,
  GET_SERVERS_USE_CASE_TOKEN,
  GetServersUseCase,
} from '@/application';
import { SerializeClass } from '@/presentation/shared';
import {
  JwtAuthGuard,
  SWAGGER_SETTINGS,
  ApiExceptionResponse,
  ESwaggerDescription,
} from '../shared';
import { CreateServerDto, ServerResponseDto } from './dtos';

@ApiTags(SWAGGER_SETTINGS.TAGS.SERVER)
@ApiExceptionResponse()
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
  @ApiOkResponse({
    type: ServerResponseDto,
    isArray: true,
    description: ESwaggerDescription.OK,
  })
  async getServers(): Promise<any> {
    return this.getServersUseCase.execute();
  }

  @Post()
  @ApiCreatedResponse({
    type: ServerResponseDto,
    description: ESwaggerDescription.Created,
  })
  async createServer(@Body() input: CreateServerDto) {
    return this.createServerUseCase.execute(input);
  }
}
