<script setup>
/* eslint-disable */
import {
  defineOptions,
  ref,
  defineModel,
  watch,
  computed,
  defineProps
} from 'vue'
import DateRangePicker from './DateRangePicker.vue'
import { BDropdownItem, BDropdownItemButton, BOffcanvas, BFormRadioGroup, BFormRadio } from 'bootstrap-vue-next'
import Dropdown from '../Dropdown/InputDropdown.vue'

defineOptions({ name: 'DateRangePickerOption', inheritAttrs: false })
const emit = defineEmits(['buttomSheetShown'])

const SELECTED_PRESET = ref('ANY')
const dateRangeDisabled = computed(() =>
  SELECTED_PRESET.value === 'ANY' ? false : true
)
const props = defineProps({
  label: {},
  error: {},
  preset: {
    default: [
      {
        label: '7 Hari Terakhir',
        value: '7'
      },
      {
        label: '30 Hari Terakhir',
        value: '30'
      }
    ]
  },
  showAny: {
    default: true
  },
  useBottomSheet: {
    type: Boolean,
    default: false
  },
})

const startDate = defineModel('startDate')
const endDate = defineModel('endDate')
const showOffcanvas = ref(false)

const getDateString = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getFormattedDateString = (dateString) => {
  const [year, month, day] = dateString.split('-')

  return `${day}/${month}/${year}`
}

const valueString = computed(() =>
  startDate.value && endDate.value
    ? `${getFormattedDateString(startDate.value)} - ${getFormattedDateString(
        endDate.value
      )}`
    : ''
)

watch(SELECTED_PRESET, () => {
  if (SELECTED_PRESET.value === 'ANY') {
    startDate.value = ''
    endDate.value = ''
    return
  }
  const todaysDate = new Date()
  const previousDate = new Date()
  previousDate.setDate(todaysDate.getDate() - parseInt(SELECTED_PRESET.value))
  startDate.value = getDateString(previousDate)
  endDate.value = getDateString(todaysDate)
  if (SELECTED_PRESET.value !== 'ANY') handleShown(false)
})

watch([startDate, endDate], () => {
  if (SELECTED_PRESET.value === 'ANY' && startDate.value && endDate.value) handleShown(false)
})

const handleShown = (value) => {
  if (props.useBottomSheet) {
    showOffcanvas.value = value
    emit('buttomSheetShown', value)
  }
}
</script>

<template>
  <div class="group-input">
    <div class="label-container">
      <label class="form-label"> {{ props.label }} </label>
    </div>
    <Dropdown :id="$attrs.id" class="input-filter" :show-menu="!props.useBottomSheet" @shown="handleShown(true)" :placeholder="valueString">
      <div v-if="!props.useBottomSheet">
        <div
          v-for="(preset, idx) in props.preset"
          :key="preset.value"
          class="preset-btn"
          :class="{
            'preset-btn--selected': SELECTED_PRESET === preset.value,
            'mt-2': idx > 0
          }"
        >
          <BDropdownItem>
            <BDropdownItemButton
              class="overflow-hidden"
              buttonClass="d-flex align-items-center"
              @click.stop="SELECTED_PRESET = preset.value"
            >
              <div
                class="btn-identifier"
                :class="{
                  'btn-identifier--selected': SELECTED_PRESET === preset.value
                }"
              >
                &nbsp;
              </div>
              {{ preset.label }}
            </BDropdownItemButton>
          </BDropdownItem>
        </div>
        <div
          v-if="props.showAny"
          class="preset-btn mt-2"
          :class="{ 'preset-btn--selected': SELECTED_PRESET === 'ANY' }"
        >
          <BDropdownItem>
            <BDropdownItemButton
              class="overflow-hidden"
              buttonClass="d-flex align-items-center test"
              @click.stop="SELECTED_PRESET = 'ANY'"
            >
              <div
                class="btn-identifier"
                :class="{ 'btn-identifier--selected': SELECTED_PRESET === 'ANY' }"
              >
                &nbsp;
              </div>
              Rentang Waktu
            </BDropdownItemButton>
          </BDropdownItem>
        </div>
        <DateRangePicker
          v-model:start-date="startDate"
          v-model:end-date="endDate"
          class="mt-2"
          @click.stop
          :disabled="dateRangeDisabled"
        />
      </div>
      <BOffcanvas
        v-if="props.useBottomSheet"
        v-model="showOffcanvas"
        placement="bottom"
        bodyScrolling="true"
        @click.stop
        @hidden="handleShown(false)"
      >
        <template #title>Pilih Waktu</template>
        <div
          v-for="(preset, idx) in props.preset"
          :key="preset.value"
          class="preset-btn"
          :class="{
            'preset-btn--selected': SELECTED_PRESET === preset.value,
            'mt-2': idx > 0
          }"
        >
          <BFormRadio
            style="margin-top: auto;"
            class="btn-identifier d-flex align-items-center"
            :class="{
              'btn-identifier--selected': SELECTED_PRESET === preset.value
            }"
            v-model="SELECTED_PRESET"
            :value="preset.value"
            :id="$attrs.id + '-preset-' + preset.value"
          >{{ preset.label }}</BFormRadio>
        </div>
        <div
          v-if="props.showAny"
          class="preset-btn mt-2"
          :class="{ 'preset-btn--selected': SELECTED_PRESET === 'ANY' }"
        >
          <BFormRadio
            class="btn-identifier d-flex align-items-center"
            :class="{
              'btn-identifier--selected': SELECTED_PRESET === 'ANY'
            }"
            style="margin-top: auto;"
            v-model="SELECTED_PRESET"
            :value="'ANY'"
            :id="$attrs.id + '-preset-any'"
            @click.stop
          >Rentang Waktu</BFormRadio>
        </div>
        <DateRangePicker
          v-model:start-date="startDate"
          v-model:end-date="endDate"
          class="mt-2"
          @click.stop
          :disabled="dateRangeDisabled"
        />
      </BOffcanvas>
    </Dropdown>
    <div class="error-text">{{ props.error }}</div>
  </div>
</template>

<style lang="scss">
.input-filter {
  .dropdown-menu {
    &.show {
      display: table;
    }
  }
}
.preset-btn {
  padding: 12px;
  border-radius: 0.5rem;
  border: 1px solid lightgrey;
  background-color: transparent;
  border-color: lightgray;

  &--selected {
    background-color: rgba(0, 255, 0, 0.15);
    border-color: green;
  }

  & .dropdown-item {
    margin-top: 0 !important;

    &:hover,
    &:active,
    &:focus {
      background-color: transparent !important;
    }
  }
}

.btn-identifier {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  border: 2px solid grey;
  margin-right: 0.6rem;

  &--selected {
    border: 6.5px solid green;
  }
}
</style>
