import InputWithActionButton from "../components/Input/InputWithActionButton.vue";
import InputText from "../components/Input/InputText.vue";
import { ref } from 'vue';

export default {
  title: 'Components/Input/InputWithActionButton',
  component: InputWithActionButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input dengan Action Button component. Menggabungkan input field dengan tombol aksi di sebelahnya.',
      },
    },
  },
  argTypes: {
    buttonTitle: {
      control: 'text',
      description: 'Teks pada tombol aksi',
    },
  },
  args: {
    buttonTitle: 'Submit',
  },
};

export const Default = {
  render: (args) => ({
    components: { InputWithActionButton, InputText },
    setup() {
      const value = ref('');
      const handleClick = () => {
        alert(`Submitted: ${value.value}`);
      };
      return { args, value, handleClick };
    },
    template: `
      <div style="max-width: 500px;">
        <InputWithActionButton v-bind="args" @click="handleClick">
          <template #input>
            <InputText v-model="value" label="Email" placeholder="Masukkan email..." />
          </template>
        </InputWithActionButton>
      </div>
    `,
  }),
};

export const CariNasabah = {
  render: (args) => ({
    components: { InputWithActionButton, InputText },
    setup() {
      const nik = ref('');
      const handleSearch = () => {
        alert(`Mencari NIK: ${nik.value}`);
      };
      return { args, nik, handleSearch };
    },
    template: `
      <div style="max-width: 500px;">
        <InputWithActionButton v-bind="args" @click="handleSearch">
          <template #input>
            <InputText v-model="nik" label="Cari Nasabah" placeholder="Masukkan NIK nasabah..." />
          </template>
        </InputWithActionButton>
      </div>
    `,
  }),
  args: {
    buttonTitle: 'Cari',
  },
};

export const TambahItem = {
  render: (args) => ({
    components: { InputWithActionButton, InputText },
    setup() {
      const item = ref('');
      const items = ref([]);
      const handleAdd = () => {
        if (item.value) {
          items.value.push(item.value);
          item.value = '';
        }
      };
      return { args, item, items, handleAdd };
    },
    template: `
      <div style="max-width: 500px;">
        <InputWithActionButton v-bind="args" @click="handleAdd">
          <template #input>
            <InputText v-model="item" label="Tambah Item" placeholder="Nama item..." />
          </template>
        </InputWithActionButton>
        <div v-if="items.length" style="margin-top: 16px;">
          <strong>Items:</strong>
          <ul>
            <li v-for="(i, idx) in items" :key="idx">{{ i }}</li>
          </ul>
        </div>
      </div>
    `,
  }),
  args: {
    buttonTitle: 'Tambah',
  },
};

export const VerifikasiKode = {
  render: (args) => ({
    components: { InputWithActionButton, InputText },
    setup() {
      const kode = ref('');
      const handleVerify = () => {
        alert(`Verifikasi kode: ${kode.value}`);
      };
      return { args, kode, handleVerify };
    },
    template: `
      <div style="max-width: 500px;">
        <InputWithActionButton v-bind="args" @click="handleVerify">
          <template #input>
            <InputText v-model="kode" label="Kode Promo" placeholder="Masukkan kode promo..." />
          </template>
        </InputWithActionButton>
      </div>
    `,
  }),
  args: {
    buttonTitle: 'Verifikasi',
  },
};

export const UploadFile = {
  render: (args) => ({
    components: { InputWithActionButton, InputText },
    setup() {
      const filename = ref('');
      const handleUpload = () => {
        alert('File akan diupload');
      };
      return { args, filename, handleUpload };
    },
    template: `
      <div style="max-width: 500px;">
        <InputWithActionButton v-bind="args" @click="handleUpload">
          <template #input>
            <InputText v-model="filename" label="File" placeholder="Pilih file..." disabled />
          </template>
        </InputWithActionButton>
      </div>
    `,
  }),
  args: {
    buttonTitle: 'Browse',
  },
};
