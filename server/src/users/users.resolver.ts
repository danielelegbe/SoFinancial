import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { User } from './models/User';
import { UsersService } from './users.service';
@Resolver(User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async getAllUsers(@CurrentUser() user: User): Promise<User[] | null> {
    return await this.usersService.getAllUsers();
  }
}
