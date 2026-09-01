<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <button class="btn" :class="[`btn-${type}`, `btn-${size}`]" :disabled="loading || disabled">
      <div class="h-100 d-flex justify-content-center align-items-center">
        <BSpinner v-if="loading" class="me-1" :small="size === 'sm' || size==='md'" />
        <div class="icon" v-if="icon" :small="size === 'sm' || size==='md'">
          <slot name="icon"></slot>
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
              default: false
            },
            disabled: {
              type: Boolean,
              default: false
            },
            size: {
                validator(value) {
                    return ["sm", "md", "lg", "xl"].includes(value);
                },
                default:'lg'
            },
        }
    };
</script>

<style scoped lang="scss">

  .btn-sm {
    height: 24px;
  }

  .btn-md {
    height: 40px;
  }

  .btn-lg {
    height: 48px;
  }

  .btn-xl {
    height: 52px;
  }

  .icon {
    height: 24px;
    display: flex;
    align-items: center;
  }

  .icon[small=true] {
  height: 20px;
  }

</style>
