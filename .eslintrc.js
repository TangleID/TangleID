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
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/forbid-prop-types": [0],
    "react/require-default-props": [0],
  }
};