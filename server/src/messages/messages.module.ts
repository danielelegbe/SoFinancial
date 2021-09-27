import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';

@Module({
  providers: [MessagesService, PrismaService, UsersService, MessagesResolver],
})
export class MessagesModule {}
