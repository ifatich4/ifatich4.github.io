<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <table :class="['table', props.class]" :style="[props.style]">
        <thead>
        <tr>
            <th id="parent" v-for="head in props.parentHead" :key="head.key" :colspan="head.col" :rowspan="head.row" :class="{'left-align': head.key === 'produk'}">
                {{ head.label }}
                <Tooltip class="gtooltip" v-if="head.tooltip.show" color="white" v-b-tooltip.hover.bottom="{ title: head.tooltip.title, customClass: 'custom-tooltip' }" />
            </th>
        </tr>
        <tr>
            <th id="child" v-for="head in props.childHead" :key="head.key">
                {{ head.label }}
                <Tooltip class="gtooltip" v-if="head.tooltip.show" color="white" v-b-tooltip.hover.bottom="{ title: head.tooltip.title, customClass: 'custom-tooltip' }" />
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(row) in data" :key="row">
            <td v-for="(key) in Object.keys(row)" :key="key" :class="{'left-align': key === '2'}" :style="bgChecker(key) ? getBgColorStyle(row[key]) : ''">
                <div v-if="formatChecker(row[key])">
                    {{ formatNumber(row[key]) }}
                </div>
                <div v-else-if="indicatorChecker(key)" class="item" :style="getIndicatorColorStyle(row[key])">
                    {{ getIndicatorValue(row[key]) }}
                </div>
                <div v-else>
                    {{ row[key] }}
                </div>
            </td>
        </tr>
        <tr v-if="data.length === 0">
            <td :colspan="props.childHead.length" style="text-align: center; vertical-align: middle; height: 116px;">
                {{ props.nodataMessage }}
            </td>
        </tr>
        </tbody>
    </table>
</template>

<script setup>
/* eslint-disable */
import {defineProps} from 'vue'
import Tooltip from "../Tooltip/TooltipComponent.vue";

const props = defineProps({
    class: String,
    style: String,
    data: {
        type: Array,
        required: true,
        default: () => []
    },
    parentHead: {
        type: Array,
        required: true,
    },
    childHead: {
        type: Array,
        required: true,
    },
    dataFormatter: {
        type: Object,
        required: false,
        default: () => {}
    },
    nodataMessage: {
        type: String,
        default: 'Tidak ada data yang ditampilkan'
    },
})

const bgChecker = (value) => {
    return props.dataFormatter.hasBg.some((formatter) => formatter === value)
}

const indicatorChecker = (value) => {
    const isIndicator = props.parentHead.some((head) => head.key === 'INDIKATOR')
    if(isIndicator){
        const lastElement = Object.keys(props.data[0]).length
        return value === lastElement.toString()
    }
    return false
}

const formatChecker = (value) => {
    return props.dataFormatter.needFormat.some((formatter) => formatter === value);
}

const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'decimal' }).format(number);
};


const getBgColorStyle = (value) => {
    if (value < 95) {
        return {backgroundColor: '#F9E7E8'};
    } else if (value >= 95 && value < 100) {
        return {backgroundColor: '#FBF2E9'};
    } else if (value >= 100) {
        return {backgroundColor: '#E6F6EA'};
    }
    return {};
};

const getIndicatorColorStyle = (value) => {
    if (value === 'red') {
        return {backgroundColor: '#F9E7E8',color: '#AE1E22'};
    } else if (value === 'yellow') {
        return {backgroundColor: '#FBF2E9',color: '#E07E26'};
    } else if (value === 'green') {
        return {backgroundColor: '#E6F6EA',color: '#00AB4E'};
    }
    return {};
};

const getIndicatorValue = (value) => {
    if (value === 'red') {
        return 'Merah';
    } else if (value === 'yellow') {
        return 'Kuning'
    } else if (value === 'green') {
        return 'Hijau'
    }
    return {};
}
</script>

<style scoped lang="scss">
.gtooltip {
    margin-top: -5px;
    width: 20px;
    height: 20px;
    opacity: 1 ;
}

::v-deep .bs-tooltip-bottom .tooltip-arrow::before {
    border-bottom-color: white ;
}

::v-deep .custom-tooltip .tooltip-inner {
    background-color: white ;
    color: var(--g-kit-black-60) ;
    border: 1px solid #ced4da ;
    max-width: 360px;
    min-width: 200px;
    width: fit-content;
    font-size: var(--g-kit-font-size-sigma);
    line-height: var(--g-kit-line-height-sigma);
    font-weight: var(--g-kit-font-weight-normal);
    text-align: left;
}

.table {
    width: 100%;
    min-width: 800px; /* Sesuaikan dengan kebutuhan */
    border-collapse: collapse; /* Tambahkan ini untuk memastikan border terlihat */
    text-align: center;
    border-radius: 10px;
}

.table > thead {
    white-space: nowrap;
    vertical-align: middle;
}

.table > tbody {
    white-space: nowrap;
}

th[colspan], th[rowspan] {
    border: 1px solid #fff;
}

.left-align {
    text-align: left;
}

.item {
    padding: 3px 18px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
}

.table tbody tr td {
    padding: 16px 24px;
    font-size: 12px;
    text-align: center;
}

.table tbody td{
    vertical-align: middle;
}
</style>
  