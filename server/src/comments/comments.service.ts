import { Injectable } from '@nestjs/common';
import { Post } from 'src/posts/models/Post';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/User';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async resolvePost(parent: any): Promise<Post> {
    return await this.prisma.comment
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .post();
  }

  async resolveAuthorForComment(parent: any): Promise<User> {
    return await this.prisma.comment
      .findUnique({
        where: {
          id: parent.id,
        },
      })
      .author();
  }
}
