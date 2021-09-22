import { Field, InputType } from '@nestjs/graphql';
import { IsString, MaxLength } from 'class-validator';

@InputType()
export class NewPostInput {
  @IsString()
  @MaxLength(255)
  @Field()
  title: string;

  @IsString()
  @Field()
  content: string;

  @IsString()
  @Field()
  forum: string;
}
