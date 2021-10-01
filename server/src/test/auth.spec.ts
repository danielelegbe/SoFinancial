import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { AppModule } from 'src/app.module';
import { DatabaseService } from './database/prisma.service';
import { userStub } from './stubs/user.stubs';

describe('Auth', () => {
  let dbConnection:any;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [AuthController],
      providers: [AuthService],
    }).compile();

    const app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef.get<DatabaseService>(DatabaseService).onModuleInit();
  });

  describe('root', async () => {
    await dbConnection.collection('')
    it('should return "Hello World!"', () => {
    });
  });
});
