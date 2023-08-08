import { encodingExists } from "iconv-lite";
encodingExists("foo");
import app from "../../src/app";
import * as request from "supertest";
import { AppDataSource } from "../../src/dataSource";
import * as jwtHandlers from "../../src/utils/tokenHandlers";
interface LoginPathTest {
  description: string;
  payload: {
    username?: string;
    password?: string;
  };
  result: number;
}

describe("/auth", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("get /login route", () => {
    describe("credentials are incorrect", () => {
      it.each([
        { payload: {}, expectedStatusCode: 400 },
        { payload: { username: "jscode", password: "testtest" }, expectedStatusCode: 401 },
        { payload: { username: "witek", password: "testtest" }, expectedStatusCode: 401 },
      ])(
        "should return status code of $expectedStatusCode when credentials are wrong",
        async ({ payload, expectedStatusCode }) => {
          await request(app).post("/auth/login").send(payload).expect(expectedStatusCode);
        },
      );
    });

    describe("credentials are correct", () => {
      beforeEach(() => {
        jest.spyOn(jwtHandlers, "signToken").mockReturnValueOnce("1234");
      });
      it("should return status code of 200 and contain jwt cookie", async () => {
        const result = await request(app)
          .post("/auth/login")
          .send({ username: process.env.API_USERNAME, password: process.env.API_PASSWORD })
          .expect(200);
        expect(result.headers["set-cookie"]).toBeDefined();
      });

      it("should return accessToken", async () => {
        await request(app)
          .post("/auth/login")
          .send({ username: process.env.API_USERNAME, password: process.env.API_PASSWORD })
          .expect({ accessToken: "1234" });
      });
    });
  });

  describe("get /refresh route", () => {
    describe("request object does not include jwt cookie", () => {
      it("should return status code of 401", async () => {
        await request(app).get("/auth/refresh").expect(401);
      });
    });

    describe("request object does include wrong jwt cookie", () => {
      it("should return status code of 403", async () => {
        await request(app).get("/auth/refresh").set("Cookie", "jwt=12348987897").expect(403);
      });
    });
  });

  describe("get /logout route", () => {
    describe("request object does not include jwt cookie", () => {
      it("should return status code of 204", async () => {
        await request(app).post("/auth/logout").expect(204);
      });
    });

    describe("request object does include jwt cookie", () => {
      it("should return status code of 200", async () => {
        await request(app).post("/auth/logout").set("Cookie", "jwt=123457").expect(200);
      });
    });
  });
});
