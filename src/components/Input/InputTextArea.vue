<script setup>
/* eslint-disable */
import { defineOptions, defineEmits, defineProps, ref, computed, onMounted, watch } from 'vue'

defineOptions({ name: 'InputTextArea', inheritAttrs: false })

const props = defineProps(['error', 'label', 'class', 'modelValue', 'variant', 'maxLength'])
const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    if (props.variant === 'count') {
      return props.modelValue
    } else if (props.variant === 'uppercase') {
      return toUppercaseString(props.modelValue)
    }
    return props.modelValue // Default variant
  },
  set(newValue) {
    if (props.variant === 'count') {
      emit('update:modelValue', newValue)
    } else if (props.variant === 'uppercase') {
      emit('update:modelValue', toUppercaseString(newValue))
    } else {
      emit('update:modelValue', newValue) // Default variant
    }
  }
})

function toUppercaseString(val) {
  if (val) return val.toUpperCase()
  return val
}

const characterCount = computed(() => {
  return props.modelValue ? props.modelValue.length : 0
})

const textareaRef = ref(null)

// Fungsi untuk menyesuaikan tinggi textarea
function adjustTextareaHeight() {
  const textarea = textareaRef.value
  if (textarea) {
    textarea.style.height = 'auto' // Reset tinggi untuk menghitung ulang
    const newHeight = Math.min(textarea.scrollHeight, 120) // Maksimal 120px
    textarea.style.height = `${newHeight}px`
  }
}

// Panggil fungsi saat komponen dimuat dan saat modelValue berubah
onMounted(() => {
  adjustTextareaHeight()
})

watch(inputValue, () => {
  adjustTextareaHeight()
})
</script>

<template>
  <div :class="['group-input', props.class]">
    <label v-if="label" :for="$attrs.id" class="form-label">
      {{ props.label }}
    </label>
    <div class="input-group lg">
      <textarea
        ref="textareaRef"
        v-bind="$attrs"
        class="form-control text-area"
        v-model="inputValue"
        :maxlength="props.variant === 'count' ? props.maxLength : null"
        style="resize: none; border-radius: 6px;"
        :style="props.variant === 'count' ? 'padding-bottom: 2rem;' : ''"
      >
      </textarea>
      <div v-if="props.variant === 'count'" class="text-counter">  {{ characterCount }} / {{ props.maxLength }} </div>
    </div>
    <div v-if="props.error" class="error-text mt-2">{{ error }}</div>
  </div>
</template>

<style scoped>
  .form-control {
    max-height: 115px;
    min-height: 80px;
    overflow-y: auto;
  }
  .form-control:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
    box-shadow: 0 0 0 1px #00883e;
    outline: none;
  }
  .text-counter {
    font-size: var(--g-kit-font-size-omega);
    line-height: var(--g-kit-line-height-omega);
    color: #6c757d;

    position: absolute;
    bottom: 11px;
    right: 11px;

    z-index: 5;
  }
</style>