import SideNavCMS from "../components/Navbar/SideNavCMS.vue";
import { ref } from 'vue';

export default {
  title: 'Components/Navbar/SideNavCMS',
  component: SideNavCMS,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Side Navigation component untuk CMS/Admin dashboard dengan support nested menu, search filter, dan collapse state.',
      },
    },
    layout: 'fullscreen',
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array menu items dengan struktur label, icon, dan children',
    },
    filter: {
      control: 'boolean',
      description: 'Tampilkan input pencarian menu',
    },
    placeholderFilter: {
      control: 'text',
      description: 'Placeholder untuk input pencarian',
    },
    opened: {
      control: 'boolean',
      description: 'State awal sidebar (expanded/collapsed)',
    },
  },
  args: {
    items: [
      {
        label: 'Dashboard',
        icon: 'icon-dashboard',
        path: '/dashboard',
      },
      {
        label: 'Transaksi',
        icon: 'icon-transaction',
        children: [
          { label: 'Gadai Emas', path: '/transaksi/gadai-emas' },
          { label: 'Tabungan Emas', path: '/transaksi/tabungan-emas' },
          { label: 'Kredit', path: '/transaksi/kredit' },
        ],
      },
      {
        label: 'Laporan',
        icon: 'icon-report',
        children: [
          { label: 'Laporan Harian', path: '/laporan/harian' },
          { label: 'Laporan Bulanan', path: '/laporan/bulanan' },
        ],
      },
      {
        label: 'Pengaturan',
        icon: 'icon-settings',
        path: '/pengaturan',
      },
    ],
    filter: true,
    placeholderFilter: 'Cari menu...',
    opened: true,
  },
};

export const Default = {
  render: (args) => ({
    components: { SideNavCMS },
    setup() {
      const selectedMenu = ref('');
      return { args, selectedMenu };
    },
    template: `
      <div style="display: flex; min-height: 400px;">
        <SideNavCMS v-bind="args" v-model="selectedMenu">
          <template #logo>
            <img src="/assets/images/logo-pegadaian.svg" alt="Logo" style="height: 32px;" />
          </template>
        </SideNavCMS>
        <div style="flex: 1; padding: 24px;">
          <h3>Content Area</h3>
          <p>Selected Menu: {{ selectedMenu || 'None' }}</p>
        </div>
      </div>
    `,
  }),
};

export const WithFilter = {
  render: (args) => ({
    components: { SideNavCMS },
    setup() {
      const selectedMenu = ref('');
      return { args, selectedMenu };
    },
    template: `
      <div style="display: flex; min-height: 400px;">
        <SideNavCMS v-bind="args" v-model="selectedMenu">
          <template #logo>
            <img src="/assets/images/logo-pegadaian.svg" alt="Logo" style="height: 32px;" />
          </template>
        </SideNavCMS>
        <div style="flex: 1; padding: 24px;">
          <h3>Content Area</h3>
          <p>Gunakan input filter untuk mencari menu</p>
        </div>
      </div>
    `,
  }),
  args: {
    filter: true,
    placeholderFilter: 'Cari menu...',
  },
};

export const WithoutFilter = {
  render: (args) => ({
    components: { SideNavCMS },
    setup() {
      const selectedMenu = ref('');
      return { args, selectedMenu };
    },
    template: `
      <div style="display: flex; min-height: 400px;">
        <SideNavCMS v-bind="args" v-model="selectedMenu">
          <template #logo>
            <img src="/assets/images/logo-pegadaian.svg" alt="Logo" style="height: 32px;" />
          </template>
        </SideNavCMS>
        <div style="flex: 1; padding: 24px;">
          <h3>Content Area</h3>
        </div>
      </div>
    `,
  }),
  args: {
    filter: false,
  },
};

export const Collapsed = {
  render: (args) => ({
    components: { SideNavCMS },
    setup() {
      const selectedMenu = ref('');
      return { args, selectedMenu };
    },
    template: `
      <div style="display: flex; min-height: 400px;">
        <SideNavCMS v-bind="args" v-model="selectedMenu">
          <template #logo>
            <img src="/assets/images/logo-pegadaian.svg" alt="Logo" style="height: 32px;" />
          </template>
        </SideNavCMS>
        <div style="flex: 1; padding: 24px;">
          <h3>Content Area</h3>
          <p>Sidebar dimulai dalam keadaan collapsed. Klik ikon hamburger untuk expand.</p>
        </div>
      </div>
    `,
  }),
  args: {
    opened: false,
  },
};

export const NestedMenu = {
  render: (args) => ({
    components: { SideNavCMS },
    setup() {
      const selectedMenu = ref('');
      return { args, selectedMenu };
    },
    template: `
      <div style="display: flex; min-height: 500px;">
        <SideNavCMS v-bind="args" v-model="selectedMenu">
          <template #logo>
            <img src="/assets/images/logo-pegadaian.svg" alt="Logo" style="height: 32px;" />
          </template>
        </SideNavCMS>
        <div style="flex: 1; padding: 24px;">
          <h3>Menu dengan Nested Children</h3>
          <p>Klik pada menu untuk expand submenu</p>
        </div>
      </div>
    `,
  }),
  args: {
    items: [
      {
        label: 'Master Data',
        icon: 'icon-database',
        children: [
          { 
            label: 'Produk', 
            children: [
              { label: 'Gadai', path: '/master/produk/gadai' },
              { label: 'Tabungan', path: '/master/produk/tabungan' },
              { label: 'Kredit', path: '/master/produk/kredit' },
            ]
          },
          { 
            label: 'Wilayah', 
            children: [
              { label: 'Provinsi', path: '/master/wilayah/provinsi' },
              { label: 'Kota', path: '/master/wilayah/kota' },
              { label: 'Cabang', path: '/master/wilayah/cabang' },
            ]
          },
        ],
      },
      {
        label: 'Manajemen User',
        icon: 'icon-users',
        children: [
          { label: 'Daftar User', path: '/user/list' },
          { label: 'Role & Permission', path: '/user/roles' },
        ],
      },
    ],
    filter: true,
  },
};
