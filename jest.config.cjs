module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
moduleNameMapper: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
  '^@/(.*)$': '<rootDir>/src/$1',
  '^bcryptjs$': '<rootDir>/__mocks__/bcryptjs.cjs',
  '^jsonwebtoken$': '<rootDir>/__mocks__/jsonwebtoken.cjs',
  '^\.\./models/userModel\.js$': '<rootDir>/__mocks__/userModel.mjs'
},

  setupFilesAfterEnv: [
    '@testing-library/jest-dom',
    '<rootDir>/jest.setup.js', // create this file as above
  ],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).cjs',
    '**/?(*.)+(spec|test).mjs'
  ],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
};
