import InputMonth from "../components/Input/InputMonth.vue";
import { ref } from "vue";

export default {
  title: 'Components/Input/InputMonth',
  component: InputMonth,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input Month Picker untuk memilih bulan dan tahun. Mendukung mode desktop dan mobile.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Label input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    datePosition: {
      control: 'select',
      options: ['bottom', 'top'],
      description: 'Posisi calendar popup',
    },
  },
  args: {
    title: "Periode",
    placeholder: "Pilih bulan",
    disabled: false,
    required: false,
    datePosition: 'bottom',
  },
};

export const Default = {
  render: (args) => ({
    components: { InputMonth },
    setup() {
      const selectedMonth = ref('');
      return { args, selectedMonth };
    },
    template: `
      <div style="max-width: 400px;">
        <InputMonth 
          v-bind="args" 
          v-model="selectedMonth"
        />
        <p class="mt-3">Selected: {{ selectedMonth }}</p>
      </div>
    `,
  }),
};

export const WithLabel = {
  render: (args) => ({
    components: { InputMonth },
    setup() {
      const selectedMonth = ref('');
      return { args, selectedMonth };
    },
    template: `
      <div style="max-width: 400px;">
        <InputMonth 
          v-bind="args" 
          v-model="selectedMonth"
        />
      </div>
    `,
  }),
  args: {
    title: "Tanggal Lahir",
    placeholder: "Pilih bulan lahir",
  },
};

export const Required = {
  args: {
    title: "Periode Laporan",
    placeholder: "Pilih periode",
    required: true,
  },
};

export const Disabled = {
  args: {
    title: "Periode",
    placeholder: "Input disabled",
    disabled: true,
  },
};

export const TopPosition = {
  render: (args) => ({
    components: { InputMonth },
    setup() {
      const selectedMonth = ref('');
      return { args, selectedMonth };
    },
    template: `
      <div style="max-width: 400px; margin-top: 300px;">
        <InputMonth 
          v-bind="args" 
          v-model="selectedMonth"
        />
      </div>
    `,
  }),
  args: {
    title: "Periode",
    placeholder: "Pilih bulan",
    datePosition: 'top',
  },
};
