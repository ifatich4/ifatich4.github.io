<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <ul class="nav nav-underline" id="pills-tab-section" role="tablist">
        <li v-for="(item, index) in items" :key="index" class="nav-item w-50 text-center" role="presentation">
            <a class="nav-link" :class="item.active ? ' active' : ''" :id="item.label + '-tab'" data-bs-toggle="pill"
                :data-bs-target="item.label + '-box'" type="button" role="tab" :aria-controls="item.label + '-box'"
                aria-selected="true">
                {{ item.label }}
            </a>
        </li>
    </ul>
</template>
<script>
    export default {
        name: "TabKategori",
        props: {
            items: {
                type: Array,
                default: function () {
                    return [{
                            label: "Konvensional",
                            active: true,
                            action: function () {
                                return "/";
                            },
                        },
                        {
                            label: "Syariah",
                            active: false,
                            action: function () {
                                return "/";
                            },
                        },
                    ];
                },
            },
        },
    };
</script>
<style></style>