import ImageView from "../components/Image/ImageView.vue";

export default {
  title: 'Components/ImageView',
  component: ImageView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Image View component untuk menampilkan gambar dengan handling state kosong dan broken image.',
      },
    },
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 500px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Judul/label di atas gambar',
    },
    imgSrc: {
      control: 'text',
      description: 'URL sumber gambar',
    },
    imgAlt: {
      control: 'text',
      description: 'Alt text untuk gambar',
    },
    imgBroken: {
      control: 'boolean',
      description: 'State ketika gambar gagal dimuat',
    },
  },
  args: {
    title: 'Foto Dokumen',
    imgSrc: '/assets/images/image13.png',
    imgAlt: 'Foto Dokumen',
    imgBroken: false,
  },
};

export const Default = {
  args: {
    title: 'Foto KTP',
    imgSrc: '/assets/images/image13.png',
    imgAlt: 'Foto KTP Nasabah',
    imgBroken: false,
  },
};

export const NoImage = {
  args: {
    title: 'Foto Dokumen',
    imgSrc: '',
    imgAlt: '',
    imgBroken: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'State ketika tidak ada gambar yang tersedia. Menampilkan placeholder ilustrasi.',
      },
    },
  },
};

export const BrokenImage = {
  args: {
    title: 'Foto Jaminan',
    imgSrc: 'https://invalid-url-for-demo.png',
    imgAlt: 'Foto Jaminan',
    imgBroken: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'State ketika gambar gagal dimuat. Menampilkan placeholder error dengan ilustrasi.',
      },
    },
  },
};

export const FotoSelfie = {
  args: {
    title: 'Foto Selfie dengan KTP',
    imgSrc: '/assets/images/image13.png',
    imgAlt: 'Foto Selfie dengan KTP',
    imgBroken: false,
  },
};

export const FotoBarang = {
  args: {
    title: 'Foto Barang Jaminan',
    imgSrc: '/assets/images/image13.png',
    imgAlt: 'Foto Barang Jaminan',
    imgBroken: false,
  },
};

// Multiple images in grid
export const ImageGallery = {
  render: () => ({
    components: { ImageView },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 900px;">
        <ImageView 
          title="Foto KTP"
          imgSrc="/assets/images/image13.png"
          imgAlt="Foto KTP"
        />
        <ImageView 
          title="Foto Selfie"
          imgSrc="/assets/images/image13.png"
          imgAlt="Foto Selfie"
        />
        <ImageView 
          title="Foto Barang"
          imgSrc="/assets/images/image13.png"
          imgAlt="Foto Barang"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Multiple ImageView dalam layout grid.',
      },
    },
  },
};

// All states comparison
export const AllStates = {
  render: () => ({
    components: { ImageView },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; max-width: 900px;">
        <ImageView 
          title="Dengan Gambar"
          imgSrc="/assets/images/image13.png"
          imgAlt="Normal State"
        />
        <ImageView 
          title="Tanpa Gambar"
          imgSrc=""
        />
        <ImageView 
          title="Gambar Error"
          imgSrc="https://invalid-url-for-demo.png"
          :imgBroken="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Perbandingan semua state: normal, empty, dan broken.',
      },
    },
  },
};
