import { Response, NextFunction } from "express";
import { CustomError } from "@/utils/customError";
import { verifyToken } from "@/utils/tokenHandlers";
import { HTTP_CODES, RequestWithUserRole } from "@/types";
import { findUser } from "@/services/userService";

const authMiddleware = async (req: RequestWithUserRole, res: Response, next: NextFunction) => {
  const authHeader = (req.headers.Authorization || req.headers.authorization) as string;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new CustomError("Unauthorized", HTTP_CODES.UNAUTHORIZED);
  }

  const accessToken = authHeader.split(" ")[1];
  const { username } = verifyToken(accessToken, "access");
  await findUser(username);
  req.user = username;
  next();
};

export default authMiddleware;
