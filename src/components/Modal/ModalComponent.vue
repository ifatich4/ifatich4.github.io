<script setup>
import { defineOptions, defineProps, defineModel } from 'vue'
import { BModal, BButton } from 'bootstrap-vue-next'

defineOptions({ name: 'ModalComponent' })

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  persistent: {
    type: Boolean,
    default: true
  },
  centered: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md'
  },
  showCloseButton: {
    type: Boolean,
    default: true
  },
  scrollable: {
    type: Boolean,
    default: false
  }
})

const model = defineModel()
</script>

<template>
    <BModal :class="[`modal-general`, props.title ? 'border-bottom' : 'border-none']" :size="props.size" v-model="model" :id="$attrs.id" :centered="props.centered" :title="props.title" :noCloseOnBackdrop="persistent" :noCloseOnEsc="persistent" :scrollable="scrollable">
      <template #modal-header="{ close }">
        <BButton id="closeBoy" class="btn btn-outline-danger" @click="close()">Close Modal</BButton>
      </template>
      <template v-slot:header="{ close }" v-if="!$slots.header">
        <slot name="header">
            <div class="d-flex justify-content-between align-items-center w-100">
              <h5>{{ props.title }}</h5>
              <button class="btn btn-close" aria-label="Close" :id="$attrs.id ? $attrs.id +'-btnCloseModal' : 'btnCloseModal'" @click="close()"
                :style="{ display: props.showCloseButton ? 'block' : 'none' }"
              ></button>
            </div>
        </slot>
      </template>

      <template #default="{}">
        <slot name="body"></slot>
      </template>

      <template v-slot:footer="{ hide }">
        <slot name="footer" :hide="hide"></slot>
      </template>
    </BModal>
</template>

<style lang="scss">
 .modal-general.border-bottom{
   .modal-header{
     border-bottom: 1px solid var(--g-kit-black-20);
  }
 }
</style>

