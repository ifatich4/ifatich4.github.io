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
                default: "default",
                Validator: function (value) {
                    return ["default" ,"green", "blue", "red", "yellow"].indexOf(value) !== -1;
                },
            },
        },
        setup(props) {
            props = reactive(props);
            return {
                classes: computed(() => ({
                    [`${
                        props.variant ? props.variant === "default" ? "pgd-status" : `pgd-status-${props.variant}` : "pgd-status"
                    }`]: true,
                })),
            };
        },
    };
</script>