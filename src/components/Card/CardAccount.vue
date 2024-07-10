<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="'card-account' + (type ? '-' + type : '')">
        <span>{{ saldoLabel }}</span>
        <h4>{{ saldoValue }} gram</h4>

        <p id="no-rek-utama">{{ cardNo }}</p>
        <span>{{ holder }}</span>

        <img src="/assets/images/ico-emas-black.svg" alt="" />
    </div>
</template>
<script>
    export default {
        name: "CardAccount",
        props: {
            type: {
                type: String,
                default: "green",
                Validator: function (value) {
                    return ["green", "red", "blue", "white"].indexOf(value) !== -1;
                },
            },
            saldoLabel: {
                type: String,
                default: "Saldo Efektif",
            },
            saldoValue: {
                type: String,
                default: "250, 1234",
            },
            cardNo: {
                type: String,
                default: "",
            },
            holder: {
                type: String,
                default: "UPC Pasar Mencos",
            },
        },
    };
</script>