import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { GoogleGuard } from './guards/google.guard';
import { OauthUser } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/google')
  @UseGuards(GoogleGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async loginGoogle() {}

  @Get('/google/callback')
  @UseGuards(GoogleGuard)
  async callbackGoogle(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.generateToken(req.user as OauthUser);

    res.cookie(
      'access_token',
      token,
      this.authService.getDefaultCookieConfig(),
    );

    return res.redirect('http://localhost:5173/login/success');
  }
}
