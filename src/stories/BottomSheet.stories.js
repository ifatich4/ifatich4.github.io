import GOffCanvas from "../components/BottomSheet/GOffCanvas.vue";
import Button from "../components/Button/Button.vue";
import { ref } from 'vue';

export default {
  title: 'Components/BottomSheet',
  component: GOffCanvas,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Bottom Sheet / Off Canvas component untuk menampilkan konten dalam panel yang muncul dari bawah layar. Ideal untuk mobile-first interfaces.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Judul yang ditampilkan pada header bottom sheet',
    },
    closeButton: {
      control: 'boolean',
      description: 'Tampilkan tombol close pada header',
    },
    stickyFooter: {
      control: 'boolean',
      description: 'Footer sticky di bawah layar',
    },
    modelValue: {
      control: 'boolean',
      description: 'State visibility bottom sheet (v-model)',
    },
  },
  args: {
    title: 'Bottom Sheet Title',
    closeButton: true,
    stickyFooter: false,
  },
};

// Interactive story with button to open bottom sheet
export const Default = {
  render: (args) => ({
    components: { GOffCanvas, Button },
    setup() {
      const isOpen = ref(false);
      const openSheet = () => {
        isOpen.value = true;
      };
      return { args, isOpen, openSheet };
    },
    template: `
      <div>
        <Button label="Buka Bottom Sheet" type="primary" @click="openSheet" />
        <GOffCanvas v-model="isOpen" v-bind="args">
          <p>Ini adalah konten bottom sheet. Anda bisa menempatkan form, informasi, atau komponen lainnya di sini.</p>
        </GOffCanvas>
      </div>
    `,
  }),
  args: {
    title: 'Informasi Detail',
    closeButton: true,
  },
};

export const WithCloseButton = {
  render: (args) => ({
    components: { GOffCanvas, Button },
    setup() {
      const isOpen = ref(false);
      const openSheet = () => {
        isOpen.value = true;
      };
      return { args, isOpen, openSheet };
    },
    template: `
      <div>
        <Button label="Buka dengan Close Button" type="primary" @click="openSheet" />
        <GOffCanvas v-model="isOpen" v-bind="args">
          <p>Bottom sheet dengan tombol close pada header.</p>
          <p>Klik tombol X untuk menutup.</p>
        </GOffCanvas>
      </div>
    `,
  }),
  args: {
    title: 'Detail Transaksi',
    closeButton: true,
  },
};

export const WithStickyFooter = {
  render: (args) => ({
    components: { GOffCanvas, Button },
    setup() {
      const isOpen = ref(false);
      const openSheet = () => {
        isOpen.value = true;
      };
      return { args, isOpen, openSheet };
    },
    template: `
      <div>
        <Button label="Buka dengan Sticky Footer" type="primary" @click="openSheet" />
        <GOffCanvas v-model="isOpen" v-bind="args">
          <div style="padding: 16px 0;">
            <h5>Ringkasan Transaksi</h5>
            <p>Produk: Gadai Emas</p>
            <p>Nominal: Rp 5.000.000</p>
            <p>Jangka Waktu: 30 Hari</p>
          </div>
          <template #footer="{ hide }">
            <Button label="Batalkan" type="outline" @click="hide" style="width: 100%;" />
            <Button label="Konfirmasi" type="primary" @click="hide" style="width: 100%;" />
          </template>
        </GOffCanvas>
      </div>
    `,
  }),
  args: {
    title: 'Konfirmasi Transaksi',
    closeButton: true,
    stickyFooter: true,
  },
};

export const FormExample = {
  render: (args) => ({
    components: { GOffCanvas, Button },
    setup() {
      const isOpen = ref(false);
      const openSheet = () => {
        isOpen.value = true;
      };
      return { args, isOpen, openSheet };
    },
    template: `
      <div>
        <Button label="Buka Form" type="primary" @click="openSheet" />
        <GOffCanvas v-model="isOpen" v-bind="args">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; margin-bottom: 4px; font-weight: 500;">Nama Lengkap</label>
              <input type="text" placeholder="Masukkan nama lengkap" style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px;" />
            </div>
            <div>
              <label style="display: block; margin-bottom: 4px; font-weight: 500;">Email</label>
              <input type="email" placeholder="Masukkan email" style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px;" />
            </div>
            <div>
              <label style="display: block; margin-bottom: 4px; font-weight: 500;">Pesan</label>
              <textarea placeholder="Masukkan pesan" rows="3" style="width: 100%; padding: 8px 12px; border: 1px solid #ddd; border-radius: 8px;"></textarea>
            </div>
          </div>
          <template #footer="{ hide }">
            <Button label="Kirim" type="primary" @click="hide" style="width: 100%;" />
          </template>
        </GOffCanvas>
      </div>
    `,
  }),
  args: {
    title: 'Hubungi Kami',
    closeButton: true,
    stickyFooter: true,
  },
};
