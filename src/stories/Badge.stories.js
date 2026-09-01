import Badge from "../components/Badge/Badge.vue";

export default {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Badge component untuk menampilkan label status atau kategori dengan berbagai variasi warna.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Teks yang ditampilkan pada badge',
    },
    type: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning', 'info'],
      description: 'Tipe/warna badge',
    },
  },
  args: {
    label: 'Badge',
    type: 'primary',
  },
};

export const Primary = {
  args: {
    type: 'primary',
    label: 'Active',
  },
};

export const Secondary = {
  args: {
    type: 'secondary',
    label: 'Pending',
  },
};

export const Success = {
  args: {
    type: 'success',
    label: 'Berhasil',
  },
};

export const Danger = {
  args: {
    type: 'danger',
    label: 'Gagal',
  },
};

export const Warning = {
  args: {
    type: 'warning',
    label: 'Perhatian',
  },
};

export const Info = {
  args: {
    type: 'info',
    label: 'Informasi',
  },
};

// Show all badge variations
export const AllVariants = {
  render: () => ({
    components: { Badge },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        <Badge type="primary" label="Primary" />
        <Badge type="secondary" label="Secondary" />
        <Badge type="success" label="Success" />
        <Badge type="danger" label="Danger" />
        <Badge type="warning" label="Warning" />
        <Badge type="info" label="Info" />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Menampilkan semua variasi badge dalam satu tampilan.',
      },
    },
  },
};
