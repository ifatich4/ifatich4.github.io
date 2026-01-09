import CardArticle from "../components/Card/CardArticle.vue";

export default {
  title: 'Components/Card/CardArticle',
  component: CardArticle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Article untuk menampilkan preview artikel dengan gambar, label kategori, judul dan tanggal publikasi.',
      },
    },
  },
  argTypes: {
    image: {
      control: 'text',
      description: 'URL gambar banner artikel',
    },
    label: {
      control: 'text',
      description: 'Label kategori artikel',
    },
    title: {
      control: 'text',
      description: 'Judul artikel',
    },
    created: {
      control: 'text',
      description: 'Tanggal publikasi artikel',
    },
  },
  args: {
    image: '/assets/images/image13.png',
    label: 'Pengumuman',
    title: 'Management Development Program (MDP) Batch 4',
    created: '20 Agustus 2021',
  },
};

export const Default = {
  args: {
    image: '/assets/images/image13.png',
    label: 'Pengumuman Seleksi',
    title: 'Management Development Program (MDP) Batch 4',
    created: '20 Agustus 2021',
  },
};

export const Berita = {
  args: {
    image: '/assets/images/image13.png',
    label: 'Berita',
    title: 'Pegadaian Raih Penghargaan Top Digital Awards 2024',
    created: '15 Januari 2024',
  },
};

export const Promo = {
  args: {
    image: '/assets/images/image13.png',
    label: 'Promo',
    title: 'Diskon 50% Biaya Admin Tabungan Emas',
    created: '01 Februari 2024',
  },
};

export const Edukasi = {
  args: {
    image: '/assets/images/image13.png',
    label: 'Edukasi',
    title: 'Tips Investasi Emas untuk Pemula',
    created: '10 Maret 2024',
  },
};

// Multiple cards grid
export const ArticleGrid = {
  render: () => ({
    components: { CardArticle },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 1200px;">
        <CardArticle 
          image="/assets/images/image13.png"
          label="Pengumuman"
          title="Management Development Program (MDP) Batch 4"
          created="20 Agustus 2021"
        />
        <CardArticle 
          image="/assets/images/image13.png"
          label="Berita"
          title="Pegadaian Raih Penghargaan Top Digital Awards"
          created="15 Januari 2024"
        />
        <CardArticle 
          image="/assets/images/image13.png"
          label="Promo"
          title="Diskon 50% Biaya Admin Tabungan Emas"
          created="01 Februari 2024"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tampilan grid untuk multiple CardArticle.',
      },
    },
  },
};
