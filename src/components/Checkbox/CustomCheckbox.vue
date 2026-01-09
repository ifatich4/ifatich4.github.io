<template>
    <label class="checkbox-wrapper" >
        <input
            type="checkbox"
            v-model="isChecked"
            @change="handleChange"
            :class="[`g-checkbox hidden-checkbox`]"
            :disabled="props.disabled"
        />
        <span class="checkbox-container" @mousedown="createRipple"  tabindex="0" @keydown.enter.prevent="toggleValue">
            <img
                :src="checkboxIcon"
                alt="checkbox"
                class="checkbox-icon"
            />
            <span v-for="ripple in ripples" :key="ripple.id" class="ripple"
                  :style="ripple.style" />
        </span>
        <span :class="[checkboxTextClass, props.color && `label-disabled`]">
            {{ label }}
        </span>
    </label>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    color: {
        type: String,
        default: 'primary',
    },
    label: {
        type: String,
        default: '',
    },
    checkboxTextClass: {
        type: String,
        default: 'checkbox-text',
    },
    disabled: {
        type: Boolean,
        default: false,
    }
})

const emit = defineEmits(['update:modelValue'])

const isChecked = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
    isChecked.value = val
})

function handleChange() {
    emit('update:modelValue', isChecked.value)
}

const toggleValue = () => {
    emit("update:modelValue", !isChecked.value);
}

const checkboxIcon = computed(() => {
    if (!isChecked.value) {
        return props.color === 'secondary'
            ? new URL('../../assets/icon/icon-checkbox-off-secondary.svg', import.meta.url).href
            : new URL('../../assets/icon/icon-checkbox-off-primary.svg', import.meta.url).href
    }
    return props.color === 'secondary'
        ? new URL('../../assets/icon/icon-checkbox-on-secondary.svg', import.meta.url).href
        : new URL('../../assets/icon/icon-checkbox-on-primary.svg', import.meta.url).href
})

const ripples = ref([])

function createRipple(event) {
    const container = event.currentTarget
    const rect = container.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height) * 2
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const id = Date.now()
    const style = `
    width: ${size}px;
    height: ${size}px;
    top: ${y}px;
    left: ${x}px;
  `
    ripples.value.push({ id, style })

    setTimeout(() => {
        ripples.value = ripples.value.filter(r => r.id !== id)
    }, 600)
}

</script>

<style scoped lang="scss">
.checkbox-wrapper {
    display: inline-flex;
    align-items: center;
    cursor: pointer;

     .label-disabled {
        color: var(--g-kit-black-60);
    }
}
.checkbox-container:hover {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 25%;
}
.hidden-checkbox {
    display: none;
}
.checkbox-icon {
    width: 24px;
    height: 24px;
    transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}
.checkbox-container {
    position: relative;
    display: flex;
    overflow: hidden;
    border-radius: 25%;

    &:focus {
        outline: var(--g-kit-lime-50) auto 1px;
    }
}
.ripple {
    position: absolute;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.2);
    transform: scale(0);
    animation: ripple-fade 0.8s ease-out forwards;
    pointer-events: none;
}

@keyframes ripple-fade {
    to {
        transform: scale(2);
        opacity: 0;
    }
}
.checkbox-label {
    font-size: 14px;
    color: #222;
}
</style>
