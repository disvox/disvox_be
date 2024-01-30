import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { CookieOptions, Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

import { GoogleGuard } from '../shared/guards/google.guard';
import { OauthUser } from './dtos/auth.dto';
import { CreateUserDto } from './dtos';
import { UserRepository } from '@/infrastructure';
import { CreateUserUseCase, IAuthPayload } from '@/application';
import { UserRepositoryToken } from '@/domain';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    private readonly createUserUseCase: CreateUserUseCase,
  ) {}

  private generateJwt(payload: IAuthPayload) {
    return this.jwtService.sign(payload);
  }

  private async generateToken(user: OauthUser & CreateUserDto) {
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
      req.user as OauthUser & CreateUserDto,
    );

    res.cookie('access_token', token, this.getDefaultCookieConfig());

    return res.redirect('http://localhost:5173/login/success');
  }
}
