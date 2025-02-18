import { ref } from "vue";
import InputText from "../components/Input/InputText.vue";

  export default {
    title: 'Components/InputField/Default',
    component: InputText,
    tags: ['autodocs'],
    argTypes : {
      label : { control:"text" },
      error : { control: "text" },
      class: { control: "text" },
      helperText: {control: "text"},
      type: {control: "select", options: ["text", "number"] },
      color: {control: "select", options: ["default", "blue", "green", "orange", "red"] },
      suffix : { control: "text" },
      prefix : { control: "text" },
    },
    args: {
      label: "Nama Lengkap",
      required: true,
      disabled: false,
      placeholder: "Masukkan nama lengkap",
      type: "text",
      error : null,
      helperText: "Ini adalah helpertext",
      color: "default",
    },
    render: (args) => ({
          components: { InputText },
          setup() {
            const modelValue = ref(""); // Hubungkan dengan args
            return { args, modelValue };
          },
          template: `
            <InputText v-bind="args" v-model="modelValue">
              <template v-if="args.prefix" #prefix >
                ${args.prefix}
              </template>
              <template v-if="args.prefix" #suffix >
                ${args.suffix}
              </template>
            </InputText>
          `,
    }),
  };

  export const Text = {
    args: {
      modelValue: "modelValue",
    }
  };

  export const WithPrefixAndSuffixIcon = {
    args: {
      modelValue: "modelValue",
      suffix: 
      "<svg class=\"me-3\" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'> <path fill-rule='evenodd' clip-rule='evenodd' d='M18.0421 10.6771C18.3546 11.0448 18.7972 11.2747 19.2872 11.2747C19.4131 11.2747 19.5359 11.2595 19.6541 11.2307C19.4718 12.9019 19.0859 15.0111 18.2693 16.4454V16.4453H12.0001H5.73064V16.4453C4.91399 15.011 4.52812 12.902 4.34583 11.2309C4.46407 11.2596 4.58685 11.2748 4.71276 11.2748C5.20282 11.2748 5.64543 11.0449 5.95789 10.6771C6.47266 11.3167 7.22072 11.7199 8.05192 11.7199C9.39751 11.7199 10.5251 10.6633 10.798 9.25751C11.1075 9.59651 11.5321 9.806 12 9.806H12.0001V9.80615C12.4679 9.80608 12.8925 9.59662 13.2019 9.2577C13.4748 10.6634 14.6025 11.7199 15.9481 11.7199C16.7793 11.7199 17.5274 11.3167 18.0421 10.6771Z' fill='#FFC02E'/> <mask id='mask0_0_6437' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='3' y='6' width='18' height='13'> <path fill-rule='evenodd' clip-rule='evenodd' d='M12 6C11.0556 6 10.2872 6.85373 10.2872 7.90308C10.2872 8.43257 10.4829 8.91222 10.798 9.2575C10.5252 10.6633 9.39752 11.7199 8.05193 11.7199C7.22073 11.7199 6.47267 11.3167 5.9579 10.6771C6.24759 10.3361 6.4254 9.87657 6.4254 9.37173C6.4254 8.32239 5.65718 7.46866 4.71277 7.46866C3.76836 7.46866 3 8.32239 3 9.37173C3 10.2812 3.57714 11.0437 4.34583 11.2308C4.52813 12.902 4.914 15.011 5.73065 16.4453V18.2017C5.73065 18.527 5.96796 18.7907 6.26074 18.7907H12.0001H17.7393C18.032 18.7907 18.2693 18.527 18.2693 18.2017V16.4454C19.086 15.0111 19.4718 12.9019 19.6541 11.2307C20.4228 11.0436 21 10.2811 21 9.37173C21 8.32239 20.2316 7.46866 19.2872 7.46866C18.3428 7.46866 17.5746 8.32239 17.5746 9.37173C17.5746 9.87652 17.7524 10.3361 18.0421 10.6771C17.5274 11.3167 16.7793 11.7199 15.9481 11.7199C14.6025 11.7199 13.4748 10.6634 13.2019 9.25769C13.4383 8.9987 13.6075 8.66411 13.6773 8.28957C13.7005 8.16474 13.7128 8.03546 13.7128 7.90308C13.7128 7.60772 13.6519 7.32787 13.5434 7.07818C13.2663 6.44082 12.6787 6.00006 12.0001 6H12Z' fill='white'/> </mask> <g mask='url(#mask0_0_6437)'> <rect width='24' height='24' fill='grey'/> </g> </svg>",
      prefix: 
      `<svg class="ms-3" width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'> <path fill-rule='evenodd' clip-rule='evenodd' d='M18.0421 10.6771C18.3546 11.0448 18.7972 11.2747 19.2872 11.2747C19.4131 11.2747 19.5359 11.2595 19.6541 11.2307C19.4718 12.9019 19.0859 15.0111 18.2693 16.4454V16.4453H12.0001H5.73064V16.4453C4.91399 15.011 4.52812 12.902 4.34583 11.2309C4.46407 11.2596 4.58685 11.2748 4.71276 11.2748C5.20282 11.2748 5.64543 11.0449 5.95789 10.6771C6.47266 11.3167 7.22072 11.7199 8.05192 11.7199C9.39751 11.7199 10.5251 10.6633 10.798 9.25751C11.1075 9.59651 11.5321 9.806 12 9.806H12.0001V9.80615C12.4679 9.80608 12.8925 9.59662 13.2019 9.2577C13.4748 10.6634 14.6025 11.7199 15.9481 11.7199C16.7793 11.7199 17.5274 11.3167 18.0421 10.6771Z' fill='#FFC02E'/> <mask id='mask0_0_6437' style='mask-type:alpha' maskUnits='userSpaceOnUse' x='3' y='6' width='18' height='13'> <path fill-rule='evenodd' clip-rule='evenodd' d='M12 6C11.0556 6 10.2872 6.85373 10.2872 7.90308C10.2872 8.43257 10.4829 8.91222 10.798 9.2575C10.5252 10.6633 9.39752 11.7199 8.05193 11.7199C7.22073 11.7199 6.47267 11.3167 5.9579 10.6771C6.24759 10.3361 6.4254 9.87657 6.4254 9.37173C6.4254 8.32239 5.65718 7.46866 4.71277 7.46866C3.76836 7.46866 3 8.32239 3 9.37173C3 10.2812 3.57714 11.0437 4.34583 11.2308C4.52813 12.902 4.914 15.011 5.73065 16.4453V18.2017C5.73065 18.527 5.96796 18.7907 6.26074 18.7907H12.0001H17.7393C18.032 18.7907 18.2693 18.527 18.2693 18.2017V16.4454C19.086 15.0111 19.4718 12.9019 19.6541 11.2307C20.4228 11.0436 21 10.2811 21 9.37173C21 8.32239 20.2316 7.46866 19.2872 7.46866C18.3428 7.46866 17.5746 8.32239 17.5746 9.37173C17.5746 9.87652 17.7524 10.3361 18.0421 10.6771C17.5274 11.3167 16.7793 11.7199 15.9481 11.7199C14.6025 11.7199 13.4748 10.6634 13.2019 9.25769C13.4383 8.9987 13.6075 8.66411 13.6773 8.28957C13.7005 8.16474 13.7128 8.03546 13.7128 7.90308C13.7128 7.60772 13.6519 7.32787 13.5434 7.07818C13.2663 6.44082 12.6787 6.00006 12.0001 6H12Z' fill='white'/> </mask> <g mask='url(#mask0_0_6437)'> <rect width='24' height='24' fill='grey'/> </g> </svg>`
    }
  };

  export const Number = {
    args: {
      label: "NIK KTP",
      placeholder : "Masukkan NIK KTP",
      type: "number",
    },
  };

  export const Red = {
    args: {
      color: "red",
    },
  };

  export const Blue = {
    args: {
      color: "blue",
    },
  };

  export const Green = {
    args: {
      color: "green",
    },
  };

  export const Orange = {
    args: {
      color: "orange",
    },
  };




  
