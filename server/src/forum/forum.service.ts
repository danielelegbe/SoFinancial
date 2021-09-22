import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Forum } from './models/Forum';

@Injectable()
export class ForumService {
  constructor(private readonly prisma: PrismaService) {}

  async createForum(name: string): Promise<Forum> {
    const forum = await this.prisma.forum.create({
      data: { name: name.toUpperCase() },
    });
    return forum;
  }

  async getForumByName(name: string): Promise<Forum | null> {
    const forum = await this.prisma.forum.findUnique({
      where: { name: name.toUpperCase() },
    });

    if (!forum) return null;

    return forum as Forum;
  }

  async getAllForums(): Promise<Forum[]> {
    return this.prisma.forum.findMany();
  }
}
