import AddAmountCounter from "../components/AddAmount/AddAmountCounter.vue";

 export default {
    title: 'Components/AddAmountCounter',
    component: AddAmountCounter,
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  };

  export const Basic = {
      render: (args) => ({
        components: { AddAmountCounter },
        setup() {
          return { args };
        },
        template: `
          <AddAmountCounter/>
        `,
      }),
  }