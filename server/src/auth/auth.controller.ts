import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/User';
import { NewUserDto } from 'src/users/dto/NewUserDto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
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
        email: user.email,
        sub: user.id,
      };

      res.cookie(
        'jid',
        this.jwtService.sign(payload, {
          secret: process.env.REFRESH_SECRET,
          expiresIn: '7d',
        }),
        {
          maxAge: 6.048e8, // 7 days
          httpOnly: true,
        },
      );
      return res.json(isValid);
    }
  }
}
