<script setup>
/* eslint-disable */
import {
  computed,
  defineOptions,
  defineProps,
  ref,
  defineEmits,
  useAttrs
} from 'vue'
import {
  BDropdown,
  BDropdownItem,
  BFormInput,
  BSpinner,
  BOffcanvas
} from 'bootstrap-vue-next'

defineOptions({ name: 'InputDropdown', inheritAttrs: false })

const attrs = useAttrs()

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  useBottomSheet: {
    type: Boolean,
    default: false
  },
  showMenu: {
    type: Boolean,
    default: true
  },
  error: String,
  label: String,
  items: Array,
  itemValue: String,
  itemText: String,
  modelValue: String,
  placeholder: String,
  class: String,
  errorFetch: String,
  executeFetch: Function
})

const emit = defineEmits(['update:modelValue', 'buttomSheetShown'])

const search = ref()
const shown = ref(false)
const shownOffcanvas = ref(false)

const handleShown = () => {
  if (!props.useBottomSheet) shown.value = !shown.value
  if (props.useBottomSheet) shownOffcanvas.value = true
}

const filteredItems = computed(() =>
  search.value
    ? props.items.filter((i) =>
        i[props.itemText].toLowerCase().includes(search.value.toLowerCase())
      )
    : props.items
)

const selectedText = computed(() => {
  if (selectedValue.value && props.items.length > 0) {
    const findItem = props.items.find(
      (v) => v[props.itemValue] === selectedValue.value
    )
    if (findItem) return findItem[props.itemText]
    return ''
  } else {
    return ''
  }
})

const selectedValue = computed({
  get: () => (props.modelValue ? props.modelValue : null),
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})

const handleOptionClick = (option) => {
  selectedValue.value = option[props.itemValue]
  if (props.useBottomSheet) shownOffcanvas.value = false
  if (attrs.onChange && attrs.onInput && attrs.onBlur) {
    attrs.onChange()
    attrs.onInput()
    attrs.onBlur()
  }
}

const handleOffcanvasToggle = (value) => {
  emit('buttomSheetShown', value)
}
</script>

<template>
  <div :class="['group-input', props.class]">
    <div class="label-container">
      <label
        v-if="props.label"
        :for="$attrs.id"
        class="form-label overflow-hidden"
      >
        {{ props.label }}
      </label>
      <img
        v-if="props.errorFetch"
        @click="props.executeFetch"
        class="icon-refresh"
        src="../../assets/icon/refresh.svg"
      />
    </div>
    <BDropdown
      :value="selectedValue"
      toggle-class="w-100 btn-neutral gkit-dd d-flex justify-content-between align-items-center"
      class="prevent-zero gkit-dd"
      v-bind="$attrs"
      :disabled="disabled || loading"
      @toggle="handleShown"
      :menuClass="{'hide-dropdown-menu': props.useBottomSheet || props.showMenu === false}"
    >
    <template #button-content>
        <slot name="button-content">
          <p
            class="overflow-hidden my-auto text-ellipsis"
            :style="[
              selectedText ? 'color: #252528 !important' : '',
              !selectedText ? 'color: #939597 !important' : '',
            ]"
          >
            {{ selectedText || props.placeholder }}
          </p>
        </slot>
          <span>
            <BSpinner v-if="loading" small />
            <img
              v-else
              :class="[
                shown ? 'dropdown-open' : 'dropdown-close',
                'icon-dropdown'
              ]"
              src="../../assets/icon/chevron_down.svg"
            />
          </span>
      </template>
    
      <div v-if="!props.useBottomSheet">
        <slot></slot>
        <b-form-input
          v-if="props.items && props.items.length > 10"
          @click.stop
          v-model="search"
          :placeholder="'Cari ' + props.label.toLowerCase()"
          :id="$attrs.id + '_search'"
          class="mb-0 mt-2"
        ></b-form-input>
        <BDropdownItem
          v-for="(option, index) in filteredItems"
          :key="option[props.itemValue]"
          @click="handleOptionClick(option)"
          :id="$attrs.id + '_value_' + option[props.itemValue]"
        >
          <div class="d-flex justify-content-between align-items-center my-2" style="text-wrap: wrap;">
            {{ option[props.itemText] }}
            <span v-if="selectedValue === option[props.itemValue]">
              <img src="../../assets/icon/icon-system/icon-check.svg" />
            </span>
          </div>
        </BDropdownItem>
      </div>
      <BOffcanvas
        v-if="props.useBottomSheet && showMenu === true"
        v-model="shownOffcanvas"
        placement="bottom"
        bodyScrolling="true"
        @shown="handleOffcanvasToggle(true)"
        @hidden="handleOffcanvasToggle(false)"
        class="input-dropdown"
        :class="props.items && props.items.length > 10 ? 'full-height' : 'content-height'"
      >
        <template #title>{{ props.label }}</template>
        <b-form-input
          v-if="props.items && props.items.length > 10"
          @click.stop
          v-model="search"
          :placeholder="'Cari ' + props.label.toLowerCase()"
          :id="$attrs.id + '_search'"
          style="margin-top: 15px;"
        ></b-form-input>
        <ul class="list-group list-group-flush">
          <li
            v-for="(option, index) in filteredItems"
            :key="option[props.itemValue]"
            @click="handleOptionClick(option)"
            :id="$attrs.id + '_value_' + option[props.itemValue]"
            class="list-group-item d-flex justify-content-between align-items-center"
            style="text-wrap: wrap; padding-top: 15px !important; padding-bottom: 15px !important;"
          >
            {{ option[props.itemText] }}
            <span v-if="selectedValue === option[props.itemValue]">
              <img src="../../assets/icon/icon-system/icon-check.svg" />
            </span>
          </li>
        </ul>
      </BOffcanvas>
    </BDropdown>
    <div class="error-text mt-2" v-if="props.error">
      {{ props.error }}
    </div>
  </div>
</template>

<style lang="scss">
.input-dropdown {
  max-height: 95% !important;
  .offcanvas-body {
    padding: 0px 16px 0px 16px !important;
  }

  &.full-height {
    height: 95% !important;
  }

  &.content-height {
    height: max-content !important;
  }
}

.btn-group {
  width: 100%;
}

.text-ellipsis {
  text-overflow: ellipsis;
}

.label-container {
  display: flex;
  align-items: center;
}

.icon-refresh {
  width: 1.2rem !important;
  margin-left: 0.2rem;
  cursor: pointer;
}

.gkit-dd {
  .dropdown-menu {
    &.show {
      margin-top: -4px;
    }
  }
}

.gkit-dd:hover {
  border-color: #00883e;
}

.error-text {
  color: #ae1e22;
  font-size: var(--g-kit-font-size-omega);
  line-height: var(--g-kit-line-height-omega);
  font-weight: var(--g-kit-font-weight-normal);
}

.dropdown-open {
  transform: rotate(180deg);
}

.dropdown-close {
  transform: rotate(0deg);
}

.icon-dropdown {
  transition: all 0.2s;
}
</style>
