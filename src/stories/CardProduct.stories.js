import CardProduct from "../components/Card/CardProduct.vue";

export default {
  title: 'Components/Card/CardProduct',
  component: CardProduct,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Product untuk menampilkan informasi produk Pegadaian dengan gambar, ikon, status konvensional/syariah, judul dan deskripsi.',
      },
    },
  },
  argTypes: {
    action: {
      control: 'text',
      description: 'URL link ketika card diklik',
    },
    icon: {
      control: 'text',
      description: 'URL ikon produk',
    },
    image: {
      control: 'text',
      description: 'URL gambar banner produk',
    },
    title: {
      control: 'text',
      description: 'Nama produk',
    },
    body: {
      control: 'text',
      description: 'Deskripsi singkat produk',
    },
    syariah: {
      control: 'boolean',
      description: 'Menampilkan badge Syariah jika true',
    },
  },
  args: {
    action: '#',
    icon: '/assets/images/pegadaian-ico.svg',
    image: '/assets/images/product-card.png',
    title: 'Gadai Efek',
    body: 'Penuhi kebutuhan di luar dugaan dengan cepat dengan gadai emas batangan maupun perhiasan...',
    syariah: false,
  },
};

export const Konvensional = {
  args: {
    action: '#',
    icon: '/assets/images/pegadaian-ico.svg',
    image: '/assets/images/product-card.png',
    title: 'Gadai Efek',
    body: 'Penuhi kebutuhan di luar dugaan dengan cepat dengan gadai emas batangan maupun perhiasan.',
    syariah: false,
  },
};

export const Syariah = {
  args: {
    action: '#',
    icon: '/assets/images/pegadaian-ico.svg',
    image: '/assets/images/product-card.png',
    title: 'Gadai Emas Syariah',
    body: 'Solusi gadai emas dengan prinsip syariah yang berkah dan amanah.',
    syariah: true,
  },
};

export const TabunganEmas = {
  args: {
    action: '#',
    icon: '/assets/images/pegadaian-ico.svg',
    image: '/assets/images/product-card.png',
    title: 'Tabungan Emas',
    body: 'Cara mudah berinvestasi emas dengan harga terjangkau mulai dari 0.01 gram.',
    syariah: true,
  },
};

export const Kredit = {
  args: {
    action: '#',
    icon: '/assets/images/pegadaian-ico.svg',
    image: '/assets/images/product-card.png',
    title: 'Kredit Cepat Aman',
    body: 'Pinjaman dengan jaminan BPKB kendaraan bermotor dengan proses cepat dan aman.',
    syariah: false,
  },
};

// Product grid showcase
export const ProductGrid = {
  render: () => ({
    components: { CardProduct },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 1200px;">
        <CardProduct 
          action="#"
          icon="/assets/images/pegadaian-ico.svg"
          image="/assets/images/product-card.png"
          title="Gadai Efek"
          body="Penuhi kebutuhan di luar dugaan dengan cepat dengan gadai emas batangan maupun perhiasan."
          :syariah="false"
        />
        <CardProduct 
          action="#"
          icon="/assets/images/pegadaian-ico.svg"
          image="/assets/images/product-card.png"
          title="Gadai Emas Syariah"
          body="Solusi gadai emas dengan prinsip syariah yang berkah dan amanah."
          :syariah="true"
        />
        <CardProduct 
          action="#"
          icon="/assets/images/pegadaian-ico.svg"
          image="/assets/images/product-card.png"
          title="Tabungan Emas"
          body="Cara mudah berinvestasi emas dengan harga terjangkau mulai dari 0.01 gram."
          :syariah="true"
        />
        <CardProduct 
          action="#"
          icon="/assets/images/pegadaian-ico.svg"
          image="/assets/images/product-card.png"
          title="Kredit Cepat Aman"
          body="Pinjaman dengan jaminan BPKB kendaraan bermotor dengan proses cepat dan aman."
          :syariah="false"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tampilan grid untuk showcase berbagai produk Pegadaian.',
      },
    },
  },
};
