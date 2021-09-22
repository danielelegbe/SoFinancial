import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ForumResolver } from './forum.resolvers';
import { ForumService } from './forum.service';

@Module({
  providers: [ForumService, ForumResolver, PrismaService],
})
export class ForumModule {}
