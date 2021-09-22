import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Post } from 'src/posts/models/Post';
import { User } from 'src/users/models/User';

@ObjectType()
export class Comment {
  @Field(() => Int)
  id: number;

  @IsString()
  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => User, { nullable: true })
  author?: User;

  @Field(() => Post, { nullable: true })
  post?: Post;
}
