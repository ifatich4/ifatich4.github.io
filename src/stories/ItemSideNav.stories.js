import ItemSideNav from "../components/Navbar/ItemSideNav.vue";

export default {
  title: 'Components/Navigation/ItemSideNav',
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
    item: {
      control: 'object',
      description: 'Object menu item dengan label, icon, href, dan children',
    },
    level: {
      control: { type: 'number', min: 1, max: 3 },
      description: 'Level kedalaman menu (1-3)',
    },
    containerOpened: {
      control: 'boolean',
      description: 'Apakah container sidebar dalam keadaan terbuka',
    },
  },
  args: {
    item: {
      label: 'Dashboard',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
      href: '/dashboard',
    },
    level: 1,
    containerOpened: true,
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 280px; background: #fff; border: 1px solid #eee; border-radius: 8px;">
          <ul style="list-style: none; margin: 0; padding: 8px 0;">
            <story />
          </ul>
        </div>
      `,
    }),
  ],
};

export const Default = {
  args: {
    item: {
      label: 'Dashboard',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>',
      href: '/dashboard',
    },
    level: 1,
    containerOpened: true,
  },
};

export const WithChildren = {
  args: {
    item: {
      label: 'Transaksi',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H6v-2h6v2zm4-4H6v-2h10v2zm0-4H6V7h10v2z"/></svg>',
      children: [
        { label: 'Gadai Emas', href: '/transaksi/gadai' },
        { label: 'Tabungan', href: '/transaksi/tabungan' },
        { label: 'Kredit', href: '/transaksi/kredit' },
      ],
    },
    level: 1,
    containerOpened: true,
  },
};

export const NestedChildren = {
  args: {
    item: {
      label: 'Produk',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>',
      children: [
        { 
          label: 'Emas',
          children: [
            { label: 'Gadai Emas', href: '/produk/emas/gadai' },
            { label: 'Tabungan Emas', href: '/produk/emas/tabungan' },
          ]
        },
        { label: 'Pembiayaan', href: '/produk/pembiayaan' },
      ],
    },
    level: 1,
    containerOpened: true,
  },
};

export const CollapsedContainer = {
  args: {
    item: {
      label: 'Settings',
      icon: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>',
      href: '/settings',
    },
    level: 1,
    containerOpened: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Tampilan saat sidebar dalam keadaan collapsed/tertutup',
      },
    },
  },
};
