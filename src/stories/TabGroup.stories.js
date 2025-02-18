import TabGroup from "../components/Tab/TabGroup.vue";


  export default {
    title: 'Components/Tab/Default',
    component: TabGroup,
    tags: ['autodocs'],
    args: {
      items: [
        {
          label: "Title",
          active: true,
          action: function () {
              return "/";
          },
          icon: "/assets/images/ico-tabungan.svg",
      },
      {
          label: "Title 2",
          active: false,
          action: function () {
              return "/";
          },
          icon: "/assets/images/ico-uang.svg",
      },
      {
          label: "Title_3",
          active: false,
          action: function () {
              return "/";
          },
          icon: "/assets/images/ico-invest-emas.svg",
      },
      ]
    },
  };

  export const Default = {
  };






  




  
