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
    showFileURL: {
      control: 'boolean',
      description: 'Tampilkan link preview file',
    },
    errorText: {
      control: 'text',
      description: 'Custom error text',
    },
  },
  args: {
    imageOnly: true,
    csvOnly: false,
    showFileURL: false,
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
