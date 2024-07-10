<template>
    <div class="tabsCustom">
        <div class="card tabMenu">
            <label class="label-stepper">{{ title }}</label>
            <label v-for="label in labels" :key="label.id" @click="onLabelClick(label.id)"
                :class="{ 'label': true, 'active': label.id === activeLabel }">
                <span class="content" />
                {{ label.label }}
            </label>
        </div>

        <div class="card tabContent">
            <LoadAnimate ref="loadingModalRef" />
            <slot :name="activeLabel"></slot>
        </div>
    </div>
</template>

<script>
    import LoadAnimate from '../Modal/Load.vue';
    import {
        defineComponent,
        ref
    } from 'vue';

    export default defineComponent({
        name: 'SideStepperTest',
        components: {
            LoadAnimate,
        },
        props: {
            title: {
                type: String,
                default: 'Langkah',
            },
            labels: {
                type: Array,
                required: true,
            },
        },

        setup(props) {
            const activeLabel = ref(props.labels[0].id);
            const loadingModalRef = ref(null);

            const onLabelClick = async (id) => {
                try {
                    if (loadingModalRef.value) {
                        loadingModalRef.value.show();
                    }
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    activeLabel.value = id;
                    if (loadingModalRef.value) {
                        loadingModalRef.value.hide();
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                    if (loadingModalRef.value) {
                        loadingModalRef.value.hide();
                    }
                }
            };

            return {
                activeLabel,
                onLabelClick,
                loadingModalRef,
            };
        },
    });
</script>


<style lang="scss">
    .tabsCustom {
        width: 100%;
        display: flex;
        gap: 1.5rem;

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

                span {
                    font-size: 14px;
                    border: 1px solid var(--g-kit-black-20);
                    border-radius: 50%;
                    margin-right: 8px;

                    width: 1rem;
                    height: 1rem;
                }
            }
        }

        .tabContent {
            width: 100%;
            padding: 1.5rem;
        }
    }
</style>