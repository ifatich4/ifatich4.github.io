<template>
    <div>
        <!-- Header -->
        <div :class="[`data-table-header`, mobileHeader && `mobile-header`]" style="gap: 24px; margin-bottom: 24px;">
            <div class="d-flex align-items-center gap-2">
                <span>Lihat</span>
                <select name="entriesLength" @change="handleEntriesChange">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span>baris</span>
            </div>
            <input type="search" v-model="searchQuery" @input="handleSearchInput" class="w-50 form-control dataTables_filters" placeholder="Search" />
        </div>

        <!-- Table -->
        <table ref="dataTable" class="table rounded-corners" style="width: 100%">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.data" @click="handleSort(column.data)">
                            <div class="table-header-wrapper">
                                {{ column.title }}
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                                    <path d="M16.095 20.685C16.53 21.105 17.22 21.105 17.655 20.685L21.78 16.71C21.8915 16.6088 21.9816 16.4863 22.0449 16.3497C22.1082 16.2131 22.1434 16.0652 22.1485 15.9147C22.1536 15.7643 22.1284 15.6143 22.0745 15.4737C22.0206 15.3332 21.939 15.2048 21.8345 15.0964C21.7301 14.9879 21.605 14.9016 21.4665 14.8424C21.3281 14.7831 21.1792 14.7523 21.0286 14.7517C20.8781 14.7511 20.7289 14.7808 20.59 14.8389C20.4511 14.897 20.3253 14.9824 20.22 15.09L18 17.229V4.125C18 3.82663 17.8815 3.54048 17.6705 3.3295C17.4595 3.11853 17.1734 3 16.875 3C16.5766 3 16.2905 3.11853 16.0795 3.3295C15.8685 3.54048 15.75 3.82663 15.75 4.125V17.229L13.53 15.09C13.4247 14.9824 13.2989 14.897 13.16 14.8389C13.0211 14.7808 12.872 14.7511 12.7214 14.7517C12.5708 14.7523 12.4219 14.7831 12.2835 14.8424C12.1451 14.9016 12.0199 14.9879 11.9155 15.0964C11.8111 15.2048 11.7295 15.3332 11.6755 15.4737C11.6216 15.6143 11.5964 15.7643 11.6015 15.9147C11.6066 16.0652 11.6418 16.2131 11.7051 16.3497C11.7684 16.4863 11.8585 16.6088 11.97 16.71L16.095 20.685ZM7.92001 3.33C7.70908 3.11932 7.42314 3.00099 7.12501 3.00099C6.82689 3.00099 6.54095 3.11932 6.33001 3.33L2.20501 7.455C2.00629 7.66826 1.89811 7.95033 1.90325 8.24178C1.90839 8.53324 2.02646 8.81131 2.23258 9.01743C2.4387 9.22355 2.71678 9.34162 3.00823 9.34676C3.29968 9.3519 3.58175 9.24372 3.79501 9.045L6.00001 6.84V19.875C6.00001 20.1734 6.11854 20.4595 6.32952 20.6705C6.5405 20.8815 6.82665 21 7.12501 21C7.42338 21 7.70953 20.8815 7.92051 20.6705C8.13149 20.4595 8.25001 20.1734 8.25001 19.875V6.84L10.455 9.045C10.6683 9.24372 10.9503 9.3519 11.2418 9.34676C11.5332 9.34162 11.8113 9.22355 12.0174 9.01743C12.2236 8.81131 12.3416 8.53324 12.3468 8.24178C12.3519 7.95033 12.2437 7.66826 12.045 7.455L7.92001 3.33Z" fill="currentColor"/>
                                </svg>
                            </div>
                    </th>
                    <th v-if="$slots.tableActionButtons">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in sortedData" :key="index">
                    <td v-for="column in columns" :key="column.data" :class="getVerticalAlign(verticalAlign)">
                           <template v-if="isDataArrayhasArrayObject(item[column.data])">
                                <span v-html="getLimitedArrayObjectDisplay(item[column.data][0].rincianBarangJaminan, index)"></span>
                                <div v-if="item[column.data][0].rincianBarangJaminan.length > 5" class="d-flex gap-1 align-items-center text-link-data-table" @click="isDataObjectArrayExpanded[index] = !isDataObjectArrayExpanded[index]">
                                    {{isDataObjectArrayExpanded[index] ? `Sembunyikan` : `Lihat Selengkapnya`}}
                                    <svg :class="[`icon-chevron`, isDataObjectArrayExpanded[index] && `rotate-180`]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.1225 9.70253L12.0025 13.5825L15.8825 9.70253C16.2725 9.31253 16.9025 9.31253 17.2925 9.70253C17.6825 10.0925 17.6825 10.7225 17.2925 11.1125L12.7025 15.7025C12.3125 16.0925 11.6825 16.0925 11.2925 15.7025L6.7025 11.1125C6.3125 10.7225 6.3125 10.0925 6.7025 9.70253C7.0925 9.32253 7.7325 9.31253 8.1225 9.70253Z" fill="black"/>
                                        <mask id="mask0_0_5346" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="9" width="12" height="7">
                                            <path d="M8.1225 9.70253L12.0025 13.5825L15.8825 9.70253C16.2725 9.31253 16.9025 9.31253 17.2925 9.70253C17.6825 10.0925 17.6825 10.7225 17.2925 11.1125L12.7025 15.7025C12.3125 16.0925 11.6825 16.0925 11.2925 15.7025L6.7025 11.1125C6.3125 10.7225 6.3125 10.0925 6.7025 9.70253C7.0925 9.32253 7.7325 9.31253 8.1225 9.70253Z" fill="white"/>
                                        </mask>
                                        <g mask="url(#mask0_0_5346)">
                                            <rect width="24" height="24" fill="currentColor"/>
                                        </g>
                                    </svg>
                                </div>
                            </template>
                         <template v-else-if="isDataArrayObject(item[column.data])">
                            <div class="d-flex flex-column gap-1">
                                <span v-html="getLimitedArrayDisplay(item[column.data], index)"></span>
                                <div v-if="item[column.data].length > 5" class="d-flex gap-1 align-items-center text-link-data-table" @click="isDataArrayExpanded[index] = !isDataArrayExpanded[index]">
                                    {{isDataArrayExpanded[index] ? `Sembunyikan` : `Lihat Selengkapnya`}}
                                     <svg :class="[`icon-chevron`, isDataArrayExpanded[index] && `rotate-180`]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8.1225 9.70253L12.0025 13.5825L15.8825 9.70253C16.2725 9.31253 16.9025 9.31253 17.2925 9.70253C17.6825 10.0925 17.6825 10.7225 17.2925 11.1125L12.7025 15.7025C12.3125 16.0925 11.6825 16.0925 11.2925 15.7025L6.7025 11.1125C6.3125 10.7225 6.3125 10.0925 6.7025 9.70253C7.0925 9.32253 7.7325 9.31253 8.1225 9.70253Z" fill="black"/>
                                        <mask id="mask0_0_5346" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="9" width="12" height="7">
                                            <path d="M8.1225 9.70253L12.0025 13.5825L15.8825 9.70253C16.2725 9.31253 16.9025 9.31253 17.2925 9.70253C17.6825 10.0925 17.6825 10.7225 17.2925 11.1125L12.7025 15.7025C12.3125 16.0925 11.6825 16.0925 11.2925 15.7025L6.7025 11.1125C6.3125 10.7225 6.3125 10.0925 6.7025 9.70253C7.0925 9.32253 7.7325 9.31253 8.1225 9.70253Z" fill="white"/>
                                        </mask>
                                        <g mask="url(#mask0_0_5346)">
                                            <rect width="24" height="24" fill="currentColor"/>
                                        </g>
                                    </svg>
                                </div>
                            </div>
                         </template>
                         <template v-else-if="isDataImg(item[column.data])">
                            <div class="image-data-table-wrapper" @click="openModalSlider(item.id, column.hideMobile, item.daftarJaminan && item.daftarJaminan[0].id)">
                                <img
                                    v-if="item[column.data] && item[column.data][0]"
                                    :src="item[column.data][0].src || item[column.data][0][0].src"
                                    alt="Foto 1"
                                    class="image-data-table image-data-no-overlay"
                                />

                                <div class="image-data-second-wrapper"  @click="openModalSlider(item.id, column.hideMobile, item.daftarJaminan && item.daftarJaminan[0].id)">
                                    <img
                                    v-if="item[column.data] && item[column.data][1]"
                                    :src="item[column.data][1].src || item[column.data][1][0].src"
                                    alt="Foto 2"
                                    :class="[`image-data-table`, item[column.data].length > 2 ?  `image-data-with-overlay` : `image-data-no-overlay`]"
                                    />
                                    <div v-if="item[column.data].length > 2" class="image-overlay-data-table">{{ (item[column.data].length - 2) + "+" }}</div>
                                </div>
                            </div>
                        </template>
                         <template v-else>
                             {{ item[column.data] }}
                         </template>
                    </td>
                    <td class="align-middle" v-if="$slots.tableActionButtons">
                        <slot name="tableActionButtons" :item="item"></slot>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="responsive-table">
            <div v-if="filteredCards.length > 0" class="table-container">
                <div v-for="(item, index) in filteredCards" :key="index" class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <div class="heading">{{ item[leftContent] }}</div>
                            <LabelVue :text="item[rightContent]" variant="green" />
                        </div>
                        <div v-for="column in columns" :key="column.data" class="card-item">
                            <span class="card-label" v-if="column.data !== leftContent && column.data !== rightContent && !column.hideMobile">
                                {{ column.title }}
                            </span>
                            <span class="card-value" v-if="column.data !== leftContent && column.data !== rightContent && !column.hideMobile">
                                <template v-if="isDataArrayhasArrayObject(item[column.data])">
                                    <div class="text-link-data-table photo" @click="openModalTable(item.id)">
                                        Lihat Detail
                                    </div>
                                </template>
                                <template v-else-if="isDataArrayObject(item[column.data])">
                                    <span v-if="!column.arrayObjectCollapse" class="text-end d-block" v-html="item[column.data].map(obj => `${obj.title} : ${obj.value}`).join('<br>')"></span>
                                    <div v-else class="text-link-data-table photo" @click="openModalHasilPemeriksaan(item.id)">
                                        Lihat Detail
                                    </div>
                                </template> 
                                <template v-else-if="isDataImg(item[column.data])">
                                    <div class="text-link-data-table photo" @click="openModalSlider(item.id, column.hideMobile) ">
                                        Lihat Foto
                                    </div>
                                </template>
                                <template v-else>
                                    {{ item[column.data] }}
                                </template>
                            </span>
                        </div>
                    </div>
                    <div class="card-footer" v-if="$slots.tableActionButtons" >
                        <slot name="tableActionButtons" :item="item"></slot>
                    </div>
                </div>
            </div>
            <div v-else>No data available</div>
        </div>

          <!-- Pagination -->
        <div class="footer-table">
            {{ 'Menampilkan ' + ((currentPage - 1) * entriesPerPage + 1) + ' sampai ' + Math.min(currentPage * entriesPerPage, data.length) + ' dari ' + data.length + ' baris'
}}
            <TablePagination
                class="justify-content-start custom-pagination"
                :total-pages="Math.ceil(data.length / entriesPerPage)"
                :total-rows="data.length"
                :per-page="entriesPerPage"
                v-model="currentPage"
            />
        </div>

    </div>
</template>

<script>

    import $ from "jquery";
    import "datatables.net-dt";
    import 'datatables.net-responsive-dt';
    import "datatables.net-dt/css/jquery.dataTables.css";

    import LabelVue from "../Label/Label.vue";
    import TablePagination from './TablePagination.vue';

    window.jQuery = $;

    window.$ = $

    import "../../assets/js/dataTables.rowsGroup.js";

    export default {
        name: "DataTable",
        components: {
            LabelVue,
            TablePagination,
        },
        data() {
            return {
                searchQuery: "",
                dataTableInstance: null,
                entriesPerPage: 10,
                currentPage: 1,
                search: "",
                isDataObjectArrayExpanded: {},
                isDataArrayExpanded: {},
                isDataTwoLayers: false,
                dataIndex: 0,
                imgIndex: 0,
                sortOrder: "",
                sortKey: "",
            };
        },
        props: {
            data: {
                type: Array,
                required: true,
            },
            columns: {
                type: Array,
                required: true,
            },
            leftContent: {
                type: String
            },
            rightContent: {
                type: String
            },
            modalSecondLayerOpen: {
                type: Boolean,
            },
            firstModalFirstLayerOpen: {
                type: Boolean,
            },
            secondModalFirstLayerOpen: {
                type: Boolean,
            },
            thirdModalFirstLayerOpen: {
                type: Boolean,
            },
            mobileHeader: {
                type: Boolean,
                default: false
            },
            selectedFirstLayerIndex: {
                type: Number,
            },
            selectedSecondLayerIndex: {
                type: Number,
            },
            rowsPanColIndex: {
                type: Array,
            },
            verticalAlign: {
                type: String,
                default: "middle",
                validator: function (value) {
                    return ["top", "middle", "bottom"].includes(value);
                }
            },
        },
        mounted() {
            this.initializeDataTable();
        },
        beforeUnmount() {
            this.destroyDataTable();
        },
        watch: {
            search(newValue) {
                this.searchQuery = newValue;
                this.handleSearchInput();
            },
            currentPage(newValue) {
                if (this.dataTableInstance) {
                    this.dataTableInstance.page(newValue - 1).draw('page');
                }
            },
            modalSecondLayerOpen(newVal) {
              if(window.innerWidth < 560){
                if (newVal === true) {
                    this.$emit('update:firstModalFirstLayerOpen', false);
                } else {
                    this.$emit('update:firstModalFirstLayerOpen', true);
                }
              }
            },
            sortedData() {
                this.rebuildDataTable();
            },
            data() {
                this.rebuildDataTable();
            }
        },
        methods: {
            getVerticalAlign(align) {
                return `align-${align}`;
            },
            rebuildDataTable() {
                if (this.dataTableInstance) {
                    this.dataTableInstance.destroy();
                }
                this.$nextTick(() => {
                    this.initializeDataTable();
                });
            },
            getLimitedArrayDisplay(array, index) {
                if (array.length > 5 && !this.isDataArrayExpanded[index]) {
                    return array.slice(0, 5).map(obj => `${obj.title} : ${obj.value}`).join('<br>');
                }
                return array.map(obj => `${obj.title} : ${obj.value}`).join('<br>');
            },
            getLimitedArrayObjectDisplay(array, index) {
                if (array.length > 5 && !this.isDataObjectArrayExpanded[index]) {
                    return array.slice(0, 5).map(obj => `${obj.title} : ${obj.value}`).join('<br>');
                }
                return array.map(obj => `${obj.title} : ${obj.value}`).join('<br>');
            },
            handleSort(key) {
                if (this.sortKey !== key) {
                    // First Time Click → DESC
                    this.sortKey = key;
                    this.sortOrder = -1;
                } else {
                    if (this.sortOrder === 1) {
                        // ASC → DESC
                        this.sortOrder = -1;
                    } else if (this.sortOrder === -1) {
                        // DESC → reset ke default
                        this.sortOrder = 0;
                    } else {
                        // default → ASC
                        this.sortOrder = 1;
                    }
                }
            },  
             isDataArrayObject(data) {
                return Array.isArray(data) &&
                    data.every(item =>
                    item &&
                    typeof item === 'object' &&
                    'title' in item &&
                    'value' in item
                    );
            },
            isDataImg(data) {
                const isImageArray = arr =>
                    Array.isArray(arr) &&
                    arr.every(img => img && typeof img === 'object' && 'src' in img);

                return Array.isArray(data) && (
                    isImageArray(data) || // kasus array 1 dimensi
                    data.every(inner => isImageArray(inner)) // kasus array 2 dimensi
                );
            },
           isDataArrayhasArrayObject(data) {
                return Array.isArray(data) &&
                    data.every(item =>
                    item &&
                    typeof item === 'object' &&
                    Object.values(item).some(value => Array.isArray(value))
                );
            },


            initializeDataTable() {
                this.$nextTick(() => {
                   this.dataTableInstance = $(this.$refs.dataTable).DataTable({
                        destroy: true,
                        responsive: false,
                        scrollX: true,
                        searching: true,
                        ordering: false,
                        paging: true,
                        info: true,
                        rowsGroup: this.rowsPanColIndex,

                    });

                    this.dataTableInstance.on("search.dt", (e, settings) => {
                        if (this.searchQuery !== settings.oPreviousSearch.sSearch) {
                            this.searchQuery = settings.oPreviousSearch.sSearch;
                        }
                    });
                });
            },
            handleSearchInput() {
                if (this.dataTableInstance) {
                    this.dataTableInstance.search(this.searchQuery).draw();
                }
            },
            handleEntriesChange(event) {
                if (this.dataTableInstance) {
                    const entriesPerPage = parseInt(event.target.value, 10);
                    this.entriesPerPage = entriesPerPage;
                    this.dataTableInstance.page.len(entriesPerPage).draw();
                }
            },
            refreshTableData(newData) {
                if (this.dataTableInstance) {
                    this.dataTableInstance.clear();
                    this.dataTableInstance.rows.add(newData);
                    this.dataTableInstance.draw();
                }
            },
            resetSearchQuery() {
                this.searchQuery = "";
                if (this.dataTableInstance) {
                    this.dataTableInstance.search("").draw();
                }
            },
            destroyDataTable() {
                if (this.dataTableInstance) {
                    this.dataTableInstance.destroy();
                }
            },
            openModalHasilPemeriksaan(index){
                this.$emit('update:selectedFirstLayerIndex', index);
                this.$emit('update:secondModalFirstLayerOpen', true)
            },
            openModalSlider(index, hideMobile, indexDaftarJaminan) {
                if (this.selectedSecondLayerIndex === undefined) {
                    this.openModalTable(index)
                } else if (!hideMobile) {
                     this.$emit('update:selectedFirstLayerIndex', index);
                     this.$emit('update:thirdModalFirstLayerOpen', true)
                } else {
                    this.$emit('update:selectedSecondLayerIndex', indexDaftarJaminan);
                    this.$emit('update:selectedFirstLayerIndex', index);
                    this.$emit('update:modalSecondLayerOpen', true)
                }
                 console.log("open modal table"+ index );
            },
            openModalTable(index){
                this.$emit('update:selectedFirstLayerIndex', index);
                this.$emit('update:firstModalFirstLayerOpen', true)
            },
        }, 
        computed: {
           sortedData() {
                if (!this.sortKey || this.sortOrder === 0) {
                    return this.data;
                }

                return [...this.data].sort((a, b) => {
                    const x = a[this.sortKey];
                    const y = b[this.sortKey];

                    if (x === y) return 0;
                    return x > y ? this.sortOrder : -this.sortOrder;
                });
            },
             filteredCards() {
                const uniqueBarang = this.data.filter((item, index, self) =>
                    index === self.findIndex(obj => obj.id === item.id)
                );

                return uniqueBarang.filter(item =>
                    Object.values(item).some(value =>
                        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
                    )
                );
            },

        },


    };
</script>

<style lang="scss">

    .data-table-header {
        display: flex;
        justify-content: space-between;
        align-items: end;
    }
    
    table {
        margin-bottom: 1rem;

        th {
            padding-block: 18px;
            .table-header-wrapper {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                position: relative;
                justify-content: space-between;
            }

            svg {
                right: 10px;
                display: block;
                // position: absolute;
            }
        }

        .image-data-table-wrapper {
            display: flex;
            gap: 0.5rem;
            position: relative;

            .image-data-table {
                width: 5rem;
                height: 5rem;
                object-fit: cover;
                border-radius: 0.5rem;

                &:hover{
                    cursor: pointer;
                }
            }

            .image-data-no-overlay {
                border: 1px solid var(--g-kit-black-40);
            }

            .image-data-second-wrapper {
                position: relative;
                width: 5rem;
                height: 5rem;

                img.image-data-second {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 0.5rem;
                }

                .image-overlay-data-table {
                    position: absolute;
                    inset: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    border-radius: 0.5rem;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: white;
                    font-weight: bold;
                    font-size: 1rem;

                    &:hover{
                        cursor: pointer;
                    }
                }
            }
        }

        .icon-chevron{
            transition: transform 0.3s ease;
        }

        .icon-chevron.rotate-180 {
            transform: rotate(180deg);
        }

    }

     .footer-table {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1rem;
        font-size: var(--g-kit-font-size-sigma);
    }


    .dataTables_length,
    .dataTables_filter {
        display: none !important;
    }

    .dataTables_wrapper {
        .dataTables_paginate {
            display: none;
        }
        .dataTables_info {
            position: absolute;
            display: none;
        }
    }

    select {
        word-wrap: normal;
        width: auto;
        height: max-content;
        padding: 2px;
        border: 1px solid var(--g-kit-black-20);
        border-radius: .25rem;
        color: var(--g-kit-black-60);

        &:focus-visible{
            outline: none;
        }
    }

    .responsive-table {
        display: none;
    }

    .text-link-data-table {
        color: var(--g-kit-lime-50);
        font-weight: var(--g-kit-font-weight-bold);
        
        &.photo{
            font-size: var(--g-kit-font-size-omega);
        }

        &:hover {
            cursor: pointer;
        }
    }

    .w-10 {
        max-width: 10%;
    }

    @media (max-width: 560px) {
        .dataTables_wrapper.no-footer {
            display: none;
        }

        .responsive-table {
            display: block;

            .card-footer {
                background-color: white;
                border-top: 1px solid var(--g-kit-black-20);
                padding-block: .75rem;
            }
        }

        .data-table-header {
            display: none;

             &.mobile-header {
             display: block;
        }
        }

        .footer-table {
            flex-direction: column;
            align-items: start;
            margin-top: 1.5rem;
        }
    }

    table.dataTable thead > tr > th.sorting:before {
        opacity: 0 !important;
        content: "" !important;
    }

    table.dataTable thead > tr > th.sorting::after {
        opacity: 0 !important;
        content: "" !important;
    }

    .dataTables_scroll {

        border-radius: 0.375rem;
        overflow: hidden;

        .dataTables_scrollBody  {

            border-bottom: none !important;

                .table {
                    margin-bottom: 0 !important;

                    thead {
                        visibility: collapse !important;
                    }

                    tbody {
                        td {
                            border-bottom: 1px solid var(--g-kit-black-20) !important;
                        }
                    }

                    &.rounded-corners {
                        border-radius: 0 0 0.375rem 0.375rem !important;
                    }
                } 
            }

        .dataTables_scrollHead {
                .table {
                    margin-bottom: 0 !important;
                    
                    &.rounded-corners {
                        border-radius: 0.375rem 0.375rem 0 0 !important;
                    }
                }   
        }
    }

</style>
