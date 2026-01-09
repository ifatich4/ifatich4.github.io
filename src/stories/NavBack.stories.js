import NavBackNavigator from "../components/Navbar/NavBackNavigator.vue";

export default {
  title: 'Components/Navigation/BackNavigation',
  component: NavBackNavigator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Navigasi kembali dengan tombol back dan label halaman.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label teks yang ditampilkan di samping tombol back',
    },
    action: {
      action: 'clicked',
      description: 'Callback function saat tombol back diklik',
    },
  },
  args: {
    label: "Beli Tabungan Emas",
  },
};

export const Default = {};

export const WithCustomLabel = {
  args: {
    label: "Detail Transaksi",
  },
};

export const LongLabel = {
  args: {
    label: "Pengajuan Pembiayaan Kredit Usaha Rakyat",
  },
};