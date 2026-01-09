<template>
    <div :class="[computedClassList, { 'flex-width': flexWidth }]">
        <div class="desktop">

            <label :for="$attrs.id" class="form-label">
                {{ title || 'Tanggal Lahir' }}
            </label>

            <Dropdown
                :id="$attrs.id"
                :aria-label="title"
                :aria-describedby="title"
                :disabled="disabled"
                :required="required"
                :class="['calendar-input', { 'custom-width': !flexWidth }, classes]"
                @close="() => {
                    this.resetMonthYear()
                    this.$emit('close')
                }"
                :alignment="alignment"
            >

                <template #button-content>
                    <p :class="['overflow-hidden my-auto text-ellipsis']" :style="{  color: selectedDate ? '#252528 !important' : '#939597 !important' }"  >
                        {{ selectedDate || placeholder || ['Pilih ' + (title || '').toLowerCase()] }}
                    </p>
                </template>
                <template #icon-right>
                    <span> <img src="../../assets/icon/calender.svg" alt="Calendar icon" /> </span>
                </template>

                <div class="content-date">
                    <div class="card">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <b>Pilih Tanggal</b>
                            <button type="button" class="btn p-0" aria-label="Close calendar" @click="closeDropdown">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z"
                                        fill="#58585B" />
                                </svg>
                            </button>
                        </div>

                        <div  ref="calendar" class="datepicker">
                            <div class="d-flex justify-content-between p-3" @click.stop>
                                <button type="button" @click="previousMonth">
                                    <img src="../../assets/icon/icon-system/icon-chevron-left.svg" alt="" />
                                </button>
                                <div class="flex gap-2">
                                    <div class="d-flex justify-content-center border-0">
                                        <span :class="['month-year-text', { 'active': showMonthMenu }]" @click="toggleMonthMenu">{{ formattedMonth }}</span>
                                    </div>
                                    <div class="d-flex justify-content-center border-0">
                                        <span :class="['month-year-text', { 'active': showYearMenu }]" @click="toggleYearMenu">{{ formattedYear }}</span>
                                    </div>
                                </div>
                                <button type="button" @click="nextMonth">
                                    <img src="../../assets/icon/icon-system/icon-chevron-right.svg" alt="" />
                                </button>
                            </div>
                            <div class="calendar-header d-flex" @click.stop>
                                <div v-for="day in days" :key="day" class="calendar-day">{{ day }}</div>
                            </div>
                            <div class="calendar-body">
                                <div v-for="(week, index) in calendar" :key="index" class="calendar-week d-flex">
                                    <div v-for="day in week" :key="day.date"
                                        :class="{
                                            'calendar-date': true,
                                            active: isSelectedDate(day.date),
                                            'slash' : !noSlash && (!day.date || (disableFutureDates && isFutureDate(day.date)) || isOutOfRange(day.date) || day.isPrevMonth || day.isNextMonth),
                                            disabled: !day.date || (disableFutureDates && isFutureDate(day.date)) || isOutOfRange(day.date) || day.isPrevMonth || day.isNextMonth,
                                            'future-date': disableFutureDates && isFutureDate(day.date),
                                            'isPrevMonth': day.isPrevMonth,
                                            'isNextMonth': day.isNextMonth
                                        }"
                                        @click="selectDate(day)">
                                        {{ day.date ? day.date.getDate() : '' }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="showMonthMenu" class="month" @click.stop>
                        <div class="year-menu" ref="monthMenu">
                            <button v-for="month in monthsShort" :key="month" type="button" :class="{ active: isSelectedMonth(month) }" @click="selectMonth(month)" :data-month="month" ref="monthMenus">
                                {{ month }}
                            </button>
                        </div>
                    </div>

                    <div v-if="showYearMenu" class="year" @click.stop>
                        <div class="year-menu" ref="yearMenu">
                            <button v-for="year in years" :key="year" type="button" :class="{ active: isSelectedYear(year) }" @click="selectYear(year)" :data-year="year" ref="yearMenus">
                                {{ year }}
                            </button>
                        </div>
                    </div>
                </div>
            </Dropdown>
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
                @shown="handleOffcanvasToggle(true)"
                @hidden="() => {
                    handleOffcanvasToggle(false)
                    this.$emit('close')
                }"
            >
                <div class="content-date">
                    <div v-if="showCalendar" class="card">
                        <div v-if="showCalendar" ref="calendar" class="datepicker">
                        <div class="d-flex justify-content-between p-3">
                            <button type="button" @click="previousMonth">
                                <img src="../../assets/icon/icon-system/icon-chevron-left.svg" alt="Previous month" />
                            </button>
                            <div class="flex gap-2">
                                <div class="d-flex justify-content-center border-0">
                                    <span :class="['month-year-text', { 'active': showMonthMenu }]" @click="toggleMonthMenu">{{ formattedMonth }}</span>
                                </div>
                                <div class="d-flex justify-content-center border-0">
                                    <span :class="['month-year-text', { 'active': showYearMenu }]" @click="toggleYearMenu">{{ formattedYear }}</span>
                                </div>
                            </div>
                            <button type="button" @click="nextMonth">
                                <img src="../../assets/icon/icon-system/icon-chevron-right.svg" alt="" />
                            </button>
                        </div>
                        <div class="calendar-header d-flex">
                            <div v-for="day in days" :key="day" class="calendar-day">{{ day }}</div>
                        </div>
                        <div class="calendar-body">
                            <div v-for="(week, index) in calendar" :key="index" class="calendar-week d-flex">
                            <div
                                v-for="day in week"
                                :key="day.date"
                                :class="{
                                    'calendar-date': true,
                                    active: isSelectedDate(day.date),
                                    'slash' : !noSlash && (!day.date || (disableFutureDates && isFutureDate(day.date)) || isOutOfRange(day.date) || day.isPrevMonth || day.isNextMonth),
                                    disabled: !day.date || (disableFutureDates && isFutureDate(day.date)) || isOutOfRange(day.date) || day.isPrevMonth || day.isNextMonth,
                                    'future-date': disableFutureDates && isFutureDate(day.date),
                                    'isPrevMonth': day.isPrevMonth,
                                    'isNextMonth': day.isNextMonth
                                }"
                                @click="selectDate(day)"
                            >
                                {{ day.date ? day.date.getDate() : '' }}
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div v-if="showMonthMenu" class="year">
                        <div class="year-menu month" ref="yearMenu">
                        <button
                            v-for="month in monthsShort"
                            :key="month"
                            type="button"
                            :class="{ active: isSelectedMonth(month)}"
                            @click="selectMonth(month)"
                            :data-month="month"
                            ref="yearMenus"
                            aria-label="Select month"
                        >
                            {{ month }}
                        </button>
                        </div>
                    </div>

                    <div v-if="showYearMenu" class="year">
                        <div class="year-menu" ref="yearMenu">
                        <button
                            v-for="year in years"
                            :key="year"
                            type="button"
                            :class="{ active: isSelectedYear(year) }"
                            @click="selectYear(year)"
                            :data-year="year"
                            ref="yearMenus"
                            aria-label="Select year"
                        >
                            {{ year }}
                        </button>
                        </div>
                    </div>
                </div>
            </BOffcanvas>
        </div>
    </div>
</template>

<script>
    import { BOffcanvas } from 'bootstrap-vue-next'
    import Dropdown from '../Dropdown/InputDropdown.vue'
    /* eslint-disable */
    export default {
        name: 'DatePicker',
        inheritAttrs: false,
        components: {
            BOffcanvas,
            Dropdown
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
            },
            disableFutureDates: {
                type: Boolean,
                default: false
            },
            maxDaysFromToday: {
                type: Number,
                default: null
            },
            minDaysFromToday: {
                type: Number,
                default: null
            },
            maxDate: {
                type: String,
                default: null
            },
            minDate: {
                type: String,
                default: null
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
            /**
             * @value start | center | end
             */
            alignment: {
                type: String
            },
            /**
             * remove slash from in out of range date
             */
            noSlash: {
                type: Boolean,
                default: false
            }
        },
        emits: ['update:modelValue', 'update:selectedYear', 'buttomSheetShown', 'close'],
        data() {
            return {
                showDatePickerOffcanvas: false,
                showCalendar: false,
                showYearMenu: false,
                showMonthMenu: false,
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
                    'Agustus',
                    'September',
                    'Oktober',
                    'November',
                    'Desember'
                ],
                monthsShort: [
                    'JAN',
                    'FEB',
                    'MAR',
                    'APR',
                    'MEI',
                    'JUN',
                    'JUL',
                    'AGU',
                    'SEP',
                    'OKT',
                    'NOV',
                    'DES'
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
            formattedMonth() {
                return `${this.months[this.currentMonth - 1]}`
            },
            formattedYear() {
                return `${this.currentYear}`
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
                const lastDayOfWeek = lastDayOfMonth.getDay();

                let dayCount = 1;
                const weeks = [];

                for (let i = 0; i < 6; i++) {
                    const week = [];
                    let hasDate = false;
                    for (let j = 0; j < 7; j++) {
                        if ((i === 0 && j < firstDayOfWeek) || dayCount > lastDateOfMonth) {
                            if (i === 0 && j < firstDayOfWeek) {
                                const prevMonthDate = new Date(this.currentYear, this.currentMonth - 1, 0);
                                prevMonthDate.setDate(prevMonthDate.getDate() - (firstDayOfWeek - j - 1));
                                week.push({
                                    date: prevMonthDate,
                                    isPrevMonth: true,
                                });
                            } else if (dayCount > lastDateOfMonth) {
                                const nextMonthDate = new Date(this.currentYear, this.currentMonth, dayCount -
                                    lastDateOfMonth);
                                week.push({
                                    date: nextMonthDate,
                                    isNextMonth: true,
                                });
                                dayCount++;
                            } else {
                                week.push({
                                    date: null,
                                });
                            }
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
                if (this.modelValue) {
                    this.currentMonth = new Date(this.modelValue).getMonth() + 1
                    this.currentYear = new Date(this.modelValue).getFullYear()
                }
            }
        },
        methods: {
            toggleMonthMenu() {
                this.showMonthMenu = !this.showMonthMenu;
                if (this.showMonthMenu) {
                    this.showYearMenu = false;
                }

                this.$nextTick(() => {
                    if (this.showMonthMenu) {
                        this.scrollToSelectedMonth();
                    }
                });
            },
            toggleYearMenu() {
                this.showYearMenu = !this.showYearMenu;
                if (this.showYearMenu) {
                    this.showMonthMenu = false;
                }

                this.$nextTick(() => {
                    if (this.showYearMenu) {
                        this.scrollToSelectedYear();
                    }
                });
            },
            scrollToSelectedYear() {
                const yearMenu = this.$refs.yearMenu;
                const selectedYear = this.currentYear;

                if (yearMenu) {
                    const selectedYearElement = yearMenu.querySelector(`[data-year="${selectedYear}"]`);
                    if (selectedYearElement) {
                        const selectedYearOffsetTop = selectedYearElement.offsetTop;
                        const menuHeight = yearMenu.clientHeight;
                        const selectedYearHeight = selectedYearElement.clientHeight;
                        yearMenu.scrollTop = selectedYearOffsetTop - menuHeight / 2 + selectedYearHeight / 2;
                    }
                }
            },
            scrollToSelectedMonth() {
                const monthMenu = this.$refs.monthMenu;
                const selectedMonthShort = this.monthsShort[this.currentMonth - 1];

                if (monthMenu) {
                    const selectedMonthElement = monthMenu.querySelector(`[data-month="${selectedMonthShort}"]`);
                    if (selectedMonthElement) {
                        const selectedMonthOffsetTop = selectedMonthElement.offsetTop;
                        const menuHeight = monthMenu.clientHeight;
                        const selectedMonthHeight = selectedMonthElement.clientHeight;
                        monthMenu.scrollTop = selectedMonthOffsetTop - menuHeight / 2 + selectedMonthHeight / 2;
                    }
                }
            },
            toggleOffCanvas() {
                this.showDatePickerOffcanvas = !this.showDatePickerOffcanvas
                this.showCalendar = !this.showCalendar
                if (this.showDatePickerOffcanvas) {
                    this.showCalendar = true
                } else {
                    this.showCalendar = false
                }
                this.resetMonthYear()
            },
            showDatePicker() {
                this.showYearMenu = true
                this.showCalendar = !this.showCalendar
                this.resetMonthYear()
                this.$nextTick(() => {
                    this.adjustDatePickerPosition();
                });
            },
            selectDate(day) {
                if (day.date && (!this.disableFutureDates || !this.isFutureDate(day.date)) && !this.isOutOfRange(day
                        .date) && !day.isPrevMonth && !day.isNextMonth) {
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
            closeDropdown() {
                this.showDatePickerOffcanvas = false;
                this.showCalendar = false;
                this.resetMonthYear()
            },
            // formattedDate(value) {
            //     let formatted = ''
            //     if (value && value !== 'null') {
            //         const [year, month, day] = value.split('-')
            //         const newDay = String(Number(day)).padStart(2, '0')
            //         const newMonth = String(Number(month)).padStart(2, '0')
            //         formatted = `${newDay}/${newMonth}/${year}`
            //     }
            //     return formatted
            // },
            formattedDate(value) {
                let formatted = ''
                if (value && value !== 'null') {
                    const [year, month, day] = value.split('-')
                    const newDay = String(Number(day)).padStart(2, '0')

                    if (this.formatType === 'short') {
                        const shortMonth = this.months[Number(month) - 1].substring(0, 3)
                        
                        formatted = `${newDay} ${shortMonth} ${year}`
                    } else {
                        const newMonth = String(Number(month)).padStart(2, '0')
                        formatted = `${newDay}/${newMonth}/${year}`
                    }
                }
                return formatted
            },
            deformattedDate(value) {
                if (!value) return null;
                
                if (this.formatType === 'short') {
                    const [day, month, year] = value.split(' ')
                    const monthIndex = this.months.findIndex(m => m.startsWith(month))
                    return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                } else {
                    const [day, month, year] = value.split('/')
                    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                }
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
                this.showMonthMenu = false
                this.updateCalendar()
            },
            selectMonth(month) {
                const monthIndex = this.monthsShort.indexOf(month)
                if (monthIndex !== -1) {
                    this.currentMonth = monthIndex + 1
                }
                this.showYearMenu = false
                this.showMonthMenu = false
                this.updateCalendar()
            },

            updateCalendar() {
                this.showCalendar = true
            },
            isSelectedYear(year) {
                return year === this.currentYear
            },
            isSelectedMonth(month) {
                const monthIndex = this.monthsShort.indexOf(month)
                return monthIndex !== -1 && monthIndex === (this.currentMonth - 1)
            },
            isSelectedDate(date) {
                if (!date || !this.selectedDate) return false;
                const selected = new Date(this.deformattedDate(this.selectedDate));
                return (
                    selected.getDate() === date.getDate() &&
                    selected.getMonth() === date.getMonth() &&
                    selected.getFullYear() === date.getFullYear()
                );
            },
            isFutureDate(date) {
                if (!date) return false;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date > today;
            },
            isOutOfRange(date) {
                if (!date) return false;
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (this.maxDaysFromToday !== null) {
                    const maxDate = new Date(today);
                    maxDate.setDate(today.getDate() + this.maxDaysFromToday);
                    if (date > maxDate) return true;
                }

                if (this.minDaysFromToday !== null) {
                    const minDate = new Date(today);
                    minDate.setDate(today.getDate() + this.minDaysFromToday);
                    if (date < minDate) return true;
                }

                if (this.maxDate) {
                    const maxDate = new Date(this.maxDate);
                    maxDate.setHours(0, 0, 0, 0);
                    if (date > maxDate) return true;
                }

                if (this.minDate) {
                    const minDate = new Date(this.minDate);
                    minDate.setHours(0, 0, 0, 0);
                    if (date < minDate) return true;
                }

                return false;
            },
            handleOffcanvasToggle(value) {
                this.$emit('buttomSheetShown', value)
            },
            adjustDatePickerPosition() {
                this.$nextTick(() => {
                    const datePicker = this.$refs.calendar;
                    const trigger = this.$refs.trigger;
                    if (datePicker && trigger) {
                        const triggerRect = trigger.getBoundingClientRect();
                        const datePickerRect = datePicker.getBoundingClientRect();
                        const viewportHeight = window.innerHeight;

                        if (triggerRect.bottom + datePickerRect.height > viewportHeight) {
                            datePicker.style.top = `${triggerRect.top - datePickerRect.height}px`;
                            datePicker.style.bottom = 'auto';
                            datePicker.classList.add('above');
                            datePicker.classList.remove('below');
                        } else {
                            datePicker.style.top = `${triggerRect.bottom}px`;
                            datePicker.style.bottom = 'auto';
                            datePicker.classList.add('below');
                            datePicker.classList.remove('above');
                        }
                    }
                });
            },
            resetMonthYear() {
                if (!this.modelValue) {
                    this.currentMonth = new Date().getMonth() + 1
                    this.currentYear = new Date().getFullYear()
                } else {
                    this.currentMonth = new Date(this.modelValue).getMonth() + 1
                    this.currentYear = new Date(this.modelValue).getFullYear()
                }
            },
        },
        mounted() {
            this.$nextTick(() => {
                if (this.showYearMenu) {
                    this.scrollToSelectedYear();
                }
            });
        }
    }
</script>

<style lang="scss">

    .flex-width {
        width: calc(50% - 8px);
    }

    .desktop {
        .custom-width {
            min-width: 246px;
        }
    }

    .calendar-input .dropdown-menu.show.overflow-auto {
        padding: 0px;
        width: fit-content;
        max-height: unset !important;
        filter: drop-shadow(0px 12px 6px rgba(0, 0, 0, 0.02)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.02));
        border-radius: .875rem;
        border: 1px solid var(--g-kit-black-20);

        .card {
            position: relative;
            z-index: 999;
            background-color: white;
            width: 360px;
            margin: 0 auto;
            height: fit-content;
            border-radius: 12px;
        }

        .card-header {
            padding: 1rem;
            background-color: white;
            border-top-right-radius: 12px;
            border-top-left-radius: 12px;
            border-bottom: 1px solid var(--g-kit-black-20);
        }

        .card b {
            font-size: var(--g-kit-font-size-lambda);
            line-height: var(--g-kit-line-height-lambda);
            font-weight: var(--g-kit-font-weight-bold);
        }
    }

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

    .flex {
        display: flex;
        justify-content: space-between;
    }

    .datepicker {
        .calendar-header {
            display: flex;
            justify-content: space-between;
            padding: .5rem 1rem;
            border-top: 1px solid var(--g-kit-black-20);
            border-bottom: 1px solid var(--g-kit-black-20);
        }

        .calendar-day {
            flex: 1;
            text-align: center;
            font-weight: bold;
        }

        .calendar-body {
            padding: 1rem;
            display: flex;
            gap: .5rem;
            flex-direction: column;
        }

        .calendar-week {
            display: flex;
            gap: .5rem;
        }

        .calendar-date {
            flex: 1;
            text-align: center;
            padding: 0.5rem;
            cursor: pointer;
            aspect-ratio: 1 / 1;
            /* Ensures a 1:1 ratio */
            border-radius: 50%;
            place-content: center;

            &:hover {
                background-color: var(--g-kit-lime-50);
                color: white;
            }

            &.active {
                background-color: var(--g-kit-lime-50);
                color: white;
                border-radius: 50%;
            }

            &.disabled {
                pointer-events: none;
                color: var(--g-kit-black-20);
            }
        }
    }

    .datepicker button {
        background-color: transparent;
        border: none;
        font-size: var(--g-kit-font-size-lambda);
        line-height: var (--g-kit-line-height-lambda);
        font-weight: var(--g-kit-font-weight-bold);
    }

    .bold {
        font-weight: 800;
    }

    .appearance-none {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        text-indent: unset;
        text-overflow: unset;
        font-size: var(--g-kit-font-size-lambda);
        line-height: var(--g-kit-line-height-lambda);
        font-weight: var(--g-kit-font-weight-bold);
    }

    .datepicker span {
        font-size: var(--g-kit-font-size-lambda);
        line-height: var (--g-kit-line-height-lambda);
        font-weight: var(--g-kit-font-weight-bold);
        color: var(--g-kit-black-80);
        cursor: pointer;
    }

    .month-year-text {
        color: var(--g-kit-lime-50) !important;
    }

    .month-year-text.active {
        color: var(--g-kit-black-50) !important;
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
        height: -webkit-fill-available;
        overflow: scroll;
        scrollbar-width: none;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border: 1px solid var(--g-kit-black-20);
        filter: drop-shadow(0px 12px 6px rgba(0, 0, 0, 0.02)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.02));
    }

    .month {
        position: absolute;
        z-index: 1080;
        background-color: white;
        top: 120px;
        width: 360px;
        height: -webkit-fill-available;
        overflow: scroll;
        scrollbar-width: none;
        border-bottom-left-radius: 6px;
        border-bottom-right-radius: 6px;
        border: 1px solid var(--g-kit-black-20);
        filter: drop-shadow(0px 12px 6px rgba(0, 0, 0, 0.02)) drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.02));
    }

    .year-menu {
        display: flex;
        gap: 1rem;
        padding: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .year-menu button {
        padding: .75rem 1.5rem;
        background-color: transparent;
        border: none;
        cursor: pointer;
        font-size: var(--g-kit-font-size-lambda);
        line-height: var(--g-kit-line-height-lambda);
        font-weight: var(--g-kit-font-weight-normal);
        color: var(--g-kit-black-80);
        min-width: 82px;
    }

    .year-menu button:hover {
        color: var(--g-kit-lime-50);
    }

    .year button.active,
    .month button.active {
        background-color: var(--g-kit-lime-50);
        color: white;
        border-radius: 8px;
    }

    .offcanvas.offcanvas-kit {
        .offcanvas-body {
            padding: 0 !important;
        }
    }

    .offcanvas img {
        margin-bottom: unset;
    }

    .datepicker .calendar-date.future-date {
        color: var(--g-kit-black-40);
    }

    .datepicker .calendar-date.isPrevMonth,
    .datepicker .calendar-date.isNextMonth,
    .datepicker .calendar-date.disabled {
        color: var(--g-kit-black-40);
        pointer-events: none;
    }

    .datepicker .calendar-date.slash{
        position: relative;
    }
    .datepicker .calendar-date.slash::before{
        position: absolute;
        content: "";
        left: 15%;
        top: 45%;
        right: 0;
        border-top: 1px solid;
        border-color: var(--g-kit-black-40);
        width: 30px;
        
        -webkit-transform:rotate(-45deg);
        -moz-transform:rotate(-45deg);
        -ms-transform:rotate(-45deg);
        -o-transform:rotate(-45deg);
        transform:rotate(-45deg);
    }



    .date-range-picker:has(~ .error-text) {
        .group-input {
            margin-bottom: 0;
        }
    }

    @media only screen and (max-width: 600px) {
        .year-menu button {
            padding: .75rem 1.5rem;
            font-size: var(--g-kit-font-size-lambda);
            line-height: var(--g-kit-line-height-lambda);
            font-weight: var(--g-kit-font-weight-normal);
            min-width: 92px;
            max-height: 50px;
        }

        .year,
        .month,
        .card {
            width: 100% !important;
            filter: none;
        }

        .year,
        .month {
            top: 60px;
            height: -webkit-fill-available;
            border-bottom: 0px;
        }

        .year-menu {
            margin-bottom: 0;
        }

        .year-menu.month{
            gap: 1.5rem;
            top: 0px;
        }

        .datepicker {
            max-width: 100%;
        }

        .content-date {
            position: relative;
        }
    }
</style>