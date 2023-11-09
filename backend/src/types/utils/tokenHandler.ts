import { JwtPayload } from "jsonwebtoken";

export type tokenType = "access" | "refresh" | "email";

export enum TokenExpirationTime {
  access = "15m",
  refresh = "1d",
  email = "60m",
}

export interface JwtPayloadWithUsername extends JwtPayload {
  username: string;
}
