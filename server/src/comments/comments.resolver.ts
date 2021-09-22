import { BadRequestException, UseGuards } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { PostsService } from 'src/posts/posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/CreateCommentInput';
import { Comment } from './models/Comment';

@Resolver(Comment)
export class CommentsResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @ResolveField()
  async author(@Root() comment: Comment) {
    return this.usersService.resolveAuthor(comment);
  }
  @ResolveField()
  async post(@Root() comment: Comment) {
    return this.commentsService.resolvePost(comment);
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Comment)
  async createComment(
    @CurrentUser() user,
    @Args('createCommentInput') { content, postId }: CreateCommentInput,
  ): Promise<Comment> {
    const post = await this.postsService.findPost(postId);
    if (!post) throw new BadRequestException("Post doesn't exist sorry");

    return this.prisma.comment.create({
      data: {
        content,
        authorId: user.id,
        postId: post.id,
      },
    });
  }

  // async newComment();
}
