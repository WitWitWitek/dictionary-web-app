import app from "../../src/app";
import * as request from "supertest";
import { AppDataSource } from "../../src/dataSource";
import * as jwtHandlers from "../../src/utils/tokenHandlers";
import * as userService from "../../src/services/userService";
import { User } from "../../src/entity/User";

describe("/auth", () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("POST /login", () => {
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

  describe("GET /refresh", () => {
    describe("request object does not include jwt cookie", () => {
      it("should return status code of 401", async () => {
        await request(app).get("/auth/refresh").expect(401);
      });
    });

    describe("request object does not include correct jwt cookie", () => {
      beforeEach(() => {
        jest.spyOn(jwtHandlers, "verifyToken").mockReturnValueOnce({ username: "wrongUser" });
      });
      it("should return status code of 403", async () => {
        await request(app).get("/auth/refresh").set("Cookie", "jwt=12348987897").expect(401);
      });
      it("should return status code of 401 when user does not exist", async () => {
        jest.spyOn(jwtHandlers, "verifyToken").mockReturnValueOnce({ username: "wrongUser" });
        await request(app).get("/auth/refresh").set("Cookie", "jwt=12348987897").expect(401);
      });
      it("should return status code of 401 when user does not exist", async () => {
        jest.spyOn(jwtHandlers, "verifyToken").mockReturnValueOnce({ username: "wrongUser" });
        await request(app).get("/auth/refresh").set("Cookie", "jwt=12348987897").expect(401);
      });
    });
    describe("request object includes correct jwt cookie", () => {
      const someUser = new User();
      someUser.createdAt = new Date();
      someUser.updatedAt = new Date();
      someUser.id = "";
      someUser.username = "someUser";
      someUser.password = "somePassword";

      it("should return acessToken", async () => {
        jest.spyOn(jwtHandlers, "signToken").mockReturnValueOnce("1234");
        jest.spyOn(userService, "findUser").mockResolvedValueOnce(someUser);
        await request(app).get("/auth/refresh").set("Cookie", "jwt=12348987897").expect({ accessToken: "1234" });
      });
    });
  });

  describe("POST /logout", () => {
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
