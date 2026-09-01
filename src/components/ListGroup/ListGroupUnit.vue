<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="['card-why-produk', classes]">
        <img src="../../assets/images/checklist.svg" alt="" />
        <p>
            Dapatx dicicil dan dilunasi sewaktu-waktu, serta bisa diperpanjang
            berkali-kali.
        </p>
    </div>

    <div :class="['card-why-produk', classes]">
        <img src="../../assets/images/checklist.svg" alt="" />
        <p>
            Dapat dicicil dan dilunasi sewaktu-waktu, serta bisa diperpanjang
            berkali-kali.
        </p>
    </div>
</template>
<script>
    import {
        computed,
        reactive
    } from "vue";

    export default {
        name: "ListGroupUnit",
        props: {
            icon: {
                type: String,
                default: "",
            },
            text: {
                type: String,
                default: "",
            },
            size: {
                type: String,
                default: "sm",
                Validator: function (value) {
                    return ["lg", "sm"].indexOf(value) !== -1;
                },
            },
        },
        setup(props) {
            props = reactive(props);
            return {
                classes: computed(() => ({
                    [`${props.size ? `${props.size}-unit` : "sm-unit"}`]: true,
                })),
            };
        },
    };
</script>

<style scoped>
    .card-why-produk {
        align-items: center;
        display: flex
    }

    @media (max-width:767px) {
        .card-why-produk {
            align-items: flex-start
        }
    }

    .card-why-produk.lg-unit img {
        height: 64px;
        margin-right: 16px
    }

    @media (max-width:767px) {
        .card-why-produk.lg-unit img {
            height: 24px
        }
    }

    .card-why-produk.sm-unit img {
        height: 24px;
        margin-right: 16px
    }

    @media (max-width:767px) {
        .card-why-produk.sm-unit img {
            height: 24px
        }
    }

    .card-why-produk p {
        color: #58585b;
        font-size: var(--g-kit-font-size-omicron);
        line-height: var(--g-kit-line-height-omicron);
        font-weight: var(--g-kit-font-weight-normal);
        margin: 0
    }
</style>