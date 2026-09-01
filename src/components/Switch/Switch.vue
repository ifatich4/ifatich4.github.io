<template>
    <div class="switch form-check form-switch custom-switch" style="padding: 0px;">
        <input 
            class="form-check-input" 
            type="checkbox" 
            :id="id" 
            :checked="modelValue" 
            @change="handleChange"
        >
        <label 
            tabindex="0"
            @keydown.enter.prevent="toggleValue" 
            class="custom-toggle" 
            :for="id">
        </label>
    </div>
</template>

<script>
    export default {
        name: "SwitchComponent",
        props: {
            id: {
                type: String,
                default: "switch",
            },
            modelValue: {
                type: Boolean,
                default: false,
            },
        },
        data() {
            return {
            isFocused: false,
            };
        },
        methods: {
            handleChange(event) {
                this.$emit('update:modelValue', event.target.checked);
            },
            toggleValue() {
                this.$emit("update:modelValue", !this.modelValue);
                },
        },
    };
</script>

<style scoped lang="scss">
.switch {
    position: relative;
    display: inline-block;

    margin-bottom: 8px;

    label {
        &:focus {
            outline: var(--g-kit-lime-50) auto 1px;
        }
    }
}

.form-check-input {
    opacity: 0;
    width: 0;
    height: 0;
    display: none;
}

.custom-toggle {
    position: absolute;
    display: inline-block;
    width: 34px; /* Width of the "house" */
    height: 14px; /* Height of the "house" */
    background-color: var(--g-kit-black-40);
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.custom-toggle::after {
    content: "";
    position: absolute;
    top: -4px; /* Position the knob above the "house" */
    left: -3px; /* Slightly outside the "house" */
    width: 21px; /* Diameter of the knob */
    height: 21px; /* Diameter of the knob */
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.form-check-input:checked + .custom-toggle::after {
    background-color: #4caf50;
}

.form-check-input:checked + .custom-toggle::after {
    transform: translateX(17px); /* Move the knob to the right */
}

.form-check-input:checked + .custom-toggle {
    background-color: #4caf50;
}
</style>