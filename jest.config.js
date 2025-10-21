module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.js'],
  setupFiles: ['<rootDir>/src/tests/testUtils.js'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1'
  },
  testMatch: [
    '<rootDir>/src/tests/**/*.spec.js',
    '<rootDir>/src/tests/**/*.test.js'
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/tests/setupTests.js',
    '!src/**/*.stories.{js,jsx}',
    '!src/tests/**',
    '!src/**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  },
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(bootstrap|bootstrap-icons)/)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json'],
  testTimeout: 10000,
  verbose: true,
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  globals: {
    'ts-jest': {
      useESM: true
    }
  },
  testEnvironmentOptions: {
    url: 'http://localhost'
  }
};
