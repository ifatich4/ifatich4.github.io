<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <section class="section-bg-top bg-white">
        <div class="section-bg-top__back bg-white container">
            <a @onclick="action">
                <img src="/assets/images/arrow-left-green.svg" alt="" />
            </a>
            <h4 class="text-black-80">{{ label }}</h4>
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