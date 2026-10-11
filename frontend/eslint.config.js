// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        { type: 'attribute', prefix: 'll', style: 'camelCase' },
      ],
      // Element components are kebab-case (ll-top-bar); attribute components on native elements
      // are camelCase (a[llButton]), see docs/specs/components.
      '@angular-eslint/component-selector': [
        'error',
        { type: 'element', prefix: 'll', style: 'kebab-case' },
      ],
      '@angular-eslint/component-max-inline-declarations': [
        'error',
        { template: 0, styles: 0, animations: 0 },
      ],
      '@angular-eslint/prefer-on-push-component-change-detection': 'error',
    },
  },
  {
    // Library selectors are fixed by the CRDs in docs/specs/components: element components are
    // kebab-case (ll-top-bar) and attribute components on native elements are camelCase
    // (a[llButton], svg[llIcon]), which this rule cannot express in one configuration.
    files: ['projects/components/**/*.ts'],
    rules: { '@angular-eslint/component-selector': 'off' },
  },
  {
    files: ['**/*.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {},
  },
);
