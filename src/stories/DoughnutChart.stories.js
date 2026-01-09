import DoughnutChart from "../components/Chart/DoughnutChart.vue";

export default {
  title: 'Components/Chart/DoughnutChart',
  component: DoughnutChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Doughnut Chart component untuk visualisasi data dalam bentuk donat dengan support custom tooltip dan warna.',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 500px; height: 400px; padding: 24px; margin: 0 auto;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    labels: {
      control: 'object',
      description: 'Array label untuk setiap segmen',
    },
    values: {
      control: 'object',
      description: 'Array nilai untuk setiap segmen',
    },
    colors: {
      control: 'object',
      description: 'Array warna untuk setiap segmen',
    },
    class: {
      control: 'text',
      description: 'CSS class tambahan',
    },
    options: {
      control: 'object',
      description: 'Konfigurasi tambahan Chart.js',
    },
  },
  args: {
    labels: ['Gadai Emas', 'Tabungan Emas', 'Kredit', 'Lainnya'],
    values: [40, 30, 20, 10],
    colors: ['#00AB4E', '#E07E26', '#1976D2', '#9E9E9E'],
  },
};

export const Default = {
  args: {
    labels: ['Gadai Emas', 'Tabungan Emas', 'Kredit', 'Lainnya'],
    values: [40, 30, 20, 10],
    colors: ['#00AB4E', '#E07E26', '#1976D2', '#9E9E9E'],
  },
};

export const TwoSegments = {
  args: {
    labels: ['Konvensional', 'Syariah'],
    values: [60, 40],
    colors: ['#00AB4E', '#1976D2'],
  },
};

export const PortofolioInvestasi = {
  args: {
    labels: ['Emas Batangan', 'Emas Perhiasan', 'Logam Mulia', 'Tabungan'],
    values: [35, 25, 25, 15],
    colors: ['#FFD700', '#FFA500', '#C0C0C0', '#00AB4E'],
  },
};

export const StatusTransaksi = {
  args: {
    labels: ['Berhasil', 'Pending', 'Gagal'],
    values: [75, 15, 10],
    colors: ['#00AB4E', '#E07E26', '#F44336'],
  },
};

export const CustomSize = {
  args: {
    labels: ['Gadai', 'Tabungan', 'Kredit'],
    values: [50, 30, 20],
    colors: ['#00AB4E', '#E07E26', '#1976D2'],
    class: 'max-w-xs',
  },
  decorators: [
    () => ({
      template: '<div style="max-width: 300px;"><story /></div>',
    }),
  ],
};
