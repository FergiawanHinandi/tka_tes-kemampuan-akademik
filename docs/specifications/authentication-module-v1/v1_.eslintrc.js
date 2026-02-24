// ============================================================
// ESLINT CONFIG (Root)
// ============================================================
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  rules: {
    // Enforce naming conventions
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'class', format: ['PascalCase'] },
      { selector: 'interface', format: ['PascalCase'] },
      { selector: 'typeAlias', format: ['PascalCase'] },
      { selector: 'enum', format: ['PascalCase'] },
      { selector: 'enumMember', format: ['UPPER_CASE'] },
      { selector: 'variable', format: ['camelCase', 'UPPER_CASE', 'PascalCase'] },
      { selector: 'function', format: ['camelCase'] },
      { selector: 'method', format: ['camelCase'] },
      { selector: 'parameter', format: ['camelCase'] },
    ],

    // No unused variables
    '@typescript-eslint/no-unused-vars': 'error',
    'unused-imports/no-unused-imports': 'error',

    // No console.log in production code
    'no-console': ['warn', { allow: ['warn', 'error'] }],

    // Enforce import order
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],

    // No any type
    '@typescript-eslint/no-explicit-any': 'warn',

    // Enforce return types on public methods
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowExpressions: true },
    ],

    // Max file length
    'max-lines': ['warn', { max: 400, skipBlankLines: true, skipComments: true }],

    // Max function length
    'max-lines-per-function': ['warn', { max: 50, skipBlankLines: true, skipComments: true }],
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js', 'prisma/'],
};