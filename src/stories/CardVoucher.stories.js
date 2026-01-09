import CardVoucher from "../components/Card/CardVoucher.vue";

export default {
  title: 'Components/Card/CardVoucher',
  component: CardVoucher,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Voucher untuk menampilkan informasi voucher/kupon dengan gambar, judul, masa berlaku dan tombol aksi.',
      },
    },
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL gambar voucher',
    },
    title: {
      control: 'text',
      description: 'Judul/nama voucher',
    },
    subtitle: {
      control: 'text',
      description: 'Masa berlaku voucher',
    },
    target: {
      control: 'text',
      description: 'URL detail voucher',
    },
    linkText: {
      control: 'text',
      description: 'URL aksi gunakan voucher',
    },
  },
  args: {
    image: '/assets/images/voucher-active.png',
    title: 'Diskon Beli Emas hingga Rp 300.000',
    subtitle: 'Berlaku hingga 31 Okt 2024',
    target: '#',
    linkText: '#',
  },
};

export const Active = {
  args: {
    image: '/assets/images/voucher-active.png',
    title: 'Diskon Beli Emas hingga Rp 300.000',
    subtitle: 'Berlaku hingga 31 Okt 2024',
    target: '#',
    linkText: '#',
  },
};

export const DiskonAdmin = {
  args: {
    image: '/assets/images/voucher-active.png',
    title: 'Gratis Biaya Admin Tabungan Emas',
    subtitle: 'Berlaku hingga 15 Des 2024',
    target: '#',
    linkText: '#',
  },
};

export const Cashback = {
  args: {
    image: '/assets/images/voucher-active.png',
    title: 'Cashback 10% untuk Transaksi Gadai',
    subtitle: 'Berlaku hingga 28 Feb 2025',
    target: '#',
    linkText: '#',
  },
};

// Multiple vouchers
export const VoucherList = {
  render: () => ({
    components: { CardVoucher },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px; max-width: 400px;">
        <CardVoucher 
          image="/assets/images/voucher-active.png"
          title="Diskon Beli Emas hingga Rp 300.000"
          subtitle="Berlaku hingga 31 Okt 2024"
          target="#"
          linkText="#"
        />
        <CardVoucher 
          image="/assets/images/voucher-active.png"
          title="Gratis Biaya Admin Tabungan Emas"
          subtitle="Berlaku hingga 15 Des 2024"
          target="#"
          linkText="#"
        />
        <CardVoucher 
          image="/assets/images/voucher-active.png"
          title="Cashback 10% untuk Transaksi Gadai"
          subtitle="Berlaku hingga 28 Feb 2025"
          target="#"
          linkText="#"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tampilan list untuk menampilkan multiple voucher.',
      },
    },
  },
};
