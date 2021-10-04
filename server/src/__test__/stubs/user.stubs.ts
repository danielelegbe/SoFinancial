import { NewUserDto } from "src/users/dto/NewUserDto";

export const userStub = (): NewUserDto => {
  return { email: "barry@gmail.com", username: "barry", password:"batman" }
}