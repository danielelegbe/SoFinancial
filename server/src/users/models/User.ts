import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/models/Post';
import { Comment } from 'src/comments/models/Comment';
import { Message } from 'src/messages/models/Message';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  avatar: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[] | null;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[] | null;

  @Field(() => [Message])
  sentMessages: Message[];

  @Field(() => [Message])
  receivedMessages: Message[];

  password: string;
}
