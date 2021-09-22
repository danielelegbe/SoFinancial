import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class GetProfileDto {
  @IsNumber()
  @Field(() => Int)
  id: number;
}
