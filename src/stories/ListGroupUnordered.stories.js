import ListGroupUnordered from "../components/ListGroup/ListGroupUnordered.vue";

  export default {
    title: 'Components/ListGroup/Unordered',
    component: ListGroupUnordered,
    tags: ['autodocs'],
    argTypes : {
      items: {control: "object" },
    },
    args: {
      items: [
        "Memiliki identitas yang masih berlaku (KTP/Paspor)",
        "Mengisi formulir pembukaan Rekening Tabungan Emas",
        "Biaya transaksi Tabungan Emas",
      ],
    },
  };

  export const Unordered = {
  };






  
