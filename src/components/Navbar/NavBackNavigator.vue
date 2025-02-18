<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section class="section-bg-top bg-white">
        <div class="section-bg-top__back bg-white container d-flex align-items-center gap-2">
            <a @click="action">
                <img width="24px" src="../../assets/images/arrow-left-green.svg" alt="" />
            </a>
            <h5 class="text-black-80 pl2">{{ label }}</h5>
        </div>
    </section>
</template>
<script>
    export default {
        name: "NavBackNavigator",
        props: {
            label: {
                type: String,
                default: "Beli Tabungan Emas",
            },
            action: {
                type: Function,
                default: function () {
                    window.history.go(-1);
                },
            },
        },
    };
</script>