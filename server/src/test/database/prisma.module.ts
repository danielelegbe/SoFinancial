import { Module } from '@nestjs/common';
import { DatabaseService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class databaseModule {}
