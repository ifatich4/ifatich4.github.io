<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card-promo">
        <div class="card-promo__top">
            <img src="/assets/images/img-promo.png" alt="" />
        </div>
        <div class="card-promo__bottom">
            <div class="promo-title-box">
                <div class="slug-box">
                    <div class="pgd-status">{{ countDownLabel }}</div>
                    <div class="slug-box__date">{{ periode }}</div>
                </div>
                <h4>{{ title }}</h4>
            </div>
            <div class="promo-code-box">
                <div class="promo-code-box__top">
                    <img src="/assets/images/coupon.png" alt="" />
                    <h5>Kode Promo</h5>
                </div>
                <div class="promo-code-box__bottom">
                    <h2 id="code1">{{ promoCode }}</h2>
                    <button class="btn-tertiary copyPromo1" onclick="copyPromo('#code1');showToast('1'); ">
                        Salin
                    </button>
                    <div id="1" class="toast-promo bg-primary">
                        <span>Kode Promo berhasil disalin</span>
                        <button class="btn-tertiary" onclick="$('#1').hide()">
                            <img src="/assets/images/close-white.svg" alt="" />
                        </button>
                    </div>
                </div>
            </div>
            <div class="promo-guide">
                <ol>
                    <li>
                        Kode promo {{ promoCode }} digunakan untuk transaksi buka Tabungan
                        Emas.
                    </li>
                    <li>Diskon sebesar 40%, maksimal Rp20.000.</li>
                    <li>Minimal transaksi Rp50.000,-</li>
                    <li>
                        Kode promo bisa digunakan pada Outlet Pegadaian, aplikasi Pegadaian
                        Digital, dan aplikasi Pegadaian Syariah Digital.
                    </li>
                    <li>Masa aktif kode promo berakhir pada 30 April 2021.</li>
                </ol>

                <div class="more-guide" id="guide1">
                    <span>Cara menggunakan Promo {{ promoCode }} di aplikasi Pegadaian
                        Digital:</span>
                    <ol>
                        <li>
                            Kode promo {{ promoCode }} digunakan untuk transaksi buka Tabungan
                            Emas.
                        </li>
                        <li>Diskon sebesar 40%, maksimal Rp20.000.</li>
                        <li>Minimal transaksi Rp50.000,-</li>
                        <li>
                            Kode promo bisa digunakan pada Outlet Pegadaian, aplikasi
                            Pegadaian Digital, dan aplikasi Pegadaian Syariah Digital.
                        </li>
                        <li>Masa aktif kode promo berakhir pada 30 April 2021.</li>
                    </ol>
                </div>
            </div>
            <button id="btn-open1" class="btn-tertiary" onclick="openGuide('1')">
                Baca Selengkapnya
            </button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "k-card-promo",
        props: {
            title: {
                type: String,
                default: "Diskon 40% Buka Tabungan Emas di Pegadaian",
            },
            description: {
                type: String,
                default: "",
            },
            period: {
                type: String,
                default: "01 April – 31 Juli 2021",
            },
            countDownLabel: {
                type: String,
                default: "108 Hari lagi",
            },
            promoCode: {
                type: String,
                default: "RENCANAEMAS",
            },
            label: {
                type: String,
                default: "",
            },
            periode: {
                type: String,
                default: "",
            },
            action: {
                type: Function,
                default: function (value = "action") {
                    return (window.location.href = `http://localhost/${value}`);
                },
            },
            guideSteps: {
                type: [Array, Object],
            },
        },
        data() {
            return {
                steps: this.guideSteps || [
                    "Kode promo RENCANAEMAS digunakan untuk transaksi buka Tabungan Emas.",
                    "Diskon sebesar 40%, maksimal Rp20.000.",
                    "Minimal transaksi Rp50.000,-",
                    "Kode promo bisa digunakan pada Outlet Pegadaian, aplikasi Pegadaian Digital, dan aplikasi Pegadaian Syariah Digital.",
                    "Masa aktif kode promo berakhir pada 30 April 2021.",
                ],
            };
        },
        methods: {
            chunk(arr, size) {
                return arr.reduce(
                    (acc, e, i) => (
                        i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc
                    ),
                    []
                );
            },
        },
    };
</script>