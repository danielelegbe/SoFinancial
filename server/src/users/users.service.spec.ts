import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from './users.service';

describe('Users Service', () => {
  let usersService: UsersService;
  let prisma: PrismaService;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        username: 'johndoe',
      },
    });
    await prisma.user.delete({
      where: {
        username: 'janedoe',
      },
    });
    await app.close();
  });

  it('should be able to create a new user', async () => {
    const user = await usersService.createUser({
      username: 'johndoe',
      password: 'johndoe123',
      email: 'johndoe123@email.com',
    });
    expect(user).toMatchObject({
      id: expect.any(Number),
      username: expect.any(String),
      password: expect.any(String),
      email: expect.any(String),
      avatar: expect.any(String),
    });
  });

  it('should be able to return all users', async () => {
    await prisma.user.create({
      data: {
        username: 'janedoe',
        password: 'janedoe',
        email: 'janedoe@gmail.com',
      },
    });
    const allUsers = await usersService.getAllUsers();
    for (const user of allUsers) {
      expect(user).toMatchObject({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
      });
    }
  });

  it('should be able to find a user by username', async () => {
    const janedoe = await usersService.findUserByUsername('janedoe');
    expect(janedoe).toMatchObject({
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
    });
  });

  it('should be able to find by id', async () => {
    const user = await usersService.findUserById(1);
    expect(user).toMatchObject({
      id: expect.any(Number),
      username: expect.any(String),
      email: expect.any(String),
    });
  });
});
