<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="[classes]"><img :src="icon" alt="" />{{ text }}</div>
</template>
<script>
    import {
        computed,
        reactive
    } from "vue";

    export default {
        name: "LabelIcon",
        props: {
            text: {
                type: String,
                default: "Status",
            },
            variant: {
                type: String,
                default: "",
                Validator: function (value) {
                    return ["blue", "red", "yellow"].indexOf(value) !== -1;
                },
            },
            icon: {
                type: String,
                default: "/assets/images/icon-crown-green.svg",
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
<style></style>