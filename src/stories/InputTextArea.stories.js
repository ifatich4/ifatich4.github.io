import { ref } from "vue";
import InputTextArea from "../components/Input/InputTextArea.vue";

  export default {
    title: 'Components/InputField/TextArea',
    component: InputTextArea,
    tags: ['autodocs'],
    argTypes : {
      label : { control:"text" },
      error : { control: "text" },
      class: { control: "text" },
      rows: {control: "number"}
    },
    args: {
      label: "Nama Lengkap",
      required: true,
      disabled: false,
      placeholder: "Masukkan nama lengkap",
      error : null,
      class: null,
      rows: 3
    },
    render: (args) => ({
          components: { InputTextArea },
          setup() {
            const modelValue = ref(""); // Hubungkan dengan args
            return { args, modelValue };
          },
          template: `
            <InputTextArea v-bind="args" v-model="modelValue"/>
          `,
    }),
  };

  export const Text = {
  };






  
