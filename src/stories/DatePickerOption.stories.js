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
    preset : { control: "object" }
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
          v-model:start-date="${args.startDatee}"
          v-model:end-date="${args.endDatee}"
        />
      `,
    }),

};

