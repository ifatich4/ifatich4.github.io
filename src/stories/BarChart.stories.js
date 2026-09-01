import BarChart from "../components/Chart/BarChart.vue";

export default {
  title: 'Components/Chart/BarChart',
  component: BarChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bar Chart component untuk visualisasi data dalam bentuk batang vertikal dengan support custom tooltip dan berbagai konfigurasi.',
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
    showVerticalLine: {
      control: 'boolean',
      description: 'Tampilkan garis vertikal pada chart',
    },
    options: {
      control: 'object',
      description: 'Konfigurasi tambahan Chart.js',
    },
  },
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Transaksi',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#00AB4E',
      },
    ],
    showVerticalLine: true,
  },
};

export const Default = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Transaksi Gadai',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#00AB4E',
      },
    ],
    showVerticalLine: true,
  },
};

export const MultipleDatasets = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Gadai Emas',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#00AB4E',
      },
      {
        label: 'Tabungan Emas',
        data: [45, 49, 60, 71, 46, 65],
        backgroundColor: '#E07E26',
      },
    ],
    showVerticalLine: true,
  },
};

export const WithoutVerticalLine = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Transaksi',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#1976D2',
      },
    ],
    showVerticalLine: false,
  },
};

export const QuarterlyData = {
  args: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Target',
        data: [100, 120, 130, 150],
        backgroundColor: '#9E9E9E',
      },
      {
        label: 'Realisasi',
        data: [95, 125, 140, 160],
        backgroundColor: '#00AB4E',
      },
    ],
    showVerticalLine: true,
  },
};
