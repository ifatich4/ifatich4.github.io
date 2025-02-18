import TimePickerResponsive from "../components/Input/TimePickerResponsive.vue";

export default {
  title: "Components/TimePicker",
  component: TimePickerResponsive,
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    addClass: { control: "text" },
    disabled: { control: "boolean"},
    required: {control: "boolean"},
    classes: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
  },
  args: {
    title: "Waktu",
    disabled: false,
    required: true,
    placeholder: "Pilih waktu",
  },
};

export const TimePicker = {};
