<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div>
        <slot name="table-header"></slot>
    </div>
    <table :class="['table rounded-corners', props.class]" :style="[props.style]">
        <thead>
            <tr>
                <th v-for="column in props.columns" :key="column.key" @click="sortTable(column.key)">
                    {{ column.label }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in sortedData" :key="item.id">
                <td v-for="column in props.columns" :key="column.key">
                    <slot
                        :name="column.key"
                        :value="item[column.key]"
                        :item="item"
                    >
                        {{ item[column.key] }}
                    </slot>
                </td>
            </tr>
            <tr v-if="sortedData.length === 0">
                <td :colspan="props.columns.length" style="text-align: center; vertical-align: middle; height: 116px;">
                  {{ props.nodataMessage }}
                </td>
            </tr>
        </tbody>
    </table>
  </template>
  
  <script setup>
    /* eslint-disable */
    import { defineProps, computed, ref } from 'vue'
    const props = defineProps({
        class: String,
        style: String,
        data: {
            type: Array,
            required: true,
            default: () => []
        },
        columns: {
            type: Array,
            required: true,
        },
        nodataMessage: {
            type: String,
            default: 'Tidak ada data yang ditampilkan'
        },
    })
  
    let sortKey = ref("id")
    let sortOrder = ref()
  
    const sortedData = computed(() => {
        if (!sortOrder) return props.data
        return props.data.slice().sort((a, b) => {
            const modifier = sortOrder.value;
            const x = a[sortKey.value];
            const y = b[sortKey.value];
  
            if (x === y) return 0;
  
            return x > y ? modifier : -modifier;
        });
    })
  
    function sortTable(key) {
        if (sortKey.value === key) {
            sortOrder.value = -sortOrder.value
        } else {
            sortKey.value = key
            sortOrder.value = 1
        }
    }
  </script>
  