<template>
    <div class="tabsCustom">
        <div class="card tabMenu desktop">
            <label class="label-stepper">{{ title }}</label>

            <!-- Variant one: Directly displaying the list of labels -->
            <template v-if="variant === 'satu'">
                <label v-for="label in labels" :key="label.id" @click="onLabelClick(label.id)"
                    :class="['label', { 'active': label.id === activeLabel, 'completed': label.completed }]">
                    <span class="content" />
                    {{ label.label }}
                </label>
            </template>

            <!-- Variant two: Using custom-labels slot for Accordion -->
            <template v-else-if="variant === 'dua'">
                <Accordion>
                    <AccordionItem v-for="(accordion, index) in accordions" :key="index" :header="accordion.header">
                        <p v-for="label in accordion.labels" :key="label.id" @click="onLabelClick(label.id)"
                            :class="['text-label', { 'active': label.id === activeLabel, 'completed': label.completed }]">
                            <span class="content" />
                            {{ label.label }}
                        </p>
                    </AccordionItem>
                </Accordion>
            </template>
        </div>

        <div class="card tabMenu mobile">
            <label class="label-stepper">{{ getActiveLabelTitle }}</label>

            <!-- Variant one: Directly displaying the list of labels -->
            <template v-if="variant === 'satu'">
                <label v-for="label in labels" :key="label.id" @click="onLabelClick(label.id)"
                    :class="['label', { 'active': label.id === activeLabel, 'completed': label.completed }]">
                    <span class="content" />
                    {{ label.label }}
                </label>
            </template>

            <!-- Variant two: Toggleable Offcanvas for mobile view -->
            <template v-else-if="variant === 'dua'">
                <button class="btn" type="button" @click="handleShown">
                    <img src="../../assets/icon/menu.svg">
                </button>

            </template>

            <!-- Offcanvas component with dynamic title -->
            <BOffcanvas v-model="ShowMenu" placement="start" title="Kategori">
                <Accordion>
                    <AccordionItem v-for="(accordion, index) in accordions" :key="index" :header="accordion.header">
                        <p v-for="label in accordion.labels" :key="label.id" @click="onLabelClick(label.id, true)"
                            :class="['text-label', { 'active': label.id === activeLabel, 'completed': label.completed }]">
                            <span class="content" />
                            {{ label.label }}
                        </p>
                    </AccordionItem>
                </Accordion>
            </BOffcanvas>
        </div>

        <div class="card tabContent">
            <slot :name="activeLabel"></slot>
        </div>
    </div>
</template>

<script>
    import {
        defineComponent,
        ref,
        computed
    } from 'vue';
    import Accordion from '../Accordion/Accordion.vue';
    import AccordionItem from '../Accordion/AccordionItem.vue';
    import {
        BOffcanvas
    } from 'bootstrap-vue-next';

    export default defineComponent({
        components: {
            Accordion,
            AccordionItem,
            BOffcanvas
        },
        props: {
            title: {
                type: String,
                default: 'Langkah'
            },
            labels: {
                type: Array,
                required: true,
            },
            variant: {
                type: String,
                default: 'satu'
            },
            accordions: {
                type: Array,
                required: true,
                default: () => [{
                        header: 'Accordion 1',
                        labels: [{
                                id: 1,
                                label: 'Trigger Step 1',
                                completed: false
                            },
                            {
                                id: 2,
                                label: 'Trigger Step 2',
                                completed: false
                            },
                        ]
                    },
                    {
                        header: 'Accordion 2',
                        labels: [{
                                id: 3,
                                label: 'Trigger Step 3',
                                completed: false
                            },
                            {
                                id: 4,
                                label: 'Trigger Step 4',
                                completed: false
                            },
                        ]
                    }
                ]
            }
        },
        setup(props) {
            const activeLabel = ref(props.labels[0].id);
            const ShowMenu = ref(false);

            const onLabelClick = (id, closeOffcanvas = false) => {
                activeLabel.value = id;
                if (closeOffcanvas) {
                    ShowMenu.value = false; // Close Offcanvas
                }
            };

            const handleShown = () => {
                ShowMenu.value = !ShowMenu.value;
            };

            const getActiveLabelTitle = computed(() => {
                const active = props.labels.find(label => label.id === activeLabel.value);
                return active ? active.label : '';
            });

            return {
                activeLabel,
                onLabelClick,
                handleShown,
                ShowMenu,
                getActiveLabelTitle
            };
        }
    });
</script>

<style lang="scss" only>
    .tabsCustom {
        width: 100%;
        display: flex;
        gap: 1.5rem;

        .accordion-item {

            .accordion-body,
            .accordion-button {
                padding: 0px;
            }

            .accordion-button {
                background-color: transparent;
                color: var(--g-kit-black-60);
                font-size: var(--g-kit-font-size-omicron);
                line-height: var(--g-kit-line-height-omicron);
                font-weight: var(--g-kit-font-weight-bold);
            }

            .accordion-body {
                .text-label {
                    cursor: pointer;
                    margin-top: 1rem;
                    margin-left: 1rem;
                    color: var(--g-kit-black-60);
                    font-size: var(--g-kit-font-size-omicron);
                    line-height: var(--g-kit-line-height-omicron);
                    font-weight: var(--g-kit-font-weight-regular);

                    &.active {
                        color: var(--g-kit-lime-50);
                    }

                    &:last-child {
                        margin-bottom: 0px;
                    }
                }
            }

            .collapsing {
                transition: background-color 0s ease;
            }
        }

        .accordion-item:has(.collapse.show) {
            background-color: var(--g-kit-lime-10);
            border-color: var(--g-kit-lime-50);
        }

        .tabMenu {
            max-width: 270px;
            width: 100%;
            height: fit-content;
            border-radius: 6px;
            padding: 1.5rem;
            background: var(--g-kit-black-10);
            color: var(--g-kit-black-40);

            .label-stepper {
                margin-bottom: 2rem;
                font-size: var(--g-kit-font-size-kappa);
                line-height: var(--g-kit-line-height-kappa);
                font-weight: var(--g-kit-font-weight-bold);
                color: var(--g-kit-black-80);
            }

            .label {
                cursor: pointer;
                display: flex;
                align-items: center;
                padding: 1rem;
                border: 1px solid var(--g-kit-black-20);
                background-color: white;
                border-radius: 6px;
                font-size: var(--g-kit-font-size-omicron);
                line-height: var(--g-kit-line-height-omicron);
                font-weight: var(--g-kit-font-weight-bold);
                color: var(--g-kit-black-50);
                margin-bottom: 1rem;

                &.active {
                    background: var(--g-kit-lime-10);
                    color: var(--g-kit-lime-50);
                    border: 1px solid var(--g-kit-lime-50);

                    span {
                        background: white;
                        border: 4px solid var(--g-kit-lime-50);
                    }
                }

                &.completed {
                    span {
                        background-image: url(../../assets/icon/check_round.svg);
                        background-size: cover;
                    }
                }

                span {
                    font-size: 14px;
                    border: 1px solid var(--g-kit-black-20);
                    border-radius: 50%;
                    margin-right: 8px;
                    width: 1.5rem;
                    height: 1.5rem;
                }
            }
        }

        .tabContent {
            width: 100%;
            padding: 1.5rem;
        }
    }

    // Responsive
    @media only screen and (max-width: 769px) {
        .tabsCustom {
            flex-direction: column;

            .tabMenu.mobile:has(.btn) {
                padding: 1.25rem 1rem;

                width: 100%;
                max-width: -webkit-fill-available;
                position: sticky;
                position: -webkit-sticky;
                top: 0;
                z-index: 1024;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: baseline;

                .label-stepper {
                    margin-bottom: 0px;
                    font-size: var(--g-kit-font-size-sigma);
                    line-height: var(--g-kit-line-height-sigma);
                    font-weight: var(--g-kit-font-weight-bold);
                }
            }

            .content-time {
                position: absolute;
                z-index: 999;
                background-color: white;

                top: 80px;
                right: 0;

                width: 100%;
            }
        }

        .offcanvas {
            border-radius: 0px !important;
            background-color: var(--g-kit-black-10);

            .offcanvas-header {
                padding: 1rem 2rem;
                background-color: var(--g-kit-black-10);

                font-size: var(--g-kit-font-size-kappa);
                line-height: var(--g-kit-line-height-kappa);
                font-weight: var(--g-kit-font-weight-bold);
            }

            .offcanvas-body {
                padding: 1rem !important;
                background-color: var(--g-kit-black-10);
            }

            .accordion-item {

                .accordion-body,
                .accordion-button {
                    padding: 0px;
                }

                .accordion-button {
                    background-color: transparent;
                    color: var(--g-kit-black-60);
                    font-size: var(--g-kit-font-size-omicron);
                    line-height: var(--g-kit-line-height-omicron);
                    font-weight: var(--g-kit-font-weight-bold);
                }

                .accordion-body {
                    .text-label {
                        cursor: pointer;
                        margin-top: 1rem;
                        margin-left: 1rem;
                        color: var(--g-kit-black-60);
                        font-size: var(--g-kit-font-size-omicron);
                        line-height: var(--g-kit-line-height-omicron);
                        font-weight: var(--g-kit-font-weight-regular);

                        &.active {
                            color: var(--g-kit-lime-50);
                        }

                        &:last-child {
                            margin-bottom: 0px;
                        }
                    }
                }

                .collapsing {
                    transition: background-color 0s ease;
                }
            }

            .accordion-item:has(.collapse.show) {
                background-color: var(--g-kit-lime-10);
                border-color: var(--g-kit-lime-50);
            }
        }
    }

    @media (max-width: 520px) {
        .offcanvas.offcanvas-start.show {
            width: -webkit-fill-available;
        }
    }
</style>