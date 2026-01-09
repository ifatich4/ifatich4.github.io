<script setup>
	import { defineOptions, defineProps, defineEmits, ref, watch, computed } from "vue";	

	defineOptions({
		name: "InputSearch",
		inheritAttrs: false,
	});

	const props = defineProps({
		error: {},
		label: {},
		suffixIcon: {},
		class: {},
		modelValue: {},
		helperText: {},
		color: {
			type: String,
			default: "default",
		},
		type: {
			default: "text",
		},
		useDelimiter: {
			default: true,
		},
		disabled: {
			type: Boolean,
			default: false,
		},
		required: {
			type: Boolean,
			default: false,
		},
		variant: {
			type: String,
			default: "default",
		},
		rupiah: {
			type: String,
			default: "",
		},
		preventMiddleDeletion: {
			type: Boolean,
			default: false,
		},
	});
	const emit = defineEmits(["update:modelValue"]);

	const isNumeric = (value) => {
		return value && /^\d+$/.test(value.toString().replace(/\s/g, ""));
	};

	const formatNumber = (number) => {
		if (!number) return "";
		let cleanNumber = number.toString().replace(/\D/g, "");
		return cleanNumber.replace(/(\d{4})(?=(\d))/g, "$1 ");
	};

	const formatMixed = (value) => {
		if (!value) return "";
		if (props.type === "nik") {
			let cleanValue = value.toString().replace(/\s+/g, "");
			return cleanValue.replace(/(\d{4})(?=(\d))/g, "$1 ");
		}
		return formatNumber(value);
	};
	
	const localError = ref(false);
	const isSearchActive = ref(false);
	const previousValue = ref("");
	const previousCursor = ref(0);
	
	const shouldUseDelimiter = computed(() => {
		if (!props.useDelimiter) return false;
		
		if (props.type === "text") {
			return false;
		}
		
		if (props.type === "nik" || props.type === "number") {
			return isNumeric(props.modelValue);
		}
		
		return isNumeric(props.modelValue);
	});
	
	const isDeletionRestricted = computed(() => {
		if (props.type === "nik" || props.type === "number") {
			return isNumeric(props.modelValue);
		}
		return false;
	});

	const inputTypeComputed = computed(() => {
		return shouldUseDelimiter.value ? 'text' : props.type;
	});

	const inputModeComputed = computed(() => {
		return (props.type === 'number' || props.type === 'nik' || shouldUseDelimiter.value) ? 'numeric' : 'text';
	});

	const displayValue = computed(() => {
		if (!props.modelValue) return props.modelValue;
		
		if (shouldUseDelimiter.value) {
			return formatMixed(props.modelValue);
		}
		return props.modelValue;
	});

	const showClearButton = computed(() => {
		const typesWithClear = ['search', 'nik', 'text'];
		return typesWithClear.includes(props.type) && !!displayValue.value;
	});
	
	watch(
		() => props.modelValue,
		(newVal) => {
			if (props.required) {
				const rawValue = newVal ? newVal.toString().replace(/\s+/g, "") : "";
				localError.value = rawValue.trim() === "";
			}
		},
		{ immediate: true }
	);

	const isDeletionFromMiddle = (event, currentValue, prevValue) => {
		const currentCursor = event.target.selectionStart;
		const currentLength = currentValue.length;
		const prevLength = prevValue.length;
		
		return prevLength > currentLength && currentCursor < currentLength;
	};

	const handleKeydown = (event) => {
		const input = event.target;
		const currentValue = input.value;
		previousValue.value = currentValue;
		previousCursor.value = input.selectionStart;

		if (isDeletionRestricted.value && (event.key === 'Backspace' || event.key === 'Delete')) {
			const cursor = input.selectionStart;
			const valueLength = currentValue.length;
			
			if (cursor < valueLength) {
				event.preventDefault();
				return;
			}
		}
	};

	const handleInput = (event) => {
		let rawValue = event.target.value;
		const isCurrentlyDelimited = shouldUseDelimiter.value;
		
		if (isDeletionRestricted.value && isDeletionFromMiddle(event, rawValue, previousValue.value)) {
			event.target.value = previousValue.value;
			
			let cleanPreviousValue = previousValue.value;
			if (isCurrentlyDelimited) {
				cleanPreviousValue = cleanPreviousValue.replace(/\s+/g, "").replace(/\s+/g, "");
			}
			emit("update:modelValue", cleanPreviousValue);
			
			setTimeout(() => {
				const endPosition = previousValue.value.length;
				event.target.setSelectionRange(endPosition, endPosition);
			}, 0);
			return;
		}

		let cleanValue = rawValue;
		
		if (props.type === "nik" || props.type === "number") {
			cleanValue = rawValue.replace(/\D/g, "");
			
			if (cleanValue.length !== rawValue.replace(/\s+/g, "").replace(/\s+/g, "").length) {
				const newDisplayValueForFix = isCurrentlyDelimited ? formatMixed(cleanValue) : cleanValue;
				
				event.target.value = newDisplayValueForFix;
				emit("update:modelValue", cleanValue);
				
				setTimeout(() => {
					event.target.setSelectionRange(newDisplayValueForFix.length, newDisplayValueForFix.length);
				}, 0);
				
				return;
			}
		} 

		emit("update:modelValue", cleanValue);

		if (shouldUseDelimiter.value) {
			const oldRawValue = event.target.value;
			let newDisplayValue = formatMixed(cleanValue);
			
			setTimeout(() => {
				const cursorPosition = event.target.selectionStart;
				let newCursorPosition = cursorPosition;
				
				if (newDisplayValue.length > oldRawValue.length) {
					newCursorPosition = cursorPosition + (newDisplayValue.length - oldRawValue.length);
				} else if (newDisplayValue.length < oldRawValue.length) {
					newCursorPosition = cursorPosition - (oldRawValue.length - newDisplayValue.length);
				}
				
				newCursorPosition = Math.min(newCursorPosition, newDisplayValue.length);
				event.target.setSelectionRange(newCursorPosition, newCursorPosition);
				
				event.target.value = newDisplayValue;
			}, 0);
		} else {
			event.target.value = cleanValue;
		}
	};
	const handleFocus = () => {
		isSearchActive.value = true;
	};
	const handleBlur = () => {
		isSearchActive.value = false;
	};
	const clearSearch = () => {
		emit("update:modelValue", "");
	};
</script>

<template>
	<div :class="[ 'group-input', props.class, { 'search-active': isSearchActive && (props.type === 'search' || props.type === 'nik' || props.type === 'text') }]">

		<label v-if="props.label" :for="$attrs.id" class="form-label">
			{{ props.label }}
		</label>

		<div :class="[ 'input-group custom-input-group-icon p-0', props.rupiah, { 'search-input': props.type === 'search' || props.type === 'nik' }]">

			<slot name="prefix">
				<div v-if="props.type === 'search' || props.type === 'nik'" class="input-group-icon ms-3">
					<img src="../../assets/icon/search.svg" />
				</div>
			</slot>

			<input 
				:value="displayValue" 
				@input="handleInput" 
				@keydown="handleKeydown"
				@focus="handleFocus" 
				@blur="handleBlur"
				:class="['form-control hover-none']" 
				v-bind="$attrs" 
				:required="props.required"
				:disabled="props.disabled" 
				:type="inputTypeComputed"
				:inputmode="inputModeComputed" />

			<div v-if="showClearButton" class="input-group-icon me-3">
				<button @click="clearSearch" class="btn btn-link p-0">
					<img src="../../assets/icon/close_round.svg" />
				</button>
			</div>

			<div v-if="props.suffixIcon" class="input-group-icon me-3">
				<img :src="props.suffixIcon" />
			</div>
		</div>

		<div v-if="localError" class="error-text mt-2">
			{{ props.required ? "Field ini diperlukan" : "" }}
		</div>
		<div v-if="props.error" class="error-text mt-2">{{ props.error }}</div>
		<div v-if="props.helperText && !props.error" class="helper-text mt-2">
			{{ props.helperText }}
		</div>

	</div>
</template>

<style lang="scss" scoped>
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
		box-shadow: 0 0 0 var(--g-kit-lime-50);
		outline: none;
	}

	.hover-none {
		&:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
			box-shadow: none;
			outline: none;
		}
	}

	.search-input {
		background-color: #f8f8f8;
		border: none;

		input.form-control {
			background-color: #f8f8f8;
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
			box-shadow: 0 0 0 1px var(--g-kit-lime-50);
			border-radius: 4px;
			outline: none;
		}
	}
</style>