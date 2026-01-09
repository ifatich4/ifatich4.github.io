// @ts-nocheck
import { create } from '@storybook/theming/create';

const colors = {
  // Lime (Primary Green)
  lime90: '#00441f',
  lime80: '#00662e',
  lime60: '#00883e',
  lime50: '#00ab4e', // Primary
  lime40: '#40bd63',
  lime20: '#99dcab',
  lime10: '#e6f6ea',

  // Broccoli (Dark Green)
  broccoli90: '#001e1a',
  broccoli80: '#002e28',
  broccoli60: '#003d35',
  broccoli50: '#004d43',

  // Gold
  gold90: '#56482b',
  gold80: '#816c41',
  gold60: '#ac9057',
  gold50: '#d8b56d',
  gold40: '#e1c791',
  gold20: '#efe1c4',
  gold10: '#fbf7f0',

  // Black (Neutral)
  black80: '#252528',
  black60: '#58585b',
  black50: '#939597',
  black40: '#bbbdc0',
  black20: '#eeeeef',
  black10: '#f8f8f8',

  // Blue
  blue50: '#1868ab',
  blue10: '#e8f1f9',

  // Red
  red50: '#ae1e22',
  red10: '#f9e7e8',

  // White
  white: '#ffffff',
};

export default create({
  base: 'light',

  // Brand
  brandTitle: 'Pegadaian UI Kit',
  brandUrl: 'https://pegadaian.co.id',
  brandImage: '/assets/images/logo-pegadaian.svg',
  brandTarget: '_self',

  // Color palette - Using Lime (Primary) from Design System
  colorPrimary: colors.lime50,
  colorSecondary: colors.lime60,

  // UI colors
  appBg: colors.black10,
  appContentBg: colors.white,
  appPreviewBg: colors.white,
  appBorderColor: colors.black20,
  appBorderRadius: 8,

  // Fonts
  fontBase: '"Inter", "Segoe UI", "Roboto", sans-serif',
  fontCode: '"JetBrains Mono", "Fira Code", monospace',

  // Text colors - Using Black palette
  textColor: colors.black80,
  textInverseColor: colors.white,
  textMutedColor: colors.black60,

  // Toolbar default and active colors
  barTextColor: colors.black60,
  barSelectedColor: colors.lime50,
  barHoverColor: colors.lime60,
  barBg: colors.white,

  // Form colors
  inputBg: colors.white,
  inputBorder: colors.black40,
  inputTextColor: colors.black80,
  inputBorderRadius: 6,

  // Button colors
  buttonBg: colors.lime50,
  buttonBorder: colors.lime60,

  // Boolean (toggle) colors  
  booleanBg: colors.black20,
  booleanSelectedBg: colors.lime50,
});