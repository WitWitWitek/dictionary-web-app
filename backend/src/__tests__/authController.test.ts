import { encodingExists } from "iconv-lite";
encodingExists("foo");
import app from "../app";
import * as request from "supertest";
import { AppDataSource } from "../dataSource";
interface LoginPathTest {
  description: string;
  payload: {
    username?: string;
    password?: string;
  };
  result: number;
}

describe("auth", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("get login route", () => {
    describe("credentials do not exist or are wrong", () => {
      const tests: LoginPathTest[] = [
        {
          description: "should return status code of 400",
          payload: {},
          result: 400,
        },
        {
          description: "should return status code of 401",
          payload: { username: "jscode", password: "testtest" },
          result: 401,
        },
        {
          description: "should return status code of 401",
          payload: { username: "witek", password: "testtest" },
          result: 401,
        },
      ];

      for (let index = 0; index < tests.length; index++) {
        it(tests[index].description, async () => {
          await request(app).post("/auth/login").send(tests[index].payload).expect(tests[index].result);
        });
      }
    });

    describe("credentials are correct", () => {
      it("should return status code of 200 and access token string", async () => {
        await request(app)
          .post("/auth/login")
          .send({ username: process.env.API_USERNAME, password: process.env.API_PASSWORD })
          .expect(200);
      });
    });
  });
});
