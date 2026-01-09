import { ref } from "vue";
import InputSmallDate from "../components/Input/InputSmallDate.vue";

export default {
  title: "Components/DatePicker/Default",
  component: InputSmallDate,
  tags: ["autodocs"],
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 350px; padding: 16px; min-height: 400px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    title: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    classes: { control: "text" },
    modelValue: { control: "text" },
    selectedYear: { control: "number" },
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
    title: "Tanggal Lahir",
    placeholder: "Pilih tanggal",
    disabled: false,
    required: false,
    selectedYear: new Date().getFullYear(),
    maxDate: "2025-01-20",
    minDate : "2025-12-01",
    modelValue: "selectedDate",
    formatType: "date",
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
        v-model="selectedDate"
        :maxDate="maxDate"
        :minDate="minDate"
      />
    `,
  }),
};


