<template>
    <div class="radio-container">
        <div v-for="(item, index) in items" :key="getOptionKey(item, index)" class="radio-column">
            <label
                class="radio-content"
                :class="{
                    'radio-content--checked': isChecked(item),
                    'radio-content--disabled': isDisabled(item),
                }"
            >
                <input
                    class="radio-input"
                    type="radio"
                    :name="name"
                    :value="item.value"
                    :checked="isChecked(item)"
                    :disabled="isDisabled(item)"
                    @change="selectItem(item)"
                    @keydown.enter.prevent="selectItem(item)"
                />
                <span class="radio-icon" aria-hidden="true">
                    <slot
                        name="icon"
                        :item="item"
                        :checked="isChecked(item)"
                        :disabled="isDisabled(item)"
                        :icon-src="getIconSrc(item)"
                    >
                        <img
                            v-if="getIconSrc(item)"
                            :src="getIconSrc(item)"
                            :alt="getIconAlt(item)"
                            class="radio-icon__image"
                        />
                    </slot>
                </span>
                <span class="radio-text">
                    <slot name="label" :item="item" :checked="isChecked(item)" :disabled="isDisabled(item)">
                        {{ getOptionText(item) }}
                    </slot>
                </span>
            </label>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'RadioComponent',
        props: {
            items: {
                type: Array,
                default: () => [],
            },
            modelValue: {
                type: [String, Number, Boolean],
                default: null,
            },
            defaultSelected: {
                type: [String, Number, Boolean],
                default: null,
            },
            name: {
                type: String,
                default: () => `radio-${Math.random().toString(36).slice(2, 9)}`,
            },
            activeIcon: {
                type: String,
                default: () => new URL('../../assets/icon/icon-system/icon-radio-on.svg', import.meta.url).href,
            },
            inactiveIcon: {
                type: String,
                default: () => new URL('../../assets/icon/icon-system/icon-radio-off.svg', import.meta.url).href,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['update:modelValue', 'selected'],
        data() {
            return {
                selected: this.modelValue === null ? this.defaultSelected : this.modelValue,
            };
        },
        watch: {
            modelValue(value) {
                if (value !== null) {
                    this.selected = value;
                }
            },
            defaultSelected(value) {
                if (this.modelValue === null) {
                    this.selected = value;
                }
            },
        },
        mounted() {
            if (this.modelValue === null && this.defaultSelected !== null) {
                this.$emit('selected', this.defaultSelected);
            }
        },
        computed: {
            radioValue: {
                get() {
                    return this.modelValue === null ? this.selected : this.modelValue;
                },
                set(value) {
                    this.selected = value;
                    this.$emit('update:modelValue', value);
                    this.$emit('selected', value);
                }
            }
        },
        methods: {
            selectItem(item) {
                if (this.isDisabled(item)) {
                    return;
                }

                this.radioValue = item.value;
            },
            isChecked(item) {
                return this.radioValue === item.value;
            },
            isDisabled(item) {
                return this.disabled || item.disabled;
            },
            getOptionText(item) {
                return item.text || item.label || '';
            },
            getOptionKey(item, index) {
                return item.value === undefined ? index : item.value;
            },
            getIconSrc(item) {
                if (this.isChecked(item)) {
                    return item.activeIcon || item.checkedIcon || item.icon || this.activeIcon;
                }

                return item.inactiveIcon || item.uncheckedIcon || item.icon || this.inactiveIcon;
            },
            getIconAlt(item) {
                return item.iconAlt || '';
            },
        },
    };
</script>


<style scoped lang="scss">
    .radio-container {
        display: flex;
        flex-wrap: nowrap;
        gap: 1rem;
        width: 100%;

        .radio-content{
            position: relative;
            box-sizing: border-box;
            width: 100%;
            min-height: 58px;
            gap: 8px;

            &:focus-within {
                outline: none;
                border: 1px solid var(--g-kit-lime-50);
            }
        }

        .radio-content:hover:not(.radio-content--disabled) {
            color: var(--g-kit-lime-50);
            border-color: var(--g-kit-lime-50);
        }

        .radio-column {
            width: 50%;
        }

        label {
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 16px;
            border: 1px solid var(--g-kit-black-20);
            background-color: white;
            border-radius: 6px;

            font-size: var(--g-kit-font-size-omicron);
            line-height: var(--g-kit-line-height-omicron);
            font-weight: var(--g-kit-font-weight-bold);
            color: var(--g-kit-black-50);

            &.radio-content--checked {
                color: var(--g-kit-lime-50);
                background-color: var(--g-kit-lime-10);
                border-color: var(--g-kit-lime-50);
            }

            &.radio-content--disabled {
                cursor: not-allowed;
                color: var(--g-kit-black-50);
                background-color: var(--g-kit-black-10);
                border-color: var(--g-kit-black-20);
            }
        }

        .radio-input {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }

        .radio-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            flex: 0 0 24px;
            width: 24px;
            height: 24px;
        }

        .radio-icon__image {
            display: block;
            width: 24px;
            height: 24px;
        }

        .radio-text {
            min-width: 0;
            word-break: break-word;
        }
    }

    @media only screen and (max-width: 600px) {
        .radio-container {
            display: grid;

            .radio-column {
                width: 100%;
            }
        }
    }
</style>
