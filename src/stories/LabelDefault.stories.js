import LabelIcon from "../components/Label/LabelIcon.vue";

  export default {
    title: 'Components/Label/WithIcon',
    component: LabelIcon,
    tags: ['autodocs'],
    argTypes : {
      variant: {control: "select", options: ["default", "blue", "green", "yellow", "red"] },
    },
    args: {
      text: "Status",
      variant: "default",
      icon: "	https://ifatich4.github.io/img/ico-image-upload.1e0a3166.svg"
    },
  };

  export const DefaultLabel = {
  };