<template>
    <div class="tabsCustom">
        <div class="card tabMenu">
            <label class="label-stepper">{{ title }}</label>
            <label
                v-for="label in labels"
                :key="label.id"
                @click="onLabelClick(label.id)"
                :class="['label', { 'active': label.id === activeLabel, 'completed': label.completed }]">
                <span class="content"/>
                {{ label.label }}
            </label>
        </div>

        <div class="card tabContent">
            <slot :name="activeLabel"></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
    props: {
        title: {
            type: String,
            default: 'Langkah'
        },
        labels: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const activeLabel = ref(props.labels[0].id);

        const onLabelClick = (id) => {
            activeLabel.value = id;
        };

        const markAsCompleted = (id) => {
            const label = props.labels.find(label => label.id === id);
            if (label) {
                label.completed = true;
            }
        };

        return {
            activeLabel,
            onLabelClick,
            markAsCompleted,
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
</style>
