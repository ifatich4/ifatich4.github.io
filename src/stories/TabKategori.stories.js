import TabKategori from "../components/Tab/TabKategori.vue";
import { ref } from "vue";

export default {
  title: 'Components/Tab/TabKategori',
  component: TabKategori,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tab Kategori untuk menampilkan dan memfilter konten berdasarkan kategori.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array kategori tabs',
    },
  },
};

export const Default = {
  render: (args) => ({
    components: { TabKategori },
    setup() {
      const activeTab = ref(0);
      const items = [
        { label: 'Semua', value: 'all' },
        { label: 'Gadai', value: 'gadai' },
        { label: 'Tabungan', value: 'tabungan' },
        { label: 'Pembiayaan', value: 'pembiayaan' },
        { label: 'Investasi', value: 'investasi' },
      ];
      return { args, activeTab, items };
    },
    template: `
      <div>
        <TabKategori :items="items" v-model="activeTab" />
        <p class="mt-3">Active Tab: {{ activeTab }}</p>
      </div>
    `,
  }),
};

export const FewTabs = {
  render: () => ({
    components: { TabKategori },
    setup() {
      const activeTab = ref(0);
      const items = [
        { label: 'Aktif', value: 'active' },
        { label: 'Selesai', value: 'completed' },
      ];
      return { activeTab, items };
    },
    template: `
      <div>
        <TabKategori :items="items" v-model="activeTab" />
      </div>
    `,
  }),
};

export const ManyTabs = {
  render: () => ({
    components: { TabKategori },
    setup() {
      const activeTab = ref(0);
      const items = [
        { label: 'Semua', value: 'all' },
        { label: 'Gadai Emas', value: 'gadai' },
        { label: 'Tabungan Emas', value: 'tabungan' },
        { label: 'Kredit', value: 'kredit' },
        { label: 'Asuransi', value: 'asuransi' },
        { label: 'Pembiayaan', value: 'pembiayaan' },
        { label: 'Investasi', value: 'investasi' },
      ];
      return { activeTab, items };
    },
    template: `
      <div style="max-width: 600px;">
        <TabKategori :items="items" v-model="activeTab" />
      </div>
    `,
  }),
};
