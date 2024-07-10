<template>
  <div class="group-input">
    <label v-if="label" :for="$attrs.id" class="form-label">
      {{ label }}
    </label>
    <Select2
      v-model="currentValue"
      :options="items"
      :value-field="itemValue"
      v-bind="$attrs"
      :placeholder="placeholder"
      class="desktop"
    />

    <div class="mobile">
      <BButton
        @click.prevent="click"
        v-model="currentValue"
        class="w-100 btn-neutral gkit-dd d-flex justify-content-between align-items-center"
        :placeholder="placeholder"
      >
        {{ selectedValue || placeholder }}

        <span>
          <img src="../../assets/icon/chevron_down.svg" />
        </span>
      </BButton>

      <BOffcanvas
        v-model="show"
        :no-close-on-backdrop="false"
        :placement="placement"
        class="w-100"
      >
        <template #header="{ hide }">
          <h5 class="offcanvas-title">{{ label }}</h5>
          <button type="button" class="btn btn-close" @click="hide" />
        </template>
        <template #default>
          <div class="offcanvas-body">
            <BListGroup>
              <BListGroupItem
                v-for="(item, index) in items"
                :key="index"
                class="flex-column align-items-start border-0 list-dropdowns"
                @click="selectItem(item)"
              >
                {{ item.label }}
              </BListGroupItem>
            </BListGroup>
          </div>
        </template>
      </BOffcanvas>
    </div>

    <div v-if="error" class="error-text mt-1">{{ error }}</div>
  </div>
</template>

<script>
import { BOffcanvas } from 'bootstrap-vue-next'
import Select2 from './vue3-select2-component'

import { computed, ref } from 'vue'
export default {
  name: 'AutoCompleteComponent',
  inheritAttrs: false,
  components: {
    Select2,
    BOffcanvas
  },
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    items: Array,
    label: {
      type: String,
      default: ''
    },
    itemText: {
      type: String,
      default: 'label'
    },
    itemValue: {
      type: String,
      default: 'id'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'md'
    },
    placeholder: {
      type: String,
      default: 'test'
    },
    error: String
  },
  setup(props, { emit }) {
    const currentValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const show = ref(false)
    const placement = ref('bottom')
    const selectedValue = ref('')

    const click = (place = 'bottom') => {
      placement.value = place
      show.value = !show.value
    }

    const selectItem = (item) => {
      selectedValue.value = item.label
      currentValue.value = item.label // If you want to update the model value too
      show.value = false // Close the offcanvas after selection
    }

    return {
      currentValue,
      show,
      placement,
      click,
      selectedValue,
      selectItem
    }
  }
}
</script>

<style lang="scss">
.select2-container {
  width: 100%;

  .select2-selection--single {
    .select2-selection__rendered {
      padding-left: 1rem;
      padding-right: 1rem;
    }

    .select2-selection__arrow {
      height: 26px;
      position: relative;
      top: 1px;
      right: 16px;
      width: 20px;
    }

    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    height: 48px;
    -moz-user-select: none;
    user-select: none;
    -webkit-user-select: none;
    align-items: center;
    justify-content: space-between;
  }

  &--default {
    .select2-search--dropdown {
      .select2-search__field {
        border: 1px solid #aaa;
        border-radius: 6px;
        height: 48px;
        padding: 1rem;

        &:focus-visible {
          outline: none;
        }
      }
    }

    .select2-results__option[aria-selected='true'],
    .select2-results__option--highlighted[aria-selected='true'] {
      background-color: unset;
      color: var(--g-kit-lime-50);
      display: flex;
      justify-content: space-between;
      align-items: center;

      &::after {
        content: url('../../assets/icon/check_round.svg');
        width: 24px;
        height: 24px;
      }
    }

    .select2-results__option--highlighted,
    .select2-results__option--highlighted[aria-selected] {
      background-color: unset;
      color: var(--g-kit-lime-80);
    }
  }

  &--open {
    .select2-dropdown--above,
    .select2-dropdown--below {
      padding: 1rem;
    }
  }

  .select2-results__option {
    margin-top: 1rem;
    padding: unset;
    background-color: unset !important;
  }

  .select2-search--dropdown {
    padding: unset;
  }
}

.offcanvas-body {
  padding: 0px 0px 1rem 0px !important;
}

.list-group-item.list-dropdowns {
  font-size: var(--g-kit-font-size-omicron);
  line-height: var(--g-kit-line-height-omicron);
  font-weight: var(--g-kit-font-weight-normal);

  padding: 1rem;
  border-bottom: 1px solid var(--g-kit-black-20) !important;
}
</style>
