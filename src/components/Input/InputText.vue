<script setup>
import { defineOptions, defineProps, defineEmits, computed } from 'vue'

defineOptions({ name: 'InputText', inheritAttrs: false })

const props = defineProps({
    error: {},
    label: {},
    suffixIcon: {},
    class: {},
    modelValue: {},
    helperText: {},
    type: {
      default: 'text'
    },
    useDelimiter: {
      default: true
    }
  })
const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    if (props.type === 'number' && props.useDelimiter && props.modelValue) {
      const orgText = props.modelValue.replaceAll(' ', '')
      const newText = orgText.match(/.{1,4}/g)
      emit('update:modelValue', orgText)
      return newText.join(' ')
    } else {
      return toUppercaseString(props.modelValue)
    }
  },
  set(newValue) {
    if (props.type === 'number' && props.useDelimiter && props.modelValue) {
      emit('update:modelValue', toUppercaseString(newValue.replaceAll(' ', '')))
    } else {
      emit('update:modelValue', toUppercaseString(newValue))
    }
  }
})

const handleInput = (e) => {
  if (props.type === 'number') {
    const key = e.key || String.fromCharCode(e.keyCode || e.which)
    const isNumericInput =
      (key >= '0' && key <= '9') ||
      (key >= 'NumPad0' && key <= 'NumPad9') ||
      key === 'Delete' ||
      key === 'Backspace' ||
      key === 'Tab' ||
      key === '.' ||
      e.which === 32

    if (!isNumericInput) {
      e.preventDefault()
    }

    if (inputValue.value && props.useDelimiter) {
      if (inputValue.value.replaceAll(' ', '').length % 4 === 0 && e.which !== 8) {
        inputValue.value = inputValue.value + ' '
      }
    }
  }
}

function toUppercaseString(val) {
  if (val) return val.toUpperCase()
}
</script>

<template>
  <div :class="['group-input', props.class]">
    <label v-if="label" :for="$attrs.id" class="form-label">
      {{ label }}
    </label>
    <div class="input-group custom-input-group-icon p-0">
      <slot name="prefix" />
      <input
        :value="inputValue"
        @input="evt => inputValue = evt.target.value"
        @keydown="handleInput"
        class="form-control"
        v-bind="$attrs"
        type="text"
        :inputmode="props.type === 'number' ? 'numeric' : 'text'"
      />
      <div v-if="suffixIcon" class="input-group-icon mx-2">
        <img :src="suffixIcon" />
      </div>
      <slot name="suffix" />
    </div>
    <div v-if="props.error" class="error-text mt-2">{{ error }}</div>
    <div v-if="props.helperText && !props.error" class="helper-text mt-2">{{ helperText }}</div>
  </div>
</template>

<style scoped>
  .form-control:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
    box-shadow: 0 0 0 1px #00883e;
    outline: none;
  }
</style>
