<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <ul class="styled-ul">
        <li v-for="(item, index) in items" :key="index">{{ item }}</li>
    </ul>
</template>
<script>
    export default {
        name: "ListGroupUnordered",
        props: {
            items: {
                type: Array,
                default: function () {
                    return [
                        "Memiliki identitas yang masih berlaku (KTP/Paspor)",
                        "Mengisi formulir pembukaan Rekening Tabungan Emas",
                        "Biaya transaksi Tabungan Emas",
                    ];
                },
            },
        },
    };
</script>
<style scoped>

.styled-ul {
    list-style: none;
}

.styled-ul li {
    counter-increment: my-awesome-counter;
    font-size: var(--g-kit-font-size-omicron);
    line-height: var(--g-kit-line-height-omicron);
    font-weight: var(--g-kit-font-weight-normal);
    margin-bottom: 1rem;
    position: relative
}

.styled-ul li:before {
    --size: 2em;
    color: var(--g-kit-lime-50);
    content: "\2022";
    display: inline-block;
    font-weight: var(--g-kit-font-weight-bold);
    margin-left: -2em;
    text-align: center;
    width: var(--size)
}

.small-title-grey p {
    color: var(--g-kit-black-60);
    counter-increment: my-awesome-counter;
    font-size: var(--g-kit-font-size-omicron);
    line-height: var(--g-kit-line-height-omicron);
    font-weight: var(--g-kit-font-weight-normal);
    margin-bottom: 10px;
    position: relative
}

.styled-ul-grey {
    list-style: none;
    padding-left: 20px
}

.styled-ul-grey li {
    color: #939597;
    counter-increment: my-awesome-counter;
    font-weight: var(--g-kit-font-weight-normal);
    font-size: var(--g-kit-font-size-omicron);
    line-height: var(--g-kit-line-height-omicron);
    margin-bottom: 5px;
    position: relative
}

.styled-ul-grey li:before {
    --size: 2em;
    color: #939597;
    content: "\2022";
    display: inline-block;
    font-family: NunitoSans-ExtraBold;
    margin-left: -2em;
    text-align: center;
    width: var(--size)
}
</style>