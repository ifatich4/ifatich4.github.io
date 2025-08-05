import { ref } from "vue";
import CalendarDropdown from "../components/Input/CalendarDropdown.vue";

export default {
  title: "Components/DatePicker/CalendarDropdown",
  component: CalendarDropdown,
  parameters: {
    docs: {
      description: {
        component: 'CalendarDropdown is component part of DateRangePicker component.'
      }
    }
  },
  tags: ["autodocs"],
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
    formatType: { control: "select", options: ["date", "short"] },
    disableFutureDates : { control: "boolean"},
    flexWidth : { control: "boolean"},
    noSlash : { control: "boolean"},
    alingment: {control: "select", options: ['start', 'center', 'end']},
  },
  args: {
    title: "Tanggal Lahir",
    placeholder: "Pilih tanggal",
    disabled: false,
    required: false,
    selectedYear: new Date().getFullYear(),
    modelValue: "selectedDate",
    formatType: "date",
    noSlash: true,
    flexWidth: false,
    alingment: 'start',
    disableFutureDates: false
  },
};

export const DatePickerDropdown = {
  render: (args) => ({
    components: { CalendarDropdown },
    setup() {
      const selectedDate = ref(null);
      return { args, selectedDate };
    },
    template: `
      <CalendarDropdown 
        v-bind="args" 
        v-model="selectedDate"
      />
    `,
  }),
};


