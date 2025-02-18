import TabKategori from "../components/Tab/TabKategori.vue";


  export default {
    title: 'Components/Tab/Category',
    component: TabKategori,
    tags: ['autodocs'],
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






  




  
