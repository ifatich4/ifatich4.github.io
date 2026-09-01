import InputDropdownMultiple from "../components/Dropdown/InputDropdownMultiple.vue";
import { ref } from "vue";

export default {
  title: 'Components/Dropdown/InputDropdownMultiple',
  component: InputDropdownMultiple,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Dropdown dengan pilihan multiple select. Mendukung search, select all, dan bottom sheet mode.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    items: {
      control: 'object',
      description: 'Array item untuk pilihan',
    },
    itemValue: {
      control: 'text',
      description: 'Key untuk value item',
    },
    itemText: {
      control: 'text',
      description: 'Key untuk text yang ditampilkan',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection',
    },
    selectAll: {
      control: 'boolean',
      description: 'Tampilkan opsi select all',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
  },
  args: {
    label: "Pilih Kategori",
    placeholder: "Pilih kategori...",
    items: [
      { id: 1, nama: "Gadai Emas" },
      { id: 2, nama: "Tabungan Emas" },
      { id: 3, nama: "Kredit" },
      { id: 4, nama: "Asuransi" },
      { id: 5, nama: "Pembiayaan" },
    ],
    itemValue: "id",
    itemText: "nama",
    multiple: true,
    selectAll: false,
    disabled: false,
    loading: false,
  },
};

export const Default = {
  render: (args) => ({
    components: { InputDropdownMultiple },
    setup() {
      const selectedValues = ref([]);
      return { args, selectedValues };
    },
    template: `
      <div style="max-width: 400px;">
        <InputDropdownMultiple 
          v-bind="args" 
          v-model="selectedValues"
        />
        <p class="mt-3">Selected: {{ selectedValues }}</p>
      </div>
    `,
  }),
};

export const WithSelectAll = {
  render: (args) => ({
    components: { InputDropdownMultiple },
    setup() {
      const selectedValues = ref([]);
      return { args, selectedValues };
    },
    template: `
      <div style="max-width: 400px;">
        <InputDropdownMultiple 
          v-bind="args" 
          v-model="selectedValues"
        />
        <p class="mt-3">Selected: {{ selectedValues }}</p>
      </div>
    `,
  }),
  args: {
    label: "Pilih Produk",
    placeholder: "Pilih produk...",
    selectAll: true,
    items: [
      { id: 1, nama: "Gadai Emas" },
      { id: 2, nama: "Tabungan Emas" },
      { id: 3, nama: "Kredit Cepat Aman" },
      { id: 4, nama: "Asuransi Emas" },
      { id: 5, nama: "Pembiayaan Syariah" },
    ],
  },
};

export const Loading = {
  args: {
    label: "Pilih Data",
    placeholder: "Memuat data...",
    loading: true,
    items: [],
  },
};

export const WithError = {
  args: {
    label: "Pilih Kategori",
    placeholder: "Pilih kategori...",
    error: "Minimal pilih 1 kategori",
    items: [
      { id: 1, nama: "Gadai Emas" },
      { id: 2, nama: "Tabungan Emas" },
    ],
  },
};

export const Disabled = {
  args: {
    label: "Pilih Kategori",
    placeholder: "Input disabled",
    disabled: true,
    items: [
      { id: 1, nama: "Gadai Emas" },
      { id: 2, nama: "Tabungan Emas" },
    ],
  },
};
