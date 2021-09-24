import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { Comment } from 'src/comments/models/Comment';
import { ForumService } from 'src/forum/forum.service';
import { Forum } from 'src/forum/models/Forum';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/User';
import { UsersService } from 'src/users/users.service';
import { NewPostInput } from './dto/NewPostInput';
import { QueryPostInput } from './dto/QueryPostInput';
import { Post } from './models/Post';
import { PostsService } from './posts.service';

@Resolver(Post)
export class PostsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly forumService: ForumService,
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @ResolveField()
  async author(@Root() post: Post): Promise<User> {
    return this.usersService.resolveAuthorForPost(post);
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
  @ResolveField()
  async comments(@Root() post: Post): Promise<Comment[]> {
    return await this.prisma.post
      .findUnique({
        where: {
          id: post.id,
        },
      })
      .comments();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @Args('newPostInput') newPostInput: NewPostInput,
    @CurrentUser() user: User,
  ) {
    const author = await this.usersService.findUserById(user.id);

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

  @Query(() => [Post])
  async getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Query(() => Post, { nullable: true })
  async getPostById(@Args('data') data: QueryPostInput): Promise<Post> {
    const post = await this.postsService.findPost(data.id);
    if (!post) throw new NotFoundException('Post not found');
    return post;
  }
}
