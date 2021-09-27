import { UseGuards } from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
  Subscription,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/currentUser.decorator';
import { GQLAuthGuard } from 'src/auth/guards/gql.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/users/models/User';
import { NewMessageInput } from './dto/NewMessageInput';
import { MessagesService } from './messages.service';
import { Message } from './models/Message';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

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
    const message = await this.messagesService.sendMessage(
      from.id,
      messageData.toUserId,
      messageData.content,
    );
    pubSub.publish('NEW_MESSAGE', { newMessage: message });

    return message;
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [Message])
  async getMessages(
    @CurrentUser() currentUser: User,
    @Args('otherUserId', { type: () => Int }) otherUserId: number,
  ) {
    return this.messagesService.getMessages(currentUser, otherUserId);
  }

  @UseGuards(GQLAuthGuard)
  @Query(() => [User])
  async getUsers(@CurrentUser() currentUser: User) {
    return this.messagesService.getUsers(currentUser);
  }

  @Subscription(() => Message)
  newMessage() {
    return pubSub.asyncIterator('NEW_MESSAGE');
  }
}
