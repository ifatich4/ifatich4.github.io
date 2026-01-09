import { addons } from '@storybook/manager-api';
import pegadaianTheme from './pegadaianTheme';
import './storybook-custom.css';

addons.setConfig({
  theme: pegadaianTheme,
  // Sidebar configuration
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  // Toolbar configuration  
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
