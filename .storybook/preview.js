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
    // Custom backgrounds for preview - Using Design System Colors
    backgrounds: {
      default: 'White',
      values: [
        { name: 'White', value: '#ffffff' },
        { name: 'Black 10', value: '#f8f8f8' },
        { name: 'Black 20', value: '#eeeeef' },
        { name: 'Black 80', value: '#252528' },
        { name: 'Lime 10', value: '#e6f6ea' },
        { name: 'Lime 50', value: '#00ab4e' },
        { name: 'Lime 80', value: '#00662e' },
        { name: 'Gold 10', value: '#fbf7f0' },
        { name: 'Gold 50', value: '#d8b56d' },
        { name: 'Blue 10', value: '#e8f1f9' },
        { name: 'Broccoli 50', value: '#004d43' },
      ],
    },
    // Layout configuration - changed from 'centered' to 'padded' for better component sizing
    layout: 'padded',
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
