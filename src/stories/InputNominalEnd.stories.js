  import { ref } from "vue";
import InputNominalEnd from "../components/Input/InputNominalEnd.vue";
  export default {
    title: 'Components/InputField/NominalEnd',
    component: InputNominalEnd,
    tags: ['autodocs'],
    args: {
      id: "1",
      title: "Presentase DP",
      required: true,
      disabled: false,
      errorMessage: "Masukkan nilai presentase yang benar.",
      unit: "%",
      placeholder: "Masukkan presentase DP"
    },
    render: (args) => ({
          components: { InputNominalEnd },
          setup() {
            const modelValue = ref(""); // Hubungkan dengan args
            return { args, modelValue };
          },
          template: `
            <InputNominalEnd v-bind="args" v-model="modelValue" />
            <a>{{modelValue}}</a>
          `,
        }),
  };

  export const NominalEnd = {
  };




  
