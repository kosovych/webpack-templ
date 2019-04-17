module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": "./node_modules/eslint-config-google/index.js",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "require-jsdoc": "off",
        "linebreak-style": "off",
    },
    "parserOptions": {
      "sourceType": "module"
  }
};