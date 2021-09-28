import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class NewUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;
}
