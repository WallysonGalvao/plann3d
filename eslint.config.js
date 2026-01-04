//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'
import prettier from 'eslint-config-prettier'
import unusedImports from 'eslint-plugin-unused-imports'

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/.output/**',
      '**/.husky/**',
      '**/*.gen.ts',
      '**/routeTree.gen.ts',
      '**/.cache/**',
      '**/coverage/**',
      'eslint.config.js',
      'prettier.config.js',
      'vite.config.ts',
      'vitest.config.ts',
    ],
  },
  ...tanstackConfig,
  prettier,
  {
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-shadow': 'off',

      // Unused imports plugin
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
]
