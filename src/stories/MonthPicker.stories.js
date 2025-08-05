import { ref } from "vue";
import InputMonth from "../components/Input/InputMonth.vue";

export default {
  title: "Components/MonthPicker",
  component: InputMonth,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    classes: { control: "text" },
    modelValue: { control: "object" },
    selectedYear: { control: "object" },
    addClass: { control: "text" },
    maxDate: { control: "text" },
    minDate: { control: "text" },
    maxDaysFromToday: { control: "number" },
    minDaysFromToday: { control: "number" },
    error: { control: "text" },
    datePosition: { control: "text" },
    formatType: { control: "select", options: ["date", "short"] },
  },
  args: {
    title: "Bulan Tagihan",
    placeholder: "Pilih bulan",
    disabled: false,
    required: false,
    selectedYear: new Date().getFullYear(),
    modelValue: "selectedDate",
    formatType: "date",
  },
};

export const MonthPicker = {
  render: (args) => ({
    components: { InputMonth },
    setup() {
      const selectedDate = ref(null);
      return { args, selectedDate };
    },
    template: `
      <InputMonth 
        v-bind="args" 
        v-model="selectedDate"
        :maxDate="maxDate"
        :minDate="minDate"
      />
    `,
  }),
};


