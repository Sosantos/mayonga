import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { isolatedModules: true }],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^~/(.+)": "<rootDir>/src/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
};
export default config;
