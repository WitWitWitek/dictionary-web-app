import { JwtPayload } from "jsonwebtoken";

export type tokenType = "access" | "refresh";

export enum TokenExpirationTime {
  access = "30s",
  refresh = "3m",
}

export interface JwtPayloadWithUsername extends JwtPayload {
  username: string;
}
