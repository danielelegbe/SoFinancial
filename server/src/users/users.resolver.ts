import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './models/User';
import { UsersService } from './users.service';
@Resolver(User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  //   @Query(() => String)
  //   hello() {
  //     return 'hello';
  //   }

  @Query(() => [User])
  async getAllUsers(): Promise<User[] | null> {
    return await this.prisma.user.findMany();
  }
}
