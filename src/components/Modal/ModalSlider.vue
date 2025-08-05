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
    validator: (value) => ['2/3', '1/1'].includes(value)
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

      <div >
          <BCarousel
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
                <div class="date-time"> {{ "Waktu Ambil Foto: "+ dateImages[carouselModel] + ", " + timeImages[carouselModel] }}</div>
              </div>
            </BCarouselSlide>
          </BCarousel>
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

      <div >
            <BCarousel
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
                  <div class="date-time"> {{ "Waktu Ambil Foto: "+ dateImages[carouselModel] + ", " + timeImages[carouselModel] }}</div>
                </div>
              </BCarouselSlide>
            </BCarousel>
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
      }
}

    .carousel {
      button {
          &.carousel-control-next {
            left: unset;
            right: 24px;
            bottom: 50%;
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
            bottom: 50%;
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
</style>
