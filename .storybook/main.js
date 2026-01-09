/** @type { import('@storybook/vue3-webpack5').StorybookConfig } */
const path = require('path');

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/vue3-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  },
  // Static files - maps /assets to src/assets folder
  staticDirs: [
    { from: '../src/assets', to: '/assets' }
  ],
  webpackFinal: async (config) => {
    // Add alias @ for src folder
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, '../src'),
    };

    // Add SCSS support with deprecation warnings silenced
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            sassOptions: {
              quietDeps: true, // Silence warnings from dependencies (Bootstrap)
              silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'mixed-decls'],
            },
          },
        },
      ],
    });
    return config;
  }
};

export default config;