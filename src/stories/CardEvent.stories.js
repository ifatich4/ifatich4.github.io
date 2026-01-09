import CardEvent from "../components/Card/CardEvent.vue";

export default {
  title: 'Components/Card/CardEvent',
  component: CardEvent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Card Event untuk menampilkan informasi acara/event dengan detail tanggal, waktu, lokasi dan panduan registrasi.',
      },
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Judul acara',
    },
    description: {
      control: 'text',
      description: 'Deskripsi acara',
    },
    image: {
      control: 'text',
      description: 'URL gambar banner acara',
    },
    date: {
      control: 'text',
      description: 'Tanggal acara',
    },
    time: {
      control: 'text',
      description: 'Waktu acara',
    },
    location: {
      control: 'text',
      description: 'Lokasi acara',
    },
    step: {
      control: 'text',
      description: 'Panduan registrasi (HTML)',
    },
    label: {
      control: 'text',
      description: 'Teks tombol aksi',
    },
  },
  args: {
    title: 'Acara Badai Emas',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: '/assets/images/img-acara.png',
    date: '22 Desember 2024',
    time: '19:00 WIB',
    location: 'Zoom Meeting',
    label: 'Registrasi Acara',
  },
};

export const Default = {
  args: {
    title: 'Acara Badai Emas',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    image: '/assets/images/img-acara.png',
    date: '22 Desember 2024',
    time: '19:00 WIB',
    location: 'Zoom Meeting',
    label: 'Registrasi Acara',
    step: '1. Klik tombol Registrasi Acara<br/>2. Isi data diri dengan lengkap<br/>3. Tunggu konfirmasi via email',
  },
};

export const Webinar = {
  args: {
    title: 'Webinar Investasi Emas untuk Masa Depan',
    description: 'Pelajari strategi investasi emas yang tepat untuk mempersiapkan masa depan finansial Anda bersama para ahli.',
    image: '/assets/images/img-acara.png',
    date: '15 Januari 2025',
    time: '14:00 WIB',
    location: 'Google Meet',
    label: 'Daftar Sekarang',
    step: '1. Registrasi melalui website<br/>2. Dapatkan link meeting via email<br/>3. Join 15 menit sebelum acara',
  },
};

export const Workshop = {
  args: {
    title: 'Workshop Literasi Keuangan',
    description: 'Workshop interaktif untuk meningkatkan pemahaman tentang pengelolaan keuangan dan investasi.',
    image: '/assets/images/img-acara.png',
    date: '28 Februari 2025',
    time: '09:00 WIB',
    location: 'Gedung Pegadaian Pusat, Jakarta',
    label: 'Registrasi',
    step: '1. Daftar melalui aplikasi Pegadaian Digital<br/>2. Tunjukkan QR Code saat registrasi ulang<br/>3. Hadir tepat waktu',
  },
};
