<script setup>
import { defineOptions, computed, defineProps, defineEmits } from 'vue'
import InputText from './InputText.vue'

defineOptions({
  name: 'InputRupiah'
})

// Menambahkan 'placeholder' pada props
const props = defineProps(['modelValue', 'placeholder'])
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
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0
  })
  return formatter.format(value)
}

const unformatDecimal = (value) => {
  let unformatted = ''
  if (value) {
    const number = Number(value.replace(/[^0-9.-]/g, ''))
    if (!isNaN(number)) {
      unformatted = String(number)
    }
  }
  return unformatted
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
    v-model="rupiahValue"
    @keydown="onlyNumber"
    :placeholder="props.placeholder || 'Masukkan rupiah'"
    type="number"
    :use-delimiter="false"
  >
    <template #prefix>
      <span class="input-group-text border-0">Rupiah</span>
    </template>
  </InputText>
</template>
