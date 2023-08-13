import { Repetition } from "../../src/entity/Repetition";
import { createNewRepetition } from "../../src/services/repetitionService";

describe("repetitionServices test suite", () => {
  describe("createRepetition service suite", () => {
    const saveRepetitionSpy = jest.spyOn(Repetition.prototype, "save");

    const someNewRepetition = {
      content: "someContent",
    };
    const someId = "1234";

    let sut: Repetition;

    beforeEach(() => {
      sut = new Repetition();
      sut.id = someId;
    });

    it("should call save method one time and return repetition id", async () => {
      saveRepetitionSpy.mockResolvedValueOnce(sut);
      const actualId = await createNewRepetition(someNewRepetition.content);
      expect(saveRepetitionSpy).toBeCalledTimes(1);
      expect(actualId).toBe(someId);
    });
  });
});
