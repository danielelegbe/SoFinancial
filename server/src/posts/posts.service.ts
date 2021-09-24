import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { Post } from './models/Post';

@Injectable()
export class PostsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findPost(postId: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });

    if (!post) return null;
    return post;
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.prisma.post.findMany();
  }

  async deletePost(postId: number, userId: number): Promise<boolean> {
    const user = await this.usersService.findUserById(userId);
    if (!user) return false;

    // IMPORTANT
    const foundPost = await this.findPost(postId);

    if (!foundPost) throw new BadRequestException('post does not exist');
    if (foundPost.authorId !== user.id) return false;

    await this.prisma.post.delete({
      where: {
        id: postId,
      },
    });

    return true;
  }
}
