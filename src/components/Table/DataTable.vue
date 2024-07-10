<template>
    <div>
        <div class="d-flex justify-content-between align-items-center" style="gap: 24px; margin-bottom: 24px;">
            <div>
                <span>Lihat   </span>
                <select name="entriesLength" @change="handleEntriesChange">
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
                <span>   baris</span>
            </div>
            <input type="search" v-model="searchQuery" @input="handleSearchInput" class="w-50 form-control dataTables_filters" placeholder="Search" />
        </div>

        <table ref="dataTable" class="table rounded-corners" style="width: 100%">
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.data" @click="handleSort(column.data)">
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

    export default {
        name: "DataTable",
        components: {
            LabelVue,
        },
        data() {
            return {
                searchQuery: "",
                dataTableInstance: null,
                entriesPerPage: null,
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
            handleEntriesChange() {
                if (this.dataTableInstance) {
                    const entriesPerPage = parseInt(event.target.value, 10);
                    this.dataTableInstance.page.len(entriesPerPage).draw();
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

<style>
    table {
        margin-bottom: 1rem;
    }
    .dataTables_length,
    .dataTables_filter {
        display: none !important;
    }

    .dataTables_wrapper {
        .dataTables_paginate {
            color: var(--g-kit-black-60) !important;

            display: flex;
            column-gap: .75rem;

            span {
                display: flex;
                column-gap: .75rem;
                color: var(--g-kit-black-60) !important;
            }

            .paginate_button {
                color: var(--g-kit-black-60) !important;
                border-radius: .25rem !important;
                border: 1px solid var(--g-kit-black-20);

                &.current{
                    background-color: var(--g-kit-lime-50);
                    border: none;
                    color: white !important;
                }
                &.disabled {
                    border: 1px solid var(--g-kit-black-20);
                    color: var(--g-kit-black-60) !important;
                }
                
            }
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
</style>