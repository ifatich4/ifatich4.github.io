<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BAccordionItem :id="id || dynamicId" class="accordion-item" :class="variant ? 'accordion-' + variant : ''" :title="header" :visible="active">
        <template #title>
            <slot name="title"/>
        </template>
        <slot></slot>
    </BAccordionItem>
</template>

<script>
import { BAccordionItem } from 'bootstrap-vue-next'
export default {
    name: "AccordionItem",
    components: {
      BAccordionItem
    },
    props: {
        header: String,
        active: Boolean,
        id: String,
        variant: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            dynamicId: 'gkitacc' + Math.floor(Math.random() * 1000),
        };
    },
};
</script>
