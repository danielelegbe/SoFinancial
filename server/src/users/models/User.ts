import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/models/Post';

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

  password: string;
}
