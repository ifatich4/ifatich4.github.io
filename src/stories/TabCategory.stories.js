import TabKategori from "../components/Tab/TabKategori.vue";

export default {
  title: 'Components/Tab/Category',
  component: TabKategori,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 400px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
  args: {
        items: [
            {
                label: "Konvensional",
                active: true,
                action: function () {
                    return "/";
                },
            },
            {
                label: "Syariah",
                active: false,
                action: function () {
                    return "/";
                },
            },
        
        ]
    },
  };

  export const Default = {
  };






  




  
