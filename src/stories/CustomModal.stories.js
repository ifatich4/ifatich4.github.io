import CustomModal from "../components/Modal/CustomModal.vue";
import Button from "../components/Button/Button.vue";
import { ref } from "vue";

export default {
  title: 'Components/Modal/CustomModal',
  component: CustomModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Custom Modal yang lebih fleksibel dengan berbagai opsi customization. Mendukung bottom sheet mode untuk mobile.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Judul modal',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Ukuran modal',
    },
    centered: {
      control: 'boolean',
      description: 'Modal di tengah layar',
    },
    persistent: {
      control: 'boolean',
      description: 'Tidak bisa ditutup dengan klik backdrop',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Tampilkan tombol close',
    },
    scrollable: {
      control: 'boolean',
      description: 'Body scrollable untuk konten panjang',
    },
    useBottomSheet: {
      control: 'boolean',
      description: 'Mode bottom sheet untuk mobile',
    },
    hideDivider: {
      control: 'boolean',
      description: 'Sembunyikan garis pemisah',
    },
  },
  args: {
    title: "Custom Modal",
    size: 'md',
    centered: true,
    persistent: true,
    showCloseButton: true,
    scrollable: false,
    useBottomSheet: false,
    hideDivider: false,
  },
};

export const Default = {
  render: (args) => ({
    components: { CustomModal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Buka Modal" @click="isOpen = true" />
        <CustomModal v-bind="args" v-model="isOpen">
          <template #body>
            <p>Ini adalah konten custom modal. Anda bisa menempatkan form atau informasi lainnya di sini.</p>
          </template>
        </CustomModal>
      </div>
    `,
  }),
};

export const WithFooter = {
  render: (args) => ({
    components: { CustomModal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Buka Modal" @click="isOpen = true" />
        <CustomModal v-bind="args" v-model="isOpen">
          <template #body>
            <p>Apakah Anda yakin ingin melanjutkan transaksi ini?</p>
          </template>
          <template #footer>
            <div style="display: flex; gap: 12px; justify-content: flex-end;">
              <Button type="outline" label="Batal" @click="isOpen = false" />
              <Button type="primary" label="Lanjutkan" @click="isOpen = false" />
            </div>
          </template>
        </CustomModal>
      </div>
    `,
  }),
  args: {
    title: "Konfirmasi Transaksi",
    centered: true,
  },
};

export const SmallSize = {
  render: (args) => ({
    components: { CustomModal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Modal Kecil" @click="isOpen = true" />
        <CustomModal v-bind="args" v-model="isOpen">
          <template #body>
            <p>Modal dengan ukuran kecil.</p>
          </template>
        </CustomModal>
      </div>
    `,
  }),
  args: {
    title: "Modal Kecil",
    size: 'sm',
    centered: true,
  },
};

export const LargeSize = {
  render: (args) => ({
    components: { CustomModal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Modal Besar" @click="isOpen = true" />
        <CustomModal v-bind="args" v-model="isOpen">
          <template #body>
            <p>Modal dengan ukuran besar untuk konten yang lebih luas.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </template>
        </CustomModal>
      </div>
    `,
  }),
  args: {
    title: "Modal Besar",
    size: 'lg',
    centered: true,
  },
};

export const Scrollable = {
  render: (args) => ({
    components: { CustomModal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Modal Scrollable" @click="isOpen = true" />
        <CustomModal v-bind="args" v-model="isOpen">
          <template #body>
            <div style="height: 500px;">
              <p>Konten panjang yang bisa di-scroll.</p>
              <p v-for="i in 20" :key="i">Paragraf {{ i }}: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </template>
        </CustomModal>
      </div>
    `,
  }),
  args: {
    title: "Syarat & Ketentuan",
    scrollable: true,
    size: 'md',
  },
};

export const BottomSheet = {
  render: (args) => ({
    components: { CustomModal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Buka Bottom Sheet" @click="isOpen = true" />
        <CustomModal v-bind="args" v-model="isOpen">
          <template #body>
            <p>Modal dalam mode bottom sheet, cocok untuk tampilan mobile.</p>
          </template>
        </CustomModal>
      </div>
    `,
  }),
  args: {
    title: "Bottom Sheet Mode",
    useBottomSheet: true,
    centered: false,
  },
};

export const NonPersistent = {
  render: (args) => ({
    components: { CustomModal, Button },
    setup() {
      const isOpen = ref(false);
      return { args, isOpen };
    },
    template: `
      <div>
        <Button type="primary" label="Modal Non-Persistent" @click="isOpen = true" />
        <CustomModal v-bind="args" v-model="isOpen">
          <template #body>
            <p>Modal ini bisa ditutup dengan klik area luar atau tekan ESC.</p>
          </template>
        </CustomModal>
      </div>
    `,
  }),
  args: {
    title: "Non-Persistent Modal",
    persistent: false,
    centered: true,
  },
};
