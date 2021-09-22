import { BadRequestException, UseGuards } from '@nestjs/common';
import { Query, ResolveField, Resolver, Root, Args } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { Post } from 'src/posts/models/Post';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProfileDto } from './dto/GetProfileDto';
import { User } from './models/User';
import { UsersService } from './users.service';
@Resolver(User)
export class UsersResolver {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  @ResolveField()
  async posts(@Root() user: User): Promise<Post[]> {
    return this.prisma.user.findUnique({ where: { id: user.id } }).posts();
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => User)
  async me(@CurrentUser() user): Promise<User | null> {
    return user;
  }

  @Query(() => User)
  async getProfile(@Args('id') { id }: GetProfileDto) {
    const user = await this.usersService.findUserById(id);
    if (!user) throw new BadRequestException();
    return user;
  }
}
