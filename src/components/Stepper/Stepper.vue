<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="card stepper" v-bind="$attrs">
        <div class="card-body">
            <label v-bind="$attrs" class="label-stepper">
                {{ label }}
            </label>
            <ListGroupOrdered class="stepper-list" :items="itemsWithActiveClass" :withLinks="true"  @step-click="handleStepClick" />
        </div>
    </div>
</template>

<script>
    import ListGroupOrdered from '../ListGroup/ListGroupOrdered.vue';

    export default {    
        components: {
            ListGroupOrdered,
        },
        props: {
            label: {
                type: String,
                default: 'Langkah',
            },
            items: {
                type: Array,
                default: function () {
                    return [
                        "MENU 1",
                        "MENU 2",
                        "MENU 3",
                        "MENU 4",
                    ];
                },
            },
            activeStep: {
                type: Number,
                default: 0,
            },
            enableStepUntill: {
                type: Number,
                default: 0,
            },
        },
        emits: ['update:activeStep'],
        methods: {
            handleStepClick(stepIndex) {
                if (stepIndex <= this.enableStepUntill) {
                    this.$emit('update:activeStep', stepIndex);
                }
            },
        },
        computed: {
            itemsWithActiveClass() {
                return this.items.map((item, index) => ({
                    label: item,
                    active: this.enableStepUntill
                    ? index + 1 <= this.enableStepUntill
                    : index + 1 === this.activeStep,
                    recent: index + 1 === this.activeStep,
                }));
            }
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

                        &.recent {
                            color: var(--g-kit-lime-50);
                        }
                    }
                }
            }

        }
    }
</style>