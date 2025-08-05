import LabelIcon from "../components/Label/LabelIcon.vue";

  export default {
    title: 'Components/Label/WithIcon',
    component: LabelIcon,
    tags: ['autodocs'],
    argTypes : {
      variant: {control: "select", options: ["default", "blue", "green", "yellow", "red"] },
      text: { control: "text" },
      iconStart: { control: "boolean" },
      iconEnd: { control: "boolean" },
      tooltip: { control: "text" },
      tooltipPosition: { control: "select", options: ["top", "bottom", "left", "right"] },
    },
    args: {
      text: "Status",
      variant: "default",
      iconStart: true,
      iconEnd: false,
      tooltip: `https://ifatich4.github.io/static/media/black.dfed9e1e.svg`,
      tooltipPosition: "top",
    },
  };

    export const DefaultIconEnd = {
    args: {
      iconEnd: true,
      iconStart: false,
    },
  };

  export const Red = {
    args: {
      variant: "red",
    },
  };

  export const Green = {
    args: {
      variant: "green",
    },
  };

  export const Yellow = {
    args: {
      variant: "yellow",
    },
  };

  export const Blue = {
    args: {
      variant: "blue",
    },
  };