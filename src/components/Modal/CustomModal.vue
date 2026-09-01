<script setup>
import { defineProps, defineModel } from 'vue'
import { BModal } from 'bootstrap-vue-next'

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
  },
  useBottomSheet: {
    type: Boolean,
    default: false
  },
  hideDivider: {
    type: Boolean,
    default: false
  }
})

const model = defineModel()
</script>

<template>
  <BModal 
    :class="[
      'custom-modal',
      props.useBottomSheet ? 'bottom-sheet-modal' : '',
      props.hideDivider ? 'hide-divider' : ''
    ]" 
    :size="props.size" 
    v-model="model" 
    :id="$attrs.id" 
    :centered="props.centered" 
    :title="props.title" 
    :noCloseOnBackdrop="props.persistent" 
    :noCloseOnEsc="props.persistent" 
    :scrollable="props.scrollable"
    hide-footer
    hide-header
  >
    <template #default>
      <div class="custom-modal-header" v-if="props.title || props.showCloseButton">
        <h5 v-if="props.title">{{ props.title }}</h5>
        <button 
          v-if="props.showCloseButton"
          class="btn-close" 
          aria-label="Close" 
          @click="model = false"
        ></button>
      </div>
      <div class="custom-modal-body">
        <slot name="body"></slot>
      </div>
      <div class="custom-modal-footer" v-if="$slots.footer">
        <slot name="footer"></slot>
      </div>
    </template>
  </BModal>
</template>

<style lang="scss">
.modal.custom-modal {
  .modal-content {
    border-radius: 16px;
    overflow: hidden;
  }

  .custom-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid var(--g-kit-black-20, #e0e0e0);

    h5 {
      margin: 0;
      font-weight: 600;
    }

    .btn-close {
      background: transparent;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
    }
  }

  .custom-modal-body {
    padding: 16px;
  }

  .custom-modal-footer {
    padding: 16px;
    border-top: 1px solid var(--g-kit-black-20, #e0e0e0);
  }

  &.hide-divider {
    .custom-modal-header {
      border-bottom: none;
    }
    .custom-modal-footer {
      border-top: none;
    }
  }

  &.bottom-sheet-modal {
    .modal-dialog {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0;
      max-width: 100%;
      transform: translateY(0);
    }

    .modal-content {
      border-radius: 16px 16px 0 0;
    }
  }
}
</style>
