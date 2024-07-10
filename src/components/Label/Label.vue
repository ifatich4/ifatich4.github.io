<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="[classes]">{{ text }}</div>
</template>
<script>
    import {
        computed,
        reactive
    } from "vue";

    export default {
        name: "LabelVue",
        props: {
            text: {
                default: "Status",
            },
            variant: {
                type: String,
                default: "",
                Validator: function (value) {
                    return ["green", "blue", "red", "yellow"].indexOf(value) !== -1;
                },
            },
        },
        setup(props) {
            props = reactive(props);
            return {
                classes: computed(() => ({
                    [`${
                        props.variant ? `pgd-status-${props.variant}` : "pgd-status"
                    }`]: true,
                })),
            };
        },
    };
</script>