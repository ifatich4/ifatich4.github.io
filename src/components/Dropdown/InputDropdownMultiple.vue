<script setup>
    /* eslint-disable */
    import { computed, defineOptions, defineProps, ref, defineEmits, useAttrs } from 'vue'
    import { BDropdown, BDropdownItem, BFormInput, BSpinner, BOffcanvas } from 'bootstrap-vue-next'

    defineOptions({
        name: 'InputDropdown',
        inheritAttrs: false
    })

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
        color: {
            type: String,
            default: 'default'
        },
        chevron: {
            type: String,
            default: 'chevronDefault'
        },
        error: String,
        label: String,
        items: Array,
        itemValue: String,
        itemText: String,
        modelValue: [String, Array],
        placeholder: String,
        class: String,
        errorFetch: String,
        executeFetch: Function,
        required: {
            type: Boolean,
            default: false
        },
        /**
         * @value start | center | end
         */
        alignment: {
            type: String
        },
        isChecked: {
            type: Boolean,
            default: false
        },
        multiple: {
            type: Boolean,
            default: true
        },
        selectAll: {
            type: Boolean,
            default: false
        }
    })

    const emit = defineEmits(['update:modelValue', 'buttomSheetShown', "close"])

    const search = ref('')
    const shown = ref(false)
    const shownOffcanvas = ref(false)
    const dropdownRef = ref(null)
    const isTouched = ref(false)

    const handleShown = () => {
        if (!props.useBottomSheet) {
            if (shown.value) {
                emit('close')
            }

            shown.value = !shown.value
            isTouched.value = true
        }
        if (props.useBottomSheet) shownOffcanvas.value = true
    }

    const filteredItems = computed(() =>
        search.value ?
        props.items.filter((i) =>
            i[props.itemText].toLowerCase().includes(search.value.toLowerCase())
        ) :
        props.items
    )

    const selectedText = computed(() => {
        if (props.multiple && selectedValue.value && Array.isArray(selectedValue.value)) {
            if (selectedValue.value.length === 0) return ''

            const selectedItems = selectedValue.value
                .map(val => {
                    const findItem = props.items.find((v) => v[props.itemValue] === val)
                    return findItem ? findItem[props.itemText] : null
                })
                .filter(item => item !== null)

            return selectedItems.join(', ')
        } else if (selectedValue.value && props.items.length > 0) {
            const findItem = props.items.find((v) => v[props.itemValue] === selectedValue.value)
            if (findItem) return findItem[props.itemText]
            return ''
        } else {
            return ''
        }
    })

    const selectedValue = computed({
        get: () => {
            if (props.multiple) {
                return props.modelValue ? (Array.isArray(props.modelValue) ? props.modelValue : [props
                    .modelValue
                ]) : []
            }
            return props.modelValue ? props.modelValue : null
        },
        set: (newValue) => {
            emit('update:modelValue', newValue)
        }
    })

    const showError = computed(() => {
        return (isTouched.value || props.isChecked) && props.required && !selectedValue.value;
    })

    const isAllSelected = computed(() => {
        if (!props.multiple || !props.items || props.items.length === 0) return false
        const currentValues = Array.isArray(selectedValue.value) ? selectedValue.value : []
        return currentValues.length === props.items.length
    })

    const handleSelectAll = (event) => {
        if (event) {
            event.stopPropagation()
        }

        if (isAllSelected.value) {
            selectedValue.value = []
        } else {
            selectedValue.value = props.items.map(item => item[props.itemValue])
        }

        if (attrs.onChange && attrs.onInput && attrs.onBlur) {
            attrs.onChange()
            attrs.onInput()
            attrs.onBlur()
        }
    }

    const handleOptionClick = (option, event) => {
        if (props.multiple) {
            // Prevent dropdown from closing
            if (event) {
                event.stopPropagation()
            }

            const currentValues = Array.isArray(selectedValue.value) ? [...selectedValue.value] : []
            const optionValue = option[props.itemValue]
            const index = currentValues.indexOf(optionValue)

            if (index > -1) {
                currentValues.splice(index, 1)
            } else {
                currentValues.push(optionValue)
            }

            selectedValue.value = currentValues
        } else {
            selectedValue.value = option[props.itemValue]
            if (props.useBottomSheet) shownOffcanvas.value = false
            else shown.value = false
            search.value = ''
        }

        if (attrs.onChange && attrs.onInput && attrs.onBlur) {
            attrs.onChange()
            attrs.onInput()
            attrs.onBlur()
        }
    }

    const handleOffcanvasToggle = (value) => {
        emit('buttomSheetShown', value)
    }

    defineExpose({
        dropdownRef
    })

    const uniqueId = `mask-${Math.random().toString(36).substring(2, 10)}`
</script>

<template>
    <div :class="['group-input', props.class]">
        <label v-if="props.label" :for="$attrs.id" class="form-label">
            {{ props.label }}
        </label>
        <img v-if="props.errorFetch" @click="props.executeFetch" class="icon-refresh"
            src="../../assets/icon/refresh.svg" />
        <BDropdown ref="dropdownRef" :value="selectedValue" :toggle-class="[
        'w-100 gkit-dd d-flex justify-content-between align-items-center',
        `type-${color}`
      ]" :class="['prevent-zero gkit-dd', { 'dd-error': showError }]" v-bind="$attrs" :disabled="disabled || loading"
            @toggle="handleShown"
            :menuClass="{ 'hide-dropdown-menu': props.useBottomSheet || props.showMenu === false }"
            :start="props.alignment === 'start'" :center="props.alignment === 'center'"
            :end="props.alignment === 'end'">
            <template #button-content>
                <slot name="button-content">
                    <p class="dropdown-placeholder overflow-hidden my-auto text-ellipsis" :style="[
              selectedText ? 'color: #252528 !important' : '',
              !selectedText ? 'color: #939597' : ''
            ]">
                        {{ selectedText || props.placeholder }}
                    </p>
                </slot>
                <slot name="icon-right">
                    <span>
                        <BSpinner v-if="loading" small />
                        <svg v-else :class="[chevron, shown ? 'dropdown-open' : 'dropdown-close', 'icon-dropdown']"
                            width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8.1225 9.70253L12.0025 13.5825L15.8825 9.70253C16.2725 9.31253 16.9025 9.31253 17.2925 9.70253C17.6825 10.0925 17.6825 10.7225 17.2925 11.1125L12.7025 15.7025C12.3125 16.0925 11.6825 16.0925 11.2925 15.7025L6.7025 11.1125C6.3125 10.7225 6.3125 10.0925 6.7025 9.70253C7.0925 9.32253 7.7325 9.31253 8.1225 9.70253Z" />
                            <mask :id="uniqueId" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="6" y="9"
                                width="12" height="7">
                                <path
                                    d="M8.1225 9.70253L12.0025 13.5825L15.8825 9.70253C16.2725 9.31253 16.9025 9.31253 17.2925 9.70253C17.6825 10.0925 17.6825 10.7225 17.2925 11.1125L12.7025 15.7025C12.3125 16.0925 11.6825 16.0925 11.2925 15.7025L6.7025 11.1125C6.3125 10.7225 6.3125 10.0925 6.7025 9.70253C7.0925 9.32253 7.7325 9.31253 8.1225 9.70253Z" />
                            </mask>
                            <g :mask="`url(#${uniqueId})`">
                                <rect width="24" height="24" />
                            </g>
                        </svg>
                    </span>
                </slot>
            </template>
            <div v-if="!props.useBottomSheet" class="d-flex gap-2" :style="props.multiple ? 'flex-direction: column' : ''">
                <slot></slot>
                <div class="search-dropdown">
                    <b-form-input v-if="props.items && props.items.length > 10" @click.stop v-model="search"
                        :placeholder="'Cari ' + props.label.toLowerCase()" :id="$attrs.id + '_search'" class="mb-0" :style="props.multiple ? 'border-radius : 6px' : ''">
                    </b-form-input>
                </div>
                <BDropdownItem v-if="props.multiple && props.selectAll" @click="handleSelectAll($event)"
                    :id="$attrs.id + '_select_all'" :class="props.multiple ? 'multiples' : ''" :style="props.multiple ? 'border-bottom : 0px; border-radius: 6px;' : ''">
                    <div class="list-dropdown d-flex align-items-center flex-grow-1 multiple gap-2"
                        :class="{ 'selected-item': isAllSelected }"
                        style="text-wrap: wrap; gap: 12px; font-weight: 600" @click.stop="handleSelectAll($event)">
                        <input type="checkbox" :checked="isAllSelected" class="form-check-input m-0" readonly />
                        <span class="flex-grow-1">Pilih Semua</span>
                    </div>
                </BDropdownItem>

                <BDropdownItem v-for="(option, index) in filteredItems" :key="option[props.itemValue]" @click="handleOptionClick(option, $event)" :id="$attrs.id + '_value_' + option[props.itemValue]" :class="props.multiple ? 'multiples' : ''" :style="props.multiple ? 'border-bottom : 0px; border-radius: 6px; focus: none !important;' : ''">
                    <div class="list-dropdown d-flex align-items-center" style="text-wrap: wrap; gap: 16px"
                        @click.stop="props.multiple && handleOptionClick(option, $event)">

                        <div class="d-flex align-items-center flex-grow-1 multiple gap-2"
                            :class="{ 'selected-item': Array.isArray(selectedValue) && selectedValue.includes(option[props.itemValue]) }">
                            <input v-if="props.multiple" type="checkbox" :checked="Array.isArray(selectedValue) && selectedValue.includes(option[props.itemValue])" class="form-check-input m-0" readonly />
                            <span class="flex-grow-1">{{ option[props.itemText] }}</span>
                        </div>

                        <span v-if="!props.multiple && selectedValue === option[props.itemValue]">
                            <img src="../../assets/icon/icon-system/icon-check.svg" />
                        </span>
                    </div>
                </BDropdownItem>
            </div>
            <BOffcanvas v-if="props.useBottomSheet && showMenu === true" v-model="shownOffcanvas" placement="bottom"
                bodyScrolling="true" @shown="handleOffcanvasToggle(true)" @hidden="handleOffcanvasToggle(false)"
                class="input-dropdown"
                :class="props.items && props.items.length > 10 ? 'full-height' : 'content-height'">
                <template #title>Pilih {{ props.label }}</template>
                <slot></slot>
                <div class="search-wrapper">
                    <b-form-input v-if="props.items && props.items.length > 10" @click.stop v-model="search"
                        :placeholder="'Cari ' + props.label.toLowerCase()" :id="$attrs.id + '_search'">
                    </b-form-input>
                </div>
                <ul class="list-group list-group-flush">
                    <li v-if="props.multiple && props.selectAll" @click="handleSelectAll($event)"
                        :id="$attrs.id + '_select_all'" class="list-group-item d-flex align-items-center"
                        :class="{ 'selected-item': isAllSelected }"
                        style="text-wrap: wrap; padding-top: 15px !important; padding-bottom: 15px !important; gap: 12px; font-weight: 600">
                        <input type="checkbox" :checked="isAllSelected" class="form-check-input m-0" readonly />
                        <span class="flex-grow-1">Pilih Semua</span>
                    </li>
                    <li v-for="(option, index) in filteredItems" :key="option[props.itemValue]"
                        @click="handleOptionClick(option)" :id="$attrs.id + '_value_' + option[props.itemValue]"
                        class="list-group-item d-flex align-items-center"
                        :class="{ 'selected-item': Array.isArray(selectedValue) && selectedValue.includes(option[props.itemValue]) }"
                        style="text-wrap: wrap; padding-top: 15px !important; padding-bottom: 15px !important; gap: 12px">
                        <input v-if="props.multiple" type="checkbox"
                            :checked="Array.isArray(selectedValue) && selectedValue.includes(option[props.itemValue])"
                            class="form-check-input m-0" readonly />
                        <span class="flex-grow-1">{{ option[props.itemText] }}</span>
                        <span v-if="!props.multiple && selectedValue === option[props.itemValue]">
                            <img src="../../assets/icon/icon-system/icon-check.svg" />
                        </span>
                    </li>
                </ul>
            </BOffcanvas>
        </BDropdown>
        <div class="error-text mt-2" v-if="showError">
            {{ props.error }}
        </div>
    </div>
</template>

<style lang="scss">
    .input-dropdown {
        max-height: 95% !important;

        &.full-height {
            height: 95%;
        }

        &.content-height {
            height: max-content !important;
        }

        .search-wrapper {
            padding-inline: 16px;
            padding-top: 16px;
        }

        .offcanvas-body {
            padding-top: 16px;

            ul {
                padding-inline: 16px;

                li {
                    padding-top: 16px !important;

                    &.selected-item {
                        background-color: var(--g-kit-lime-10);
                        border-color: var(--g-kit-lime-50);
                        border-radius: 6px;
                    }
                }
            }
        }
    }

    .btn-group {
        width: 100%;
    }

    .text-ellipsis {
        text-overflow: ellipsis;
    }

    .icon-refresh {
        width: 1.2rem !important;
        margin-left: 0.2rem;
        cursor: pointer;
    }

    .dd-error {
        .gkit-dd {
            border-color: var(--g-kit-black-20);

            &:hover {
                border-color: var(--g-kit-black-20);
            }
        }
    }

    .gkit-dd {
        &.w-100 {
            padding-left: 11px;
            padding-right: 12px;
        }

        .dropdown-menu {
            padding-block: 16px;
            padding-inline: 0px;

            &.show {
                max-height: 358px !important;

                .search-dropdown {
                    padding-inline: 16px;
                }

                li {
                    padding: 0px;
                    padding-inline: 16px;

                    &:has(:focus) {
                        background-color: white !important;
                    }

                    button {
                        .d-flex.justify-content-between.align-items-center {
                            margin-top: 1rem;
                            margin-bottom: 1rem;
                        }

                        &:focus {
                            background-color: white !important;
                        }

                        .multiple {
                            border: 1px solid var(--g-kit-black-20);
                            border-radius: 6px;
                            padding: .75rem;

                            &.selected-item {
                                background-color: var(--g-kit-lime-10);
                                border-color: var(--g-kit-lime-50);
                            }

                            &:hover {
                                border-color: var(--g-kit-lime-50);
                                color: var(--g-kit-lime-50);
                            }
                        }
                    }

                    &:first-child {
                        button {
                            .d-flex.justify-content-between.align-items-center {
                                margin-top: 0px !important;
                                margin-bottom: 1rem;
                            }
                        }
                    }

                    &:last-child {
                        button {
                            .d-flex.justify-content-between.align-items-center {
                                margin-top: 1rem;
                                margin-bottom: 0px !important;
                            }
                        }
                    }
                }
            }
        }

        .disabled {
            .dropdown-placeholder {
                color: var(--g-kit-black-50) !important;
            }
        }

        .dropdown-placeholder {
            font-size: var(--g-kit-font-size-omicron);
            line-height: var(--g-kit-line-height-omicron);
            font-weight: var(--g-kit-font-weight-normal);
        }

        .btn.disabled {
            background-color: var(--g-kit-black-20);
            opacity: 1;
            border: 0px;
        }
    }

    .multiples {
        border-bottom: 0px !important;

        &:hover {
            background-color: white !important;
        }

        &:focus {
            background-color: white !important;
        }

        &.button.dropdown-item {
            border-radius: 6px;
        }
    }

    .gkit-dd:hover {
        border-color: var(--g-kit-lime-50);
    }

    .error-text {
        color: var(--g-kit-black-20);
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

    .chevronDefault {
        color: var(--g-kit-black-50);
    }

    .chevronLime {
        color: var(--g-kit-lime-50);
    }

    .type- {
        &red {
            border: 1px solid var(--g-kit-red-50) !important;
            background-color: var(--g-kit-red-10) !important;
        }

        &green {
            border: 1px solid var(--g-kit-lime-50) !important;
            background-color: var(--g-kit-lime-10) !important;
        }

        &blue {
            border: 1px solid var(--g-kit-blue-50) !important;
            background-color: var(--g-kit-blue-10) !important;
        }

        &orange {
            border: 1px solid var(--g-kit-orange-50) !important;
            background-color: var(--g-kit-orange-10) !important;
        }
    }
</style>