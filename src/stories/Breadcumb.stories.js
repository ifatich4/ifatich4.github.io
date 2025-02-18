import Breadcrumb from '../components/Breadcrumb/Breadcrumb.vue';


 export default {
    title: 'Components/Breadcumb',
    component: Breadcrumb,
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    argTypes: {
      items: {
        control: "object"
      },
      args: {
        items: ["Beranda", "Produk", "Layanan Jasa", "Safe Deposit Box"],
      },
    } 
  };

  export const BreadcumbArray = {
    args: {
      items: ["Beranda", "Produk", "Layanan Jasa", "Safe Deposit Box"],
    },
  };
  