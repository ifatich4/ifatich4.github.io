<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div :class="[classes]" style="position: relative;">
        <template v-if="iconStart">
            <span class="icon-tooltip-wrapper">
                <img :src="require('../../assets/images/icon-info.svg')" />
                <span
                  class="custom-tooltip"
                  :class="tooltipPosition"
                  v-if="tooltip"
                >{{ tooltip }}</span>
            </span>
            {{ text }}
        </template>
        <template v-else-if="iconEnd">
            {{ text }}
            <span class="icon-tooltip-wrapper icon-tooltip-right">
                <img :src="require('../../assets/images/icon-info.svg')" />
                <span
                  class="custom-tooltip"
                  :class="tooltipPosition"
                  v-if="tooltip"
                >{{ tooltip }}</span>
            </span>
        </template>
    </div>
</template>

<script>
import { computed, reactive } from "vue";

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
            validator: function (value) {
                return ["blue", "red", "yellow"].indexOf(value) !== -1;
            },
        },
        iconStart: {
            type: Boolean,
        },
        iconEnd: {
            type: Boolean,
        },
        tooltip: {
            type: String,
            default: "Info",
        },
        tooltipPosition: {
            type: String,
            default: "bottom",
            validator: value => ["top", "bottom", "left", "right"].includes(value),
        },
    },
    setup(props) {
        props = reactive(props);
        if (props.iconStart && props.iconEnd) {
            // eslint-disable-next-line no-console
            console.warn("Hanya salah satu dari iconStart atau iconEnd yang sebaiknya diisi.");
        }
        return {
            classes: computed(() => ({
                [`${
                    props.variant
                        ? props.variant === "default"
                            ? "label-icon pgd-status"
                            : `pgd-status-${props.variant}`
                        : "label-icon d-flex align-items-center gap-1"
                }`]: true,
            })),
        };
    },
};
</script>

<style scoped>
    .label-icon {
        line-height: normal;
        font-size: 14px;
        height: 20px;
        font-weight: 800;
        margin-bottom: .25rem;
    }
    .icon-tooltip-wrapper {
        position: relative;
        display: inline-block;
    }
    .icon-tooltip-right{
        margin-left: 8px;
    }
    .custom-tooltip {
        visibility: hidden;
        opacity: 0;
        width: max-content;
        max-width: 360px;
        background: white;
        color: var(--g-kit-black-60);
        text-align: left;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        font-size: var(--g-kit-font-size-sigma);
        line-height: var(--g-kit-line-height-sigma);
        font-weight: 600;
        border-radius: 6px;
        padding: 16px;
        position: absolute;
        z-index: 10;
        pointer-events: none;
        transition: opacity 0.2s;
        white-space: pre-line;
    }
    .icon-tooltip-wrapper:hover .custom-tooltip {
        visibility: visible;
        opacity: 1;
    }
    /* Posisi TOP (default) */
    .custom-tooltip.top {
        left: 50%;
        transform: translateX(-50%);
        bottom: 125%;
    }
    /* Posisi BOTTOM */
    .custom-tooltip.bottom {
        left: 50%;
        transform: translateX(-50%);
        top: 165%;
        bottom: auto;
    }
    /* Posisi LEFT */
    .custom-tooltip.left {
        right: 110%;
        left: auto;
        top: 50%;
        transform: translateY(-50%);
        bottom: auto;
    }
    /* Posisi RIGHT */
    .custom-tooltip.right {
        left: 110%;
        top: 50%;
        transform: translateY(-50%);
        bottom: auto;
    }

    /* Arrow for TOP */
    .custom-tooltip.top::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 14px;
        border-style: solid;
        border-color: white transparent transparent transparent;
        filter: drop-shadow(0 -3px 4px rgba(0,0,0,0.08));
    }

    /* Arrow for BOTTOM */
    .custom-tooltip.bottom::after {
        content: "";
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 14px;
        border-style: solid;
        border-color: transparent transparent white transparent;
        filter: drop-shadow(0 -3px 4px rgba(0,0,0,0.08));
    }

    /* Arrow for LEFT */
    .custom-tooltip.left::after {
        content: "";
        position: absolute;
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 14px;
        border-style: solid;
        border-color: transparent transparent transparent white;
        filter: drop-shadow(0 -3px 4px rgba(0,0,0,0.08));
    }

    /* Arrow for RIGHT */
    .custom-tooltip.right::after {
        content: "";
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        border-width: 14px;
        border-style: solid;
        border-color: transparent white transparent transparent;
        filter: drop-shadow(0 -3px 4px rgba(0,0,0,0.08));
    }
</style>