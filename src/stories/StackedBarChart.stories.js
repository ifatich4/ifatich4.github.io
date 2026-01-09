import StackedBarChart from "../components/Chart/StackedBarChart.vue";

export default {
  title: 'Components/Chart/StackedBarChart',
  component: StackedBarChart,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Stacked Bar Chart component untuk visualisasi data dalam bentuk batang bertumpuk dengan support legend dan custom tooltip.',
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
      description: 'Array dataset untuk chart (akan ditumpuk)',
    },
    showLegend: {
      control: 'boolean',
      description: 'Tampilkan legend chart',
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Gadai Emas',
        data: [40, 35, 45, 50, 42, 48],
        backgroundColor: '#00AB4E',
      },
      {
        label: 'Tabungan Emas',
        data: [30, 28, 35, 32, 38, 40],
        backgroundColor: '#E07E26',
      },
    ],
    showLegend: true,
  },
};

export const Default = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Gadai Emas',
        data: [40, 35, 45, 50, 42, 48],
        backgroundColor: '#00AB4E',
      },
      {
        label: 'Tabungan Emas',
        data: [30, 28, 35, 32, 38, 40],
        backgroundColor: '#E07E26',
      },
    ],
    showLegend: true,
  },
};

export const ThreeDatasets = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Gadai Emas',
        data: [40, 35, 45, 50, 42, 48],
        backgroundColor: '#00AB4E',
      },
      {
        label: 'Tabungan Emas',
        data: [30, 28, 35, 32, 38, 40],
        backgroundColor: '#E07E26',
      },
      {
        label: 'Kredit',
        data: [20, 22, 18, 25, 20, 22],
        backgroundColor: '#1976D2',
      },
    ],
    showLegend: true,
  },
};

export const WithoutLegend = {
  args: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Konvensional',
        data: [100, 120, 130, 150],
        backgroundColor: '#00AB4E',
      },
      {
        label: 'Syariah',
        data: [80, 90, 100, 110],
        backgroundColor: '#1976D2',
      },
    ],
    showLegend: false,
  },
};

export const PerbandinganCabang = {
  args: {
    labels: ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar'],
    datasets: [
      {
        label: 'Target',
        data: [100, 80, 90, 70, 60],
        backgroundColor: '#9E9E9E',
      },
      {
        label: 'Realisasi',
        data: [95, 85, 92, 75, 58],
        backgroundColor: '#00AB4E',
      },
    ],
    showLegend: true,
  },
};

export const KategoriProduk = {
  args: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Emas Batangan',
        data: [25, 28, 32, 30, 35, 38],
        backgroundColor: '#FFD700',
      },
      {
        label: 'Emas Perhiasan',
        data: [20, 22, 25, 24, 28, 30],
        backgroundColor: '#FFA500',
      },
      {
        label: 'Logam Mulia',
        data: [15, 18, 16, 20, 22, 25],
        backgroundColor: '#C0C0C0',
      },
      {
        label: 'Elektronik',
        data: [10, 12, 14, 15, 12, 18],
        backgroundColor: '#1976D2',
      },
    ],
    showLegend: true,
  },
};
