import { JwtPayload } from "jsonwebtoken";

export type tokenType = "access" | "refresh";

export enum TokenExpirationTime {
  access = "15m",
  refresh = "1d",
}

export interface JwtPayloadWithUsername extends JwtPayload {
  username: string;
}
