<template>
   <div :class="[`denom-counter-group`, props.variant === 'eform' && 'flex-row flex-wrap gap-4']">
        <div :class="[
                `denom-counter-wrapper flex align-items-center`, props.variant === 'eform' && item.error && 'd-none', 
                props.variant === 'eform' ? 'eform flex-column pt-2' : 'flex-row p-3',
                item.value > 0 && props.variant === 'eform' && 'active' ,
                props.class]" 
            v-for="(item, index) in modelValue" :key="item.id"
        >
            <div :class="[`flex`, props.variant === 'eform' ? 'flex-column align-items-center' : 'flex-row w-100 gap-1']">
                <!--Icon -->
                <div :class="[`icon-denom flex align-items-center`, props.variant === 'eform' && 'eform']" v-if="item.iconCustom" v-html="item.iconCustom" />
                <div :class="[`icon-denom flex align-items-center`, props.variant === 'eform' && 'eform']" v-else >
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 48 48" fill="none">
                        <path d="M37.9998 11H21.9998C20.3429 11 18.9998 12.3431 18.9998 14V40C18.9998 41.6569 20.3429 43 21.9998 43H37.9998C39.6566 43 40.9998 41.6569 40.9998 40V14C40.9998 12.3431 39.6566 11 37.9998 11Z" fill="#CC9D3F"/>
                        <mask id="mask0_14269_43512" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="18" y="11" width="23" height="32">
                            <path d="M37.9998 11H21.9998C20.3429 11 18.9998 12.3431 18.9998 14V40C18.9998 41.6569 20.3429 43 21.9998 43H37.9998C39.6566 43 40.9998 41.6569 40.9998 40V14C40.9998 12.3431 39.6566 11 37.9998 11Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask0_14269_43512)">
                            <path d="M35.0002 11H19.0002C17.3434 11 16.0002 12.3431 16.0002 14V40C16.0002 41.6569 17.3434 43 19.0002 43H35.0002C36.6571 43 38.0002 41.6569 38.0002 40V14C38.0002 12.3431 36.6571 11 35.0002 11Z" fill="#FFC54F"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M27.8148 16.2305L24.4802 18.7447C24.0721 19.052 23.9007 19.5989 24.0569 20.0974L25.3301 24.1652C25.4864 24.6636 25.9341 25 26.439 25H30.5606C31.0654 25 31.5131 24.6636 31.6694 24.1652L32.9426 20.0974C33.0988 19.5989 32.9274 19.052 32.5193 18.7447L29.1847 16.2305C28.7767 15.9232 28.2228 15.9232 27.8148 16.2305Z" fill="#CC9D3F"/>
                            <path d="M32.5002 35H24.5002C23.948 35 23.5002 35.4477 23.5002 36C23.5002 36.5523 23.948 37 24.5002 37H32.5002C33.0525 37 33.5002 36.5523 33.5002 36C33.5002 35.4477 33.0525 35 32.5002 35Z" fill="#CC9D3F"/>
                            <path d="M32.5002 30H24.5002C23.948 30 23.5002 30.4477 23.5002 31C23.5002 31.5523 23.948 32 24.5002 32H32.5002C33.0525 32 33.5002 31.5523 33.5002 31C33.5002 30.4477 33.0525 30 32.5002 30Z" fill="#CC9D3F"/>
                        </g>
                        <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M26.9998 10.9999L30.9998 10.9958V33C30.9998 35.7614 28.7612 38 25.9998 38H18.9998V35L26.9998 10.9999Z" fill="#CC9D3F"/>
                        <path d="M26 5H10C8.34315 5 7 6.34315 7 8V34C7 35.6569 8.34315 37 10 37H26C27.6569 37 29 35.6569 29 34V8C29 6.34315 27.6569 5 26 5Z" fill="#CC9D3F"/>
                        <mask id="mask1_14269_43512" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="7" y="5" width="22" height="32">
                            <path d="M26 5H10C8.34315 5 7 6.34315 7 8V34C7 35.6569 8.34315 37 10 37H26C27.6569 37 29 35.6569 29 34V8C29 6.34315 27.6569 5 26 5Z" fill="white"/>
                        </mask>
                        <g mask="url(#mask1_14269_43512)">
                            <path d="M22.9998 5H6.99976C5.3429 5 3.99976 6.34315 3.99976 8V34C3.99976 35.6569 5.3429 37 6.99976 37H22.9998C24.6566 37 25.9998 35.6569 25.9998 34V8C25.9998 6.34315 24.6566 5 22.9998 5Z" fill="#FFC54F"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.815 10.2305L12.4804 12.7447C12.0723 13.052 11.9009 13.5989 12.0572 14.0974L13.3304 18.1652C13.4866 18.6636 13.9343 19 14.4392 19H18.5608C19.0657 19 19.5134 18.6636 19.6696 18.1652L20.9428 14.0974C21.0991 13.5989 20.9277 13.052 20.5196 12.7447L17.185 10.2305C16.7769 9.92317 16.2231 9.92317 15.815 10.2305Z" fill="#CC9D3F"/>
                            <path d="M20.4998 29H12.4998C11.9475 29 11.4998 29.4477 11.4998 30V30C11.4998 30.5523 11.9475 31 12.4998 31H20.4998C21.052 31 21.4998 30.5523 21.4998 30C21.4998 29.4477 21.052 29 20.4998 29Z" fill="#CC9D3F"/>
                            <path d="M20.4998 24H12.4998C11.9475 24 11.4998 24.4477 11.4998 25C11.4998 25.5523 11.9475 26 12.4998 26H20.4998C21.052 26 21.4998 25.5523 21.4998 25C21.4998 24.4477 21.052 24 20.4998 24Z" fill="#CC9D3F"/>
                        </g>
                    </svg>
                </div>
                

                <div class="d-flex flex-column gap-1 w-100">
                    <div :class="[`denom-label`, props.variant === 'eform' && 'eform']">{{ item.denom }}</div>
                    <div v-if="!(props.variant === 'eform')" class="price-label">{{ item.price }}</div>
                    <div class="error">{{ item.error }}</div>
                </div>
            </div>

            <div class="button-wrapper">
                <AddAmountCounter
                    v-if="item.value > 0"
                    :class="[`counter-denom w-100`, props.variant === 'eform' && 'eform']"
                    :modelValue="item.value"
                    @update:modelValue="updateValue(index, $event)"
                />
                <Button
                    v-else
                    class="w-100"
                    label="Tambahkan"
                    type="primary"
                    :size="props.variant === 'eform' ? 'xl' : 'md'"
                    @click="updateValue(index, item.value + 1)"
                    :disabled="item.disabled || item.error"
                />
            </div>
        </div>
   </div>
</template>

<script setup>
import AddAmountCounter from "./AddAmountCounter.vue"
import { defineProps, defineEmits } from "vue"
import Button from "../Button/Button.vue"

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  class: {
    type: String,
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) => ["default", "eform"].includes(value),
  }
})

const emit = defineEmits(["update:modelValue"])

function updateValue(index, newVal) {
  const updated = [...props.modelValue]
  updated[index] = {
    ...updated[index],
    value: newVal,
  }
  emit("update:modelValue", updated)
  console.error(updated[index])
}
</script>

<style lang="scss">

.denom-counter-group {
    display: flex;
    flex-direction: column;

     .denom-counter-wrapper {
        border-bottom: 1px solid var(--g-kit-black-10);
        background-color: white;

        .icon-denom {
            width: 48px;
            height: 48px;

            &.eform {
                width: 64px;
                height: 64px;
            }
        }

        &.eform {
            border: none;
            border-radius: 12px;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.14), 0 0 2px 0 rgba(0, 0, 0, 0.08);
            width: fit-content;
            overflow: hidden;

            &.active {
                         box-shadow:
                    0 2px 6px rgba(0,0,0,0.14),
                    0 0 2px rgba(0,0,0,0.08),
                    0 0 0 1px var(--g-kit-lime-50); 
                background-color: var(--g-kit-lime-10);
            }
        }

        .counter-denom {
            height: fit-content;
            width: fit-content;

            &.eform {
                height: 3.125rem;

                .add-amount-counter-box {
                     width: 100%;
                     background-color: white;
                     
                     .add-amount-counter-box__button {
                        height: 100%;
                     }
                }
            }
        }


        .denom-label {
            font-size: var(--g-kit-font-size-sigma);
            color: var(--g-kit-black-80);

            &.eform {
                font-size: var(--g-kit-font-size-zeta);
            }
        }

        .price-label {
            font-size: var(--g-kit-font-size-omicron);
            font-weight: var(--g-kit-font-weight-bold);
            color: var(--g-kit-black-80);
        }

        .error {
            font-size: var(--g-kit-font-size-omega);
            color: var(--g-kit-red-50);
        }

        .button-wrapper {
           width: 154px;
        }
    }
}
</style>
