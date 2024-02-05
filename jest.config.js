module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-expect-message", "jest-extended"],
  reporters: ['summary','<rootDir>/.config/utils/JestReporters/CustomReporter.js' ]
};
