import {
  BadRequestException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { PostsService } from 'src/posts/posts.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/User';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/CreateCommentInput';
import { DeleteCommentInput } from './dto/DeleteCommentDto';
import { Comment } from './models/Comment';

@Resolver(Comment)
export class CommentsResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @ResolveField()
  async author(@Root() comment: Comment) {
    return this.commentsService.resolveAuthorForComment(comment);
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

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Comment)
  async deleteComment(
    @CurrentUser() user: User,
    @Args('id') { id }: DeleteCommentInput,
  ): Promise<Comment> {
    const comment = await this.prisma.comment.findUnique({ where: { id } });
    if (!comment) throw new BadRequestException('comment does not exist');

    // IMPORTANT
    if (comment.authorId !== user.id) {
      throw new UnauthorizedException();
    }
    const deletedComment = this.prisma.comment.delete({
      where: { id: comment.id },
    });
    return deletedComment;
  }
}
