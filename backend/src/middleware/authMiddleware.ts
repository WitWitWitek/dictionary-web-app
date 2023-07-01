import { Request, Response, NextFunction } from "express";
import { verify, JwtPayload } from "jsonwebtoken";
import { CustomError } from "../utils/customError";
import { verifyToken } from "../utils/tokenHandlers";

interface RequestWithUserRole extends Request {
  user?: string;
}

interface JwtPayloadWithUsername extends JwtPayload {
  username: string;
}

const authMiddleware = async (
  req: RequestWithUserRole,
  res: Response,
  next: NextFunction
) => {
  const authHeader = (req.headers.Authorization ||
    req.headers.authorization) as string;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new CustomError("Unauthorized", 401);
  }

  try {
    const accessToken = authHeader.split(" ")[1];
    const { username } = verifyToken(accessToken, "access");
    req.user = username;
    next();
  } catch (err) {
    throw new CustomError("Unauthorized", 401);
  }
};

export default authMiddleware;
