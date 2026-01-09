import Breadcrumb from '../components/Breadcrumb/Breadcrumb.vue';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 600px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
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
  