import type { Config } from "@jest/types";

const sourceDir = "<rootDir>/src";
const testsDir = "<rootDir>/__tests__";
// const testsDir = "<rootDir>/__tests__/controllers/userController.test.ts";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "node",
  collectCoverage: true,
  collectCoverageFrom: [`${sourceDir}/**/*.ts`],
  testMatch: [`${testsDir}/**/*test.ts`],
  // testMatch: [testsDir],
};

export default config;
