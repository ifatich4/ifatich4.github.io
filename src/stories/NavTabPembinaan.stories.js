import TabPembinaan from "../components/Navbar/TabPembinaan.vue";


  export default {
    title: 'Components/Navigation/TabPembinaan',
    component: TabPembinaan,
    tags: ['autodocs'],
    args: {
      title: "Langkah",
      labels: [
        { id: "1", label: "Kondisi Usaha / Ekonomi", completed: true },
        { id: "2", label: "Aktivitas Pembinaan", completed: false },
        { id: "3", label: "Keadaan Debitur", completed: false },
        { id: "4", label: "Kondisi Usaha / Ekonomi", completed: false },
        { id: "5", label: "Kondisi Agunan", completed: false },
        { id: "6", label: "Catatan", completed: false },
      ],
      action: function () {
        window.history.go(-1);
      },
    },
    render: (args) => ({
            components: { TabPembinaan },
            setup() {
              return { args };
            },
            template: `
                <div class="d-flex flex-column">
                  <TabPembinaan v-bind="args">
                  </TabPembinaan>
                  <b class="py-2">Selected Tab: {{args.labels[args.currentlySelected].label}}</b>
                </div>
            `,      
          }),

  };

  export const Tab = {
    args : {
      currentlySelected: 0
    }
  };






  
