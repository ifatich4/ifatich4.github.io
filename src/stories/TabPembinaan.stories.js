import TabPembinaan from "../components/Navbar/TabPembinaan.vue";
import Stepper from "../components/Stepper/Stepper.vue";

  export default {
    title: 'Components/Tab/Pembinaan',
    component: TabPembinaan, Stepper,
    tags: ['autodocs'],
    argTypes: {
      title: { control: "text" },
      labels: { control: "object" },
      action: { control: "object" },
      currentlySelected: { control: "number" },
    },
    args: {
      labels: [
              { id: "1", label: "Kondisi Usaha / Ekonomi", completed: true },
              { id: "2", label: "Aktivitas Pembinaan", completed: false },
              { id: "3", label: "Keadaan Debitur", completed: false },
              { id: "4", label: "Kondisi Usaha / Ekonomi", completed: false },
              { id: "5", label: "Kondisi Agunan", completed: false },
              { id: "6", label: "Catatan", completed: false },
            ],
      action: window.history.go(-1),
      currentlySelected: 0,
      title: "Langkah",
    },
  };

  export const PembinaanTab = {
  };




  
