import TabProduct from "../components/Tab/TabProduct.vue";


  export default {
    title: 'Components/Tab/Product',
    component: TabProduct,
    tags: ['autodocs'],
    args: {
      items: [
        {
            label: "Tabungan Emas",
            active: true,
            action: function () {
                return "/";
            },
            icon: "/assets/images/ico-tabungan.svg",
        },
        {
            label: "Pinjamattn",
            active: false,
            action: function () {
                return "/";
            },
            icon: "/assets/images/ico-uang.svg",
        },
        {
            label: "Gadai",
            active: false,
            action: function () {
                return "/";
            },
            icon: "/assets/images/ico-invest-emas.svg",
        },
        {
            label: "Pembiayaan",
            active: false,
            action: function () {
                return "/";
            },
            icon: "/assets/images/ico-pembiayaan-no-bg.svg",
        },
        {
            label: "Cicil Emas",
            active: false,
            action: function () {
                return "/";
            },
            icon: "/assets/images/ico-cicil-emas-no-bg.svg",
        },
        {
            label: "Pembayaran & Topup",
            active: false,
            action: function () {
                return "/";
            },
            icon: "/assets/images/ico-pembayaran-no-bg.svg",
        },
        {
            label: "Titipan Emas",
            active: false,
            action: function () {
                return "/";
            },
            icon: "/assets/images/ico-gadai-titipan-emas-fisik.svg",
        },
    
      ]
    },
  };

  export const Default = {
  };






  




  
