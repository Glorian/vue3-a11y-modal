module.exports = {
  moduleFileExtensions: ["js", "vue", "json"],
  setupFilesAfterEnv: ["<rootDir>/tests/unit/testSetup.js"],
  transform: {
    "^.+\\.vue$": "vue-jest",
  },
};
