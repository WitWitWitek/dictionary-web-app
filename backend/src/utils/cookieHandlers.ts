import { Response, CookieOptions } from "express";

const cookieName = "jwt";
const cookieOptions: CookieOptions = Object.freeze({
  httpOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 1 * 24 * 60 * 60 * 1000,
});

export const setCookie = (res: Response, cookiePayload: string) => {
  res.cookie(cookieName, cookiePayload, cookieOptions);
};

export const clearCookie = (res: Response) => {
  res.clearCookie(cookieName, cookieOptions);
};
