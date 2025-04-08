<template>
    <div>
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-end" style="gap: 24px; margin-bottom: 24px;">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M16.095 20.685C16.53 21.105 17.22 21.105 17.655 20.685L21.78 16.71C21.8915 16.6088 21.9816 16.4863 22.0449 16.3497C22.1082 16.2131 22.1434 16.0652 22.1485 15.9147C22.1536 15.7643 22.1284 15.6143 22.0745 15.4737C22.0206 15.3332 21.939 15.2048 21.8345 15.0964C21.7301 14.9879 21.605 14.9016 21.4665 14.8424C21.3281 14.7831 21.1792 14.7523 21.0286 14.7517C20.8781 14.7511 20.7289 14.7808 20.59 14.8389C20.4511 14.897 20.3253 14.9824 20.22 15.09L18 17.229V4.125C18 3.82663 17.8815 3.54048 17.6705 3.3295C17.4595 3.11853 17.1734 3 16.875 3C16.5766 3 16.2905 3.11853 16.0795 3.3295C15.8685 3.54048 15.75 3.82663 15.75 4.125V17.229L13.53 15.09C13.4247 14.9824 13.2989 14.897 13.16 14.8389C13.0211 14.7808 12.872 14.7511 12.7214 14.7517C12.5708 14.7523 12.4219 14.7831 12.2835 14.8424C12.1451 14.9016 12.0199 14.9879 11.9155 15.0964C11.8111 15.2048 11.7295 15.3332 11.6755 15.4737C11.6216 15.6143 11.5964 15.7643 11.6015 15.9147C11.6066 16.0652 11.6418 16.2131 11.7051 16.3497C11.7684 16.4863 11.8585 16.6088 11.97 16.71L16.095 20.685ZM7.92001 3.33C7.70908 3.11932 7.42314 3.00099 7.12501 3.00099C6.82689 3.00099 6.54095 3.11932 6.33001 3.33L2.20501 7.455C2.00629 7.66826 1.89811 7.95033 1.90325 8.24178C1.90839 8.53324 2.02646 8.81131 2.23258 9.01743C2.4387 9.22355 2.71678 9.34162 3.00823 9.34676C3.29968 9.3519 3.58175 9.24372 3.79501 9.045L6.00001 6.84V19.875C6.00001 20.1734 6.11854 20.4595 6.32952 20.6705C6.5405 20.8815 6.82665 21 7.12501 21C7.42338 21 7.70953 20.8815 7.92051 20.6705C8.13149 20.4595 8.25001 20.1734 8.25001 19.875V6.84L10.455 9.045C10.6683 9.24372 10.9503 9.3519 11.2418 9.34676C11.5332 9.34162 11.8113 9.22355 12.0174 9.01743C12.2236 8.81131 12.3416 8.53324 12.3468 8.24178C12.3519 7.95033 12.2437 7.66826 12.045 7.455L7.92001 3.33Z" fill="currentColor"/>
                        </svg>
                        {{ column.title }}
                    </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in data" :key="index">
                    <td v-for="column in columns" :key="column.data">
                        {{ item[column.data] }}
                    </td>
                    <td>
                        <slot name="tableActionButtons" :item="item"></slot>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Pagination -->
        <TablePagination
            class="justify-content-end custom-pagination"
            :total-pages="Math.ceil(data.length / entriesPerPage)"
            :total-rows="data.length"
            :per-page="entriesPerPage"
            v-model="currentPage"
            :limit="7"
        />

        <div class="responsive-table">
            <div v-if="filteredCards.length > 0" class="table-container">
                <div v-for="(item, index) in filteredCards" :key="index" class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between mb-2">
                            <div class="heading">{{ item[leftContent] }}</div>
                            <LabelVue :text="item[rightContent]" variant="green" />
                        </div>
                        <div v-for="column in columns" :key="column.data" class="card-item">
                            <span class="card-label" v-if="column.data !== leftContent && column.data !== rightContent">
                                {{ column.title }}:
                            </span>
                            <span class="card-value" v-if="column.data !== leftContent && column.data !== rightContent">
                                {{ item[column.data] }}
                            </span>
                        </div>
                    </div>
                    <div class="card-footer">
                        <slot name="tableActionButtons" :item="item"></slot>
                    </div>
                </div>
            </div>
            <div v-else>No data available</div>
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
            }
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
            }
        },
        methods: {
            handleSort(key) {
                if (this.sortKey === key) {
                    this.sortOrder = -this.sortOrder;
                } else {
                    this.sortKey = key;
                    this.sortOrder = 1;
                }
            },
            initializeDataTable() {
                this.$nextTick(() => {
                    const dataTableOptions = {
                        responsive: true,
                        searching: true,
                        info: true,
                        ordering: true,
                        paging: true,
                    };

                    this.dataTableInstance = $(this.$refs.dataTable).DataTable(dataTableOptions);

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
        },
        computed: {
            filteredCards() {
                return this.data.filter(item =>
                    Object.values(item).some(value =>
                        String(value).toLowerCase().includes(this.searchQuery.toLowerCase())
                    )
                );
            },
        },


    };
</script>

<style lang="scss">
    
    table {
        margin-bottom: 1rem;
        svg {
            right: 10px;
            display: block;
            position: absolute;
        }
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

    .w-10 {
        max-width: 10%;
    }

    @media (max-width: 560px) {
        .dataTables_wrapper.no-footer {
            display: none;
        }

        .responsive-table {
            display: block;
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
</style>