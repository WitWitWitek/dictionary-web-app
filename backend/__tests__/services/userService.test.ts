import { User } from "../../src/entity/User";
import { createUser } from "../../src/services/userService";
import * as iconvLite from "iconv-lite";
iconvLite.encodingExists("foo");

const saveUserMock = jest.fn();

jest.mock("../../src/entity/User", () => ({
  User: jest.fn().mockImplementation(() => {
    return {
      save: saveUserMock,
    };
  }),
}));
describe("userServices test suite", () => {
  describe("createUser service suite", () => {
    const someNewUser = {
      username: "someUserName",
      password: "somePassword",
      email: "someemail@email.com",
    };
    const someId = "1234";

    let sut: User;

    beforeEach(() => {
      sut = new User();
      sut.id = someId;
      saveUserMock.mockResolvedValueOnce(sut);
    });

    it("should call save method one time and return user id", async () => {
      const actualId = await createUser(someNewUser);
      expect(saveUserMock).toBeCalledTimes(1);
      expect(actualId).toBe(someId);
    });
  });
});
