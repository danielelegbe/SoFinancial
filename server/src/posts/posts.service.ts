import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Post } from './models/Post';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findPost(postId: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) return null;
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }
}
