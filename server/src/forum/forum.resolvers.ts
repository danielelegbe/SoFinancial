import { BadRequestException, UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { ForumService } from 'src/forum/forum.service';
import { Forum } from 'src/forum/models/Forum';
import { Post } from 'src/posts/models/Post';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewForumInput } from './dto/NewForumInput';

@Resolver(Forum)
export class ForumResolver {
  constructor(
    private readonly forumService: ForumService,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField()
  async posts(@Root() forum: Forum): Promise<Post[]> {
    return this.prisma.forum.findUnique({ where: { id: forum.id } }).posts();
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Boolean)
  async createForum(
    @Args('newForumInput') { name }: NewForumInput,
  ): Promise<boolean> {
    const foundForum = await this.forumService.getForumByName(name);
    if (foundForum) throw new BadRequestException('Forum already exists');

    await this.forumService.createForum(name);
    return true;
  }

  @Query(() => [Forum])
  async getAllForums(): Promise<Forum[]> {
    return this.forumService.getAllForums();
  }

  @Query(() => Forum, { nullable: true })
  async getForum(@Args('name') name: string): Promise<Forum> {
    return this.forumService.getForumByName(name);
  }
}
