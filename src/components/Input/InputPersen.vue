<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="group-input">
        <label :for="id" class="form-label">
            {{ title }}
            <img :src="require('../../assets/images/icon-info.svg')" />
        </label>

        <div class="input-group custom-input-group-icon p-0">
                <input 
                type="tel" :class="['form-control prevent-zero', { 'is-inval': localError }]" 
                :placeholder="['Masukkan ' + title.toLowerCase()]"
                :aria-label="id" 
                :aria-describedby="id"
                :id="id" 
                :disabled="disabled" 
                :required="required"
                v-model="currentValue"
                @input="handleInput" 
            />
            <span class="input-group-text border-0">%</span>
        </div>
        <div :class="{ 'error-text': localError, 'mt-2': localError }" v-if="localError">
            Masukkan {{ title.toLowerCase() }}
        </div>
    </div>
</template>

<script>

export default {
    name: "InputPersen",
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
        value: {
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
    },
    data: () => ({
        currentValue: "",
        localError: false,
    }),
    watch: {
        currentValue(newVal) {
            this.localError = this.required && !newVal;
        },
        value: {
            handler(after) {
                this.currentValue = this.format(after);
            },
            immediate: true,
        },
    },
    methods: {
        format: (value) =>
            (value + "").replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, "."),

        handleInput() {
            this.currentValue = this.format(this.currentValue);
            this.$emit("input", (this.currentValue + "").replace(/[^0-9]/g, ""));
        },
    },
};
</script>