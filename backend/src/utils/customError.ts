import { NextFunction, Request, Response } from "express";

export class CustomError extends Error {
  constructor(public message: string, public statusCode: number) {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({
      message: "An internal server error occured. Please try again later",
    });
  }
};
