import { defineConfig, globalIgnores } from 'eslint/config';

import js from '@eslint/js';
import css from '@eslint/css';
import ts from 'typescript-eslint';

import pluginReact from 'eslint-plugin-react';
import pluginCompat from 'eslint-plugin-compat';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';

import configPrettier from 'eslint-config-prettier/flat';

import globals from 'globals';

export default defineConfig(
  globalIgnores(['dist/', 'node_modules/']),
  {
    files: ['**/*.{js,cjs,mjs,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.greasemonkey,
        ...globals.worker,
        ...globals.jquery,
      },
      parserOptions: {
        project: './tsconfig.eslint.json',
      },
    },
  },
  {
    files: ['**/*.{js,cjs,mjs,jsx}'],
    extends: [js.configs.recommended, pluginCompat.configs['flat/recommended']],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ts.configs.recommendedTypeCheckedOnly.map((config) => ({
        ...config,
        rules: config.rules
          ? Object.fromEntries(
              Object.entries(config.rules).map(([key, value]) => [
                key,
                value === 'error' ? 'warn' : value,
              ]),
            )
          : {},
      })),
      ts.configs.recommended,
      pluginCompat.configs['flat/recommended'],
    ],
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'unused-imports/no-unused-imports': 'warn',
    },
  },
  {
    files: ['**/*.{jsx,tsx}'],
    extends: [
      pluginReact.configs.flat.recommended,
      pluginReactHooks.configs.flat.recommended,
    ],
    rules: {
      'react/react-in-jsx-scope': 'off', // for preact
    },
    plugins: {
      react: pluginReact,
    },
    settings: {
      react: {
        version: '18',
      },
    },
  },
  {
    files: ['**/*.css'],
    plugins: { css },
    language: 'css/css',
    extends: [css.configs.recommended],
    rules: {
      'css/use-baseline': [
        'warn',
        {
          available: 'newly',
        },
      ],
    },
  },
  configPrettier,
);
