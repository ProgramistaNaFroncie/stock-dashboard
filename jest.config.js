module.exports = {
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss)$": "identity-obj-proxy",
  },
  moduleDirectories: ["node_modules", "src"],
  setupFiles: ["<rootDir>/node_modules/dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js", "jest-localstorage-mock"],
  testEnvironment: "jest-environment-jsdom",
  collectCoverageFrom: ["src/**/*.{ts,tsx}"],
  coveragePathIgnorePatterns: ["!*.scss.d.ts"],
  coverageDirectory: "coverage",
  collectCoverage: true,
  transform: {
    "^.+\\.(ts|tsx)$": [
      "ts-jest",
      {
        babelConfig: true,
      },
    ],
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
