import Accordion from "../components/Accordion/Accordion.vue";
import AccordionItem from "../components/Accordion/AccordionItem.vue";

 
 export default {
    title: 'Components/Accordion/Single',
    component: AccordionItem,
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    argTypes: {
      header: {
        control: "text"
      },
      active: {
        control: 'boolean',
      },
      id: {
        control: 'text',
      },
    },
    args: {
      header: "AccordionItem",
      active: true,
      id: "default",
    },
    render: (args) => ({
      components: { Accordion, AccordionItem},
      setup() {
        return { args };
      },
      template: `
       <Accordion>
          <AccordionItem header="args.header" id="args.id" v-bind="args">
             ${args.default}
          </AccordionItem>
        </Accordion>
      `,
    }),
  };

  export const Single = {
    args: {
      default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`
    },
}