<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="p-5">
        <div class="card-file">
            <div class="card-file-item">
                <div class="card-file-item-header">
                    <img :src="image" alt="banner-file" />
                </div>
                <div class="card-file-item-body">
                    <h1 class="title-card-file">{{ title }}</h1>
                    <p class="subtitle-card-file">{{ subtitle }}</p>
                    <button class="btn btn-outline-primary">{{ label }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "CardFile",
        props: {
            image: {
                type: String,
                default: "/assets/images/ebook2.png",
            },
            subtitle: {
                type: String,
                default: "Subtitle",
            },
            title: {
                type: String,
                default: "Title",
            },
            label: {
                type: String,
                default: "Button",
            },
            action: Function,
        },
    };
</script>
<style></style>