<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card-produk">
        <a :href="action">
            <div class="card-produk__top">
                <img :src="image" alt="" />
            </div>
            <div class="card-produk__bottom">
                <div class="icon-box">
                    <img :src="icon" alt="" />
                </div>
                <div class="status-box">
                    <div class="pgd-status-blue">Konvesional</div>
                    <div v-if="syariah" class="pgd-status">Syariah</div>
                </div>

                <h5>{{ title }}</h5>
                <p>
                    {{ body }}
                </p>
            </div>
        </a>
    </div>
</template>
<script>
    export default {
        name: "CardProduct",
        props: {
            // init
            action: {
                type: String,
                default: "./produk-gadai-efek.html",
            },
            icon: {
                type: String,
                default: "/assets/images/pegadaian-ico.svg",
            },
            title: {
                type: String,
                default: "Gadai Efek",
            },
            label: {
                type: String,
                default: "",
            },
            image: {
                type: String,
                default: "/assets/images/product-card.png",
            },
            body: {
                type: String,
                default: `Penuhi kebutuhan di luar dugaan dengan cepat dengan gadai emas
          batangan maupun perhiasan...`,
            },
            syariah: {
                type: Boolean,
                default: false,
            },
        },
    };
</script>
<style></style>