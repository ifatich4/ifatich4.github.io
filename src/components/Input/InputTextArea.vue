<script setup>
/* eslint-disable */
import { defineOptions, defineEmits, defineProps, computed } from 'vue'

defineOptions({ name: 'InputTextArea', inheritAttrs: false })

const props = defineProps(['error', 'label', 'class', 'modelValue', 'rows'])
const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get() {
    return toUppercaseString(props.modelValue)
  },
  set(newValue) {
    emit('update:modelValue', toUppercaseString(newValue))
  }
})

function toUppercaseString(val) {
  if (val) return val.toUpperCase()
}

</script>

<template>
  <div :class="['group-input', props.class]">
    <label v-if="label" :for="$attrs.id" class="form-label">
      {{ props.label }}
    </label>
    <div class="input-group lg">
      <textarea
        v-bind="$attrs"
        class="form-control text-area"
        v-model="inputValue"
        :rows="rows"
      >
        {{ inputValue }}
      </textarea>
    </div>
    <div v-if="props.error" class="error-text mt-2">{{ error }}</div>
  </div>
</template>

<style scoped>
  .form-control:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
    box-shadow: 0 0 0 1px #00883e;
    outline: none;
  }
</style>