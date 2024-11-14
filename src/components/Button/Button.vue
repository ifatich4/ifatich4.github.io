<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <button class="btn" :class="[`btn-${type}`, `btn-${size}`]" :disabled="loading || disabled">
      <div class="d-flex justify-content-center align-items-center">
        <BSpinner v-if="loading" class="me-1" :small="size === 'sm' || size==='md'" />
        <div v-if="icon" :small="size === 'sm' || size==='md'">
          <slot name="icon" ></slot>
          &nbsp;
        </div>
        <span>{{ label }}</span>
      </div>
    </button>
</template>

<script>
    import { BSpinner } from 'bootstrap-vue-next'
    export default {
        name: "ButtonComponent",
        components: { BSpinner },
        props: {
            label: String,
            type: String,
            loading: {
              type: Boolean,
              default: false
            },
            icon: {
              type: Boolean,
              default: true
            },
            disabled: {
              type: Boolean,
              default: false
            },
            size: {
                validator(value) {
                    return ["sm", "md", "lg", "xl"].includes(value);
                },
            },
        }
    };
</script>

<style scoped lang="scss">
  .btn-md {
    height: 40px;
  }
</style>
