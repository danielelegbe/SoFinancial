import { Query, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { Post } from 'src/posts/models/Post';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './models/User';
import { UsersService } from './users.service';
@Resolver(User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @ResolveField()
  async posts(@Root() user: User): Promise<Post[]> {
    return this.prisma.user.findUnique({ where: { id: user.id } }).posts();
  }

  @Query(() => [User])
  async getAllUsers(): Promise<User[] | null> {
    return await this.usersService.getAllUsers();
  }
}
