import Load from "../components/Modal/Load.vue";

  export default {
    title: 'Components/Loader',
    component: Load,
    tags: ['autodocs'],
    argTypes: {
      count: {
        control: 'number',
        description: 'Number of animation dots/elements',
        table: {
          type: { summary: 'number' },
          defaultValue: { summary: '50' }
        }
      },
      persistent: {
        control: 'boolean',
        description: 'Prevent closing by clicking backdrop',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'true' }
        }
      },
      title: {
        control: 'text',
        description: 'Loading dialog title text',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: '"Memproses Data"' }
        }
      },
      modelValue: {
        control: 'boolean',
        description: 'Show/hide loader (v-model)',
        table: {
          type: { summary: 'boolean' },
          defaultValue: { summary: 'false' }
        }
      }
    },
    args: {
      count: 50,
      persistent: true,
      title: "Memproses Data",
      modelValue: true,
    },
  };

  export const Loader = {
  };






  
