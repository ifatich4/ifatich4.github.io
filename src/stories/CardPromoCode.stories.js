import CardPromoCode from "../components/Card/CardPromoCode.vue";
import { ref } from 'vue';

export default {
  title: 'Components/Card/CardPromoCode',
  component: CardPromoCode,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Promo Code untuk menampilkan kode promo dengan fitur salin kode ke clipboard.',
      },
    },
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 400px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    label: {
      control: 'text',
      description: 'Deskripsi promo',
    },
    code: {
      control: 'text',
      description: 'Kode promo yang dapat disalin',
    },
  },
  args: {
    label: 'Diskon 40% Buka Tabungan Emas',
    code: 'RENCANAEMAS',
  },
};

export const Default = {
  args: {
    label: 'Diskon 40% Buka Tabungan Emas',
    code: 'RENCANAEMAS',
  },
};

export const DiskonGadai = {
  args: {
    label: 'Diskon Biaya Admin Gadai 25%',
    code: 'GADAIHEMAT25',
  },
};

export const Cashback = {
  args: {
    label: 'Cashback Rp50.000 untuk Transaksi Pertama',
    code: 'NEWUSER50K',
  },
};

export const FreeAdmin = {
  args: {
    label: 'Gratis Biaya Admin Tabungan Emas',
    code: 'FREEADMIN',
  },
};

// Promo carousel/list showcase
export const PromoList = {
  render: () => ({
    components: { CardPromoCode },
    template: `
      <div style="display: flex; gap: 16px; overflow-x: auto; padding: 16px 0;">
        <CardPromoCode 
          label="Diskon 40% Buka Tabungan"
          code="RENCANAEMAS"
        />
        <CardPromoCode 
          label="Cashback Rp50.000"
          code="NEWUSER50K"
        />
        <CardPromoCode 
          label="Gratis Biaya Admin"
          code="FREEADMIN"
        />
        <CardPromoCode 
          label="Diskon Gadai 25%"
          code="GADAIHEMAT25"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tampilan carousel/horizontal scroll untuk multiple promo code.',
      },
    },
  },
};

// Grid layout
export const PromoGrid = {
  render: () => ({
    components: { CardPromoCode },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 600px;">
        <CardPromoCode 
          label="Diskon 40% Buka Tabungan Emas"
          code="RENCANAEMAS"
        />
        <CardPromoCode 
          label="Cashback Rp50.000"
          code="NEWUSER50K"
        />
        <CardPromoCode 
          label="Gratis Biaya Admin"
          code="FREEADMIN"
        />
        <CardPromoCode 
          label="Diskon Gadai 25%"
          code="GADAIHEMAT25"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Grid layout untuk menampilkan beberapa promo code.',
      },
    },
  },
};
