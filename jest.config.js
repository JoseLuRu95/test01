module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  // "setupFiles": ["./tests/indexLocal.js"],
  // "setupFilesAfterEnv": ["./tests/index.js"],
  "setupFiles": ["./tests/index.js"],
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  "transform": {
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
}