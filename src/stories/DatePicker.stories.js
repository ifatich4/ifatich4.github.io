import { ref } from "vue";
import InputSmallDate from "../components/Input/InputSmallDate.vue";

const currentYear = new Date().getFullYear();

export default {
  title: "Components/DatePicker/InputSmallDate",
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
    maxYear: { control: "number" },
    addClass: { control: "text" },
    maxDate: { control: "text" },
    minDate: { control: "text" },
    maxDaysFromToday: { control: "number" },
    minDaysFromToday: { control: "number" },
    disableFutureDates: { control: "boolean" },
    error: { control: "text" },
    datePosition: { control: "text" },
    formatType: { control: "select", options: ["date", "short"] },
  },
  args: {
    title: "Tanggal Lahir",
    placeholder: "Pilih tanggal",
    disabled: false,
    required: false,
    selectedYear: currentYear,
    maxYear: currentYear + 3,
    modelValue: null,
    formatType: "date",
    disableFutureDates: false,
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
      />
    `,
  }),
};

export const CustomMaxYear = {
  args: {
    selectedYear: currentYear,
    maxYear: currentYear + 10,
  },
  render: DatePicker.render,
};


