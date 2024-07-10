<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <a href="#" class="card-content" target="blank">
        <div class="card-content-wrapper">
            <img :src="icon" class="icon" />
            <h4 class="title">{{ title }}</h4>
            <p class="subtitle">
                {{ body }}
            </p>
        </div>
    </a>
</template>
<script>
    export default {
        name: "CardContent",
        props: {
            icon: {
                type: String,
                default: "/assets/images/icon-karir.svg",
            },
            title: {
                type: String,
                default: "title-default",
            },
            body: {
                type: String,
                default:   `Bangun perekonomian masyarakat Indonesia melalui kemampuanmu bersama
                            Pegadaian. Indonesia melalui kemampuanmu`,
            },
        },
    };
</script>
<style></style>