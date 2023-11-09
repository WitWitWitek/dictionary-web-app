import { sign, verify } from "jsonwebtoken";
import { HTTP_CODES, JwtPayloadWithUsername, TokenExpirationTime, tokenType } from "@/types";
import { CustomError } from "./customError";

export const tokenSecret = Object.freeze({
  access: process.env.ACCESS_TOKEN_SECRET as string,
  refresh: process.env.REFRESH_TOKEN_SECRET as string,
  email: process.env.EMAIL_SECRET as string,
});

export const signToken = (username: string, tokenType: tokenType): string => {
  return sign({ username }, tokenSecret[tokenType], {
    expiresIn: TokenExpirationTime[tokenType],
  });
};

export const verifyToken = (token: string, tokenType: tokenType): JwtPayloadWithUsername => {
  try {
    return verify(token, tokenSecret[tokenType]) as JwtPayloadWithUsername;
  } catch (err) {
    throw new CustomError("Unauthorized.", HTTP_CODES.UNAUTHORIZED);
  }
};
