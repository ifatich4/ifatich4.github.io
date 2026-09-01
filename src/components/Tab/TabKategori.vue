<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <ul class="nav nav-underline flex-nowrap" id="pills-tab-section" role="tablist">
        <li v-for="(item, index) in items" :key="index" class="nav-item w-50 text-center" role="presentation">
            <a 
                @click="handleClick(index)" 
                class="nav-link" 
                :class="{ active: index === itemSelected }" 
                :id="item.label + '-tab'" 
                data-bs-toggle="pill"
                :data-bs-target="'#' + item.label + '-box'" 
                type="button" 
                role="tab" 
                :aria-controls="item.label + '-box'"
                :aria-selected="index === itemSelected"
            >
                {{ item.label }}
            </a>
        </li>
    </ul>
</template>

<script>
export default {
    name: "TabKategori",
    props: {
        tabSelected: {
            type: Number,
            required: true,
        },
        items: {
            type: Array,
            default() {
                return [
                    { label: "Konvensional", active: true, action: () => "/" },
                    { label: "Syariah", active: false, action: () => "/" },
                ];
            },
        },
    },
    data() {
        return {
            itemSelected: this.tabSelected, 
        };
    },
    watch: {
        tabSelected(newVal) {
            this.itemSelected = newVal; 
        }
    },
    methods: {
        handleClick(index) {
            this.itemSelected = index; 
            this.$emit("update:tabSelected", index);
        }
    },
};
</script>
