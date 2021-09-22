import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  email: string;

  @Field()
  username: string;

  @Exclude({ toPlainOnly: true })
  password: string;
}
