import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
  CreateUserUseCase,
  IAuthPayload,
  CREATE_USER_USE_CASE_TOKEN,
} from '@/application';
import { IUserRepository } from '@/domain';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';
import { TCookieConfig, cookieConfig } from '@/presentation/shared';
import {
  ApiExceptionResponse,
  ESwaggerDescription,
  GoogleGuard,
  SWAGGER_SETTINGS,
} from '../shared';
import { IOauthUser, CreateUserDto } from './dtos';
import { ACCESS_TOKEN_KEY } from './constants';

@ApiExceptionResponse()
@ApiTags(SWAGGER_SETTINGS.TAGS.AUTH)
@Controller()
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CREATE_USER_USE_CASE_TOKEN)
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject(cookieConfig.KEY)
    private cookieConf: TCookieConfig,
  ) {}

  private async generateJwt(payload: IAuthPayload) {
    return this.jwtService.signAsync(payload);
  }

  private async generateToken(user: IOauthUser & CreateUserDto) {
    let _user = await this.userRepository.getOne({ email: user.email });
    if (!_user) {
      _user = await this.createUserUseCase.execute(user);
    }

    return this.generateJwt({ userId: _user.id });
  }

  @ApiOkResponse({ description: ESwaggerDescription.OK })
  @Get('/google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginGoogle() {
    /* empty on purpose */
  }

  @ApiOkResponse({ description: ESwaggerDescription.OK })
  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async callbackGoogle(@Req() req: Request, @Res() res: Response) {
    const token = await this.generateToken(
      req.user as IOauthUser & CreateUserDto,
    );

    res.cookie(ACCESS_TOKEN_KEY, token, this.cookieConf.options);

    return res.redirect('http://localhost:5173/login/success');
  }
}
