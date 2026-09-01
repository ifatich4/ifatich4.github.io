import ListGroupOrdered from "../components/ListGroup/ListGroupOrdered.vue";

  export default {
    title: 'Components/ListGroup/Ordered',
    component: ListGroupOrdered,
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

  export const Ordered = {
  };






  
