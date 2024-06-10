import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

import { GoogleGuard } from '../shared';
import { IOauthUser, CreateUserDto } from './dtos';
import {
  CreateUserUseCase,
  IAuthPayload,
  CREATE_USER_USE_CASE_TOKEN,
} from '@/application';
import { IUserRepository } from '@/domain';
import { USER_REPOSITORY_TOKEN } from '@/infrastructure';

@Controller()
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
    @Inject(CREATE_USER_USE_CASE_TOKEN)
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  private generateJwt(payload: IAuthPayload) {
    return this.jwtService.sign(payload);
  }

  private async generateToken(user: IOauthUser & CreateUserDto) {
    let _user = await this.userRepository.getOne({ email: user.email });
    if (!_user) {
      _user = await this.createUserUseCase.execute(user);
    }

    return this.generateJwt({ userId: _user.id });
  }

  getDefaultCookieConfig(options?: CookieOptions): CookieOptions {
    return {
      maxAge: 2592000000,
      sameSite: 'none',
      secure: true,
      httpOnly: true,
      ...options,
    };
  }

  @Get('/google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginGoogle() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async callbackGoogle(@Req() req: Request, @Res() res: Response) {
    const token = await this.generateToken(
      req.user as IOauthUser & CreateUserDto,
    );

    res.cookie('access_token', token, this.getDefaultCookieConfig());

    return res.redirect('http://localhost:5173/login/success');
  }
}
