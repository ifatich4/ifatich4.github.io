import InputSmallText from "../components/Input/InputSmallText.vue";

export default {
  title: 'Components/Input/InputSmallText',
  component: InputSmallText,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Input text compact dengan icon support. Cocok untuk form dengan space terbatas.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Label input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel'],
      description: 'Tipe input',
    },
    icon: {
      control: 'text',
      description: 'URL icon di sebelah kiri input',
    },
    iconLabel: {
      control: 'text',
      description: 'URL icon di sebelah label',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    required: {
      control: 'boolean',
      description: 'Required field',
    },
    error: {
      control: 'boolean',
      description: 'Error state',
    },
  },
  args: {
    title: "Username",
    placeholder: "Masukkan username",
    type: 'text',
    disabled: false,
    required: false,
    error: false,
  },
};

export const Default = {
  args: {
    title: "Username",
    placeholder: "Masukkan username",
  },
};

export const WithIcon = {
  args: {
    title: "Lokasi",
    placeholder: "Pilih lokasi",
    icon: "/assets/icon/location.svg",
  },
};

export const WithIconLabel = {
  args: {
    title: "Website",
    placeholder: "Masukkan URL",
    iconLabel: "/assets/images/world.svg",
  },
};

export const Email = {
  args: {
    title: "Email",
    placeholder: "email@example.com",
    type: 'email',
  },
};

export const Password = {
  args: {
    title: "Password",
    placeholder: "Masukkan password",
    type: 'password',
  },
};

export const Required = {
  args: {
    title: "Nama Lengkap",
    placeholder: "Masukkan nama lengkap",
    required: true,
  },
};

export const Disabled = {
  args: {
    title: "Username",
    placeholder: "Input disabled",
    disabled: true,
  },
};

export const WithError = {
  args: {
    title: "Username",
    placeholder: "Masukkan username",
    error: true,
  },
};
