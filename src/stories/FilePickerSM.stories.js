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
};

export const Default = {
  render: () => ({
    components: { FilePickerSM },
    template: `
      <div style="max-width: 300px;">
        <FilePickerSM />
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
