import { User } from "../../src/entity/User";
import { createUser } from "../../src/services/userService";

describe("userServices test suite", () => {
  describe("createUser service suite", () => {
    const saveUserSpy = jest.spyOn(User.prototype, "save");

    const someNewUser = {
      username: "someUserName",
      password: "somePassword",
    };
    const someId = "1234";

    let sut: User;

    beforeEach(() => {
      sut = new User();
      sut.id = someId;
    });

    it("should call save method one time and return user id", async () => {
      saveUserSpy.mockResolvedValueOnce(sut);
      const actualId = await createUser(someNewUser);
      expect(saveUserSpy).toBeCalledTimes(1);
      expect(actualId).toBe(someId);
    });
  });
});
