import { Field, InputType, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class QueryPostInput {
  @IsInt()
  @Field(() => Int, { nullable: true })
  id: number;
}
