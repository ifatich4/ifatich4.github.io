<template>
    <div class="btn-group">
        <button type="button" class="btn-icon dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
            <img :src="src" alt="">
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end rounded">
            <slot></slot>
        </ul>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    src: {
        type: String,
        required: true
    }
})
</script>
<style lang="scss" scoped>
    .btn-icon{
        background-color: transparent !important;
        padding: 0 !important;
        border: none !important;
    }
    .dropdown-menu.show{
        inset: unset;
        right: 0;
        left: auto;
        top:26px;
        width: auto;
        min-width: 193px;
        padding: 0px 16px;
    }
</style>