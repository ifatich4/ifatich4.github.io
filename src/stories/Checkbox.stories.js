import CustomCheckbox from "../components/Checkbox/CustomCheckbox.vue";

  export default {
    title: 'Components/Checkbox',
    component: CustomCheckbox,
    tags: ['autodocs'],
    argTypes: {
      color: {
        control: 'select',
        options : ["primary", "secondary"],
      },
      label : {
        control: 'text'
      },
      checkboxTextClass: {
        control: 'text'
      },
    },
    args: {
      color: "primary",
      label: 'Custom Checkbox',
      checkboxTextClass: 'checkbox-text px-2',
      modelValue: false,
    }
  };

  export const Checkbox = {
    args: {
      color: "primary",
      label: 'Custom Checkbox',
      checkboxTextClass: 'checkbox-text px-2',
    },
    render: (args) => ({
      components: { CustomCheckbox },
      setup() {
        return { args };
      },
      template: `
        <div>
          <CustomCheckbox v-bind="args"/>
        </div>
      `,
    }),
  };