module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    env: {
        node: true,
        es6: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/strict',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:n/recommended-module',
        'plugin:security/recommended-legacy',
        'plugin:promise/recommended',
        'prettier',
        'neverthrow/recommended',
    ],
    settings: {
        'import/resolver': {
            typescript: {},
        },
    },
    ignorePatterns: ['node_modules', '*.js'],
    rules: {
        'n/file-extension-in-import': 0,
        'n/no-missing-import': 0,
        'n/no-unpublished-import': 0,
    },
    overrides: [
        {
            files: ['test/**/*.test.ts'],
            env: {
                jest: true,
            },
            extends: ['plugin:jest/recommended'],
            plugins: ['jest'],
            rules: {
                'jest/no-focused-tests': 'error',
            },
        },
    ],
}
