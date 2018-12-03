module.exports = {
  root: true,

  env: {
    node: true,
  },

  'extends': [
    'plugin:vue/strongly-recommended',
    // '@vue/airbnb'
  ],

  "rules": {
    "generator-star-spacing": "off",
    "no-mixed-operators": 0,
    "vue/max-attributes-per-line": [
      2,
      {
        "singleline": 5,
        "multiline": {
          "max": 1,
          "allowFirstLine": false
        }
      }
    ],
    "vue/attribute-hyphenation": 0,
    "vue/html-self-closing": 0,
    "no-console": 0
  },

  parserOptions: {
    parser: 'babel-eslint',
  },
};
