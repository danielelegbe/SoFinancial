import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/User';
import { NewUserDto } from 'src/users/dto/NewUserDto';
import { TokenRefreshService } from './auth.tokenRefreshService';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly tokenRefreshService: TokenRefreshService,
  ) {}

  @Post('register')
  async register(@Body() newUserDto: NewUserDto): Promise<User> {
    return await this.authService.register(newUserDto);
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
    const user: any = await this.tokenRefreshService.refreshToken(token);
    if (!user) throw new UnauthorizedException();
    const isValid = this.authService.login(user);

    if (isValid) {
      const payload = {
        username: user.username,
        sub: user.id,
      };

      this.refreshCookie(res, payload);
      return res.json(isValid);
    }
    // console.log(user);
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
