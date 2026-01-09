<script setup>
import { defineProps, ref, computed } from "vue";
import { BTooltip } from 'bootstrap-vue-next';

const props = defineProps({
    color: {
        type: String,
        default: 'black',
        validator(value) {
            return ['black', 'white'].includes(value)
        }
    },
    tooltipText: {
        type: String,
        default: '',
    },
    placement: {
        type: String,
        default: 'top',
        validator(value) {
            return ['top', 'bottom', 'left', 'right'].includes(value)
        }
    },
    variant: {
        type: String,
        default: 'dark',
        validator(value) {
            return ['dark', 'light'].includes(value)
        }
    },
    customClass: {
        type: String,
        default: '',
    },
    contentClass: {
        type: String,
        default: '',
    }
});

// Generate unique ID for tooltip target
const tooltipId = ref(`tooltip-${Math.random().toString(36).substr(2, 9)}`);

// Compute tooltip class based on variant and custom class
const tooltipClass = computed(() => {
    const variantClass = props.variant === 'light' ? 'tooltip-light' : 'tooltip-dark';
    return props.customClass ? `${variantClass} ${props.customClass}` : variantClass;
});
</script>

<template>
    <span :id="tooltipId" class="tooltip-icon-wrapper" style="cursor: pointer; display: inline-flex;">
        <img v-if="props.color === 'black'" src="../../assets/icon/tooltip/black.svg" alt="Info Icon"/>
        <img v-else src="../../assets/icon/tooltip/white.svg" alt="Info Icon"/>
    </span>
    <BTooltip 
        :target="tooltipId" 
        :placement="props.placement"
        :custom-class="tooltipClass"
    >
        <div :class="['tooltip-content', props.contentClass]">
            <slot>{{ props.tooltipText }}</slot>
        </div>
    </BTooltip>
</template>

<style lang="scss">
    .tooltip.show {
        opacity: 1 !important;
        font-size: var(--g-kit-font-size-sigma);
        line-height: var(--g-kit-line-height-sigma);
        font-weight: var(--g-kit-font-weight-regular);

        .tooltip-inner {
            padding: 1rem;
        }
    }

    // Dark variant (default)
    .tooltip-dark {
        border-radius: 12px;
        .overflow-auto {
            border-radius: 12px;
        }
        .tooltip-inner {
            border-radius: 12px;
            background-color: var(--g-kit-black-80);
            color: #fff;
        }
        .tooltip-arrow::before {
            border-top-color: var(--g-kit-black-80);
        }
        &.bs-tooltip-bottom .tooltip-arrow::before {
            border-bottom-color: var(--g-kit-black-80);
        }
        &.bs-tooltip-start .tooltip-arrow::before {
            border-left-color: var(--g-kit-black-80);
        }
        &.bs-tooltip-end .tooltip-arrow::before {
            border-right-color: var(--g-kit-black-80);
        }
    }

    // Light variant (white background)
    .tooltip-light {
        border-radius: 12px;
        .overflow-auto {
            border-radius: 12px;
        }
        .tooltip-inner {
            border-radius: 12px;
            background-color: #fff;
            color: var(--g-kit-black-80);
            border: 1px solid var(--g-kit-black-20);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .tooltip-arrow::before {
            border-top-color: var(--g-kit-black-20);
        }
        &.bs-tooltip-bottom .tooltip-arrow::before {
            border-bottom-color: var(--g-kit-black-20);
        }
        &.bs-tooltip-start .tooltip-arrow::before {
            border-left-color: var(--g-kit-black-20);
        }
        &.bs-tooltip-end .tooltip-arrow::before {
            border-right-color: var(--g-kit-black-20);
        }
    }

    .tooltip-icon-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
    }

    // Content container styles
    .tooltip-content {
        text-align: left;
        
        // Size variants
        &.tooltip-content-sm {
            font-size: var(--g-kit-font-size-sigma);
            line-height: var(--g-kit-line-height-sigma);
            font-weight: var(--g-kit-font-weight-regular);
        }
        
        &.tooltip-content-lg {
            font-size: var(--g-kit-font-size-omicron);
            line-height: var(--g-kit-line-height-omicron);
            font-weight: var(--g-kit-font-weight-regular);
        }
        
        // Alignment variants
        &.tooltip-content-center {
            text-align: center;
        }
        
        &.tooltip-content-right {
            text-align: right;
        }
        
        // Width variants
        &.tooltip-content-wide {
            min-width: 200px;
        }
        
        &.tooltip-content-narrow {
            max-width: 350px;
        }
    }
</style>