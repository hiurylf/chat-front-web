module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': ['<rootDir>/src/app/*'],
    '@services/(.*)': ['<rootDir>/src/app/services/$1'],
    '@components/(.*)': ['<rootDir>/src/app/components/$1'],
    '@interfaces/(.*)': ['<rootDir>/src/app/interfaces/$1'],
    '@pages/(.*)': ['<rootDir>/src/app/pages/$1'],
    '@store/(.*)': ['<rootDir>/src/app/store/$1'],
    '@directives/(.*)': ['<rootDir>/src/app/directives/$1'],
  },
};
