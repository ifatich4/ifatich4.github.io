import Switch from "../components/Switch/Switch.vue";


  export default {
    title: 'Components/Switch',
    component: Switch,
    tags: ['autodocs'],
    argTypes: {
      id : {
        control: 'text'
      },
    },
    args: {
      id: "switch",
      modelValue: false,
    }
  };

  export const Default = {
  };