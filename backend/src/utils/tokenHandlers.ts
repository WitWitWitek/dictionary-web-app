import { sign, verify } from "jsonwebtoken";
import {
  JwtPayloadWithUsername,
  TokenExpirationTime,
  tokenType,
} from "../types/tokenHandler";

export const tokenSecret = Object.freeze({
  access: process.env.ACCESS_TOKEN_SECRET as string,
  refresh: process.env.REFRESH_TOKEN_SECRET as string,
});

export const signToken = (username: string, tokenType: tokenType): string => {
  return sign({ username }, tokenSecret[tokenType], {
    expiresIn: TokenExpirationTime[tokenType],
  });
};

export const verifyToken = (
  token: string,
  tokenType: tokenType
): JwtPayloadWithUsername => {
  return verify(token, tokenSecret[tokenType]) as JwtPayloadWithUsername;
};