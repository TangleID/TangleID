module.exports = {
	"parser": "babel-eslint",
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true,
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": "2017",
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "error",
      "tab"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-console": [
      "error",
      { allow: [ "log", "warn", "error" ] }
    ],
    "react/jsx-uses-vars": 2,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
  }
};