import ItemSideNav from "../components/Navbar/ItemSideNav.vue";

export default {
  title: 'Components/Navbar/ItemSideNav',
  component: ItemSideNav,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Item individual untuk Side Navigation. Digunakan dalam SideNavCMS.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label menu item',
    },
    icon: {
      control: 'text',
      description: 'Icon class atau URL',
    },
    path: {
      control: 'text',
      description: 'Path/URL navigasi',
    },
    active: {
      control: 'boolean',
      description: 'Active state',
    },
    children: {
      control: 'object',
      description: 'Sub-menu items',
    },
  },
  args: {
    label: 'Dashboard',
    icon: 'icon-dashboard',
    path: '/dashboard',
    active: false,
  },
};

export const Default = {
  args: {
    label: 'Dashboard',
    icon: 'icon-dashboard',
    path: '/dashboard',
  },
};

export const Active = {
  args: {
    label: 'Dashboard',
    icon: 'icon-dashboard',
    path: '/dashboard',
    active: true,
  },
};

export const WithChildren = {
  args: {
    label: 'Transaksi',
    icon: 'icon-transaction',
    children: [
      { label: 'Gadai Emas', path: '/transaksi/gadai' },
      { label: 'Tabungan', path: '/transaksi/tabungan' },
      { label: 'Kredit', path: '/transaksi/kredit' },
    ],
  },
};
