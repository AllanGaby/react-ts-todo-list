module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!**/factories/**',
    '!**/routes/**',
    '!**/hooks/**',
    '!**/protocols/**',
    '!**/entities/**',
    '!**/errors/**',
    '!**/mocks/**',
    '!**/index.{ts,tsx}',
    '!**/*.styles.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.styles.ts$': 'identity-obj-proxy'
  }
}
