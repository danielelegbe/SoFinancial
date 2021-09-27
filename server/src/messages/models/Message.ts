import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/User';

@ObjectType()
export class Message {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => User)
  from: User;

  @Field(() => User)
  to: User;
}
