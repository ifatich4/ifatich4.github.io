import TabPembinaan from "../components/Navbar/TabPembinaan.vue";

export default {
  title: 'Components/Navigation/TabPembinaan',
  component: TabPembinaan,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Tab navigasi untuk form pembinaan dengan step indicator dan completion status.',
      },
    },
  },
  argTypes: {
    title: { 
      control: "text",
      description: "Title untuk step indicator",
    },
    labels: { 
      control: "object",
      description: "Array label tabs dengan id, label, dan completed status",
    },
    action: { 
      control: false,
      description: "Function callback untuk action",
    },
    currentlySelected: { 
      control: "number",
      description: "Index tab yang aktif saat ini",
    },
  },
  args: {
    title: "Langkah",
    currentlySelected: 0,
    labels: [
      { id: "1", label: "Kondisi Usaha / Ekonomi", completed: true },
      { id: "2", label: "Aktivitas Pembinaan", completed: false },
      { id: "3", label: "Keadaan Debitur", completed: false },
      { id: "4", label: "Kondisi Usaha / Ekonomi", completed: false },
      { id: "5", label: "Kondisi Agunan", completed: false },
      { id: "6", label: "Catatan", completed: false },
    ],
  },
  decorators: [
    () => ({
      template: `
        <div style="padding: 20px; background: #f8f8f8; min-height: 300px;">
          <story />
        </div>
      `,
    }),
  ],
};

export const Default = {};

export const WithProgress = {
  args: {
    currentlySelected: 2,
    labels: [
      { id: "1", label: "Data Debitur", completed: true },
      { id: "2", label: "Informasi Kredit", completed: true },
      { id: "3", label: "Agunan", completed: false },
      { id: "4", label: "Dokumen", completed: false },
      { id: "5", label: "Review", completed: false },
    ],
  },
};

export const AllCompleted = {
  args: {
    currentlySelected: 4,
    labels: [
      { id: "1", label: "Data Debitur", completed: true },
      { id: "2", label: "Informasi Kredit", completed: true },
      { id: "3", label: "Agunan", completed: true },
      { id: "4", label: "Dokumen", completed: true },
      { id: "5", label: "Review", completed: true },
    ],
  },
};
