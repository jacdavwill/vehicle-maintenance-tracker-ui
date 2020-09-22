module.exports = {
  ignorePatterns: ['static/_nuxt'],
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    '@typescript-eslint/no-unused-vars': 'off', // "no-unused-vars" is currently broken (9/8/2020), but is covered by "noUnusedLocals" and "noUnusedParameters" in tsconfig.json
    'no-unused-vars': 'off',
    'no-trailing-spaces': 'error',
    'prettier/prettier': ['error', { semi: false, singleQuote: true }]
  },
  plugins: ['vuetify', 'prettier']
}
