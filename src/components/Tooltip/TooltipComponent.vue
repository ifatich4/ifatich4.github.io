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