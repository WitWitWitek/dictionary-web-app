/* eslint-disable @typescript-eslint/no-explicit-any */
import { errorHandler } from "@/utils/customError";
import { NextFunction, Request, Response } from "express";

describe("errorHandler test suite", () => {
  const responseMock = {
    status: jest.fn(() => responseMock),
    json: jest.fn(),
  } as any as Response;

  const requestMock = jest.fn() as any as Request;

  const err = new Error("some error");

  const next = jest.fn() as any as NextFunction;

  it("should pass status code of 500 to response when error is not instance of CustomError", () => {
    errorHandler(err, requestMock, responseMock, next);
    expect(responseMock.status).toBeCalledWith(500);
  });
});
