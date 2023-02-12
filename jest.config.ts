import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig: JestConfigWithTsJest = {
  errorOnDeprecated: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageProvider: 'v8',
  coverageDirectory: './coverage',
  moduleNameMapper: {
    '^@lib/(.*).js$': '<rootDir>/src/lib/$1',
  },
};

export default jestConfig;
