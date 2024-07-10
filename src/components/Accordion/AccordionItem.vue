<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <BAccordionItem :id="id || dynamicId" class="accordion-item" :title="header" :visible="active">
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
        id: String
    },
    data() {
        return {
            dynamicId: 'gkitacc' + Math.floor(Math.random() * 1000),
        };
    },
};
</script>
