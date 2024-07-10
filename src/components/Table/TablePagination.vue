<script setup lang="ts">
import { computed } from 'vue'
import { BPagination } from 'bootstrap-vue-next'

defineOptions({ name: 'TablePagination' })
const props = defineProps(['size','totalRows','perPage','limit','modelValue'])
const emit = defineEmits(['update:modelValue'])

const currentPage = computed({
  get: () => (props.modelValue ? props.modelValue : 1),
  set: (newValue) => {
    emit('update:modelValue', newValue)
  }
})

</script>

<template>
  <BPagination
    v-model="currentPage"
    :total-rows="props.totalRows"
    :per-page="props.perPage"
    :size="props.size"
    fill
    first-number
    last-number
    :limit="props.limit"
  />
</template>
