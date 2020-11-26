module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    '**/tests/unit/**/*.(spec|test).(js|jsx|ts|tsx)|**/__tests__/**/*.(js|jsx|ts|tsx)'
  ],
  collectCoverageFrom: ["**/*.vue", "!**/node_modules/**"],
  testPathIgnorePatterns:[
    '\.eslintrc\.js'
  ]
}
