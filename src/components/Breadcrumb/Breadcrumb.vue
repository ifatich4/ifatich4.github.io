<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
            <li v-for="(item, index) in items" :key="index" class="breadcrumb-item"
                :class="{ active: index === items.length - 1 }">
                <template v-if="index === items.length - 1">{{ item }}</template>

                <a href="./" v-if="index !== items.length - 1">{{ item }}</a>
            </li>
        </ol>
    </nav>
</template>

<script>
    export default {
        name: "BreadcrumbComponent",
        props: {
            items: {
                type: Array,
                required: false,
                default: () => ["Beranda", "Produk", "Layanan Jasa", "Safe Deposit Box"],
            },
        },
    };
</script>