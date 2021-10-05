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

  describe('Get all users', () => {
    it('should return all users', async () => {
      const users = await usersService.getAllUsers();
      users.forEach((user) => {
        expect(user).toMatchObject({
          username: expect.any(String),
          email: expect.any(String),
          avatar: expect.any(String),
          password: expect.any(String),
          id: expect.any(Number),
        });
      });
    });
  });

  describe('Find One User', () => {
    it('should return one user', async () => {
      const foundUser = await usersService.findUserById(1);
      expect(foundUser).toMatchObject({
        username: expect.any(String),
        email: expect.any(String),
        avatar: expect.any(String),
        id: expect.any(Number),
      });
    });
  });
});
