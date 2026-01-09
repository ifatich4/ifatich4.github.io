import AutoComplete from "../components/SelectOption/AutoComplete.vue";
import { ref } from 'vue';

export default {
  title: 'Components/SelectOption/AutoComplete',
  component: AutoComplete,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'AutoComplete component dengan fitur pencarian dan dropdown. Mendukung tampilan desktop (select2) dan mobile (offcanvas).',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label untuk input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    items: {
      control: 'object',
      description: 'Array options dengan format { id, label }',
    },
    itemText: {
      control: 'text',
      description: 'Key untuk display text pada item',
    },
    itemValue: {
      control: 'text',
      description: 'Key untuk value pada item',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    error: {
      control: 'text',
      description: 'Pesan error',
    },
  },
  args: {
    label: 'Pilih Cabang',
    placeholder: 'Cari atau pilih cabang...',
    items: [
      { id: '1', label: 'UPC Pasar Mencos' },
      { id: '2', label: 'UPC Kemang' },
      { id: '3', label: 'UPC Sudirman' },
      { id: '4', label: 'UPC Thamrin' },
      { id: '5', label: 'UPC Kelapa Gading' },
    ],
  },
};

export const Default = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <div style="max-width: 400px;">
        <AutoComplete v-bind="args" v-model="selected" />
        <p style="margin-top: 16px; color: #666;">Selected: {{ selected || 'None' }}</p>
      </div>
    `,
  }),
};

export const WithPreselectedValue = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selected = ref('2');
      return { args, selected };
    },
    template: `
      <div style="max-width: 400px;">
        <AutoComplete v-bind="args" v-model="selected" />
        <p style="margin-top: 16px; color: #666;">Selected: {{ selected }}</p>
      </div>
    `,
  }),
};

export const PilihProduk = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <div style="max-width: 400px;">
        <AutoComplete v-bind="args" v-model="selected" />
      </div>
    `,
  }),
  args: {
    label: 'Pilih Produk',
    placeholder: 'Cari produk...',
    items: [
      { id: 'gadai-emas', label: 'Gadai Emas' },
      { id: 'tabungan-emas', label: 'Tabungan Emas' },
      { id: 'kredit-cepat', label: 'Kredit Cepat Aman' },
      { id: 'gadai-efek', label: 'Gadai Efek' },
      { id: 'krasida', label: 'KRASIDA' },
      { id: 'kreasi', label: 'KREASI' },
      { id: 'amanah', label: 'Amanah' },
    ],
  },
};

export const PilihProvinsi = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <div style="max-width: 400px;">
        <AutoComplete v-bind="args" v-model="selected" />
      </div>
    `,
  }),
  args: {
    label: 'Provinsi',
    placeholder: 'Cari provinsi...',
    items: [
      { id: '31', label: 'DKI Jakarta' },
      { id: '32', label: 'Jawa Barat' },
      { id: '33', label: 'Jawa Tengah' },
      { id: '34', label: 'DI Yogyakarta' },
      { id: '35', label: 'Jawa Timur' },
      { id: '36', label: 'Banten' },
      { id: '51', label: 'Bali' },
    ],
  },
};

export const Disabled = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <div style="max-width: 400px;">
        <AutoComplete v-bind="args" v-model="selected" />
      </div>
    `,
  }),
  args: {
    label: 'Cabang (Disabled)',
    placeholder: 'Tidak dapat dipilih',
    disabled: true,
    items: [
      { id: '1', label: 'UPC Pasar Mencos' },
    ],
  },
};

export const WithError = {
  render: (args) => ({
    components: { AutoComplete },
    setup() {
      const selected = ref('');
      return { args, selected };
    },
    template: `
      <div style="max-width: 400px;">
        <AutoComplete v-bind="args" v-model="selected" />
      </div>
    `,
  }),
  args: {
    label: 'Pilih Cabang',
    placeholder: 'Pilih cabang...',
    error: 'Cabang wajib dipilih',
    items: [
      { id: '1', label: 'UPC Pasar Mencos' },
      { id: '2', label: 'UPC Kemang' },
    ],
  },
};

// Form example with multiple autocomplete
export const FormExample = {
  render: () => ({
    components: { AutoComplete },
    setup() {
      const provinsi = ref('');
      const kota = ref('');
      const cabang = ref('');
      
      const kotaOptions = [
        { id: '1', label: 'Jakarta Selatan' },
        { id: '2', label: 'Jakarta Pusat' },
        { id: '3', label: 'Jakarta Barat' },
      ];
      
      const cabangOptions = [
        { id: '1', label: 'UPC Pasar Mencos' },
        { id: '2', label: 'UPC Kemang' },
        { id: '3', label: 'UPC Sudirman' },
      ];
      
      const provinsiOptions = [
        { id: '31', label: 'DKI Jakarta' },
        { id: '32', label: 'Jawa Barat' },
        { id: '33', label: 'Jawa Tengah' },
      ];
      
      return { provinsi, kota, cabang, provinsiOptions, kotaOptions, cabangOptions };
    },
    template: `
      <div style="max-width: 400px; display: flex; flex-direction: column; gap: 16px;">
        <AutoComplete 
          label="Provinsi" 
          placeholder="Pilih provinsi..." 
          :items="provinsiOptions" 
          v-model="provinsi" 
        />
        <AutoComplete 
          label="Kota/Kabupaten" 
          placeholder="Pilih kota..." 
          :items="kotaOptions" 
          v-model="kota" 
        />
        <AutoComplete 
          label="Cabang" 
          placeholder="Pilih cabang..." 
          :items="cabangOptions" 
          v-model="cabang" 
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Contoh penggunaan multiple AutoComplete dalam form.',
      },
    },
  },
};
