import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/User';
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

    if (!fromUser || !toUser) throw new BadRequestException('No users found');

    if (fromUser.username === toUser.username) {
      throw new BadRequestException("You can't message yourself");
    }

    const newMessage = await this.prisma.message.create({
      data: {
        content,
        fromUserId: fromUser.id,
        toUserId: toUser.id,
      },
    });

    return newMessage;
  }

  async getMessages(currentUser: User, otherUserId: number) {
    const otherUser = await this.prisma.user.findUnique({
      where: { id: otherUserId },
    });

    const userIds = [currentUser.id, otherUser.id];

    const messages = await this.prisma.message.findMany({
      where: {
        OR: [
          {
            fromUserId: { in: userIds },
          },
          {
            toUserId: { in: userIds },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return messages;
  }

  async getUsers(currentUser: User) {
    return await this.prisma.user.findMany({
      where: {
        OR: [
          {
            receivedMessages: {
              some: {
                fromUserId: currentUser.id,
              },
            },
          },
          {
            sentMessages: {
              some: {
                toUserId: currentUser.id,
              },
            },
          },
        ],
      },
    });
  }
}
