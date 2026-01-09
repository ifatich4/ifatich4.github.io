import InputSearchQR from "../components/Input/InputSearchQR.vue";
import { ref } from "vue";

export default {
  title: 'Components/Input/InputSearchQR',
  component: InputSearchQR,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input search dengan fitur scan QR Code. Bisa digunakan untuk pencarian NIK, nomor nasabah, atau kode lainnya.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label input',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    helperText: {
      control: 'text',
      description: 'Helper text di bawah input',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    numericOnly: {
      control: 'boolean',
      description: 'Hanya izinkan input angka',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined'],
      description: 'Variant style',
    },
  },
  args: {
    label: "Nomor NIK",
    helperText: "",
    disabled: false,
    required: false,
    numericOnly: true,
    variant: 'default',
  },
};

export const Default = {
  render: (args) => ({
    components: { InputSearchQR },
    setup() {
      const searchValue = ref('');
      const handleScan = (result) => {
        searchValue.value = result;
        console.log('Scanned:', result);
      };
      return { args, searchValue, handleScan };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearchQR 
          v-bind="args" 
          v-model="searchValue"
          @scan="handleScan"
        />
        <p class="mt-3">Value: {{ searchValue }}</p>
      </div>
    `,
  }),
};

export const WithLabel = {
  render: (args) => ({
    components: { InputSearchQR },
    setup() {
      const searchValue = ref('');
      return { args, searchValue };
    },
    template: `
      <div style="max-width: 400px;">
        <InputSearchQR 
          v-bind="args" 
          v-model="searchValue"
        />
      </div>
    `,
  }),
  args: {
    label: "Cari Nasabah",
    helperText: "Masukkan NIK atau scan QR Code",
  },
};

export const WithError = {
  args: {
    label: "Nomor NIK",
    error: "NIK tidak valid",
  },
};

export const Required = {
  args: {
    label: "Nomor NIK",
    required: true,
    helperText: "Wajib diisi",
  },
};

export const Disabled = {
  args: {
    label: "Nomor NIK",
    disabled: true,
  },
};

export const AlphanumericAllowed = {
  args: {
    label: "Kode Referral",
    numericOnly: false,
    helperText: "Masukkan kode referral alfanumerik",
  },
};
