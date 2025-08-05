import TooltipComponent from "../components/Tooltip/TooltipComponent.vue";

  export default {
    title: 'Components/Tooltip',
    component: TooltipComponent,
    tags: ['autodocs'],
    argTypes: {
      color : { control: "select", options: [ "black", "white" ] }
    },
    args: {
      color: "black",
    },
  };

  export const TooltipBlack = {
    args: {
      color: "black",
    },
      
  };

   export const TooltipWhite = {
    args: {
      color: "white",
    },
  };  





  




  
