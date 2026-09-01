<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card-acara">
        <div class="card-acara__top">
            <img :src="image" alt="" />
        </div>
        <div class="card-acara__bottom">
            <div class="sum-acara">
                <h5>{{ title }}</h5>
                <p>
                    {{ description }}
                </p>
            </div>
            <div class="info-acara">
                <div class="info-acara__box">
                    <h6>Tanggal</h6>
                    <p>{{ date }}</p>
                </div>
                <div class="info-acara__box">
                    <h6>Waktu</h6>
                    <p>{{ time }}</p>
                </div>
                <div class="info-acara__box">
                    <h6>Tempat</h6>
                    <p>{{ location }}</p>
                </div>
            </div>
            <div class="guide-acara">
                <span>Cara Registrasi:</span>
                <p>
                    <span v-html="step"></span>
                </p>
            </div>
            <a :href="action" class="btn btn-primary">{{ label }}</a>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CardEvent",
        props: {
            title: {
                type: String,
                default: "Acara Badai Emas",
            },
            description: {
                type: String,
                default: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.`,
            },
            image: {
                type: String,
                default: "/assets/images/img-acara.png",
            },
            date: {
                type: String,
                default: "22 Desember 2021",
            },
            time: {
                type: String,
                default: "19:00 WIB",
            },
            location: {
                type: String,
                default: "Zoom Meeting",
            },
            step: {
                type: String,
                default: `1 .Kode promo RENCANAEMAS digunakan untuk transaksi buka Tabungan
          Emas.<br />
          2. Diskon sebesar 40%, maksimal Rp20.000.<br />
          3. Minimal transaksi Rp50.000,-<br />
          4. Kode promo bisa digunakan pada Outlet Pegadaian, aplikasi Pegadaian
          Digital, dan aplikasi Pegadaian Syariah Digital.<br />
          5. Masa aktif kode promo berakhir pada 30 April 2021.`,
            },
            label: {
                type: String,
                default: "Registrasi Acara",
            },
            action: {
                type: Function,
                default: function () {
                    return "/action";
                },
            },
        },
    };
</script>