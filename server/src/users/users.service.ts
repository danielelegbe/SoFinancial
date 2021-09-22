import { User } from './models/User';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewUserDto } from './dto/NewUserDto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: NewUserDto): Promise<User> {
    const { password } = userData;
    const hashedPassword = await hash(password, 10);

    return await this.prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
      },
    });
  }

  async getAllUsers(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }

  async findUserByUsername(username: string): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    if (!foundUser) return null;

    return foundUser;
  }

  async findUserById(id: number): Promise<User | null> {
    const foundUser = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!foundUser) return null;

    return foundUser;
  }
}
