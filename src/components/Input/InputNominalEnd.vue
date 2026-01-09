<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="group-input">
        <label :for="id" class="form-label">
            {{ title }}
            <img :src="require('../../assets/images/icon-info.svg')" />
        </label>

        <div class="input-group rupiah custom-input-group-icon p-0 input-nominal-end">
            <input 
                type="tel" :class="['form-control prevent-zero', { 'is-inval': localError }]" 
                :placeholder="placeholder || ['Masukkan ' + title.toLowerCase()]"
                :aria-label="id" 
                :aria-describedby="id"
                :id="id" 
                :disabled="disabled" 
                :required="required"
                v-model="currentValue"
                @input="handleInput"
            />
            <span class="input-group-text border-0">{{unit}}</span>
        </div>
        <div :class="{ 'error-text': localError, 'mt-2': localError }" v-if="localError">
           {{  errorMessage ||("Masukkan " + title.toLowerCase()) }} 
        </div>
    </div>
</template>

<script>
    export default {
        name: "InputNominalEnd",
        props: {
            id: {
                type: String,
                default: "addon"
            },
            title: {
                type: String,
                default: "Title",
            },
            placeholder: {
                type: String,
                default: "placeholder . . .",
            },
            modelValue: {
                type: [String, Number],
                default: "",
            },
            required: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            error: {
                type: Boolean,
                default: false,
            },
            errorMessage: {
                type: String,
                default: "",
            },
            type: {
                type: String,
                default: "text",
            },
            unit: {
                type: String,
                default: "%"
            },
            tooltip: {
                type: Boolean,
                default: true,
            },
            delimeter: {
                type: String,
                default: "comma",
                validator: (value) => ["comma", "dot", "none"].includes(value),
                required: false,
            }
        },
        data: () => ({
            currentValue: "",
            localError: false,
        }),
        watch: {
            currentValue(newVal) {
                this.localError = this.required && !newVal;
            },
            modelValue: {
                handler(after) {
                    this.currentValue = this.format(after);
                },
                immediate: true,
            },
        },
        methods: {
            format(value) {
                if (value == null || value === "") return "";

                const clean = (value + "").replace(/\D/g, "");

                if (this.delimeter === "comma") {
                return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                } else if (this.delimeter === "dot") {
                return clean.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                } else {
                return clean;
                }
            },

            handleInput() {
                this.currentValue = this.format(this.currentValue);
                this.$emit("update:modelValue", (this.currentValue + "").replace(/[^0-9]/g, ""));
            },
        },

    };
</script>

<style lang="scss">

.rupiah.custom-input-group-icon {

    &.input-nominal-end {

        &:has(:focus) {
            border: 1px solid var(--g-kit-lime-50);
        } 
        
        input {
            border-left: none !important;
            border-right: 1px solid var(--g-kit-black-20) !important;

            &:disabled {
                border-left: none !important;
                border-right: 1px solid var(--g-kit-black-40) !important;
                color: var(--g-kit-black-60);
            }

            &:hover:not(:disabled),&:focus {
                border-right-color: var(--g-kit-lime-50) !important;
            }
        }
    }
}

</style>