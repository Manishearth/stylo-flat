"use strict";

module.exports = { // eslint-disable-line no-undef
  "extends": [
    "../../.eslintrc.js"
  ],

  "globals": {
    "Components": true,
    "dump": true,
    "Iterator": true
  },

  "env": { "browser": true },

  "rules": {
    "block-scoped-var": 2,
    // "brace-style": [1, "1tbs", {"allowSingleLine": true}],
    "comma-dangle": 0,
    "comma-spacing": [1, {"before": false, "after": true}],
    "comma-style": [1, "last"],
    // "complexity": 1,
    "consistent-return": 2,
    //"curly": 2,
    "dot-notation": 2,
    "eol-last": 2,
    "indent": [1, 2, {"SwitchCase": 1}],
    // "key-spacing": [1, {"beforeColon": false, "afterColon": true}],
    "keyword-spacing": 1,
    "max-nested-callbacks": [2, 3],
    "new-parens": 2,
    "no-array-constructor": 2,
    "no-cond-assign": 2,
    "no-control-regex": 2,
    "no-debugger": 2,
    "no-delete-var": 2,
    "no-dupe-args": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-else-return": 2,
    "no-eval": 2,
    "no-extend-native": 2,
    // "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-semi": 1,
    "no-fallthrough": ["error", { "commentPattern": ".*[Ii]ntentional(?:ly)?\\s+fall(?:ing)?[\\s-]*through.*" }],
    "no-lonely-if": 2,
    "no-mixed-spaces-and-tabs": 2,
    "no-multi-spaces": 1,
    "no-multi-str": 1,
    "no-native-reassign": 2,
    "no-nested-ternary": 2,
    "no-redeclare": 2,
    "no-return-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-shadow": 1,
    "no-shadow-restricted-names": 2,
    // "no-spaced-func": 1,
    "no-throw-literal": 2,
    "no-trailing-spaces": 2,
    "no-undef": 2,
    "no-unneeded-ternary": 2,
    "no-unreachable": 2,
    "no-unused-vars": ["error", { "varsIgnorePattern": "^C[ciur]$" }],
    "no-with": 2,
    "padded-blocks": [1, "never"],
    "quotes": ["error", "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
    "semi": [2, "always", {"omitLastInOneLineBlock": true }],
    "semi-spacing": [1, {"before": false, "after": true}],
    "space-before-blocks": [1, "always"],
    // "space-before-function-paren": [1, "never"],
    "space-in-parens": [1, "never"],
    "space-infix-ops": [1, {"int32Hint": true}],
    // "space-unary-ops": [1, { "words": true, "nonwords": false }],
    "strict": [2, "global"],
    "use-isnan": 2,
    "valid-typeof": 2,
    "yoda": 2
  }
};
