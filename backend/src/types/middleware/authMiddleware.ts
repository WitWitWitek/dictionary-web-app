import { User } from "../../entity/User";
import { Request } from "express";

export interface RequestWithUserRole extends Request {
  user?: User;
}
