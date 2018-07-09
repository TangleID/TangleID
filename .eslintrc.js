module.exports = {
  "extends": ["eslint:recommended", "airbnb"],
  "plugins": ["react"],
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true,
  },
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": "2017",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    },
    "sourceType": "module"
  },
  "rules": {
    "no-console": ["error", { allow: [ "log", "warn", "error" ] }],
    "no-restricted-syntax": [0], // allow using JavaScript features and syntax
    "no-plusplus": [0], // allow using ++ and -- operators
    "no-param-reassign": ["error", { "props": false }], // allow to modify parameter properties
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0],
    "react/require-default-props": [0],
    "jsx-a11y/anchor-is-valid": [0], // NextJS Link need to contain a hyperlink
    "react/prefer-stateless-function": [0],
  }
};