<template>
  <div :class="['group-input calendar-input', addClass]">
    <div class="desktop">
      <label :for="$attrs.id" class="form-label">
        {{ title || 'Tanggal Lahir' }}
      </label>

      <div :class="['input-group custom-input-group-icon', showCalendar ? 'active' : '']">
        <input
          type="text"
          :class="['form-control', classes]"
          v-bind="$attrs"
          :aria-label="title"
          :aria-describedby="title"
          :disabled="disabled"
          :required="required"
          :placeholder="placeholder || ['Pilih ' + (title || '').toLowerCase()]"
          v-model="selectedDate"
          @click="showDatePicker"
          readonly
        />

        <div class="input-group-icon">
          <img src="../../assets/icon/icon-system/icon-calendar.svg" />
        </div>
      </div>

      <div class="content-date">
        <div v-if="showCalendar" class="card">
          <div
            class="card-header d-flex justify-content-between align-items-center"
          >
            <b>Pilih Tanggal</b>
            <button class="btn p-0" @click="showDatePicker">
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

          <div v-if="showCalendar" ref="calendar" class="datepicker">
            <div class="d-flex justify-content-between p-3">
              <button @click="previousMonth">
                <img
                  src="../../assets/icon/icon-system/icon-chevron-left.svg"
                  alt=""
                />
              </button>
              <div class="d-flex justify-content-center border-0">
                <span class="month-year-text" @click="toggleYearMenu">{{
                  formattedMonthYear
                }}</span>
              </div>
              <button @click="nextMonth">
                <img
                  src="../../assets/icon/icon-system/icon-chevron-right.svg"
                  alt=""
                />
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th v-for="day in days" :key="day">{{ day }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(week, index) in calendar" :key="index">
                  <td
                    v-for="day in week"
                    :key="day.date"
                    :class="{ active: isSelectedDate(day.date) }"
                    @click="selectDate(day)"
                  >
                    {{ day.date ? day.date.getDate() : '' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-if="showYearMenu" class="year">
          <div class="year-menu" ref="yearMenu">
            <button
              v-for="year in years"
              :key="year"
              :class="{ active: isSelectedYear(year) }"
              @click="selectYear(year)"
              :data-year="year"
              ref="yearMenus"
            >
              {{ year }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mobile">
      <label :for="$attrs.id" class="form-label">
        {{ title || 'Tanggal Lahir' }}
      </label>

      <div :class="['input-group custom-input-group-icon', showCalendar ? 'active' : '']">
        <input
          type="text"
          :class="['form-control', classes]"
          v-bind="$attrs"
          :aria-label="title"
          :aria-describedby="title"
          :disabled="disabled"
          :required="required"
          :placeholder="placeholder || ['Pilih ' + (title || '').toLowerCase()]"
          v-model="selectedDate"
          @click="toggleOffCanvas"
          readonly
        />

        <div class="input-group-icon">
          <img src="../../assets/icon/icon-system/icon-calendar.svg" />
        </div>
      </div>

      <BOffcanvas
        v-model="showDatePickerOffcanvas"
        class="w-100 offcanvas-kit"
        placement="bottom"
        :title="'Pilih Tanggal' || title"
        style="min-height: 485px; height: fit-content;"
        @shown="handleOffcanvasToggle(true)"
        @hidden="handleOffcanvasToggle(false)"
      >
        <div class="content-date">
          <div v-if="showCalendar" class="card">
            <div v-if="showCalendar" ref="calendar" class="datepicker">
              <div class="d-flex justify-content-between p-3">
                <button @click="previousMonth">
                  <img
                    src="../../assets/icon/icon-system/icon-chevron-left.svg"
                    alt=""
                  />
                </button>
                <div class="d-flex justify-content-center border-0">
                  <span class="month-year-text" @click="toggleYearMenu">{{
                    formattedMonthYear
                  }}</span>
                </div>
                <button @click="nextMonth">
                  <img
                    src="../../assets/icon/icon-system/icon-chevron-right.svg"
                    alt=""
                  />
                </button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th v-for="day in days" :key="day">{{ day }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(week, index) in calendar" :key="index">
                    <td
                      v-for="day in week"
                      :key="day.date"
                      :class="{ active: isSelectedDate(day.date) }"
                      @click="selectDate(day)"
                    >
                      {{ day.date ? day.date.getDate() : '' }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div v-if="showYearMenu" class="year">
            <div class="year-menu" ref="yearMenu">
              <button
                v-for="year in years"
                :key="year"
                :class="{ active: isSelectedYear(year) }"
                @click="selectYear(year)"
                :data-year="year"
                ref="yearMenus"
              >
                {{ year }}
              </button>
            </div>
          </div>
        </div>
      </BOffcanvas>
    </div>

    <div class="error-text" v-if="error">
      {{ error }}
    </div>
  </div>
</template>

<script>
import { BOffcanvas } from 'bootstrap-vue-next'
/* eslint-disable */
export default {
  name: 'DatePicker',
  inheritAttrs: false,
  components: {
    BOffcanvas
  },
  props: {
    title: {
      type: String,
      default: 'Tanggal Lahir'
    },
    placeholder: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    required: {
      type: Boolean
    },
    classes: {
      type: String
    },
    modelValue: {
      type: String,
      default: null
    },
    error: {},
    selectedYear: {
      type: Number,
      default: new Date().getFullYear()
    },
    addClass: {
      type: String
    }
  },
  emits: ['update:modelValue', 'update:selectedYear', 'buttomSheetShown'],
  data() {
    return {
      showDatePickerOffcanvas: false,
      showCalendar: false,
      showYearMenu: false,
      currentMonth: new Date().getMonth() + 1,
      currentYear: new Date().getFullYear(),
      days: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
      months: [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Augustus',
        'September',
        'Oktober',
        'November',
        'Desember'
      ]
    }
  },
  computed: {
    selectedDate: {
      get() {
        return this.formattedDate(this.modelValue)
      },
      set(value) {
        this.$emit('update:modelValue', value)
      }
    },
    formattedMonthYear() {
      return `${this.months[this.currentMonth - 1]} ${this.currentYear}`
    },
    calendar() {
      const firstDayOfMonth = new Date(
        this.currentYear,
        this.currentMonth - 1,
        1
      );
      const lastDayOfMonth = new Date(this.currentYear, this.currentMonth, 0);
      const firstDayOfWeek = firstDayOfMonth.getDay();
      const lastDateOfMonth = lastDayOfMonth.getDate();

      let dayCount = 1;
      const weeks = [];

      for (let i = 0; i < 6; i++) {
        const week = [];
        let hasDate = false;
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < firstDayOfWeek) || dayCount > lastDateOfMonth) {
            week.push({
              date: null,
            });
          } else {
            const date = new Date(
              this.currentYear,
              this.currentMonth - 1,
              dayCount
            );
            week.push({
              date,
            });
            dayCount++;
            hasDate = true;
          }
        }
        if (hasDate) {
          weeks.push(week);
        }
      }

      return weeks;
    },
    years() {
      let startYear = this.selectedYear || this.currentYear
      startYear += 3
      const endYear = this.selectedYear - 125
      const years = []
      for (let year = startYear; year >= endYear; year--) {
        years.push(year)
      }
      return years
    }
  },
  watch: {
    selectedDate() {
      if (this.modelValue)
        this.currentMonth = new Date(this.modelValue).getMonth() + 1
      if (this.modelValue)
        this.currentYear = new Date(this.modelValue).getFullYear()
    }
  },
  methods: {
    toggleYearMenu() {
      this.showYearMenu = !this.showYearMenu
    },
    toggleOffCanvas() {
      this.showDatePickerOffcanvas = !this.showDatePickerOffcanvas
      this.showCalendar = !this.showCalendar
      if (this.showDatePickerOffcanvas) {
        this.showCalendar = true
      } else {
        this.showCalendar = false
      }
    },
    showDatePicker() {
      this.showYearMenu = false
      this.showCalendar = !this.showCalendar
    },
    selectDate(day) {
      if (day.date) {
        const newSelectedDate = new Date(day.date)
        newSelectedDate.setDate(newSelectedDate.getDate() + 0)

        const dayOfMonth = newSelectedDate.getDate()
        const month = newSelectedDate.getMonth() + 1
        const year = newSelectedDate.getFullYear()

        this.selectedDate = `${year}-${month < 10 ? '0' : ''}${month}-${
          dayOfMonth < 10 ? '0' : ''
        }${dayOfMonth}`

        if (this.showCalendar) {
          this.showDatePickerOffcanvas = false
          this.showCalendar = false
        }
      }
    },

    formattedDate(value) {
      let formatted = ''
      if (value && value !== 'null') {
        const [year, month, day] = value.split('-')
        const newDay = String(Number(day)).padStart(2, '0')
        const newMonth = String(Number(month)).padStart(2, '0')
        formatted = `${newDay}/${newMonth}/${year}`
      }
      return formatted
    },
    previousMonth() {
      if (this.currentMonth > 1) {
        this.currentMonth--
      } else {
        this.currentMonth = 12
        this.currentYear--
      }
    },
    nextMonth() {
      if (this.currentMonth < 12) {
        this.currentMonth++
      } else {
        this.currentMonth = 1
        this.currentYear++
      }
    },
    selectYear(year) {
      this.currentYear = year
      this.showYearMenu = false
      this.updateCalendar()
    },

    updateCalendar() {
      this.showCalendar = true
    },
    isSelectedYear(year) {
      return year === this.currentYear
    },
    isSelectedDate(date) {
      if (!date || !this.selectedDate) return false;
      const selected = new Date(this.selectedDate.split('/').reverse().join('-'));
      return (
        selected.getDate() === date.getDate() &&
        selected.getMonth() === date.getMonth() &&
        selected.getFullYear() === date.getFullYear()
      );
    },
    scrollToSelectedYear() {
      const yearMenu = this.years

      if (yearMenu) {
        const selectedYearElement = yearMenu.children
        if (selectedYearElement) {
          const selectedYearOffsetTop = selectedYearElement.offsetTop
          const menuHeight = yearMenu.clientHeight
          const selectedYearHeight = selectedYearElement.clientHeight
          yearMenu.scrollTop =
            selectedYearOffsetTop - menuHeight / 2 + selectedYearHeight / 2
        }
      }
    },
    handleOffcanvasToggle(value) {
      this.$emit('buttomSheetShown', value)
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.scrollToSelectedYear()
    })
  }
}
</script>


<style lang="scss" scoped>
  .input-group.active {
    border: 1px solid var(--g-kit-lime-50); 
    .form-control {
      background-color: transparent !important
    }
  }

  .form-control {
    cursor: pointer;
  }
  
  .custom-input-group-icon:has(.form-control:disabled) {
    background-color: var(--g-kit-black-20);
  }
  
  .content-date {
    position: relative;
  }
  
  .form-control {
    cursor: pointer;
  }
  
  .content-date {
    position: relative;
  }
  
  .card {
    position: absolute;
    z-index: 999;
    background-color: white;
    width: 360px;
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
    padding: unset;
    font-size: var(--g-kit-font-size-lambda);
    line-height: var(--g-kit-line-height-lambda);
    font-weight: var(--g-kit-font-weight-normal);
    color: var(--g-kit-black-80);
    cursor: pointer;

    &.active {
      background-color: var(--g-kit-lime-50);
      color: white;
      border-radius: 50%;
    }
  }

  .datepicker td {
    width: calc(100% / 7);
    height: 51.42px; /* Same as the width */
  }

  .datepicker td > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .datepicker th {
    background-color: white;
    border-bottom: 1px solid var(--g-kit-black-20);
    font-size: var(--g-kit-font-size-lambda);
    line-height: var(--g-kit-line-height-lambda);
    font-weight: var(--g-kit-font-weight-normal);
    color: var(--g-kit-black-60);
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
  
  .appearance-none {
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: unset;
    text-overflow: unset;
    font-size: var(--g-kit-font-size-lambda);
    line-height: var(--g-kit-line-height-lambda);
    font-weight: var(--g-kit-font-weight-bold);
  }
  
  .datepicker span {
    font-size: var(--g-kit-font-size-lambda);
    line-height: var(--g-kit-line-height-lambda);
    font-weight: var(--g-kit-font-weight-bold);
    color: var(--g-kit-black-80);
    cursor: pointer;
  }

  .month-year-text {
    color: var(--g-kit-lime-50) !important;
  }
  
  .datepicker span:hover {
    color: var(--g-kit-lime-50);
  }
  
  .datepicker select {
    border: 0px;
    background-color: white;
  }
  
  .datepicker select:focus-visible {
    outline: none;
  }
  
  .year {
    position: absolute;
    z-index: 1080;
    background-color: white;
    top: 120px;
    width: 360px;
    height: 320px;
    overflow: scroll;
    scrollbar-width: none;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border: 1px solid var(--g-kit-black-20);
    filter: drop-shadow(0px 12px 6px rgba(0, 0, 0, 0.02))
      drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.02));
  }
  
  .year-menu {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .year-menu button {
    margin-top: 18px;
    margin-bottom: 18px;
    margin-right: 14px;
    margin-left: 14px;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: var(--g-kit-font-size-lambda);
    line-height: var(--g-kit-line-height-lambda);
    font-weight: var(--g-kit-font-weight-normal);
    color: var(--g-kit-black-80);
  }
  
  .year-menu button:hover {
    color: var(--g-kit-lime-50);
  }
  
  .year button.active {
    background-color: var(--g-kit-lime-50);
    color: white;
    margin: 10px 14px;
    border-radius: 12px;
  }
  
  .offcanvas img {
    margin-bottom: unset;
  }
  
  @media only screen and (max-width: 600px) {
    .year-menu button {
      margin-top: 17px;
      margin-bottom: 17px;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      font-size: var(--g-kit-font-size-omicron);
      line-height: var(--g-kit-line-height-omicron);
      font-weight: var(--g-kit-font-weight-normal);
    }
  
    .year,
    .card {
      width: 100% !important;
      filter: none;
    }
  
    .year {
      top: 64px;
    }
  
    .year-menu {
      margin-bottom: unset;
    }
  
    .datepicker {
      max-width: 100%;
    }
  
    .datepicker th,
    .datepicker td {
      text-align: center;
      padding: 0.5rem;
    }
    .datepicker td {
      width: calc(100% / 7);
      height: calc(100vw / 7); /* Same as the width */
    }
  }
  </style>
  