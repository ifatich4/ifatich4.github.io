<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card stepper" v-bind="$attrs">
        <div class="card-body">
            <label class="label-stepper">{{ label }}</label>
            <RadioComponent :items="items" :default-selected="activeStep" v-model="selectedStep" />

            <div>{{ selectedStep }}</div>
        </div>
    </div>
</template>

<script>
import RadioComponent from '../Radio/Radio.vue';

export default {
    name: 'StepperRadio',
    components: {
        RadioComponent,
    },
    props: {
        activeStep: {
            default: null,
        },
        label: {
            type: String,
            default: 'Langkah',
        },
        items: {
            type: Array,
            default: () => [
                { text: 'MENU 1', value: 1 },
                { text: 'MENU 2', value: 2 },
                { text: 'MENU 3', value: 3 },
                { text: 'MENU 4', value: 4 },
            ],
        },
    },
    computed: {
        selectedStep: {
            get() {
                return this.activeStep;
            },
            set(text) {
                this.$emit('update:activeStep', text);
            },
        },
    },
};
</script>




<style lang="scss">
    .card.stepper {
        max-width: 270px;
        height: fit-content;
        filter: unset;
        background-color: var(--g-kit-black-10);

        .card-body {

            padding: 1.5rem;

            .label-stepper {
                margin-bottom: 2rem;
                font-size: var(--g-kit-font-size-kappa);
                line-height: var(--g-kit-line-height-kappa);
                font-weight: var(--g-kit-font-weight-bold);
            }
    
            ol.stepper-list li {
                margin-bottom: 2rem;
            
                &:before {
                    background: var(--g-kit-black-20);
                    color: var(--g-kit-black-40);
                }
    
                &:has(a.active)::before{
                    background: var(--g-kit-lime-50);
                    color: white;
                }

                span {
                    font-weight: var(--g-kit-font-weight-bold);
                }
                
                span,
                a {
                    color: var(--g-kit-black-50);
                    text-decoration: none;
                    cursor:  not-allowed;
            
                    &.active {
                        color: var(--g-kit-black-80);
                        cursor: pointer;
                    }
                }
            }

        }
    }
</style>