import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateCommentInput {
  @IsString()
  @Field()
  content: string;

  @IsNumber()
  @Field(() => Int)
  postId: number;
}
