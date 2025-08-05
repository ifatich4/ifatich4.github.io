import { ref } from "vue";
import DateRangePickerOption from "../components/Input/DateRangePickerOption.vue";

export default {
  title: "Components/DatePicker/WithOption",
  component: DateRangePickerOption,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    showAny: { control: "boolean" },
    useBottomSheet: { control: "boolean" },
    preset : { control: "object" },
    firstLabel: { control: "text" },
    secondLabel: { control: "text" },
    error: { control: "text" },
    separator: { control: "boolean" },
    flexWdith: { control: "boolean" },
    noSlash: { control: "boolean" , description: "Remove slash from in out of range date"},
  },
  args: {
    title: "Tanggal Lahir",
    placeholder: "Pilih tanggal",
    disabled: false,
    useBottomSheet : false,
    preset : [
      {
        label: '7 Hari Terakhir',
        value: '7'
      },
      {
        label: '30 Hari Terakhir',
        value: '30'
      }
    ],
    showAny: true,
    firstLabel: "Dari",
    secondLabel: "Hingga",
    separator: true,
    flexWdith: true,
    noSlash: false,

  },
};

export const DatePickerOption = {
  render: (args) => ({
      components: { DateRangePickerOption },
      setup() {
        const startDate = ref(null);
        const endDate = ref(null);
        return { args, startDate, endDate };
      },
      template: `
        <DateRangePickerOption 
          v-bind="args" 
          v-model:start-date="startDate"
          v-model:end-date="endDate"
        />
      `,
    }),

};

