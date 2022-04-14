module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "requireConfigFile": false,
        "sourceType": "module"
    },
    "rules": {
        "no-undef": "off"
    }
};
