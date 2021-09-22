import { Module } from '@nestjs/common';
import { ForumService } from 'src/forum/forum.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { PostsResolver } from './posts.resolvers';

@Module({
  providers: [PostsResolver, UsersService, ForumService, PrismaService],
})
export class PostsModule {}
