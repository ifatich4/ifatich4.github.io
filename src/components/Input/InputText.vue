<script setup>
  import { defineOptions, defineProps, defineEmits, ref, watch } from 'vue'
  
  defineOptions({ name: 'InputText', inheritAttrs: false })
  
  const formatNumber = (number) => {
    if (!number) return ''
    let cleanNumber = number.replace(/\D/g, '')
    return cleanNumber.replace(/(\d{4})(?=(\d))/g, '$1 ')
  }
  
  const props = defineProps({
    error: {},
    label: {},
    suffixIcon: {},
    class: {},
    modelValue: {},
    helperText: {},
    type: {
      default: 'text'
    },
    useDelimiter: {
      default: true
    },
    required: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: 'default'
    }
  })
  const emit = defineEmits(['update:modelValue'])
  
  const inputValue = ref(props.modelValue)
  const displayValue = ref(props.type === 'number' ? formatNumber(props.modelValue) : props.modelValue)
  const localError = ref(false)
  
  watch(
    () => props.modelValue,
    (newVal) => {
      if (props.required) {
        localError.value = newVal?.trim() === ''
      }
      inputValue.value = newVal
      displayValue.value = props.type === 'number' ? formatNumber(newVal) : newVal
    }
  )
  
  const handleInput = (event) => {
    if (props.type === 'number') {
      const rawValue = event.target.value.replace(/\s+/g, '')
      localError.value = props.required && rawValue.trim() === ''
      inputValue.value = rawValue
      displayValue.value = formatNumber(rawValue)
  
      emit('update:modelValue', rawValue)
  
      // Restore cursor position
      setTimeout(() => {
        const cursorPosition = event.target.selectionStart
        const unformattedValue = event.target.value.replace(/\s+/g, '')
        const formattedValue = formatNumber(unformattedValue)
        let spacesBeforeCursor = formattedValue.slice(0, cursorPosition).split(' ').length - 1
        let newCursorPosition = cursorPosition + spacesBeforeCursor
  
        event.target.setSelectionRange(newCursorPosition, newCursorPosition)
      }, 0)
    } else {
      inputValue.value = event.target.value
      displayValue.value = event.target.value
      emit('update:modelValue', event.target.value)
    }
  }
  
  </script>
  
  <template>
    <div :class="['group-input', props.class]">
      <label v-if="label" :for="$attrs.id" class="form-label">
        {{ label }}
      </label>
      <div class="input-group custom-input-group-icon p-0">
        <slot name="prefix" />
        <input
          :value="displayValue"
          @input="handleInput"
          @keydown="handleKeydown"
          class="form-control"
          v-bind="$attrs"
          :required="props.required"
          :disabled="props.disabled"
          :type="props.type === 'number' ? 'text' : props.type"
          :inputmode="props.type === 'number' ? 'numeric' : 'text'"
        />
        <div v-if="suffixIcon" class="input-group-icon mx-2">
          <img :src="suffixIcon" />
        </div>
        <slot name="suffix" />
      </div>
      <div v-if="localError" class="error-text mt-2">
        {{ props.required ? 'Field ini diperlukan' : '' }}
      </div>
      <div v-if="props.error" class="error-text mt-2">{{ error }}</div>
      <div v-if="props.helperText && !props.error" class="helper-text mt-2">{{ helperText }}</div>
    </div>
  </template>
  
  <style scoped>
  .form-control:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
    box-shadow: 0 0 0 1px #00883e;
    outline: none;
  }
  </style>
  