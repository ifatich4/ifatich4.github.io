import TabGroup from "../components/Tab/TabGroup.vue";

export default {
  title: 'Components/Tab/Default',
  component: TabGroup,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of tab items with label, icon, and action',
      table: {
        type: { summary: 'Array<{label: string, icon: string, active: boolean, action: function}>' }
      }
    }
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 500px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
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






  




  
