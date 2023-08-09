import * as request from "supertest";
// import { AppDataSource } from "../../src/dataSource";
import app from "../../src/app";

describe("/user", () => {
  //   beforeAll(async () => {
  //     await AppDataSource.initialize();
  //   });

  //   afterAll(async () => {
  //     await AppDataSource.destroy();
  //   });

  describe("POST /sign-up", () => {
    describe("user data is missing", () => {
      it("should return status code of 400", async () => {
        await request(app).post("/user/sign-up").send({}).expect(400);
      });
    });
  });
});
