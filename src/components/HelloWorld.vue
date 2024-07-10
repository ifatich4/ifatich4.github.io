<template>
    <div>
        <AddAmountCounter />
        <Accordion />
    </div>
</template>

<script>
import Accordion from './Accordion/Accordion.vue';
import AddAmountCounter from './AddAmount/AddAmountCounter.vue';

    export default {
    components: { AddAmountCounter, Accordion }
};
</script>