import { ref } from "vue";
import InputNIK from "../components/Input/InputNIK.vue";

  export default {
    title: 'Components/InputField/Search NIK',
    component: InputNIK,
    tags: ['autodocs'],
    argTypes : {
      label : { control:"text" },
      error : { control: "text" },
      class: { control: "text" },
      helperText: {control: "text"},
      type: {control: "select", options: ["text", "number", "search"] },
      color: {control: "select", options: ["default", "blue", "green", "orange", "red"] },
      suffix : { control: "text" },
      prefix : { control: "text" },
    },
    args: {
      label: "NIK",
      required: true,
      disabled: false,
      placeholder: "Masukkan NIK",
      type: "text",
      error : null,
      helperText: "Ini adalah helpertext",
      color: "default",
    },
  };

  export const Text = {
    args: {
      modelValue: "modelValue",
    },
      render: (args) => ({
          components: { InputNIK},
          setup() {
            const modelValue = ref("");
            return { args, modelValue };
          },
          template: `
            <InputNIK  id="input-nik" v-bind="args" v-model="modelValue"/>
          `,
    }),
  };



  
