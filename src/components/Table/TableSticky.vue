<template>
    <div>
        <slot name="table-header"></slot>
    </div>
    <div class="tabel-container rounded-2">
        <table :class="['table-component rounded-table', props.classTable]" style="width: 100%">
            <thead>
                <tr>
                    <th v-for="column in props.columns" :key="column.key" @click="sortTable(column.key)">
                        {{ column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in sortedData" :key="item.id" @click="handleRowClick(item)">
                    <td v-for="column in props.columns" :key="column.key">
                        <slot :name="column.key" :value="item[column.key]" :item="item">
                            {{ item[column.key] }}
                        </slot>
                    </td>
                </tr>
                <tr v-if="sortedData.length === 0">
                    <td :colspan="props.columns.length" style="text-align: center; vertical-align: middle; height: 116px">
                        {{ props.nodataMessage }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue"
const props = defineProps({
    classTable: {
        type: String,
        default: "",
    },
    data: {
        type: Array,
        required: true,
    },
    columns: {
        type: Array,
        required: true,
    },
    nodataMessage: {
        type: String,
        default: "Tidak ada data yang ditampilkan",
    },
})

const sortKey = ref("id")
const sortOrder = ref(1)
const emits = defineEmits(["rowClick"])

const sortedData = computed(() => {
    return props.data.slice().sort((a, b) => {
        const modifier = sortOrder
        const x = a[sortKey]
        const y = b[sortKey]

        if (x === y) return 0

        return x > y ? modifier : -modifier.value
    })
})

function sortTable(key) {
    if (sortKey.value === key) {
        sortOrder.value = -sortOrder.value
    } else {
        sortKey.value = key
        sortOrder.value = 1
    }
}

const handleRowClick = (rowClick) => {
    emits("rowClick", rowClick)
}
</script>
<style scope lang="scss">
.tabel-container {
    max-width: 100%;
    overflow: auto;
}
.table-component {
    width: 100%;
    overflow: auto;
    &.rounded-table {
        border-spacing: 0;
        border-collapse: separate;
        border-radius: 10px;
        border: 1px solid #eeeeef;
    }
    /* Make the last column sticky */
    th:last-child,
    td:last-child {
        position: sticky;
        right: 0;
        border-left: 1px solid #eeeeef;
    }
    th:last-child {
        background-color: #00ab4e;
    }
    thead {
        vertical-align: bottom;
        &:not(:last-child) {
            border-bottom: 1px solid #eeeeef;
            border-right: 1px solid #eeeeef;
        }
        tr {
            th {
                padding: 18px 24px !important;
                font-size: var(--g-kit-font-size-sigma);
                line-height: var(--g-kit-line-height-sigma);
                font-weight: var(--g-kit-font-weight-bold);
                background-color: #00ab4e;
                color: #ffffff;
                &:not(:last-child) {
                    border-right: 1px solid #eeeeef;
                }
                &:first-child {
                    width: 56px;
                }
            }
        }
    }
    /* Enable vertical scrolling */
    tbody {
        color: #252528;
        max-height: 300px; /* Adjust to your desired height */
        overflow-y: auto;
        tr {
            &:not(:nth-child(odd)) td {
                background-color: #f8f8f8;
            }
            &:not(:nth-child(even)) td {
                background-color: #ffffff;
            }
            &:not(:last-child) {
                td {
                    border-bottom: 1px solid #eeeeef;
                    :not(:last-child) {
                        border-collapse: separate;
                    }
                }
            }
            td {
                padding: 1rem;
                font-size: var(--g-kit-font-size-sigma);
                line-height: var(--g-kit-line-height-sigma);
                font-weight: var(--g-kit-font-weight-normal);
                &:not(:last-child) {
                    border-right: 1px solid #eeeeef;
                    border-collapse: separate;
                    vertical-align: middle;
                }
            }
            &:last-child td {
                border-bottom: 0px;
                vertical-align: middle;
            }
        }
    }

    /* Hide the default scrollbar for the tbody */
    tbody::-webkit-scrollbar {
        width: 0.5em;
    }

    tbody::-webkit-scrollbar-thumb {
        background-color: #888;
    }
}
</style>
