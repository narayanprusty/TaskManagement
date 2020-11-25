import { createParamDecorator } from "@nestjs/common";
import { User } from "../user.entity";

export const GetUser = createParamDecorator((data, execContext) : User => {
  return execContext.args[0].user
})