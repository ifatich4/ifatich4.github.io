<template>
  <div>
    <div :class="['date-range-picker', { 'with-separator': props.separator }]">
      <CalendarDropdown
        :flexWidth="props.flexWidth"
        :disabled="props.disabled || props.disabledStartDate"
        :title="props.firstLabel"
        v-model="startDate"
        :placeholder="props.firstPlaceholder"
        :min-date="props.minStartDate"
        :max-date="maxStartDate"
        :format-type="props.formatType"
        :alignment="props.firstAlignment"
        @buttom-sheet-shown="handleOffcanvasToggle"
        @close="emits('close:start')"
        :no-slash="props.noSlash"
      />
      <div v-if="props.separator" class="form-label d-block" style="top: 40px; position: relative; height: min-content;">s.d</div>
      <CalendarDropdown
        :flexWidth="props.flexWidth"
        :disabled="props.disabled || props.disabledEndDate"
        :title="props.secondLabel"
        v-model="endDate"
        :placeholder="props.secondPlaceholder"
        :min-date="minEndDate"
        :max-date="props.maxEndDate"
        :format-type="props.formatType"
        :alignment="props.secondAlignment"
        @buttom-sheet-shown="handleOffcanvasToggle"
        @close="emits('close:end')"
        :no-slash="props.noSlash"
      />
    </div>
    <div v-if="props.errorMessage || errorValidation" class="error-text mt-2">
      {{ props.errorMessage || errorValidation }}
    </div>
  </div>
</template>

<script setup>
import CalendarDropdown from './CalendarDropdown.vue';
import { computed, defineProps } from 'vue'

const startDate = defineModel('startDate') // eslint-disable-line
const endDate = defineModel('endDate') // eslint-disable-line
const emits = defineEmits(['buttomSheetShown', 'close:start', 'close:end']) // eslint-disable-line

const errorValidation = computed(() => {
  if (startDate.value && endDate.value && startDate.value > endDate.value) {
    return 'Tanggal akhir harus lebih besar dari tanggal awal'
  } else {
    return null
  }
})

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  firstLabel: {
    type: String,
    default: 'Dari',
    required: true
  },
  secondLabel: {
    type: String,
    default: 'Hingga'
  },
  separator: {
    type: Boolean,
    default: false
  },
  firstPlaceholder: {
    type: String,
    default: 'DD / MM / YYYY'
  },
  secondPlaceholder: {
    type: String,
    default: 'DD / MM / YYYY'
  },
  minStartDate: {
    type: Date,
  },
  maxStartDate: {
    type: Date,
  },
  minEndDate: {
    type: Date,
  },
  maxEndDate: {
    type: Date,
  },
  flexWidth: {
      type: Boolean,
      default: false
  },
  /**
   * @value date | short
   * @default date
   */
  formatType: {
    type: String,
    default: 'date'
  },
  errorMessage: {
    type: String
  },
  /**
   * @value start | center | end
   */
  firstAlignment: {
    type: String
  },
  /**
   * @value start | center | end
   */
  secondAlignment: {
    type: String
  },
  /**
   * remove slash from in out of range date
   */
  noSlash: {
    type: Boolean,
    default: false
  },
  disabledStartDate: {
    type: Boolean,
    default: false
  },
  disabledEndDate: {
    type: Boolean,
    default: false
  }
})

const minEndDate = computed(() => {
  if (props.minEndDate && props.minEndDate > new Date(startDate.value)) {
    return props.minEndDate
  } else if (startDate.value) {
    return new Date(startDate.value)
  } else {
    return null
  }
})

const maxStartDate = computed(() => {
  if (props.maxStartDate && props.maxStartDate < new Date(endDate.value)) {
    return props.maxStartDate
  } else if (endDate.value) {
    return new Date(endDate.value)
  } else {
    return null
  }
})

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

.error-text {
  color: var(--g-kit-red-50);
  margin-bottom: 16px;
}
</style>
