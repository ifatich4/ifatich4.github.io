import Label from "../components/Label/Label.vue";

  export default {
    title: 'Components/Label/Default',
    component: Label,
    tags: ['autodocs'],
    argTypes : {
      variant: {control: "select", options: ["default", "blue", "green", "yellow", "red"] },
    },
    args: {
      text: "Status",
      variant: "default",
    },
  };

  export const DefaultLabel = {
  };






  
