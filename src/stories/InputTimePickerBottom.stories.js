import InputTimePicker from "../components/Input/InputTimePicker.vue";
import Button from "../components/Button/Button.vue";
import { ref } from "vue";

export default {
  title: 'Components/Input/InputTimePicker',
  component: InputTimePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Time Picker component untuk memilih jam dan menit. Menggunakan bottom sheet dengan scroll picker.',
      },
    },
  },
  argTypes: {
    defaultHour: {
      control: 'text',
      description: 'Default hour value',
    },
    defaultMinute: {
      control: 'text',
      description: 'Default minute value',
    },
  },
  args: {
    defaultHour: '09',
    defaultMinute: '00',
  },
};

export const Default = {
  render: (args) => ({
    components: { InputTimePicker, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Pilih Waktu" @click="isOpen = true" />
        <InputTimePicker v-bind="args" v-model="isOpen" />
      </div>
    `,
  }),
};

export const MorningTime = {
  render: (args) => ({
    components: { InputTimePicker, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Pilih Waktu Pagi" @click="isOpen = true" />
        <InputTimePicker v-bind="args" v-model="isOpen" />
      </div>
    `,
  }),
  args: {
    defaultHour: '08',
    defaultMinute: '30',
  },
};

export const EveningTime = {
  render: (args) => ({
    components: { InputTimePicker, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Pilih Waktu Sore" @click="isOpen = true" />
        <InputTimePicker v-bind="args" v-model="isOpen" />
      </div>
    `,
  }),
  args: {
    defaultHour: '17',
    defaultMinute: '00',
  },
};
