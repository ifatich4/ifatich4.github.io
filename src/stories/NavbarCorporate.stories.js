import NavbarCorporate from "../components/Navbar/NavbarCorporate.vue";

export default {
  title: 'Components/Navbar/NavbarCorporate',
  component: NavbarCorporate,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Navbar Corporate untuk website utama Pegadaian dengan menu, language switcher, dan login options.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL logo',
    },
    items: {
      control: 'object',
      description: 'Array menu items dengan icon, label, dan action',
    },
  },
  args: {
    image: '/assets/images/logo-pegadaian.svg',
    items: [
      { icon: '/assets/images/ico-gadai.svg', label: 'Gadai', action: '/gadai' },
      { icon: '/assets/images/ico-tabungan.svg', label: 'Tabungan Emas', action: '/tabungan-emas' },
      { icon: '/assets/images/ico-pembiayaan.svg', label: 'Pembiayaan', action: '/pembiayaan' },
    ],
  },
};

export const Default = {
  args: {
    image: '/assets/images/logo-pegadaian.svg',
    items: [
      { icon: '/assets/images/ico-gadai.svg', label: 'Gadai', action: '/gadai' },
      { icon: '/assets/images/ico-tabungan.svg', label: 'Tabungan Emas', action: '/tabungan-emas' },
      { icon: '/assets/images/ico-pembiayaan.svg', label: 'Pembiayaan', action: '/pembiayaan' },
      { icon: '/assets/images/ico-invest-emas.svg', label: 'Investasi', action: '/investasi' },
    ],
  },
  decorators: [
    () => ({
      template: `
        <div style="min-height: 300px;">
          <story />
        </div>
      `,
    }),
  ],
};

export const WithFullMenu = {
  args: {
    image: '/assets/images/logo-pegadaian.svg',
    items: [
      { icon: '/assets/images/ico-gadai.svg', label: 'Gadai', action: '/gadai' },
      { icon: '/assets/images/ico-tabungan.svg', label: 'Tabungan Emas', action: '/tabungan-emas' },
      { icon: '/assets/images/ico-pembiayaan.svg', label: 'Pembiayaan', action: '/pembiayaan' },
      { icon: '/assets/images/ico-invest-emas.svg', label: 'Investasi', action: '/investasi' },
      { icon: '/assets/images/ico-cicil-emas.svg', label: 'Cicil Emas', action: '/cicil-emas' },
      { icon: '/assets/images/ico-pembayaran-no-bg.svg', label: 'Pembayaran', action: '/pembayaran' },
    ],
  },
  decorators: [
    () => ({
      template: `
        <div style="min-height: 300px;">
          <story />
        </div>
      `,
    }),
  ],
};
