import { sign, verify, JwtPayload } from "jsonwebtoken";

export type tokenType = "access" | "refresh";

interface JwtPayloadWithUsername extends JwtPayload {
  username: string;
}

export enum TokenExpirationTime {
  access = "30s",
  refresh = "3m",
}

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
