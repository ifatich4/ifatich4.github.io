import { create } from '@storybook/theming/create';

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Pegadaian UI Kit',
  brandUrl: 'https://pegadaian.co.id',
  brandImage: '/assets/images/logo-pegadaian.svg',
  brandTarget: '_self',

  // Color palette - Pegadaian Green theme
  colorPrimary: '#00703C',
  colorSecondary: '#00703C',

  // UI colors
  appBg: '#F8FAFB',
  appContentBg: '#FFFFFF',
  appPreviewBg: '#FFFFFF',
  appBorderColor: '#E5E9EB',
  appBorderRadius: 8,

  // Fonts
  fontBase: '"Inter", "Segoe UI", "Roboto", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',

  // Text colors
  textColor: '#1F2933',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#6B7D8A',

  // Toolbar default and active colors
  barTextColor: '#52606D',
  barSelectedColor: '#00703C',
  barHoverColor: '#00703C',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#CBD5E0',
  inputTextColor: '#1F2933',
  inputBorderRadius: 6,

  // Button colors
  buttonBg: '#00703C',
  buttonBorder: '#00703C',

  // Boolean (toggle) colors  
  booleanBg: '#E2E8F0',
  booleanSelectedBg: '#00703C',
});
