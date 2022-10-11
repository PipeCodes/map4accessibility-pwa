module.exports = {
    env: {
      es6: true,
    },
    extends: ['airbnb', 'prettier'],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
      __DEV__: 'readonly',
    },
    parser: '@babel/eslint-parser',
    parserOptions: {
      requireConfigFile: false,
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
      "react/function-component-definition": [
        2,
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.jsx', '.js'],
        },
      ],
      'default-param-last': 'off',
      'global-require': 'off',
      'no-param-reassign': 'off',
      'import/prefer-default-export': 'off',
      'react/prop-types': 'off',
      'no-shadow': 'off',
      'no-restricted-globals': 'off',
      'react/no-array-index-key': 'off',
      'no-nested-ternary': 'off',
      'no-underscore-dangle': 'off',
      'no-plusplus': 'off',
      'no-continue': 'off',
      'prefer-destructuring': 'off',
      'import/no-extraneous-dependencies': 'off',
      'react/forbid-prop-types': 'off',
      'prefer-promise-reject-errors': 'off',
      'no-debugger': 'off',
      'no-unused-vars': 'warn',
      'consistent-return': 'off',
      'no-alert': 'off',
      'no-unused-expressions': [
        'error',
        {
          allowTaggedTemplates: true,
        },
      ],
    },
  };
