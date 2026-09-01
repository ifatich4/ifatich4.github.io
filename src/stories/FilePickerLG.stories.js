import FilePickerLG from "../components/Filepicker/FilePickerLG.vue";
import { ref } from "vue";

export default {
  title: 'Components/FilePicker/FilePickerLG',
  component: FilePickerLG,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'File Picker dengan ukuran large. Mendukung drag & drop, preview gambar, dan multiple file types.',
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
      description: 'Ukuran maksimal file dalam bytes (default 1MB = 1048576)',
    },
    loaderType: {
      control: 'select',
      options: ['inline', 'modal'],
      description: 'Tipe tampilan loader. Jika `inline`, memunculkan titik-titik di area dropzone. Jika `modal`, memunculkan pop-up overlay di layar.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Prop untuk mengontrol status loading dari luar (parent). Set `true` saat parent sedang melakukan upload API ke backend agar loader muncul.',
    },
    showFileURL: {
      control: 'boolean',
      description: 'Tampilkan link preview file',
    },
    errorText: {
      control: 'text',
      description: 'Pesan error kustom. Jika dikosongkan, komponen akan otomatis menghitung dan memunculkan teks error dinamis berdasarkan nilai prop maxSize.',
    },
  },
  args: {
    imageOnly: true,
    csvOnly: false,
    showFileURL: false,
    pdfOnly: false,
    maxSize: 1048576,
    loaderType: 'inline',
    isLoading: false,
    errorText: '',
  },
};

export const Default = {
  render: (args) => ({
    components: { FilePickerLG },
    setup() {
      const selectedFile = ref(null);
      return { args, selectedFile };
    },
    template: `
      <div style="max-width: 500px;">
        <FilePickerLG 
          v-bind="args" 
          v-model="selectedFile"
        />
        <p class="mt-3" v-if="selectedFile">File: {{ selectedFile?.name }}</p>
      </div>
    `,
  }),
};

export const ImageOnly = {
  args: {
    imageOnly: true,
    csvOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hanya menerima file gambar (JPG, PNG, GIF, dll)',
      },
    },
  },
};

export const AllFiles = {
  args: {
    imageOnly: false,
    csvOnly: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menerima berbagai jenis file: PDF, DOC, XLSX, CSV, dan gambar',
      },
    },
  },
};

export const CSVOnly = {
  args: {
    imageOnly: false,
    csvOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hanya menerima file CSV',
      },
    },
  },
};

export const WithFilePreview = {
  args: {
    imageOnly: false,
    csvOnly: false,
    showFileURL: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Menampilkan link untuk melihat file setelah upload',
      },
    },
  },
};

export const PDFOnly = {
  args: {
    imageOnly: false,
    csvOnly: false,
    pdfOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hanya menerima file PDF',
      },
    },
  },
};

export const CustomErrorText = {
  args: {
    imageOnly: false,
    csvOnly: false,
    pdfOnly: false,
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
