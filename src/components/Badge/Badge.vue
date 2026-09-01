<template>
    <span class="badge" :class="[`badge-${type}`]">{{ label }}</span>
</template>
<script setup>
    // eslint-disable-next-line vue/multi-word-component-names
    defineOptions({
      name: 'Badge'
    })
    defineProps({
        type: {
            type: String,
            default: "primary"
        },
        label: {
            type: String,
            default: ""
        },
    })
</script>
<style lang="scss" scoped>
    .badge-primary{
        background-color: #E6F6EA;
        color: #00AB4E;
    }
    .badge-secondary{
        background-color: #FBF2E9;
        color: #E07E26;
    }
</style>