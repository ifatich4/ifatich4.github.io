import Accordion from "../components/Accordion/Accordion.vue";
import AccordionItem from "../components/Accordion/AccordionItem.vue";

 
 export default {
    title: 'Components/Accordion/Group',
    component: Accordion,
    tags: ['autodocs'],
    args: {
      free: false,
      id: "default",
      default : 
      `
        <AccordionItem header="Test header accordion" active>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AccordionItem>
        <AccordionItem header="Test header accordion 2" >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AccordionItem>
        <AccordionItem header="Test header accordion 3" >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AccordionItem>
      `
    },
    render: (args) => ({
      components: { Accordion, AccordionItem},
      setup() {
        return { args };
      },
      template: `
        <Accordion v-bind="args">
            ${args.default}
        </Accordion>
      `,
    }),
  };

  export const Group = {

  }