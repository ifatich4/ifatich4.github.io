import FilterCMS from "../components/Filter/FilterCMS.vue";
import Button from "../components/Button/Button.vue";
import InputText from "../components/Input/InputText.vue";
import { ref } from 'vue';

export default {
  title: 'Components/Filter/FilterCMS',
  component: FilterCMS,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Filter CMS component untuk menampilkan area filter dengan tombol toggle dan grid layout untuk input filter.',
      },
    },
  },
  argTypes: {
    filter: {
      control: 'boolean',
      description: 'Paksa tampilkan tombol filter (jika false, tombol hanya muncul jika filter > 6)',
    },
  },
  args: {
    filter: true,
  },
};

export const Default = {
  render: (args) => ({
    components: { FilterCMS, Button, InputText },
    setup() {
      const search = ref('');
      const status = ref('');
      const tanggal = ref('');
      return { args, search, status, tanggal };
    },
    template: `
      <FilterCMS v-bind="args">
        <template #update-text>
          <span>Terakhir diperbarui: 9 Januari 2026, 14:30 WIB</span>
        </template>
        <template #buttons>
          <Button type="primary" label="Export" />
          <Button type="outline" label="Refresh" />
        </template>
        <template #filters>
          <InputText v-model="search" label="Pencarian" placeholder="Cari transaksi..." />
          <InputText v-model="status" label="Status" placeholder="Pilih status..." />
          <InputText v-model="tanggal" label="Tanggal" placeholder="Pilih tanggal..." />
        </template>
      </FilterCMS>
    `,
  }),
};

export const WithMultipleFilters = {
  render: (args) => ({
    components: { FilterCMS, Button, InputText },
    setup() {
      const filters = ref({
        search: '',
        status: '',
        tanggal: '',
        cabang: '',
        produk: '',
        nasabah: '',
      });
      return { args, filters };
    },
    template: `
      <FilterCMS v-bind="args">
        <template #update-text>
          <span>Data per: 9 Januari 2026</span>
        </template>
        <template #buttons>
          <Button type="primary" label="Terapkan Filter" />
          <Button type="outline" label="Reset" />
        </template>
        <template #filters>
          <InputText v-model="filters.search" label="Pencarian" placeholder="Cari..." />
          <InputText v-model="filters.status" label="Status" placeholder="Semua Status" />
          <InputText v-model="filters.tanggal" label="Tanggal" placeholder="Pilih Tanggal" />
          <InputText v-model="filters.cabang" label="Cabang" placeholder="Pilih Cabang" />
          <InputText v-model="filters.produk" label="Produk" placeholder="Pilih Produk" />
          <InputText v-model="filters.nasabah" label="Nasabah" placeholder="Nama Nasabah" />
        </template>
      </FilterCMS>
    `,
  }),
};

export const CollapsedByDefault = {
  render: (args) => ({
    components: { FilterCMS, Button, InputText },
    setup() {
      const search = ref('');
      return { args, search };
    },
    template: `
      <FilterCMS v-bind="args">
        <template #update-text>
          <span>Klik tombol Filter untuk menampilkan filter</span>
        </template>
        <template #buttons>
          <Button type="primary" label="Download" />
        </template>
        <template #filters>
          <InputText v-model="search" label="Pencarian" placeholder="Cari..." />
        </template>
      </FilterCMS>
    `,
  }),
  args: {
    filter: true,
  },
};

export const ReportFilter = {
  render: (args) => ({
    components: { FilterCMS, Button, InputText },
    setup() {
      const filters = ref({
        periode: '',
        cabang: '',
        jenis: '',
      });
      return { args, filters };
    },
    template: `
      <FilterCMS v-bind="args">
        <template #update-text>
          <span>Laporan Transaksi Harian</span>
        </template>
        <template #buttons>
          <Button type="primary" label="Generate Report" />
          <Button type="secondary" label="Export Excel" />
          <Button type="outline" label="Print" />
        </template>
        <template #filters>
          <InputText v-model="filters.periode" label="Periode" placeholder="Pilih Periode" />
          <InputText v-model="filters.cabang" label="Cabang" placeholder="Semua Cabang" />
          <InputText v-model="filters.jenis" label="Jenis Transaksi" placeholder="Semua Jenis" />
        </template>
      </FilterCMS>
    `,
  }),
};
