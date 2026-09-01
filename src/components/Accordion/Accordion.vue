<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BAccordion v-model="currentValue" :free="free">
        <slot></slot>
    </BAccordion>
</template>

<script>
import { BAccordion } from 'bootstrap-vue-next'
import { computed } from 'vue'
export default {
    name: "AccordionComponent",
    components: {
      BAccordion
    },
    props: {
        modelValue: {
            type: Array
        },
        free: Boolean
    },
    setup(props, { emit }) {
        const currentValue = computed({
            get: () => props.modelValue,
            set: (value) => emit('update:modelValue', value)
        })

        return { currentValue }
    }
};
</script>
