<template>
  <div>
    <div :class="`alert alert-${color} ${variantClass}`">
      <div class="row">
        <div :class="{ 'col-10' : !hideAction }">
          {{ label }}
        </div>
        <div class="col-2 text-end" v-if="!hideAction">
          <slot name="action" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AlertVarian",
    props: {
      label: String,
      color: {
        validator(value) {
          return ["green", "light-blue", "red", "yellow"].includes(value);
        },
      },
      variant: String,
      hideAction: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      variantClass() {
        return this.variant ? `alert-${this.variant}` : '';
      },
    },
  };
</script>

<style scoped lang="scss">
  @media only screen and (max-width: 425px) {
    .alert {
      font-size: var(--g-kit-font-size-omicron);
      line-height: var(--g-kit-line-height-omicron);
      font-weight: var(--g-kit-font-weight-normal);

      &.variant.alert-info {
        font-size: var(--g-kit-font-size-omicron);
        line-height: var(--g-kit-line-height-omicron);
        font-weight: var(--g-kit-font-weight-normal);
      }
    }
  }
</style>