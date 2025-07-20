import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';

export default [
  // Ignore patterns
  {
    ignores: [
      'dist',
      'node_modules',
      '.git',
      'coverage',
      '*.min.js',
      'build',
      'public/vite.svg'
    ],
  },
  
  // Base configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2022,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    settings: {
      react: {
        version: '19.0',
      },
    },
  },

  // JavaScript/TypeScript files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      'react': react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ESLint recommended rules
      ...js.configs.recommended.rules,
      
      // React recommended rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      
      // React Hooks rules
      ...reactHooks.configs.recommended.rules,
      
      // React Refresh rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      
      // Custom rules for React 19 + Vite
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/jsx-uses-react': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // Using TypeScript for prop validation
      'react/no-unknown-property': ['error', { ignore: ['css'] }], // Allow emotion css prop
      
      // General JavaScript/TypeScript rules
      'no-unused-vars': ['error', { 
        vars: 'all', 
        args: 'after-used',
        ignoreRestSiblings: true,
        argsIgnorePattern: '^_'
      }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-template': 'error',
      
      // Import/Export rules
      'no-duplicate-imports': 'error',
      
      // Performance rules
      'react-hooks/exhaustive-deps': 'warn',
      
      // Accessibility rules (basic)
      'jsx-a11y/alt-text': 'off', // Can be enabled if jsx-a11y plugin is added
    },
  },

  // Configuration files
  {
    files: ['**/*.config.{js,ts}', 'vite.config.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Test files (if any)
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.vitest,
      },
    },
    rules: {
      'no-console': 'off',
    },
  },
]; 
