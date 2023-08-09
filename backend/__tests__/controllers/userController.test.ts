import * as request from "supertest";
import * as userServices from "../../src/services/userService";
import app from "../../src/app";

describe("/user", () => {
  describe("POST /sign-up", () => {
    describe("user data is missing", () => {
      it("should return status code of 400", async () => {
        await request(app).post("/user/sign-up").send({}).expect(400);
      });
    });
    describe("user data is correct", () => {
      const userFakeId = "1234";
      const userCredentials = {
        username: "someUserName",
        password: "somePassword",
      };
      jest.spyOn(userServices, "createUser").mockResolvedValueOnce(userFakeId);
      it("should return status code of 201", async () => {
        await request(app).post("/user/sign-up").send(userCredentials).expect(201);
      });
    });
  });
});
