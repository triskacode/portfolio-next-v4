export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-line-length': [0, 'always'],
    'footer-max-line-length': [0, 'always'],
    'header-max-length': [0, 'always'],
    'subject-exclamation-mark': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
  },
}
