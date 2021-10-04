import { Module } from '@nestjs/common';
import { DatabaseService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule.forRootAsync()],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class databaseModule {}
