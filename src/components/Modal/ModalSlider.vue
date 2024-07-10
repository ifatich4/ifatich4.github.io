<script setup>
import { defineOptions, defineProps, defineModel } from 'vue'
import { BModal, BButton, BCarousel, BCarouselSlide } from 'bootstrap-vue-next'

defineOptions({ name: 'ModalSlider' })

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: () => []
  }
})

const model = defineModel()
</script>

<template>
  <div>
    <BModal class="modal-component"
      v-model="model" :title="props.title"
      ok-only
      no-stacking
      hide-footer
      centered>
      <template #modal-header="{ close }">
        <BButton class="btn btn-outline-danger" @click="close()">
          Close Modal
        </BButton>
      </template>

      <BCarousel id="carousel"
        :interval="4000"
        controls
        fade
        img-width="532"
        img-height="416">
        <BCarouselSlide v-for="(imgSrc, index) in props.images" :key="index" :img-src="imgSrc"></BCarouselSlide>
      </BCarousel>
    </BModal>
  </div>
</template>

<style lang="scss">
  .modal-component {
    .carousel {
      button {
          &.carousel-control-next {
            left: unset;
            right: 24px;
            bottom: 200px;
            padding: 0.5rem;
            height: 40px;
            background-color: white;
            border-radius: 20rem;
            .carousel-control-next-icon {
              width: 24px;
              height: 24px;
              background-size: cover;
              background-image: url('../../assets/icon/chevron_right.svg');
            }
          }
          &.carousel-control-prev {
            left: 24px;
            bottom: 200px;
            padding: 0.5rem;
            height: 40px;
            background-color: white;
            border-radius: 20rem;
            .carousel-control-prev-icon{
              width: 24px;
              height: 24px;
              background-size: cover;
              background-image: url('../../assets/icon/chevron_left.svg');
            }
          }
        
      }
      .carousel-inner {
        border-radius: 0.25rem;

        .carousel-item {
          img {
            object-fit: cover;
          }
        }
      }
    }
    
  }

</style>
