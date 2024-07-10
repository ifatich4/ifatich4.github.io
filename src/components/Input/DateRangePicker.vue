<template>
  <div>
    <div class="date-range-picker">
      <InputSmallDate
        :disabled="props.disabled"
        v-model="startDate"
        title="Dari"
        placeholder="DD / MM / YYYY"
        @buttom-sheet-shown="handleOffcanvasToggle"
      />
      <InputSmallDate
        :disabled="props.disabled"
        v-model="endDate"
        title="Hingga"
        placeholder="DD / MM / YYYY"
        @buttom-sheet-shown="handleOffcanvasToggle"
      />
    </div>
    <div v-if="errorValidation" class="error-text mt-2">
      {{ errorValidation }}
    </div>
  </div>
</template>

<script setup>
import InputSmallDate from './InputSmallDate.vue'
import { computed, defineProps } from 'vue'

const startDate = defineModel('startDate') // eslint-disable-line
const endDate = defineModel('endDate') // eslint-disable-line
const emits = defineEmits(['buttomSheetShown']) // eslint-disable-line

const errorValidation = computed(() => {
  if (startDate.value && endDate.value && startDate.value > endDate.value) {
    return 'Tanggal akhir harus lebih besar dari tanggal awal'
  } else {
    return null
  }
})

const props = defineProps(['disabled'])

const handleOffcanvasToggle = (value) => {
  emits('buttomSheetShown', value)
}
</script>

<script>
export default {
  name: 'DateRangePicker'
}
</script>


<style scoped>
.form-label {
  display: none;
}

.date-range-picker {
  display: flex;
  gap: 16px;
}
</style>
