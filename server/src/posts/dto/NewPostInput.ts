import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class NewPostInput {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @Field()
  title: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  content: string;

  @IsString()
  @IsNotEmpty()
  @Field()
  forum: string;
}
