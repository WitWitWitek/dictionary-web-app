import app from "../../src/app";
import * as request from "supertest";
import { AppDataSource } from "../../src/dataSource";
import { signToken } from "../../src/utils/tokenHandlers";
import * as repetitionServices from "../../src/services/repetitionService";
import * as userServices from "../../src/services/userService";
import { User } from "@/entity/User";

describe("/repetitions", () => {
  const someRepetition = {
    id: "123456",
    content: "someContent",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let token: string;

  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  beforeEach(async () => {
    token = signToken("someUser", "access");
  });

  const createNewRepetitionMock = jest.spyOn(repetitionServices, "createNewRepetition");

  describe("POST /", () => {
    createNewRepetitionMock.mockResolvedValueOnce(someRepetition.id);

    describe("user is not logged in", () => {
      it("should return status code of 401", async () => {
        const { statusCode } = await request(app).post("/repetitions").send(someRepetition);
        expect(statusCode).toBe(401);
      });
    });

    describe("user is logged in", () => {
      const someUser: User = new User();
      someUser.id = "12345";
      someUser.username = "someUser";
      beforeEach(() => {
        jest.spyOn(userServices, "findUser").mockResolvedValue(someUser);
      });
      it("should return status code of 201 and message when creating new repetition", async () => {
        const { statusCode, body } = await request(app)
          .post("/repetitions")
          .set("authorization", `Bearer ${token}`)
          .send(someRepetition);

        expect(statusCode).toBe(201);
        expect(createNewRepetitionMock).toHaveBeenCalledWith(someRepetition.content, someUser);
        expect(body).toEqual({ message: `Repetition with id: ${someRepetition.id} created.` });
      });

      it("should return status code of 400 and message when body lacks content field", async () => {
        const { statusCode, body } = await request(app)
          .post("/repetitions")
          .set("authorization", `Bearer ${token}`)
          .send({ content: "" });

        expect(statusCode).toBe(400);
        expect(body).toEqual({ message: "Content field is required!" });
      });
    });
  });

  describe("GET /", () => {
    describe("user is not logged in", () => {
      it("should return status code of 401", async () => {
        const { statusCode } = await request(app).get("/repetitions");
        expect(statusCode).toBe(401);
      });
    });

    describe("user is logged in", () => {
      it("should return status code of 200 and array of repetitons", async () => {
        const { statusCode, body } = await request(app).get("/repetitions").set("authorization", `Bearer ${token}`);
        expect(statusCode).toBe(200);
        expect(Array.isArray(body)).toBe(true);
        expect(body.every((item: object) => isInstanceOfRepetition(item))).toBe(true);
      });
    });
  });
});

function isInstanceOfRepetition(item: object): boolean {
  return "id" in item && "content" in item && "createdAt" in item && "updatedAt" in item;
}
