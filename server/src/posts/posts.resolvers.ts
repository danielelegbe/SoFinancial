import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { ForumService } from 'src/forum/forum.service';
import { Forum } from 'src/forum/models/Forum';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/User';
import { UsersService } from 'src/users/users.service';
import { NewPostInput } from './dto/NewPostInput';
import { Post } from './models/Post';

@Resolver(Post)
export class PostsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly forumService: ForumService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField()
  async author(@Root() post: Post): Promise<User> {
    return this.usersService.resolveAuthor(post);
  }
  @ResolveField()
  async forum(@Root() post: Post): Promise<Forum> {
    return await this.prisma.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .forum();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Args('newPostInput') newPostInput: NewPostInput,
    @CurrentUser() user: User,
  ) {
    const author = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!author)
      throw new UnauthorizedException('Must be logged in to create a post');

    const forum: Forum = await this.forumService.getForumByName(
      newPostInput.forum,
    );

    if (!forum) throw new BadRequestException('forum must exist');

    const newPost = this.prisma.post.create({
      data: {
        content: newPostInput.content,
        title: newPostInput.title,
        authorId: author.id,
        forumId: forum.id,
      },
    });

    return newPost;
  }
}
