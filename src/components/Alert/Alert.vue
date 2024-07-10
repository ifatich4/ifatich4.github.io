<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <BAlert class="variant" :model-value="true">Default Alert</BAlert>

        <BAlert class="variant" variant="success" :model-value="true">Success Alert</BAlert>

        <BAlert class="variant" v-model="showDismissibleAlert" variant="danger" dismissible> Dismissible Alert! </BAlert>

        <BAlert class="variant" v-model="dismissCountDown" dismissible variant="warning" @close-countdown="countdown = $event">
            <p>This alert will dismiss after {{ countdown / 1000 }} seconds...</p>
            <BProgress variant="success" :max="dismissCountDown" :value="countdown" height="4px" />
        </BAlert>

        <Button @click="dismissCountDown = true" type="primary" size="md" class="m-1"
            label="Show alert with count-down timer" />

        <Button @click="showDismissibleAlert = true" type="primary" size="md" :label="`Show dismissible alert (${
          showDismissibleAlert ? 'visible' : 'hidden'
        })`" />
    </div>
</template>

<script setup>
    import {
        ref
    } from 'vue';
    import {
        BAlert,
        BProgress
    } from 'bootstrap-vue-next';
    import Button from '../Button/Button.vue';

    const showDismissibleAlert = ref(false)
    const dismissCountDown = ref(10000)
    const countdown = ref(0)
</script>