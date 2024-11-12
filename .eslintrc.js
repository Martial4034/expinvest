module.exports = {
  // ...
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { 
      varsIgnorePattern: '^_',
      argsIgnorePattern: '^_' 
    }],
    '@next/next/no-img-element': 'warn'
  }
} 