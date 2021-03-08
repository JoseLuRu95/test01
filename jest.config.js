module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  "setupFilesAfterEnv": ["./tests/index.js"],
  // "setupFiles": ["./tests/unit/index.js"],
  "moduleFileExtensions": [
    "js",
    "json",
    "vue"
  ],
  "transform": {
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest"
  },
}