import NavbarCorporate from "../components/Navbar/NavbarCorporate.vue";

export default {
  title: 'Components/Navigation/NavbarCorporate',
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
      description: 'URL logo Pegadaian',
    },
    items: {
      control: 'object',
      description: 'Array menu items dengan icon, label, action dan child items',
    },
    searchHandler: {
      action: 'searched',
      description: 'Handler function untuk search',
    },
  },
  args: {
    image: '/assets/images/logo-pegadaian-small.svg',
    items: [
      {
        label: 'Kerjasama',
        action: '/kerjasama',
        icon: '/assets/images/world.svg',
        child: null,
      },
      {
        label: 'Promo',
        action: '/promo',
        icon: '/assets/images/bag-dark.svg',
        child: null,
      },
      {
        label: 'Artikel',
        action: '/artikel',
        icon: '',
        child: [
          { label: 'Emas', action: '/artikel/emas' },
          { label: 'Inspirasi', action: '/artikel/inspirasi' },
          { label: 'Wirausaha', action: '/artikel/wirausaha' },
        ],
      },
      {
        label: 'Acara',
        action: '/acara',
        child: null,
      },
      {
        label: 'Simulasi',
        action: '/simulasi',
        child: [
          { label: 'Harga Emas Batangan', action: '/simulasi/harga-emas' },
          { label: 'Simulasi Tabungan Emas', action: '/simulasi/tabungan-emas' },
        ],
      },
    ],
  },
  decorators: [
    () => ({
      template: `
        <div style="min-height: 400px; background: #f8f8f8;">
          <story />
        </div>
      `,
    }),
  ],
};

export const Default = {};

export const WithMinimalMenu = {
  args: {
    image: '/assets/images/logo-pegadaian-small.svg',
    items: [
      {
        label: 'Kerjasama',
        action: '/kerjasama',
        icon: '/assets/images/world.svg',
        child: null,
      },
      {
        label: 'Promo',
        action: '/promo',
        icon: '/assets/images/bag-dark.svg',
        child: null,
      },
    ],
  },
};

export const WithSubmenu = {
  args: {
    image: '/assets/images/logo-pegadaian-small.svg',
    items: [
      {
        label: 'Produk',
        action: '/produk',
        icon: '',
        child: [
          { label: 'Gadai Emas', action: '/produk/gadai-emas' },
          { label: 'Tabungan Emas', action: '/produk/tabungan-emas' },
          { label: 'Cicil Emas', action: '/produk/cicil-emas' },
        ],
      },
      {
        label: 'Layanan',
        action: '/layanan',
        icon: '',
        child: [
          { label: 'Jasa Taksiran', action: '/layanan/taksiran' },
          { label: 'Jasa Titipan', action: '/layanan/titipan' },
        ],
      },
      {
        label: 'Tentang Kami',
        action: '/tentang',
        child: null,
      },
    ],
  },
};
