import { config } from "dotenv";
config();
import { CustomError } from "../../src/utils/customError";
import * as tokenHandlers from "../../src/utils/tokenHandlers";

describe("tokenHandlers test suite", () => {
  describe("verifyToken handler suite", () => {
    let token: string;
    const username = "someUsername";
    describe("token is correct", () => {
      it("should return payload with username", () => {
        token = tokenHandlers.signToken(username, "access");
        const payload = tokenHandlers.verifyToken(token, "access");
        expect(Object.values(payload)).toContain(username);
      });
    });

    describe("token is incorrect", () => {
      it("should throw the CustomError which is instance of Error", async () => {
        token = "123456";
        expect(() => tokenHandlers.verifyToken(token, "access")).toThrow(CustomError);
      });
    });
  });
});
