<template>
    <div class='tab-pembinaan'>
        <header class='tab-pembinaan-header'>
            <span v-for="label in activeTabArray" :key="label.id"
                :class="['menu-active', { 'active': label.id === activeTab, 'completed': label.completed }]">
                <span class="content" />
                {{ label.label }}
            </span>
            <nav class='vertical-align-middle scroll'>
                <span v-for="label in filteredLabels" :key="label.id" @click="onTabClick(label.id)"
                    :class="['nav-item-tab', { 'completed': label.completed }]">
                    <span class="content" />
                    {{ label.label }}
                </span>
            </nav>
        </header>
        <div class="tab-content">
            <slot :name="activeTab"></slot>
        </div>
    </div>
</template>

<script>
    import {
        computed
    } from 'vue';

    export default {
        name: "TabPembinaan",
        props: {
            title: {
                type: String,
                default: 'Langkah'
            },
            labels: {
                type: Array,
                required: true,
            },
            action: {
                type: Function,
                default: function () {
                    window.history.go(-1);
                },
            },
            currentlySelected: {
                type: Number,
                default: 0
            }
        },
        emits: ['update:currentlySelected'],
        setup(props, emits) {
            const activeTab = computed(() => {
                if (props.currentlySelected >= 0) {
                    if (props.currentlySelected +1 < props.labels.length) {
                        return props.labels[props.currentlySelected].id
                    } else {
                        return props.labels[props.labels.length -1].id
                    }
                } else {
                    emits.emit('update:currentlySelected', 0)
                    return props.labels[0].id
                }
            })

            const activeTabArray = computed(() => {
                return props.labels.filter(label => label.id === activeTab.value);
            });

            const filteredLabels = computed(() => {
                return props.labels.filter(label => label.id !== activeTab.value);
            });

            const onTabClick = (id) => {
                const newIndex = props.labels.findIndex(label => label.id === id)
                emits.emit('update:currentlySelected', newIndex)
            };

            const markAsCompleted = (id) => {
                const label = props.labels.find(label => label.id === id);
                if (label) {
                    label.completed = true;
                }
            };

            return {
                activeTab,
                activeTabArray,
                filteredLabels,
                onTabClick,
                markAsCompleted
            };
        }
    };
</script>


<style only lang="scss">
    .scroll {
        white-space: nowrap;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: -ms-autohiding-scrollbar;
    }

    .scroll::-webkit-scrollbar {
        display: none;
    }

    .tab-pembinaan-header {
        display: flex;
        .menu-active {
            min-width: 55%;
            box-shadow: 0px 0px 10px -16px #bbb;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;        
        }

        nav {
            width: -webkit-fill-available;
            box-shadow: inset -5px 0px 40px -26px #bbb;
        }
    }

    .menu-active,
    .nav-item-tab {
        text-align: center;
        font-weight: 800;
        padding: 16px 18px;
        font-size: 14px;
        min-width: 200px;
        display: inline-block;
        vertical-align: middle;
    }

    .menu-active {
        color: var(--g-kit-lime-50);
        border-bottom: 2px solid var(--g-kit-lime-50);

        span.content {
            border: 4px solid var(--g-kit-lime-50);
            border-radius: 50%;
            margin-right: 4px;
            width: 1rem;
            height: 1rem;
            display: inline-block;
            vertical-align: sub;
        }

        &.completed span.content {
            border: 1px solid var(--g-kit-lime-50);
            background-image: url(../../assets/icon/subtract.svg);
            background-size: cover;
            vertical-align: text-bottom;
            width: 19px;
            height: 19px;
        }
    }

    .nav-item-tab {
        color: var(--g-kit-black-60);
        cursor: pointer;

        span.content {
            border: 4px solid var(--g-kit-black-50);
            background-color: var(--g-kit-black-50);
            border-radius: 50%;
            margin-right: 4px;
            width: 1rem;
            height: 1rem;
            display: inline-block;
            vertical-align: sub;
        }

        &:not(:last-child) {
            border-right: 2px solid var(--g-kit-black-20);
        }

        &.active {
            background: var(--g-kit-lime-10);
            color: var(--g-kit-lime-50);
            border-bottom: 2px solid var(--g-kit-lime-50);

            span.content {
                border: 4px solid var(--g-kit-lime-50);
            }
        }

        &.completed span.content {
            border: 1px solid var(--g-kit-lime-50);
            background-image: url(../../assets/icon/subtract.svg);
            background-color: #ffff;
            background-size: cover;
            vertical-align: text-bottom;
            width: 19px;
            height: 19px;
        }
    }
</style>
