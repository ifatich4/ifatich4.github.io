import InputDropdownHeader from "../components/Dropdown/InputDropdownHeader.vue";

export default {
  title: "Components/Dropdown/DropdownHeader",
  component: InputDropdownHeader ,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    items: { control: "object" },
    itemValue: { control: "text" },
    itemText: { control: "text" },
    itemImg: { control: "text" },
    itemLink: { control: "text" },
    placeholder: { control: "text" },
    class: { control: "text" },
    modelValue : {control: "object"},
  },
  args: {
    modelValue: null,
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
    itemImg: "img",
    itemLink: "link",
    placeholder: "Pengajuan kredit",
    class: 'input-dropdown-kustom',
  },
};

export const Default = { 
};
