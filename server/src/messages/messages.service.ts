import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async sendMessage(fromUserId: number, toUserId: number, content: string) {
    const fromUser = await this.usersService.findUserById(fromUserId);
    const toUser = await this.usersService.findUserById(toUserId);

    if (!fromUser || !toUser) throw new BadRequestException();

    const newMessage = await this.prisma.message.create({
      data: {
        content,
        fromUserId: fromUser.id,
        toUserId: toUser.id,
      },
    });

    return newMessage;
  }
}
