import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Post } from 'src/posts/models/Post';

@ObjectType()
export class Forum {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];
}
