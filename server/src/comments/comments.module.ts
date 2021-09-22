import { Module } from '@nestjs/common';
import { PostsService } from 'src/posts/posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CommentsResolver } from './comments.resolver';
import { CommentsService } from './comments.service';

@Module({
  providers: [
    CommentsService,
    PrismaService,
    PostsService,
    CommentsResolver,
    UsersService,
  ],
})
export class CommentsModule {}
