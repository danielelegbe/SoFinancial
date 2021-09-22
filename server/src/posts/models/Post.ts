import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Forum } from 'src/forum/models/Forum';
import { User } from 'src/users/models/User';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => User, { nullable: true })
  author?: User | null;

  @Field(() => Forum, { nullable: true })
  forum?: Forum | null;
}
