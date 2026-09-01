import LineChart from "../components/Chart/LineChart.vue";

export default {
  title: 'Components/Chart/LineChart',
  component: LineChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Line Chart component untuk visualisasi data trend dalam bentuk garis dengan support gradient fill dan custom tooltip.',
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 800px; height: 400px; padding: 24px; margin: 0 auto;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    labels: {
      control: 'object',
      description: 'Array label untuk sumbu X',
    },
    datasets: {
      control: 'object',
      description: 'Array dataset untuk chart',
    },
    options: {
      control: 'object',
      description: 'Konfigurasi tambahan Chart.js',
    },
  },
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Penjualan',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: '#00AB4E',
      },
    ],
  },
};

export const Default = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Penjualan Emas',
        data: [65, 59, 80, 81, 56, 55, 70],
        backgroundColor: '#00AB4E',
      },
    ],
  },
};

export const MultipleLines = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Penjualan',
        data: [65, 59, 80, 81, 56, 55, 70],
        backgroundColor: '#00AB4E',
      },
      {
        label: 'Pembelian',
        data: [45, 29, 40, 50, 36, 35, 50],
        backgroundColor: '#E07E26',
      },
    ],
  },
};

export const HargaEmas = {
  args: {
    labels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
    datasets: [
      {
        label: 'Harga Emas (Rp/gram)',
        data: [1050000, 1055000, 1048000, 1060000, 1065000, 1062000, 1070000],
        backgroundColor: '#FFD700',
      },
    ],
  },
};

export const PerbandinganTarget = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Target',
        data: [100, 110, 120, 130, 140, 150],
        backgroundColor: '#9E9E9E',
      },
      {
        label: 'Realisasi',
        data: [95, 115, 118, 135, 145, 155],
        backgroundColor: '#00AB4E',
      },
    ],
  },
};

export const TrendTahunan = {
  args: {
    labels: ['2019', '2020', '2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'Nasabah Baru (ribuan)',
        data: [120, 150, 180, 220, 280, 350],
        backgroundColor: '#1976D2',
      },
    ],
  },
};
