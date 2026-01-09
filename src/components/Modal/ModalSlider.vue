<script setup>
import { defineOptions, defineProps, defineModel } from 'vue'
import { BModal, BButton, BCarousel, BCarouselSlide, BOffcanvas } from 'bootstrap-vue-next'
import {ref , onMounted, onUnmounted, watch} from 'vue'

defineOptions({ name: 'ModalSlider' })

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: () => []
  },
  interval: {
    type: Number,
    default: 0
  },
  ratio: {
    type: String,
    default: '2/3',
    validator: (value) => ['2/3', '3/2', '1/1'].includes(value)
  },
  uploader: {
    type: String,
    default:  'Unknown'
  },
  timeImages: {
    type: Array,
  },
  dateImages: {
    type: Array,
  },
})


const model = defineModel()
const carousel = defineModel('carousel')
const carouselModel = ref(0)

watch(carousel, (val) => {
  carouselModel.value = val
})

watch(carouselModel, (val) => {
  carousel.value = val
})

const isDesktop = ref(true)

const handleResize = () => {
  isDesktop.value = window.innerWidth >= 576
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(isDesktop, (newVal) => {
  if (!newVal) model.value = false
})
</script>

<template>
  <div>
    <BModal v-if="isDesktop" :class="[`modal-slider-component desktop`,props.title && 'border-bottom']"
      v-model="model" 
      :title="props.title"
      @hidden="carouselModel = 0"
      centered>
      <template #modal-header="{ close }">
        <BButton class="btn btn-outline-danger" @click="close()">
          Close Modal
        </BButton>
      </template>

      <div>
          <BCarousel
            v-if="props.images.length > 1"
            no-hover-pause
            v-model="carouselModel"
            id="carousel"
            :key="model"
            :interval="props.interval"
            ride="carousel"      
            controls
            :img-width="532"
            :img-height="props.ratio === '2/3' ? 328 : 532">
            <BCarouselSlide v-for="(imgSrc, index) in props.images" :key="index" :img-src="imgSrc">
              <div v-if="props.timeImages && props.dateImages" class="timestamp flex content-between">
                <div class="uploader"> {{ "Diambil oleh: " + props.uploader }}</div>
                <div class="date-time"> {{ "Waktu: "+ dateImages[carouselModel] + ", " + timeImages[carouselModel] }}</div>
              </div>
            </BCarouselSlide>
          </BCarousel>
          
          <div v-else-if="props.images.length === 1" class="single-image-preview">
            <img :src="props.images[0]" alt="Preview image" :height="props.ratio === '2/3' ? 328 : 532" />
            <div v-if="props.timeImages && props.dateImages" class="timestamp flex content-between">
              <div class="uploader"> {{ "Diambil oleh: " + props.uploader }}</div>
              <div class="date-time"> {{ "Waktu: "+ dateImages[carouselModel] + ", " + timeImages[carouselModel] }}</div>
            </div>
          </div>
      </div>

      <template v-slot:footer="{ hide }">
         <div class="modal-slider-footer d-flex w-100 gap-2 p-3 sticky rounded-3">
           <slot name="footer" :hide="hide"></slot>
         </div>
      </template>
    </BModal>

    <BOffcanvas 
      v-else
      v-model="model"
      @hidden="carouselModel = 0"
      :class="[`modal-slider-component mobile`,props.title && 'border-bottom']"
      placement="bottom"
      header-close
      >

      <template #header>
        <div class="title-offcanvas flex flex-row content-between">
          {{ props.title }}
          <button
            type="button"
            class="btn-close ms-2"
            aria-label="Close"
            @click="model = false"
          ></button>
        </div>
      </template>

     <div :class="['carousel-ratio', `ratio-${props.ratio.replace('/', '-')}`]">
            <BCarousel
              v-if="props.images.length > 1"
              no-hover-pause
              v-model="carouselModel"
              id="carousel"
              :key="model"
              :interval="props.interval"
              ride="carousel"      
              controls
              :img-width="532"
              :img-height="props.ratio === '2/3' ? 328 : 532">
              <BCarouselSlide v-for="(imgSrc, index) in props.images" :key="index" :img-src="imgSrc">
                <div v-if="props.timeImages && props.dateImages" class="timestamp flex content-between">
                  <div class="uploader"> {{ "Diambil oleh: " + props.uploader }}</div>
                  <div class="date-time"> {{ "Waktu: "+ dateImages[carouselModel] + ", " + timeImages[carouselModel] }}</div>
                </div>
              </BCarouselSlide>
            </BCarousel>
            
            <div v-else-if="props.images.length === 1" class="single-image-preview">
              <img :src="props.images[0]" alt="Preview image" :height="props.ratio === '2/3' ? 328 : 532"/>
              <div v-if="props.timeImages && props.dateImages" class="timestamp flex content-between">
                <div class="uploader"> {{ "Diambil oleh: " + props.uploader }}</div>
                <div class="date-time"> {{ "Waktu: "+ dateImages[0] + ", " + timeImages[0] }}</div>
              </div>
            </div>
      </div>

      <template #footer>
        <div class="modal-slider-footer d-flex w-100 gap-2 p-3 pt-0 sticky rounded-3">
            <slot name="footer" :hide="hide"></slot>
          </div>
      </template>
    </BOffcanvas>

  </div>
</template>

<style lang="scss">


  .modal-slider-component.mobile{
    .offcanvas-body{
      padding-top: 1rem !important;
    }

     .title-offcanvas {
       font-size: var(--g-kit-font-size-lambda);
       margin-bottom: 0rem;
       align-items: center;
       width: 100%;
    }
  }

  .modal-slider-component {

    .carousel-caption {
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: calc(100% - 32px);
      padding: 0;
      display: flex;
      justify-content: center;

      .timestamp {
        background-color: rgba(#252528, 0.74);
        padding-inline: 16px;
        padding-block: 8px;
        gap: 8px;
        color: var(--g-kit-white);
        display: flex;
        justify-content: space-between;
        width: 100%;
        border-bottom-right-radius: 0.75rem;
        border-bottom-left-radius: 0.75rem;

         @media screen and (max-width: 567px) {
          font-size: var(--g-kit-font-size-omega);
        }
      }
    }

     @media screen and (max-width: 567px) {
      .carousel-caption {
         width: 100%;
        .timestamp {
            padding-inline: 8px;
            border-bottom-right-radius: 0rem;
            border-bottom-left-radius: 0rem;
        }
      }
    }

    .carousel {
      button {

          &.carousel-control-next {
            left: unset;
            right: 28px;
          }

          &.carousel-control-prev {
              left: 28px;
          } 


          &.carousel-control-next, &.carousel-control-prev  {
            display: flex;
            top: 50%;
            transform: translateY(-50%);
            padding: 0.5rem;
            height: 40px;
            background-color: white;
            border-radius: 20rem;
            opacity: 1;
            .carousel-control-next-icon, .carousel-control-prev-icon {
              width: 24px;
              height: 24px;
              background-size: cover;
            }
            .carousel-control-next-icon {
               background-image: url('../../assets/icon/chevron_right.svg');
            }

            .carousel-control-prev-icon {
               background-image: url('../../assets/icon/chevron_left.svg');
            }
          }

          @media screen and (max-width: 567px) {

            &.carousel-control-next {
              right: 12px;
            }

            &.carousel-control-prev {
                left: 12px;
            }
          }
      }
      .carousel-inner {
        .carousel-item {
          transition: transform 0.4s ease-out; // dari 0.6s ke 0.3s
          padding-inline: 1rem;
          background-color: transparent !important;
          img {
            object-fit: cover;
            border-radius: 0.75rem;
          }
        }
      }
    }

    .modal-dialog{
      max-width: 566px;
    }

    .modal-body{
      padding-inline: 0;
    }

    .modal-slider-footer{
      flex-direction: column;
    }

    @media screen and (min-width: 576px){
     .modal-slider-footer {
       flex-direction: row;
    }
}


  }
  .modal-slider-component.border-bottom {
    .modal-header{
      border-bottom: 1px solid var(--g-kit-black-20);
    }
  }

  .carousel-ratio {
    position: relative;
    width: 100%;
    overflow: hidden;
    border-radius: 0.75rem;

  &.ratio-2-3 {
    padding-top: calc(100% * 2 / 3);
  }

  &.ratio-1-1 {
    padding-top: 100%;
  }

  .carousel,
  .carousel-inner,
  .carousel-item,
  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100% !important;
  }

  img {
    object-fit: cover;
    border-radius: 0.75rem;
  }
}

.single-image-preview {
  padding-left: 1rem;
  padding-right: 1rem;

  img {
    width: 100%;
    object-fit: cover !important;
    border-radius: 0.75rem;
  }

  .timestamp {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    width: calc(100% - 32px);
    background-color: rgba(#252528, 0.74);
    padding-inline: 16px;
    padding-block: 8px;
    gap: 8px;
    color: var(--g-kit-white);
    display: flex;
    justify-content: space-between;
    border-bottom-right-radius: 0.75rem;
    border-bottom-left-radius: 0.75rem;

    @media screen and (max-width: 567px) {
      bottom: 0px;
      font-size: var(--g-kit-font-size-omega);
      width: 100%;
      padding-inline: 8px;
      border-bottom-right-radius: 0rem;
      border-bottom-left-radius: 0rem;
    }
  }
}


</style>