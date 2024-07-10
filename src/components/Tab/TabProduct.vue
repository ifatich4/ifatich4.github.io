<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="deck-product-riwayat">
        <a v-for="(item, index) in items" :key="index" :href="item.action"
            class="pgd-btn-featured-product deck-product-riwayat__item" :class="item.active ? ' active' : ''">
            <div class="pgd-btn-featured-product__img-box">
                <img :src="item.icon" alt="" />
            </div>
            <span class="pgd-btn-featured-product__title">{{ item.label }}</span>
        </a>
    </div>
</template>
<script>
    export default {
        name: "TabProduct",
        props: {
            items: {
                type: Array,
                default: function () {
                    return [{
                            label: "Tabungan Emas",
                            active: true,
                            action: function () {
                                return "/";
                            },
                            icon: "/assets/images/ico-tabungan.svg",
                        },
                        {
                            label: "Pinjamattn",
                            active: false,
                            action: function () {
                                return "/";
                            },
                            icon: "/assets/images/ico-uang.svg",
                        },
                        {
                            label: "Gadai",
                            active: false,
                            action: function () {
                                return "/";
                            },
                            icon: "/assets/images/ico-invest-emas.svg",
                        },
                        {
                            label: "Pembiayaan",
                            active: false,
                            action: function () {
                                return "/";
                            },
                            icon: "/assets/images/ico-pembiayaan-no-bg.svg",
                        },
                        {
                            label: "Cicil Emas",
                            active: false,
                            action: function () {
                                return "/";
                            },
                            icon: "/assets/images/ico-cicil-emas-no-bg.svg",
                        },
                        {
                            label: "Pembayaran & Topup",
                            active: false,
                            action: function () {
                                return "/";
                            },
                            icon: "/assets/images/ico-pembayaran-no-bg.svg",
                        },
                        {
                            label: "Titipan Emas",
                            active: false,
                            action: function () {
                                return "/";
                            },
                            icon: "/assets/images/ico-gadai-titipan-emas-fisik.svg",
                        },
                    ];
                },
            },
        },
    };
</script>
<style></style>