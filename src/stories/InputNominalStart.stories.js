import InputNominalStart from "../components/Input/InputNominalStart.vue";
import { ref } from "vue";

  export default {
    title: 'Components/InputField/NominalStart',
    component: InputNominalStart,
    tags: ['autodocs'],
    argTypes : {
      unit : { control:"text" },
      placeholder : { control:"text" },
    },
    args: {
      label: "Presentase DP",
      required: true,
      disabled: false,
      unit: "Rupiah",
      placeholder: "Masukkan presentase DP",
      modelValue: "modelValue"
    },
    render: (args) => ({
      components: { InputNominalStart },
      setup() {
        const modelValue = ref(""); // Hubungkan dengan args
        return { args, modelValue };
      },
      template: `
        <InputNominalStart v-bind="args" v-model="modelValue" />
      `,
    }),
  };

  export const NominalEnd = {
  };




  
