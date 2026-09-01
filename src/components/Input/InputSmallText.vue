<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="group-input">
        <label v-if="title" :for="id" class="form-label" :class="{ 'hide': !title }">
            {{ title }}
            <img v-if="icon && iconLabel" :src="iconLabel || '../../assets/images/world.svg'" />
        </label>
        <div class="input-group custom-input-group-icon">
            <div class="input-group-icon">
                <img v-if="icon" :src="icon || '../../assets/images/world.svg'" :class="{ 'hide': !icon }" />
            </div>
            <input :type="type" :class="['form-control', classes]" :id="id" :aria-label="id" :aria-describedby="id"
                :disabled="disabled" :required="required"
                :placeholder="['Pilih ' + (title || placeholder || '').toLowerCase()]" @input="handleInput" />
        </div>
        <div :class="{ 'error-text': localError, 'mt-2': localError }" v-if="localError">
            Masukkan {{ (title || '').toLowerCase() }}
        </div>
    </div>
</template>

<script>
    import {
        computed,
        ref,
        watch
    } from "vue";

    export default {
        name: "InputComponent",
        props: {
            title: {
                type: String,
                default: null,
            },
            iconLabel: {
                type: String,
                default: null,
            },
            icon: {
                type: String,
                default: null,
            },
            iconRight: {
                type: String,
                default: null,
            },
            placeholder: {
                type: String,
                default: "placeholder . . .",
            },
            value: {
                type: String,
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
            id: {
                type: String,
                default: "inputField",
            },
        },
        setup(props, {
            emit
        }) {
            const classes = computed(() => ({
                'is-invalids': props.error || (props.required && !props.value),
            }));

            const localError = ref(false);

            watch(
                () => props.value,
                (newVal) => {
                    if (props.required) {
                        localError.value = newVal.trim() === "";
                    }
                }
            );

            const handleInput = (event) => {
                localError.value = props.required && event.target.value.trim() === "";
                emit("input", event.target.value);
            };

            return {
                classes,
                localError,
                handleInput,
            };
        },
    };
</script>