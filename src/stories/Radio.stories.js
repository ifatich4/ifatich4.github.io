import { ref } from "vue";
import Radio from "../components/Radio/Radio.vue";

  export default {
    title: 'Components/Radio',
    component: Radio,
    tags: ['autodocs'],
    args: {
      items: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
        { value: 'option4', text: 'Option 4' },
      ],
      selected : "option1"
    },
    render: (args) => ({
            components: { Radio },
            setup() {
              const modelValue = ref(null)
              return { args, modelValue };
            },
            template: `
                <div class="d-flex flex-column">
                  <Radio v-bind="args" v-model="args.modelValue"/>
                  <b class="py-2">Selected Radio: {{args.modelValue}}</b>
                </div>
            `,      
          }),

  };

  export const RadioComponent = {
    args : {
      modelValue: 0
    }
  };