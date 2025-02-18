import { ref } from "vue";
import InputSmallDate from "../components/Input/InputSmallDate.vue";

export default {
  title: "Components/DatePicker/Default",
  component: InputSmallDate,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    classes: { control: "text" },
    modelValue: { control: "text" },
    selectedYear: { control: "object" },
    addClass: { control: "text" },
  },
  args: {
    title: "Tanggal Lahir",
    placeholder: "Pilih tanggal",
    disabled: false,
    required: false,
    selectedYear: new Date().getFullYear(),
    modelValue: "selectedDate"
  },
};

export const DatePicker = {
  render: (args) => ({
    components: { InputSmallDate },
    setup() {
      const selectedDate = ref(null);
      return { args, selectedDate };
    },
    template: `
      <InputSmallDate 
        v-bind="args" 
        v-model="selectesdDate"
      />
    `,
  }),
};


