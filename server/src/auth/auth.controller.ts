import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { NewUserDto } from 'src/users/dto/NewUserDto';
import { User } from 'src/users/models/User';
import { AuthService } from './auth.service';
import { TokenRefreshService } from './auth.tokenRefreshService';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly tokenRefreshService: TokenRefreshService,
  ) {}

  @Post('register')
  async register(@Body() newUserDto: NewUserDto, @Res() res: Response) {
    const user = await this.authService.register(newUserDto);
    const isValid = this.authService.login(user);

    if (isValid) {
      const payload = {
        username: user.username,
        sub: user.id,
      };

      this.refreshCookie(res, payload);
      res.json({ ...user, ...isValid });
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req: Request, @Res() res: Response) {
    const user = req.user as User;
    const isValid = this.authService.login(user);

    if (isValid) {
      const payload = {
        username: user.username,
        sub: user.id,
      };

      this.refreshCookie(res, payload);
      return res.json(isValid);
    }
  }

  @Post('refresh-token')
  async refreshAccessToken(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.jid;
    const user = (await this.tokenRefreshService.refreshToken(token)) as User;
    if (!user) return res.send({ ok: false, access_token: '' });
    const isValid = this.authService.login(user);

    if (isValid) {
      const payload = {
        username: user.username,
        sub: user.id,
      };

      this.refreshCookie(res, payload);
      return res.json(isValid);
    }
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    res.cookie('jid', '', {
      maxAge: 0,
      httpOnly: true,
    });

    res.send({
      ok: true,
      access_token: '',
    });
  }

  private refreshCookie(
    @Req() res: Response,
    payload: { username: string; sub: number },
  ) {
    res.cookie(
      'jid',
      this.jwtService.sign(payload, {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      }),
      {
        secure: false,
        sameSite: 'strict',
        maxAge: 6.048e8, // 7 days
        httpOnly: true,
      },
    );
  }
}
