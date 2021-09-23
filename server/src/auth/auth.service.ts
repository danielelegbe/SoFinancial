import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { NewUserDto } from 'src/users/dto/NewUserDto';
import { User } from 'src/users/models/User';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userInput: NewUserDto): Promise<User> {
    const { username } = userInput;
    const foundUser = await this.usersService.findUserByUsername(username);
    if (foundUser) throw new BadRequestException('Account already exists');

    const newUser = await this.usersService.createUser(userInput);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userResponse } = newUser;
    return userResponse as User;
  }

  login(user: User): { access_token: string } {
    const payload = {
      username: user.username,
      sub: user.id,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findUserByUsername(username);
    if (!user) throw new UnauthorizedException('Incorrect login');

    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) throw new UnauthorizedException('Incorrect login');

    return user;
  }

  async verify(access_token: string): Promise<User> {
    const decoded = this.jwtService.verify(access_token);
    if (!decoded) throw new UnauthorizedException('Bad token');

    const user = await this.usersService.findUserById(decoded.sub);
    if (!user)
      throw new UnauthorizedException('Unable to find user from token');

    return user;
  }
}
