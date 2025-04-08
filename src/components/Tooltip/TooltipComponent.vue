<script setup>
import {defineProps} from "vue";

const props = defineProps({
    color: {
        type: String,
        required: true,
        validator(value) {
            return ['black', 'white'].includes(value)
        }
    }
})
</script>

<template>
    <img v-if="props.color === 'black'" src="../../assets/icon/tooltip/black.svg" alt="Info Icon"/>
    <img v-else src="../../assets/icon/tooltip/white.svg" alt="Info Icon"/>
</template>



<style lang="scss">
    .tooltip.show {
        opacity: 1 !important;
        font-size: var(--g-kit-font-size-sigma);
        line-height: var(--g-kit-line-height-sigma);
        font-weight: var(--g-kit-font-weight-regular);

        .tooltip-inner {
            padding: 1rem;
        }
    }
</style>