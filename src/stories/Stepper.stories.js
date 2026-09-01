// import { ref } from "vue";
import StepperComponents from "../components/Stepper/Stepper.vue";

  export default {
    title: 'Components/Stepper/Stepper',
    component: StepperComponents,
    tags: ['autodocs'],
    argTypes: {
      items: {
        control: 'object',
        description: 'Array of step items/labels',
        table: {
          type: { summary: 'Array<string>' },
          defaultValue: { summary: '[]' }
        }
      },
      activeStep: {
        control: 'number',
        description: 'Currently active step index',
        table: {
          type: { summary: 'number' },
          defaultValue: { summary: '0' }
        }
      },
      label: {
        control: 'text',
        description: 'Label text prefix for steps',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '"Langkah"' }
        }
      }
    },
    args: {
      items: [
        "MENU 1",
        "MENU 2",
        "MENU 3",
        "MENU 4",
    ],
      activeStep: 1,
      label: "Langkah",
    },
  };

  export const Step = {
  };






  
