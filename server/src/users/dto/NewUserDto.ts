import { IsEmail, IsString, Length } from 'class-validator';

export class NewUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  username: string;

  @IsString()
  @Length(6, 20)
  password: string;
}
