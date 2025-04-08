<template>
  <div>
    <InputSmallDate
      v-model="selectedDate"
      :title="'Tanggal Lahir'"
      :placeholder="'Pilih tanggal'"
      :disabled="false"
      :required="true"
      :disableFutureDates="true"
      :maxDaysFromToday="30"
      :minDaysFromToday="-30"
      :maxDate="'2023-12-31'"
      :minDate="'2023-01-01'"
      @buttomSheetShown="handleBottomSheetShown"
    />
  </div>
</template>

<script>
import InputSmallDate from './Input/InputSmallDate.vue'

export default {
  components: {
    InputSmallDate
  },
  data() {
    return {
      selectedDate: null
    }
  },
  methods: {
    handleBottomSheetShown(shown) {
      console.log('Bottom sheet shown:', shown)
    }
  }
}
</script>
