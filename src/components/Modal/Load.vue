<template>
    <b-modal class="fit-content" v-model="showModal" hide-header hide-footer size="sm" centered :noCloseOnBackdrop="persistent" :noCloseOnEsc="persistent">
        <div class="text-center">
            <div id="loader">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>
            <p>{{ title }}</p>
            <p v-if="count">{{ count + '%' }}</p>
        </div>
    </b-modal>
</template>

<script>
    import { computed } from 'vue'
    import { BModal } from 'bootstrap-vue-next'
    export default {
        name: 'LoadAnimate',
        components: { BModal },
        props: {
            count: {
                type: Number,
                default: 0,
            },
            persistent: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
                default: 'Memproses Data'
            },
            modelValue: {
                type: Boolean
            }
        },
        setup(props, { emit }) {
            const showModal = computed({
                get: () => props.modelValue,
                set: (value) => emit('update:modelValue', value)
            })

            return { showModal }
        },
        data() {
            return {
                dots: Array.from({
                    length: 3
                }, (_, index) => index)
            };
        },
        methods: {
            show() {
                this.showModal = true;
            },
            hide() {
                this.showModal = false;
            },
        },
    };
</script>

<style lang="scss">
    .fit-content {
        .modal-sm {
            width: fit-content;
            margin-left: auto;
            margin-right: auto;
        }
    }

    #loader {
        display: flex;
        padding: 2rem;
        align-items: center;
        justify-content: center;
    }


    .dot {
        height: 2rem;
        width: 2rem;
        border-radius: 2rem;
        margin-right: -4px;
        animation-name: bounce;
        animation-duration: 2.1s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }

    #loader .dot:nth-child(1) {
        background-color: var(--g-kit-kiwi-50);
        animation-delay: 0.3s;
    }

    #loader .dot:nth-child(2) {
        background-color: var(--g-kit-lime-50);
        animation-delay: 0.6s;
    }

    #loader .dot:nth-child(3) {
        background-color: var(--g-kit-broccoli-50);
        animation-delay: 0.9s;
    }

    @keyframes bounce {
        20% {
            transform: translateY(-0.6em);
        }

        40% {
            transform: translateY(0.4em);
            opacity: .7;
        }

        60% {
            transform: translateY(-0.2em);
        }

        80% {
            transform: translateY(-0.1em);
        }

        100% {
            transform: translateY(0em);
        }
    }
</style>
