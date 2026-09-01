import CardFile from "../components/Card/CardFile.vue";

export default {
  title: 'Components/Card/CardFile',
  component: CardFile,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card File untuk menampilkan preview file/dokumen seperti e-book, laporan, atau dokumen unduhan lainnya.',
      },
    },
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 300px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    image: {
      control: 'text',
      description: 'URL gambar cover file',
    },
    title: {
      control: 'text',
      description: 'Judul file/dokumen',
    },
    subtitle: {
      control: 'text',
      description: 'Deskripsi singkat file',
    },
    label: {
      control: 'text',
      description: 'Teks tombol aksi',
    },
  },
  args: {
    image: '/assets/images/ebook2.png',
    title: 'Annual Report 2024',
    subtitle: 'Laporan Tahunan Pegadaian',
    label: 'Download',
  },
};

export const Default = {
  args: {
    image: '/assets/images/ebook2.png',
    title: 'Annual Report 2024',
    subtitle: 'Laporan Tahunan Pegadaian',
    label: 'Download',
  },
};

export const Ebook = {
  args: {
    image: '/assets/images/ebook2.png',
    title: 'Panduan Investasi Emas',
    subtitle: 'E-Book Gratis untuk Pemula',
    label: 'Unduh Gratis',
  },
};

export const Prospektus = {
  args: {
    image: '/assets/images/ebook2.png',
    title: 'Prospektus Produk Gadai',
    subtitle: 'Informasi lengkap produk gadai',
    label: 'Lihat Detail',
  },
};

export const Formulir = {
  args: {
    image: '/assets/images/ebook2.png',
    title: 'Formulir Pembukaan Rekening',
    subtitle: 'Form aplikasi Tabungan Emas',
    label: 'Download PDF',
  },
};

// File grid showcase
export const FileGrid = {
  render: () => ({
    components: { CardFile },
    template: `
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; max-width: 1200px;">
        <CardFile 
          image="/assets/images/ebook2.png"
          title="Annual Report 2024"
          subtitle="Laporan Tahunan"
          label="Download"
        />
        <CardFile 
          image="/assets/images/ebook2.png"
          title="Panduan Investasi Emas"
          subtitle="E-Book Gratis"
          label="Unduh"
        />
        <CardFile 
          image="/assets/images/ebook2.png"
          title="Prospektus Produk"
          subtitle="Info Lengkap Produk"
          label="Lihat"
        />
        <CardFile 
          image="/assets/images/ebook2.png"
          title="Form Aplikasi"
          subtitle="Formulir Pembukaan"
          label="Download"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tampilan grid untuk showcase berbagai file/dokumen.',
      },
    },
  },
};
