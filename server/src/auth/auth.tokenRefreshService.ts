import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokenRefreshService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async refreshToken(token: string) {
    if (!token) return null;

    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.REFRESH_SECRET,
      });

      if (!decoded) return null;
      const foundUser = await this.prisma.user.findUnique({
        where: { id: decoded.sub },
        select: { id: true, username: true },
      });

      if (!foundUser) return null;
      return foundUser;
    } catch (error) {
      return null;
    }
  }
}
