<script setup>
    import {
        computed
    } from 'vue'
    import {
        defineOptions,
        defineProps,
        defineEmits
    } from 'vue'

    defineOptions({
        name: 'TablePagination'
    })
    const props = defineProps(['size', 'totalRows', 'perPage', 'limit', 'modelValue'])
    const emit = defineEmits(['update:modelValue'])

    const totalPages = computed(() => Math.ceil(props.totalRows / props.perPage))

    const currentPage = computed({
        get: () => (props.modelValue ? props.modelValue : 1),
        set: (newValue) => {
            emit('update:modelValue', newValue)
        }
    })

    // Logic pagination ala Reka UI
    const pages = computed(() => {
        const total = totalPages.value
        const current = currentPage.value
        const pages = []

        if (total <= 6) {
            for (let i = 1; i <= total; i++) {
                pages.push(i)
            }
        } else {
            // Always show first page
            pages.push(1)

            // Show left ellipsis if needed
            if (current > 4) {
                pages.push('...')
            }

            // Show pages around current
            let start = Math.max(2, current - 1)
            let end = Math.min(total - 1, current + 1)

            // Adjust if near the start
            if (current <= 4) {
                start = 2
                end = 5
            }
            // Adjust if near the end
            if (current >= total - 3) {
                start = total - 4
                end = total - 1
            }

            for (let i = start; i <= end; i++) {
                pages.push(i)
            }

            // Show right ellipsis if needed
            if (current < total - 3) {
                pages.push('...')
            }

            // Always show last page
            pages.push(total)
        }

        return pages
    })
</script>

<template>
    <nav aria-label="Pagination" class="d-flex">
        <ul class="pagination custom-pagination">
            <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="currentPage > 1 && currentPage--">
                <span class="page-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.9975 8.12498L11.1175 12.005L14.9975 15.885C15.3875 16.275 15.3875 16.905 14.9975 17.295C14.6075 17.685 13.9775 17.685 13.5875 17.295L8.99754 12.705C8.60754 12.315 8.60754 11.685 8.99754 11.295L13.5875 6.70498C13.9775 6.31498 14.6075 6.31498 14.9975 6.70498C15.3775 7.09498 15.3875 7.73498 14.9975 8.12498Z" fill="currentColor"/>
                    </svg>
                </span>
            </li>
            <li v-for="(page, idx) in pages" :key="idx" class="page-item"
                :class="{ active: page === currentPage, disabled: page === '...'}"
                @click="typeof page === 'number' && currentPage !== page && (currentPage = page)">
                <span class="page-link">{{ page }}</span>
            </li>
            <li class="page-item" :class="{ disabled: currentPage === totalPages }"
                @click="currentPage < totalPages && currentPage++">
                <span class="page-link">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.00246 15.875L12.8825 11.995L9.00246 8.11502C8.61246 7.72502 8.61246 7.09502 9.00246 6.70502C9.39246 6.31502 10.0225 6.31502 10.4125 6.70502L15.0025 11.295C15.3925 11.685 15.3925 12.315 15.0025 12.705L10.4125 17.295C10.0225 17.685 9.39246 17.685 9.00246 17.295C8.62246 16.905 8.61246 16.265 9.00246 15.875Z" fill="currentColor"/>
                    </svg>
                </span>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss">
    .custom-pagination {
        &.pagination {
            gap: .75rem;
        }

        .page-item {
            min-width: 40px;

            &.disabled {
                pointer-events: none;

                .page-link {
                    background-color: #fff;
                    border-color: var(--g-kit-black-20);
                    color: var(--g-kit-black-50);
                    pointer-events: none;
                }
            }

            &.active .page-link {
                color: #fff;
                background-color: var(--g-kit-lime-50);
                border-color: var(--g-kit-lime-50);
            }

            .page-link {
                border-radius: 6px !important;
                font-size: var(--g-kit-font-size-omicron);
                line-height: var(--g-kit-line-height-omicron);
                font-weight: var(--g-kit-font-weight-normal);
                border: 1px solid var(--g-kit-black-20);
                aspect-ratio: 1/1;
                color: var(--g-kit-black-80); // <-- pastikan ada color di sini
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    color: white;
                }
            }
        }
    }
</style>