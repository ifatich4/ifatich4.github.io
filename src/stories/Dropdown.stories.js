import InputDropdown from "../components/Dropdown/InputDropdown.vue";
import { ref } from "vue";

export default {
  title: "Components/Dropdown/Default",
  component: InputDropdown,
  tags: ["autodocs"],
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 400px; padding: 16px; min-height: 350px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    items: { control: "object" },
    modelValue : { control: "object"},
    color : {control: "select", options: ['none','red', 'blue', 'green', 'orange']}
  },
  args: {
    label: "Pilihan Anda",
    items: [
      { id: 1, img: "beli_emas", nama: "Pilihan Pilihanb", link: "asa" },
      { id: 2, img: "beli_emas", nama: "Pilihan 2", link: "b.html" },
      { id: 3, img: "beli_emas", nama: "Pilihan 3", link: "c.html" },
      { id: 4, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
      { id: 5, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
      { id: 6, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
      { id: 7, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
      { id: 8, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
      { id: 9, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
      { id: 10, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
      { id: 11, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
    ],
    itemValue: "id",
    itemText: "nama",
    placeholder: "Pengajuan kredit",
    error: null,
    color: "none",
    useBottomSheet: false,
    disabled: false,
    loading: false,
  },
};

export const Dropdown = { 
  args:{
        modelValue: "modelValue"
  },
  render: (args) => ({
    components: { InputDropdown },
    setup() {
      const choosenValue = ref(null)
      return { args, choosenValue };
    },
    template: `
        <InputDropdown 
          v-bind="args" 
          v-model="choosenValue"
        />
    `,
  }),
};