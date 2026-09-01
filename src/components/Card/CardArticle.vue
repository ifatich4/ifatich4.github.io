<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <a href="#" class="card-article">
        <div class="card-article-wrapper">
            <div class="card-article-banner">
                <img :src="image" alt="banner-article" />
            </div>
            <div class="card-article-body">
                <label class="label">{{ label }}</label>
                <h4 class="title">{{ title }}</h4>
                <label class="time"> <i class="icon-clock"></i> {{ created }} </label>
            </div>
        </div>
    </a>
</template>
<script>
    export default {
        name: "CardArticle",
        props: {
            image: {
                type: String,
                default: "/assets/images/image13.png",
            },
            label: {
                type: String,
                default: "Pengumuman Seleksi",
            },
            title: {
                type: String,
                default: "Management Development Program (MDP) Batch 4",
            },
            created: {
                type: String,
                default: "20 Agustus 2021",
            },
            action: Function,
        },
    };
</script>
<style></style>