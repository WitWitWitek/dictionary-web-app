import { encodingExists } from "iconv-lite";
encodingExists("foo");
import app from "../app";
import * as request from "supertest";
import { AppDataSource } from "../dataSource";

beforeAll(async () => {
  await AppDataSource.initialize();
});

afterAll(async () => {
  await AppDataSource.destroy();
});

describe("Auth controller suite", () => {
  it("Should return status code 400 after reaching login path without credentials", async () => {
    const response = await request(app).post("/auth/login");
    expect(response.statusCode).toBe(400);
  });

  it("Should return status code 401 after reaching login path with wrong credentials", async () => {
    const response = await request(app).post("/auth/login").send({ username: "jscode", password: "testtest" });
    expect(response.statusCode).toBe(401);
  });

  it("Should return status code 401 after reaching login path with wrong password", async () => {
    const response = await request(app).post("/auth/login").send({ username: "witek", password: "testtest" });
    expect(response.statusCode).toBe(401);
  });
});
