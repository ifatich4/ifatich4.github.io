<script setup>
import { defineOptions, defineProps, ref, computed, defineEmits } from 'vue'

const DAYS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

defineOptions({ name: 'InputDatePicker', inheritAttrs: false })
const props = defineProps(['error', 'label', 'class', 'modelValue'])
const emit = defineEmits(['update:modelValue'])

const showCalendar = ref(false)
const currentMonth = ref(new Date().getMonth() + 1)
const currentYear = ref(new Date().getFullYear())

const getFormattedDate = (value) => {
  let formatted = ''
  if (value && value !== 'null') {
    const [year, month, day] = value.split('-')
    formatted = `${day}-${month}-${year}`
  }
  return formatted
}
const getUnformattedDate = (value) => {
  let unformatted = ''
  if (value && value !== 'null') {
    const [day, month, year] = value.split('-')
    unformatted = `${year}-${month}-${day}`
  }
  return unformatted
}

const selectedDate = computed({
  get: () => getFormattedDate(props.modelValue),
  set: (value) => {
    emit('update:modelValue', getUnformattedDate(value))
  }
})

const calendar = computed(() => {
  const firstDayOfMonth = new Date(currentYear.value, currentMonth.value - 1, 1)
  const lastDayOfMonth = new Date(currentYear.value, currentMonth.value, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const lastDateOfMonth = lastDayOfMonth.getDate()

  let dayCount = 1
  const calendar = []

  for (let i = 0; i < 6; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfWeek) || dayCount > lastDateOfMonth) {
        week.push({
          date: null
        })
      } else {
        const date = new Date(
          currentYear.value,
          currentMonth.value - 1,
          dayCount
        )
        week.push({
          date
        })
        dayCount++
      }
    }
    calendar.push(week)
  }

  return calendar
})
const selectedMonthYear = computed({
  get: () =>
    `${currentYear.value}-${currentMonth.value.toString().padStart(2, '0')}`,
  set: (value) => {
    const [year, month] = value.split('-')
    currentYear.value = parseInt(year)
    currentMonth.value = parseInt(month)
  }
})
const monthYearOptions = computed(() => {
  const options = []
  for (
    let year = currentYear.value - 10;
    year <= currentYear.value + 0;
    year++
  ) {
    for (let month = 1; month <= 12; month++) {
      options.push({
        label: `${MONTHS[month - 1]} ${year}`,
        value: `${year}-${month.toString().padStart(2, '0')}`
      })
    }
  }
  return options
})

const showDatePicker = () => (showCalendar.value = !showCalendar.value)
const selectDate = (day) => {
  if (day.date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
    selectedDate.value = day.date.toLocaleDateString('en-GB', options)
    showCalendar.value = false
  }
}
const previousMonth = () => {
  if (this.currentMonth > 1) {
    currentMonth.value--
  } else {
    currentMonth.value = 12
    currentYear.value--
  }
}
const nextMonth = () => {
  if (currentMonth.value < 12) {
    currentMonth.value++
  } else {
    currentMonth.value = 1
    currentYear.value++
  }
}
const updateCalendar = () => {
  showCalendar.value = true
}
</script>

<template>
  <div :class="['group-input', props.class]">
    <label v-if="props.label" :for="$attrs.id" class="form-label">
      {{ props.label }}
    </label>
    <div class="input-group custom-input-group-icon">
      <input
        type="text"
        class="form-control"
        :value="selectedDate"
        @click="showDatePicker"
        readonly
        v-bind="$attrs"
      />
      <div class="input-group-icon">
        <img src="../../assets/icon/icon-system/icon-calendar.svg" />
      </div>
    </div>
    <div class="card">
      <div v-if="showCalendar" ref="calendar" class="datepicker">
        <div class="card-header d-flex justify-content-between">
          <b>Pilih Tanggal</b>
          <button @click="showDatePicker">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z"
                fill="#58585B"
              />
            </svg>
          </button>
        </div>
        <div class="card-body">
          <div class="d-flex justify-content-between pb-3">
            <button @click="previousMonth">&lt;</button>
            <select
              class="bold"
              v-model="selectedMonthYear"
              @change="updateCalendar"
            >
              <option
                v-for="(option, index) in monthYearOptions"
                :key="index"
                :value="option.value"
              >
                {{ option.label }}
              </option>
            </select>
            <button @click="nextMonth">&gt;</button>
          </div>
          <table>
            <thead>
              <tr>
                <th v-for="day in DAYS" :key="day">{{ day }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(week, index) in calendar" :key="index">
                <td
                  v-for="day in week"
                  :key="day.date"
                  @click="selectDate(day)"
                >
                  {{ day.date ? day.date.getDate() : '' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="props.error" class="error-text mt-2">{{ error }}</div>
  </div>
</template>

<style scoped>
.card {
  position: absolute;
  z-index: 999;
  background-color: white;
  width: max-content;
  margin: 0 auto;
}

.card-header {
  padding: 1rem;
  background-color: white;
  border-bottom: 1px solid var(--g-kit-black-20);
}

.card-body .d-flex {
  border-bottom: 1px solid var(--g-kit-black-20);
}

.card-body input {
  padding-left: 0px;
}

.card b {
  font-size: var(--g-kit-font-size-lambda);
  line-height: var(--g-kit-line-height-lambda);
  font-weight: var(--g-kit-font-weight-bold);
}

.flex {
  display: flex;
  justify-content: space-between;
}

.datepicker table {
  width: 100%;
  border-collapse: collapse;
}

.datepicker th,
.datepicker td {
  text-align: center;
  padding: 0.75rem;
}

.datepicker th {
  background-color: white;
  border-bottom: 1px solid var(--g-kit-black-20);
}

.datepicker td:hover {
  background-color: #e6e6e6;
}

.datepicker button {
  background-color: transparent;
  border: none;
  font-size: var(--g-kit-font-size-lambda);
  line-height: var(--g-kit-line-height-lambda);
  font-weight: var(--g-kit-font-weight-bold);
}

.bold {
  font-weight: 800;
}

.datepicker span {
  font-size: 16px;
  font-weight: bold;
  margin: 0 10px;
}

.datepicker select {
  border: 0px;
  background-color: white;
}

.datepicker select:focus-visible {
  outline: none;
}

@media only screen and (max-width: 600px) {
  .card {
    width: calc(100% - 2rem) !important;
  }
  .datepicker {
    max-width: 100%;
  }
  .datepicker th,
  .datepicker td {
    text-align: center;
    padding: 0.25rem;
  }
}
</style>
