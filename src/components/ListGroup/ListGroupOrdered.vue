<!-- eslint-disable vue/multi-word-component-names -->
<!-- ListGroupOrdered.vue -->
<template>
    <ol class="styled-ol stepper-list">
        <div v-if="!itemsContainsString">
            <li v-for="(item, index) in processedItems" :key="index">
                <a v-if="item.active" :class="[{ active: item.active}, {recent: item.recent}]" href="#" @click.prevent="$emit('step-click', index + 1)">{{ item.label }}</a>
                <span v-else class="disabled">{{ item.label }}</span>
            </li>
        </div>
        <div v-else>
            <li v-for="(item, index) in items" :key="index">
                <span >{{ items[index] }}</span>
            </li>
        </div>
        
    </ol>
</template>

<script>
    export default {
        name: "ListGroupOrdered",
        props: {
            items: {
                type: Array,
                default: function () {
                    return [
                        "Memiliki identitas yang masih berlaku (KTP/Paspor)",
                        "Mengisi formulir pembukaan Rekening Tabungan Emas",
                        "Biaya transaksi Tabungan Emas",
                    ];
                },
            },
        },
        emits: ['step-click'],
        computed: {
            processedItems() {
                return this.items;
            },
            itemsContainsString() {
                return this.items?.some(item => typeof item === "string");
            }
        },
    };
</script>

<style scoped>
    .styled-ol {
        list-style: none;
    }

    .styled-ol li {
        counter-increment: my-awesome-counter;
        font-size: var(--g-kit-font-size-omicron);
        line-height: var(--g-kit-line-height-omicron);
        font-weight: var(--g-kit-font-weight-normal);
        margin-bottom: 16px;
        position: relative
    }

    .styled-ol li a {
        text-decoration: none;
        color: inherit;
    }

    .styled-ol li:before {
        --size: 24px;
        background: var(--g-kit-lime-10);
        border-radius: 100%;
        color: var(--g-kit-lime-50);
        content: counter(my-awesome-counter);
        height: var(--size);
        left: calc(var(--size)*-1 - 10px);
        position: absolute;
        text-align: center;
        top: 0;
        width: var(--size)
    }
</style>