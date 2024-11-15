<template>
    <div class="radio-container">
        <b-form-group v-for="(item, index) in items" :key="index" class="radio-column">
            <label class="radio-content">
                <b-form-radio :value="item.value" v-model="radioValue">{{ item.text }}</b-form-radio>
            </label>
        </b-form-group>
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
        },
        data() {
            return {
                selected: this.modelValue,
            };
        },
        emits: ['update:modelValue'],
        computed: {
            radioValue: {
                get() {
                    return this.modelValue
                },
                set(value) {
                    this.$emit('update:modelValue', value);
                }
            }
        },
        methods: {
            emitSelected() {
                this.$emit('selected', this.selected);
            },
        },
    };
</script>


<style scoped lang="scss">
    .radio-container {
        // float: left;
        display: flex;
        flex-wrap: nowrap;
        gap: 1rem;
        width: 100%;

        .radio-content{
            .form-check {
                margin-bottom: 0px;
            }
        }

        .radio-content:hover {
            color: var(--g-kit-lime-50);
            background-color: var(--g-kit-lime-10);
            border-color: var(--g-kit-lime-50);
        }

        .radio-column {
            /* New class for styling each column */
            width: 50%;
            /* Set width to 50% for two columns */
        }

        label {
            cursor: pointer;

            display: flex;
            align-items: center;

            padding: 11px;
            border: 1px solid var(--g-kit-black-20);
            background-color: white;
            border-radius: 6px;

            font-size: var(--g-kit-font-size-omicron);
            line-height: var(--g-kit-line-height-omicron);
            font-weight: var(--g-kit-font-weight-regular);
            color: var(--g-kit-black-80);

            &:has(input:checked) {
                color: var(--g-kit-lime-50);
                background-color: var(--g-kit-lime-10);
                border-color: var(--g-kit-lime-50);
            }
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