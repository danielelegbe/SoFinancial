import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { UsersService } from './users.service';

describe('Users Service', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    const app = moduleRef.createNestApplication();
    await app.init();
  });

  it('should be able to create a new user', async () => {
    const user = await usersService.createUser({
      username: 'johndoe',
      password: 'johndoe123',
      email: 'johndoe123@email.com',
    });
    expect(user).toMatchObject({
      username: expect.any(String),
      password: expect.any(String),
      email: expect.any(String),
      avatar: expect.any(String),
    });
  });

  it('should return all users', async () => {
    const foundUser = await usersService.findUserById(1);
    expect(foundUser).toMatchObject({
      username: expect.any(String),
      email: expect.any(String),
      avatar: expect.any(String),
      id: expect.any(Number),
    });
  });
});
