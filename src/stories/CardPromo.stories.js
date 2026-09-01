import CardPromo from "../components/Card/CardPromo.vue";

export default {
  title: 'Components/Card/CardPromo',
  component: CardPromo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Promo untuk menampilkan informasi promo lengkap dengan kode promo, periode, dan panduan penggunaan.',
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
    title: {
      control: 'text',
      description: 'Judul promo',
    },
    promoCode: {
      control: 'text',
      description: 'Kode promo yang bisa disalin',
    },
    periode: {
      control: 'text',
      description: 'Periode berlaku promo',
    },
    countDownLabel: {
      control: 'text',
      description: 'Label countdown/status promo',
    },
  },
  args: {
    title: "Diskon 40% Buka Tabungan Emas di Pegadaian",
    promoCode: "TABEMAS40",
    periode: "01 Jan - 30 Apr 2024",
    countDownLabel: "Berakhir dalam 30 hari",
  },
};

export const Default = {
  args: {
    title: "Diskon 40% Buka Tabungan Emas di Pegadaian",
    promoCode: "TABEMAS40",
    periode: "01 Jan - 30 Apr 2024",
    countDownLabel: "Berakhir dalam 30 hari",
  },
};

export const PromoGadai = {
  args: {
    title: "Cashback 50% Biaya Admin Gadai Emas",
    promoCode: "GADAI50",
    periode: "01 Feb - 28 Feb 2024",
    countDownLabel: "Promo Spesial",
  },
};

export const PromoHariRaya = {
  args: {
    title: "Promo Spesial Hari Raya - Gratis Biaya Titip",
    promoCode: "LEBARAN2024",
    periode: "01 Mar - 15 Apr 2024",
    countDownLabel: "Terbatas!",
  },
};
