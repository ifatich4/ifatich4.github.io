/** @type { import('@storybook/vue3').Preview } */
import { setup } from '@storybook/vue3';
import { BootstrapVueNext } from 'bootstrap-vue-next';
import Vue3Toastify from 'vue3-toastify';
import pegadaianTheme from './pegadaianTheme';

// Import styles - same as main.js
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import 'vue3-toastify/dist/index.css';
import '../src/assets/scss/g-kit.scss';

// Setup Vue plugins
setup((app) => {
  app.use(BootstrapVueNext);
  app.use(Vue3Toastify, {
    autoClose: 3000,
    theme: 'colored',
    position: 'top-right'
  });
});

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    docs: {
      toc: true,
      theme: pegadaianTheme,
    },
    // Custom backgrounds for preview
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'soft', value: '#F8FAFB' },
        { name: 'gray', value: '#E5E9EB' },
        { name: 'dark', value: '#1F2933' },
        { name: 'pegadaian-green', value: '#00703C' },
        { name: 'pegadaian-gold', value: '#FFD700' },
      ],
    },
    // Layout configuration
    layout: 'centered',
    // Viewport presets
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' },
        },
        tablet: {
          name: 'Tablet',
          styles: { width: '768px', height: '1024px' },
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1280px', height: '800px' },
        },
        wide: {
          name: 'Wide Desktop',
          styles: { width: '1920px', height: '1080px' },
        },
      },
    },
    // Options
    options: {
      storySort: {
        order: [
          'Introduction',
          'Getting Started',
          'Components',
          ['Button', 'Input', 'Card', 'Modal', 'Navbar', 'Table', 'Chart', '*'],
          'Utilities',
          '*',
        ],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
