import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterUserUseCase, FindUserByEmailUseCase } from '@/use-cases';
import { JwtPayload, OauthUser } from './dtos/auth.dto';
import { CookieOptions } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly findUserByEmailUseCase: FindUserByEmailUseCase,
  ) {}

  private generateJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  public async generateToken(user: OauthUser) {
    let _user = await this.findUserByEmailUseCase.execute({
      email: user.email,
    });
    if (!_user) {
      _user = await this.registerUser(user);
    }

    return this.generateJwt({ sub: _user.id, email: _user.email });
  }

  private registerUser(user: OauthUser) {
    return this.registerUserUseCase.execute({
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
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
}
