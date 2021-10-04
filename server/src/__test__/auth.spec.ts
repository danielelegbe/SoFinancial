import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from '../auth/auth.controller';
// import { AuthService } from '../auth/auth.service';
import { AppModule } from '../app.module';
import { userStub } from './stubs/user.stubs';
import request from 'supertest';
import { DatabaseService } from './database/prisma.service';

describe('Auth', () => {
  let dbConnection:any;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      // controllers: [AuthController],
      // providers: [AuthService],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).onModuleInit();
    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    await dbConnection.collection('users').deleteMany({});
    await app.close();
  })

  describe('get users',  () => {
    it('should return return users', async () => {
      await dbConnection.collection('users').insertOne(userStub())
      const response = await request(httpServer).get('/users')
      expect(response.status).toBe(200);
    });
  });
});
