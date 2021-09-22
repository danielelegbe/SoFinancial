import { UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { Post } from 'src/posts/models/Post';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './models/User';
@Resolver(User)
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @ResolveField()
  async posts(@Root() user: User): Promise<Post[]> {
    return this.prisma.user.findUnique({ where: { id: user.id } }).posts();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user): Promise<User | null> {
    return user;
  }
}
