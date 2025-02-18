/** @type { import('@storybook/vue3').Preview } */

import '../src/assets/scss/g-kit.scss';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
