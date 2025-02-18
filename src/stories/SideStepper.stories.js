// import { ref } from "vue";
import StepperComponents from "../components/Stepper/Stepper.vue";
import SideStepper from "../components/SideStepper/SideStepper.vue";


  export default {
    title: 'Components/Stepper/Side Stepper',
    component: SideStepper,
    tags: ['autodocs'],
    argTypes : {
      variant : {
        control: "select", options : ["satu", "dua"] 
      }
    },
    args: {
      title: "Langkah",
      labels: [
        { id: 1, label: 'Step 1', completed: false },
        { id: 2, label: 'Step 2', completed: false },
        { id: 3, label: 'Step 3', completed: false },
        { id: 4, label: 'Step 4', completed: false }
      ],
      variant : "dua",
      accordions: [{
        header: 'Accordion 1',
        labels: [{
                id: 1,
                label: 'Trigger Step 1',
                completed: false
                },
                {
                    id: 2,
                    label: 'Trigger Step 2',
                    completed: false
                },
            ]
        },
        {
            header: 'Accordion 2',
            labels: [{
                    id: 3,
                    label: 'Trigger Step 3',
                    completed: false
                },
                {
                    id: 4,
                    label: 'Trigger Step 4',
                    completed: false
                },
            ]
        }
      ],
    },
    render: (args) => ({
      components: { SideStepper, StepperComponents },
      setup() {
        const items= [
          "MENU 1",
          "MENU 2",
          "MENU 3",
          "MENU 4",
      ]
        return { args, items };
      },
      template: `
            <SideStepper v-bind="args">
             ${args.activeLabel}
            </SideStepper>
      `,      
    }),
  };

  export const Side = {
    args: {
      activeLabel : 
      `<template v-for="step in args.labels.length" #[step]>
        <StepperComponents :activeStep=step :items="items" />
        </template>
      `,
    }
  };






  
