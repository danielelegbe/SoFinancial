import { UseGuards } from '@nestjs/common';
import { Args, Mutation, ResolveField, Resolver, Root } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/User';
import { NewMessageInput } from './dto/NewMessageInput';
import { MessagesService } from './messages.service';
import { Message } from './models/Message';

@Resolver(Message)
export class MessagesResolver {
  constructor(
    private readonly messagesService: MessagesService,

    private readonly prisma: PrismaService,
  ) {}

  @ResolveField(() => User)
  async from(@Root() message: Message): Promise<User> {
    return (await this.prisma.message
      .findUnique({ where: { id: message.id } })
      .from()) as User;
  }

  @ResolveField(() => User)
  async to(@Root() message: Message): Promise<User> {
    return (await this.prisma.message
      .findUnique({ where: { id: message.id } })
      .to()) as User;
  }

  @UseGuards(GQLAuthGuard)
  @Mutation(() => Message)
  async sendMessage(
    @CurrentUser() from: User,
    @Args('data') messageData: NewMessageInput,
  ) {
    return await this.messagesService.sendMessage(
      from.id,
      messageData.toUserId,
      messageData.content,
    );
  }
}
