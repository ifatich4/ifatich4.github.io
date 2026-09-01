import FilePickerSM from "../components/Filepicker/FilePickerSM.vue";

export default {
  title: 'Components/FilePicker/FilePickerSM',
  component: FilePickerSM,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'File Picker ukuran small dengan opsi galeri dan kamera. Cocok untuk upload foto profil atau dokumen kecil.',
      },
    },
  },
  argTypes: {
    imageOnly: {
      control: 'boolean',
      description: 'Hanya terima file gambar',
    },
    csvOnly: {
      control: 'boolean',
      description: 'Hanya terima file CSV',
    },
    pdfOnly: {
      control: 'boolean',
      description: 'Hanya terima file PDF',
    },
    maxSize: {
      control: 'number',
      description: 'Ukuran maksimal file (bytes)',
    },
    loaderType: {
      control: 'select',
      options: ['inline', 'modal'],
      description: 'Tipe tampilan loader. Jika `inline`, menampilkan titik-titik di dalam kotak. Jika `modal`, menampilkan pop-up loading.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Prop untuk mengontrol status loading dari luar (parent). Set `true` saat parent sedang melakukan proses backend.',
    },
    errorText: {
      control: 'text',
      description: 'Pesan error kustom. Jika dikosongkan, komponen otomatis akan memunculkan teks error dinamis berdasarkan nilai prop maxSize.',
    },
  },
  args: {
    imageOnly: true,
    csvOnly: false,
    pdfOnly: false,
    maxSize: 1048576,
    loaderType: 'inline',
    isLoading: false,
    errorText: '',
  },
};

export const Default = {
  render: (args) => ({
    components: { FilePickerSM },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 300px;">
        <FilePickerSM v-bind="args" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Default file picker dengan modal pilihan Galeri atau Kamera',
      },
    },
  },
};

export const MultipleUploads = {
  render: () => ({
    components: { FilePickerSM },
    template: `
      <div style="display: flex; gap: 16px;">
        <div>
          <label class="form-label">Foto KTP</label>
          <FilePickerSM />
        </div>
        <div>
          <label class="form-label">Foto Selfie</label>
          <FilePickerSM />
        </div>
        <div>
          <label class="form-label">Foto Jaminan</label>
          <FilePickerSM />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Multiple file picker untuk upload beberapa dokumen',
      },
    },
  },
};

export const CustomErrorText = {
  render: (args) => ({
    components: { FilePickerSM },
    setup() {
      return { args };
    },
    template: `
      <div style="max-width: 300px;">
        <FilePickerSM v-bind="args" />
      </div>
    `,
  }),
  args: {
    imageOnly: false,
    maxSize: 500000,
    errorText: 'Waduh kebesaran om! Tolong upload file di bawah 500 KB ya.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Mendemonstrasikan kustomisasi pesan error kustom (silakan coba upload file dengan ukuran > 500 KB untuk melihat efek pesan ini, atau kosongkan errorText untuk melihat pesan error default yang dihitung dinamis).',
      },
    },
  },
};
