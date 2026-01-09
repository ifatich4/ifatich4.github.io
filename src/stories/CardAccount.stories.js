import CardAccount from "../components/Card/CardAccount.vue";

export default {
  title: 'Components/Card/CardAccount',
  component: CardAccount,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Account untuk menampilkan informasi saldo dan rekening nasabah dengan berbagai variasi tema warna.',
      },
    },
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 400px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    type: {
      control: 'select',
      options: ['green', 'red', 'blue', 'white'],
      description: 'Tema warna card',
    },
    saldoLabel: {
      control: 'text',
      description: 'Label untuk saldo',
    },
    saldoValue: {
      control: 'text',
      description: 'Nilai saldo dalam gram',
    },
    cardNo: {
      control: 'text',
      description: 'Nomor rekening',
    },
    holder: {
      control: 'text',
      description: 'Nama pemegang rekening / cabang',
    },
  },
  args: {
    type: 'green',
    saldoLabel: 'Saldo Efektif',
    saldoValue: '250,1234',
    cardNo: '1234567890',
    holder: 'UPC Pasar Mencos',
  },
};

export const Green = {
  args: {
    type: 'green',
    saldoLabel: 'Saldo Efektif',
    saldoValue: '250,1234',
    cardNo: '1234567890123456',
    holder: 'UPC Pasar Mencos',
  },
};

export const Red = {
  args: {
    type: 'red',
    saldoLabel: 'Saldo Efektif',
    saldoValue: '150,5678',
    cardNo: '9876543210123456',
    holder: 'UPC Kemang',
  },
};

export const Blue = {
  args: {
    type: 'blue',
    saldoLabel: 'Saldo Efektif',
    saldoValue: '500,0000',
    cardNo: '1122334455667788',
    holder: 'UPC Sudirman',
  },
};

export const White = {
  args: {
    type: 'white',
    saldoLabel: 'Saldo Efektif',
    saldoValue: '75,2500',
    cardNo: '5566778899001122',
    holder: 'UPC Thamrin',
  },
};

// Showcase all card types
export const AllTypes = {
  render: () => ({
    components: { CardAccount },
    template: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; max-width: 800px;">
        <CardAccount 
          type="green" 
          saldoLabel="Saldo Efektif" 
          saldoValue="250,1234" 
          cardNo="1234567890123456" 
          holder="UPC Pasar Mencos" 
        />
        <CardAccount 
          type="red" 
          saldoLabel="Saldo Efektif" 
          saldoValue="150,5678" 
          cardNo="9876543210123456" 
          holder="UPC Kemang" 
        />
        <CardAccount 
          type="blue" 
          saldoLabel="Saldo Efektif" 
          saldoValue="500,0000" 
          cardNo="1122334455667788" 
          holder="UPC Sudirman" 
        />
        <CardAccount 
          type="white" 
          saldoLabel="Saldo Efektif" 
          saldoValue="75,2500" 
          cardNo="5566778899001122" 
          holder="UPC Thamrin" 
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Menampilkan semua variasi tema warna CardAccount.',
      },
    },
  },
};
