<template>
    <BOffcanvas 
        v-model="isVisible"
        :placement="$attrs.placement || `bottom` "
      >

      <template #header>
        <div class="title-offcanvas flex flex-row content-between">
          {{ props.title }}
          <button
            v-if="closeButton"
            type="button"
            class="btn-close ms-2"
            aria-label="Close"
            @click="isVisible = false"
          ></button>
        </div>
      </template>

      <template #default>
        <div class="goffcanvas-body px-3 pt-3">
            <slot />
        </div>
      </template>

      <template #footer>
        <div :class="[`modal-slider-footer d-flex flex-column w-100 gap-2 rounded-3`, props.stickyFooter && `sticky  p-3`]">
            <slot name="footer" :hide="hide"></slot>
        </div>
      </template>
    </BOffcanvas>
</template>

<script setup>

import { defineProps, defineModel } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Title'
  },
  closeButton: {
    type: Boolean,
    default: false
  },
  stickyFooter: Boolean,
  modelValue: Boolean,
})

const isVisible = defineModel({ default: false })


</script>

<style lang="scss" scoped>
    .title-offcanvas {
       font-size: var(--g-kit-font-size-lambda);
       margin-bottom: 0rem;
       align-items: center;
       width: 100%;
    }

    .modal-slider-footer {
        &.sticky {
            display: flex;
            width: 100%;
            padding: 16px;
            gap: 8px;
            border-radius: 12px 12px 0px 0px;
            background: #FFF;
            box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.14), 0px 0px 2px 0px rgba(0, 0, 0, 0.08);
            margin-left: 0;
            margin-right: 0;
            margin-bottom: 0;
            .btn {
                justify-content: space-between;
                width: 100%;
            }
        }
    }
</style>