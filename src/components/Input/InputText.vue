<script setup>
	// Import necessary functions from Vue
	import {
		defineExpose,
		defineOptions,
		defineProps,
		defineEmits,
		ref,
		watch
	} from 'vue'

	// Define component options
	defineOptions({
		name: 'InputText',
		inheritAttrs: false
	})

	// Utility function to format numbers with spaces
	const formatNumber = (number) => {
		if (!number) return ''
		let cleanNumber = number.replace(/\D/g, '')
		return cleanNumber.replace(/(\d{4})(?=(\d))/g, '$1 ')
	}

    const toUpperCase = (text) => {
        if (typeof text !== 'string') return ''
        return text.toUpperCase()
    }

	// Define props for the component
	const props = defineProps({
		error: {},
		label: {},
		suffixIcon: {},
		class: {},
		modelValue: {},
		helperText: {},
		color: {
			type: String,
			default: 'default'
		},
		type: {
			default: 'text'
		},
		useDelimiter: {
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		useAutoCaps: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		variant: {
			type: String,
			default: 'default'
		},
		rupiah: {
			type: String,
			default: ''
		},
		general: {
			type: Boolean,
			default: false
		},
	})

	// Define emits for the component
	const emit = defineEmits(['update:modelValue'])

	// Define reactive variables
	const inputValue = ref(props.modelValue)
	// const displayValue = ref(props.type === 'number' ? formatNumber(props.modelValue) : props.modelValue)
	const displayValue = ref(
		props.type === 'number' && props.general
		? (props.modelValue ? String(props.modelValue).replace(/[^0-9]/g, '') : '')
		: props.type === 'number' ? formatNumber(props.modelValue) : props.modelValue
	)
	const localError = ref(false)
	const isSearchActive = ref(false)

	// Watch for changes in modelValue prop
	watch(
		() => props.modelValue,
		(newVal) => {
			if (props.required) {
				localError.value = newVal ?.trim() === ''
			}
            const upperCasedValue = props.useAutoCaps ? toUpperCase(newVal) : newVal;

			inputValue.value = upperCasedValue
			
			if (props.type === 'number' && props.general) {
				displayValue.value = upperCasedValue?.replace(/[^0-9]/g, '') || ''
			} else if (props.type === 'number') {
				displayValue.value = formatNumber(newVal)
			} else {
				displayValue.value = upperCasedValue
			}
		}
	)

	// Handle input events
    const handleInput = (event) => {
        const rawValue = event.target.value;
		if (props.type === 'number' && props.general) {
			const cleanedValue = rawValue.replace(/[^0-9]/g, '');
			localError.value = props.required && cleanedValue.trim() === '';
			inputValue.value = cleanedValue;
			displayValue.value = cleanedValue;

			emit('update:modelValue', cleanedValue);

			// Set value input agar tidak ada karakter non-angka yang lolos
			event.target.value = cleanedValue;

			setTimeout(() => {
				const cursorPosition = event.target.selectionStart;
				event.target.setSelectionRange(cursorPosition, cursorPosition);
			}, 0);
		} else if (props.type === 'number') {
            const cleanedValue = rawValue.replace(/\s+/g, '');
            localError.value = props.required && cleanedValue.trim() === '';
            inputValue.value = cleanedValue;
            displayValue.value = formatNumber(cleanedValue);

            emit('update:modelValue', cleanedValue);

            // Restore cursor position
            setTimeout(() => {
                const cursorPosition = event.target.selectionStart;
                const unformattedValue = event.target.value.replace(/\s+/g, '');
                const formattedValue = formatNumber(unformattedValue);
                let spacesBeforeCursor = formattedValue.slice(0, cursorPosition).split(' ').length - 1;
                let newCursorPosition = cursorPosition + spacesBeforeCursor;

                event.target.setSelectionRange(newCursorPosition, newCursorPosition);
            }, 0);
        } else {
            const upperCasedValue = props.useAutoCaps ? toUpperCase(rawValue) : rawValue;
            inputValue.value = upperCasedValue;
            displayValue.value = upperCasedValue;

            emit('update:modelValue', upperCasedValue);

            // Restore cursor position for text input
            setTimeout(() => {
                const cursorPosition = event.target.selectionStart;
                event.target.setSelectionRange(cursorPosition, cursorPosition);
            }, 0);
        }
    };

	// Handle focus events
	const handleFocus = () => {
		isSearchActive.value = true
	}

	// Handle blur events
	const handleBlur = () => {
		isSearchActive.value = false
	}

	// Clear search input
	const clearSearch = () => {
		inputValue.value = ''
		displayValue.value = ''
		emit('update:modelValue', '')
	}
	defineExpose({
		focus: () => inputRef.value?.focus(),
	});

	const inputRef = ref(null);
</script>

<template>
	<div :class="['group-input', props.class, { 'search-active': isSearchActive && props.type === 'search' }]">
		<label v-if="props.label" :for="$attrs.id" class="form-label">
			{{ props.label }}
		</label>
		<div
			:class="['input-group custom-input-group-icon p-0', props.rupiah, { 'search-input': props.type === 'search' }]">
			<slot name="prefix">
				<div v-if="props.type === 'search'" class="input-group-icon ms-3">
					<img src="../../assets/icon/search.svg" />
				</div>
			</slot>

			<input
				ref="inputRef"
				:value="displayValue"
				@input="handleInput"
				@focus="handleFocus"
				@blur="handleBlur"
				:class="['form-control', `type-${props.color}`]"
				v-bind="$attrs"
				:required="props.required"
				:disabled="props.disabled"
				:type="props.type === 'number' ? 'text' : props.type"
				:inputmode="props.type === 'number' ? 'numeric' : 'text'"
			/>

			<div v-if="props.type === 'search' && displayValue" class="input-group-icon me-3">
				<button @click="clearSearch" class="btn btn-link p-0">
					<img src="../../assets/icon/close_round.svg" />
				</button>
			</div>
			<div v-if="props.suffixIcon" class="input-group-icon me-3">
				<img :src="props.suffixIcon" />
			</div>
			<slot name="suffix"></slot>
		</div>
		<div v-if="localError" class="error-text mt-2">
			{{ props.required ? 'Field ini diperlukan' : '' }}
		</div>
		<div v-if="props.error" class="error-text mt-2">{{ props.error }}</div>
		<div v-if="props.helperText && !props.error" class="helper-text mt-2">{{ props.helperText }}</div>
	</div>
</template>

<style lang="scss" scoped>

	.input-group {
		&:has(:focus) {
			border: 1px solid var(--g-kit-lime-50);
		}
	}
	input[type="search"]::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
	}

	input:disabled {
		color: var(--g-kit-black-60);
	}

	.input-group-icon {
		display: flex;
		align-items: center;
	}

	.error-text {
		color: var(--g-kit-red-50);
	}

	.helper-text {
		color: var(--g-kit-black-40);
	}

	.form-control:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
		box-shadow: 0 0 0 1px #00883e;
		outline: none;
	}

	.search-input {
		background-color: #F8F8F8;
		border: none;

		input.form-control {
			background-color: #F8F8F8;
			border: none;

			&:active,
			&:focus {
				border: none;
			}

			&:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
				box-shadow: none;
				outline: none;
			}
		}
	}

	.search-active {
		.input-group {
			box-shadow: 0 0 0 1px #00883e;
			border-radius: 4px;
			outline: none;
		}
	}
</style>