<script setup>
import { defineOptions, defineProps, defineEmits } from 'vue';
import { ref, watch, nextTick } from 'vue';
import InputText from './InputText.vue';

defineOptions({ name: 'InputPhone', inheritAttrs: false });

const props = defineProps({
    label: {
        type: String,
        default: '',
    },
    eror: {
        type: String,
        default: '',
    },
    required: {
        type: Boolean,
        default: false,
    },
    phoneCodeLength: {
        type: Number,
        default: 4, // Default panjang maksimal untuk phoneCode
    },
});

const emit = defineEmits(['update:phone-code', 'update:phone-number']);

const phoneCode = ref('');
const phoneNumber = ref('');
const errorMessage = ref('');
const isTouched = ref(false);

const phoneNumberInput = ref(null);

const validateInputs = () => {
    if (props.required) {
        if (!phoneCode.value || !phoneNumber.value) {
            errorMessage.value = props.eror || 'Input tidak boleh kosong';
        } else {
            errorMessage.value = '';
        }
    }
};

watch(phoneCode, (newVal) => {
    isTouched.value = true;
    if (newVal.length > props.phoneCodeLength) {
        phoneCode.value = newVal.slice(0, props.phoneCodeLength); // Batasi panjang phoneCode sesuai phoneCodeLength
    }
    emit('update:phone-code', phoneCode.value);

    if (newVal.length === props.phoneCodeLength) {
        nextTick(() => {
            if (phoneNumberInput.value) {
                phoneNumberInput.value.focus();
            }
        });
    }

    validateInputs();
});

watch(phoneNumber, (newVal) => {
    isTouched.value = true;
    emit('update:phone-number', newVal);
    validateInputs();
});
</script>

<template>
    <div class="input-phone">
        <label v-if="label" :for="$attrs.id" class="form-label">
            {{ props.label }}
        </label>

        <div class="content-phone">
            <InputText
                :id="$attrs.id + '-code'"
                placeholder="Kode Area"
                type="number"
                v-model="phoneCode"
                :maxlength="phoneCodeLength"
                class="input-phone-first"
            />
            <InputText
                ref="phoneNumberInput"
                :id="$attrs.id + '-number'"
                placeholder="Nomor Telepon"
                type="number"
                v-model="phoneNumber"
                class="input-phone-second"
            />
        </div>

        <div v-if="errorMessage" class="error-text">
            {{ errorMessage }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
.input-phone {
    margin-bottom: 1rem;

    .content-phone {
        display: flex;
        gap: 8px;

        .input-phone-first {
            margin-bottom: 0px;
            width: 126px;
        }

        .input-phone-second {
            margin-bottom: 0px;
            width: 100%;
        }
    }

    .error-text {
        margin-top: 0.5rem;
        color: var(--g-kit-red-50);
        font-size: var(--g-kit-font-size-omega);
        line-height: var(--g-kit-line-height-omega);
        font-weight: var(--g-kit-font-weight-normal);
    }
}
</style>