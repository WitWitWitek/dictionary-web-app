import { RequestHandler } from "express";
import { sign } from "jsonwebtoken";

export const login: RequestHandler = async (req, res) => {
  const accessToken = sign(
    {
      UserInfo: {
        username: "witold",
      },
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "15m" }
  );

  res.json({ accessToken });
};
