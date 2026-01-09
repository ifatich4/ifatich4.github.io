import CardContent from "../components/Card/CardContent.vue";

export default {
  title: 'Components/Card/CardContent',
  component: CardContent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Content untuk menampilkan konten dengan ikon, judul dan deskripsi. Ideal untuk menampilkan fitur atau layanan.',
      },
    },
  },
  argTypes: {
    icon: {
      control: 'text',
      description: 'URL ikon',
    },
    title: {
      control: 'text',
      description: 'Judul card',
    },
    body: {
      control: 'text',
      description: 'Deskripsi/konten card',
    },
  },
  args: {
    icon: '/assets/images/icon-karir.svg',
    title: 'Karir',
    body: 'Bangun perekonomian masyarakat Indonesia melalui kemampuanmu bersama Pegadaian.',
  },
};

export const Default = {
  args: {
    icon: '/assets/images/icon-karir.svg',
    title: 'Karir',
    body: 'Bangun perekonomian masyarakat Indonesia melalui kemampuanmu bersama Pegadaian.',
  },
};

export const LayananGadai = {
  args: {
    icon: '/assets/images/pegadaian-ico.svg',
    title: 'Layanan Gadai',
    body: 'Penuhi kebutuhan finansial Anda dengan gadai emas, elektronik, dan barang berharga lainnya.',
  },
};

export const TabunganEmas = {
  args: {
    icon: '/assets/images/pegadaian-ico.svg',
    title: 'Tabungan Emas',
    body: 'Investasi emas dengan cara mudah dan terjangkau mulai dari 0.01 gram.',
  },
};

export const Kredit = {
  args: {
    icon: '/assets/images/pegadaian-ico.svg',
    title: 'Kredit Cepat Aman',
    body: 'Pinjaman dengan jaminan BPKB kendaraan bermotor untuk berbagai kebutuhan.',
  },
};

// Grid showcase
export const ContentGrid = {
  render: () => ({
    components: { CardContent },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px;">
        <CardContent 
          icon="/assets/images/pegadaian-ico.svg"
          title="Gadai Emas"
          body="Solusi cepat untuk kebutuhan dana tunai dengan jaminan emas."
        />
        <CardContent 
          icon="/assets/images/pegadaian-ico.svg"
          title="Tabungan Emas"
          body="Investasi emas dengan cara mudah mulai dari 0.01 gram."
        />
        <CardContent 
          icon="/assets/images/pegadaian-ico.svg"
          title="Kredit Cepat Aman"
          body="Pinjaman dengan jaminan BPKB untuk berbagai kebutuhan."
        />
        <CardContent 
          icon="/assets/images/pegadaian-ico.svg"
          title="Multi Payment"
          body="Bayar berbagai tagihan dengan mudah di outlet Pegadaian."
        />
        <CardContent 
          icon="/assets/images/pegadaian-ico.svg"
          title="Remittance"
          body="Kirim dan terima uang dari dalam dan luar negeri."
        />
        <CardContent 
          icon="/assets/images/pegadaian-ico.svg"
          title="Safe Deposit Box"
          body="Simpan barang berharga Anda dengan aman di brankas Pegadaian."
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout untuk menampilkan berbagai layanan.',
      },
    },
  },
};
