import InputSearch from "../components/Input/InputSearch.vue";
import { ref } from 'vue';

export default {
  title: 'Components/Input/InputSearch',
  component: InputSearch,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input Search component dengan fitur pencarian, formatting number/NIK, dan various validation options.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label untuk input',
    },
    modelValue: {
      control: 'text',
      description: 'Nilai input (v-model)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'number', 'nik'],
      description: 'Tipe input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    error: {
      control: 'text',
      description: 'Pesan error',
    },
    helperText: {
      control: 'text',
      description: 'Teks bantuan di bawah input',
    },
    useDelimiter: {
      control: 'boolean',
      description: 'Gunakan delimiter untuk formatting',
    },
  },
  args: {
    label: 'Pencarian',
    placeholder: 'Cari...',
    type: 'text',
    disabled: false,
    required: false,
  },
};

export const Default = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
        <p style="margin-top: 8px; color: #666;">Value: {{ value }}</p>
      </div>
    `,
  }),
};

export const SearchTransaksi = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Cari Transaksi',
    placeholder: 'Masukkan nomor transaksi atau nama nasabah...',
    type: 'text',
  },
};

export const SearchNIK = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
        <p style="margin-top: 8px; color: #666;">Value: {{ value }}</p>
      </div>
    `,
  }),
  args: {
    label: 'Nomor NIK',
    placeholder: 'Masukkan 16 digit NIK',
    type: 'nik',
    useDelimiter: true,
  },
};

export const SearchNumber = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Nomor Rekening',
    placeholder: 'Masukkan nomor rekening',
    type: 'number',
    useDelimiter: true,
  },
};

export const Required = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Nama Nasabah',
    placeholder: 'Masukkan nama nasabah',
    required: true,
  },
};

export const WithError = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Nomor NIK',
    placeholder: 'Masukkan NIK',
    type: 'nik',
    error: 'NIK tidak ditemukan dalam database',
  },
};

export const WithHelperText = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Pencarian Global',
    placeholder: 'Cari transaksi, nasabah, atau produk...',
    helperText: 'Tekan Enter untuk mencari',
  },
};

export const Disabled = {
  render: (args) => ({
    components: { InputSearch },
    setup() {
      const value = ref('Data tidak dapat diubah');
      return { args, value };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearch v-bind="args" v-model="value" />
      </div>
    `,
  }),
  args: {
    label: 'Pencarian (Disabled)',
    placeholder: 'Tidak dapat digunakan',
    disabled: true,
  },
};
