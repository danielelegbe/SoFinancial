import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class NewForumInput {
  @IsString()
  @Field()
  name: string;
}
