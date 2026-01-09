<script setup>
import { defineOptions, computed, defineProps, defineEmits } from 'vue'
import InputText from './InputText.vue'

defineOptions({
  name: 'InputNominalStart'
})

const props = defineProps(['modelValue', 'placeholder', 'unit'])
const emit = defineEmits(['update:modelValue'])

const rupiahValue = computed({
  get() {
    return formatDecimal(props.modelValue)
  },
  set(newValue) {
    emit('update:modelValue', unformatDecimal(newValue))
  }
})

const formatDecimal = (value) => {
  if (value === null || value === undefined || value === '') return ''
  const numericValue = value.toString().replace(/\D/g, '')
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

const unformatDecimal = (value) => {
  if (!value) return ''
  return value.replace(/\./g, '')
}

const onlyNumber = (event) => {
  const keyCode = event.keyCode ? event.keyCode : event.which
  if (
    !(
      (keyCode >= 48 && keyCode <= 57) || // Numbers
      (keyCode >= 96 && keyCode <= 105) || // Numpad
      keyCode === 46 || // Delete
      keyCode === 8 || // Backspace
      keyCode === 9 || // Tab
      keyCode === 190 || // Period
      keyCode === 110 || // Numpad Period
      keyCode === 189 || // Dash/Minus
      keyCode === 109 // Numpad Dash/Minus
    )
  ) {
    event.preventDefault()
  }
}
</script>

<template>
  <InputText
    rupiah="rupiah"
    v-model="rupiahValue"
    @keydown="onlyNumber"
    :placeholder="props.placeholder || 'Masukkan rupiah'"
    type="text"
    :use-delimiter="false"
  >
    <template #prefix>
      <span class="input-group-text border-0">{{ props.unit || "Rupiah" }}</span>
    </template>
  </InputText>
</template>

<style lang="scss">
  .rupiah.custom-input-group-icon {
    position: relative;
    border: 1px solid var(--g-kit-black-20);

    &:hover {
      border: 1px solid var(--g-kit-lime-50);
    }

    &:has(:disabled) .input-group-text {
      background-color: var(--g-kit-black-20);
    }

    .input-group-text{
      color: var(--g-kit-black-60);
      height: 46px;
      min-width: 92px;
    }

    input {
      box-shadow: none !important;
      border: none !important;
      border-radius: 6px;
       border-left: 1px solid var(--g-kit-black-20) !important;

      &:disabled {
        border-color: var(--g-kit-black-20);
         border-left: 1px solid var(--g-kit-black-40) !important;
      }

      &:focus, &:hover:not(:disabled) {
        border-color: var(--g-kit-lime-50) !important;
      }
    }
  }

  .rupiah.custom-input-group-icon:has(input:disabled) {
    border-color: var(--g-kit-black-40);
  }
</style>