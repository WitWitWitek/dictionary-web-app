import { corsOptions } from "@/config/corsOptions";

const corsCallback = jest.fn();
const origin = "http://localhost:5173";

describe("Cors options test suite", () => {
  it("should be called with an Error object when origin is not allowed", () => {
    corsOptions.origin("someWrongOrigin", corsCallback);
    expect(corsCallback).toBeCalledWith(new Error("Not allowed by CORS"));
  });

  it("should be called with arguments: null and true when origin is allowed", () => {
    corsOptions.origin(origin, corsCallback);
    expect(corsCallback).toBeCalledWith(null, true);
  });
});
