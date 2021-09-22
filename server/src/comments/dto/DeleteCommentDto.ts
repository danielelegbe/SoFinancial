import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class DeleteCommentInput {
  @IsNumber()
  @Field(() => Int)
  id: number;
}
