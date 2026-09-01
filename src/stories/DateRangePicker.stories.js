import { ref } from "vue";
import DateRangePicker from "../components/Input/DateRangePicker.vue";

export default {
  title: "Components/DatePicker/DateRangePicker",
  component: DateRangePicker,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
    disabledStartDate: { control: "boolean" },
    disabledEndDate: { control: "boolean" },
    firstLabel: { control: "text" },
    secondLabel: { control: "text" },
    firstPlaceholder : { control: "text" },
    secondPlaceholder : { control: "text" },
    flexWidth: {control: 'boolean'},
    formatType: { control: "select", options: ["date", "short"] },
    firstAlignment : {control: "select", options: ['start', 'center', 'end']},
    secondAlignment : {control: "select", options: ['start', 'center', 'end']},
    separator: { control: "boolean" },
    noSlash: { control: "boolean" , description: "Remove slash from in out of range date"},
    errorMessage : { control: "text" },
  },
args: {
  disabled: false,
  disabledStartDate: false,
  disabledEndDate: false,
  firstLabel: "Dari",
  secondLabel: "Hingga",
  firstPlaceholder: "Pilih tanggal",
  secondPlaceholder: "Pilih tanggal",
  flexWidth: false,
  formatType: "date",
  firstAlignment: "start", // default aman
  secondAlignment: "start",
  separator: true,
  noSlash: false,
  errorMessage: "",
},
};

export const DatePickerOption = {
  render: (args) => ({
      components: { DateRangePicker },
      setup() {
        const startDate = ref(null);
        const endDate = ref(null);
        return { args, startDate, endDate };
      },
      template: `
        <DateRangePicker 
          v-bind="args" 
          v-model:start-date="startDate"
          v-model:end-date="endDate"
        />
      `,
    }),

};

