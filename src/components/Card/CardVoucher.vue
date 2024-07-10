<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card-voucher">
        <div class="card-voucher__top">
            <img :src="image" alt="" />
        </div>
        <div class="card-voucher__bottom">
            <a :href="target">{{ title }}</a>
            <div class="voucher-period">
                <div class="voucher-period__desc">
                    <img src="/assets/images/clock.svg" alt="" />
                    <span>{{ subtitle }}</span>
                </div>
                <a :href="linkText">
                    <h5>Gunakan</h5>
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CardVoucher",
        props: {
            image: {
                type: String,
                default: "/assets/images/voucher-active.png",
            },
            title: {
                type: String,
                default: "Diskon Beli Emas hingga Rp 300.000",
            },
            subtitle: {
                type: String,
                default: "Berlaku hingga 31 Okt 2020",
            },
            target: {
                type: String,
                default: "./promo-detail.html",
            },
            linkText: {
                type: String,
                default: "",
            },
        },
    };
</script>