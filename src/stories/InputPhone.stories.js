import InputPhone from "../components/Input/InputPhone.vue";
import { ref } from "vue";

  export default {
    title: 'Components/InputField/Phone',
    component: InputPhone,
    tags: ['autodocs'],
    argTypes: {
      label: { control: "text" },
      error: { control: "text" },
      required: { control: "boolean" },
      phoneCodeLength: { control: "number" },
    },
    args: {
      label: "Nomor Telepon",
      required: true,
      error: null,
      phoneCodeLength: 4,
    },
  };

  export const Phone = {
        render: (args) => ({
          components: { InputPhone },
          setup() {
            const phoneCodeModelValue = ref("");
            const phoneNumberModelValue = ref(""); // Hubungkan dengan args
            return { args, phoneCodeModelValue, phoneNumberModelValue };
          },
          template: `
            <InputPhone v-bind="args"
            modelValue="phoneCodeModelValue"
            />
          `,
    }),
  };




  
