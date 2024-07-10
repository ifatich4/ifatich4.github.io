<template>
    <Dropdown :label="'Test Label'" :placeholder="computedFilter" :class="{'input-filter': true, 'updated': computedFilterUpdated}"
        v-model:selectedValue="computedFilter">

        <RadioComponent class="radio" :items="radioOptions" :defaultSelected="defaultRadioValue"
            @selected="handleRadioSelection" @click.stop />

        <DateRangePicker v-model:startDate="startDate" v-model:endDate="endDate" :disablePicker="disabled"
            @change="updateDateRange" @click.stop ref="dateRangePicker" />

    </Dropdown>
</template>

<script>
import Dropdown from '../Dropdown/InputDropdown.vue';
import DateRangePicker from '../Input/DateRangePicker.vue';
import RadioComponent from '../Radio/Radio.vue';

export default {
    name: 'InputFilter',
    components: {
        Dropdown,
        DateRangePicker,
        RadioComponent
    },
    props: {
        modelValue: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            startDate: '',
            endDate: '',
            radioOptions: [
                { value: '1', text: '7 Hari' },
                { value: '2', text: '30 Hari' },
                { value: '3', text: 'Rentang Waktu' }
            ],
            defaultRadioValue: '1',
            selectedRadioValue: '1',
            disabled: false,
            computedFilterUpdated: false
        };
    },
    methods: {
        handleRadioSelection(value) {
            this.selectedRadioValue = value;
            if (value === '3') {
                this.computedFilter = 'Pilih rentang tanggal';
            }
            this.disabled = value !== '3';

            if (value === '1' || value === '2') {
                this.computedFilter = this.generateTextForValue(value);
            }
        },
        formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${day}/${month}/${year}`;
        },
        formattedDate(value) {
            if (!value || value === 'null') return '';
            const [year, month, day] = value.split('-');
            return `${day}/${month}/${year}`;
        },
        updateDateRange() {
            this.startDate = this.$refs.dateRangePicker.startDate;
            this.endDate = this.$refs.dateRangePicker.endDate;
            this.updateComputedFilter();
        },
        generateTextForValue(value) {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 0);
            const futureDate = new Date(currentDate.getTime() + (parseInt(value) * 7 * 24 * 60 * 60 * 1000));
            const startDate = this.formatDate(currentDate);
            const endDate = this.formatDate(futureDate);
            return `${startDate} - ${endDate}`;
        },
        updateComputedFilter() {
            this.$emit('filterDate', this.computedFilter);
            this.computedFilterUpdated = true;
        },
    },
    mounted() {
        this.selectedRadioValue = this.defaultRadioValue;
        this.handleRadioSelection(this.defaultRadioValue);
    },
    watch: {
        computedFilter(newValue, oldValue) {
            if (newValue !== oldValue) {
                this.updateComputedFilter();
            }
        }
    },
    computed: {
        computedFilter: {
            get() {
                const selectedRadio = this.radioOptions.find(option => option.value === this.selectedRadioValue);

                if (selectedRadio && selectedRadio.value === '3') {
                    return `${this.formattedDate(this.startDate)} - ${this.formattedDate(this.endDate)}`;
                } else if (selectedRadio && (selectedRadio.value === '1' || selectedRadio.value === '2')) {
                    return this.generateTextForValue(selectedRadio.value);
                } else {
                    return 'Pilih rentang tanggal';
                }
            }
        }
    }
}
</script>

<style lang="scss">
    .input-filter {
        

        .dropdown-menu {
            &.show {
                display: table;
            }

            .date-range-picker .group-input {
                width: 100%;
            }
        }

        .radio {
            display: flex;

            .radio-content {
                label {
                    margin-left: .25rem;
                    font-weight: var(--g-kit-font-weight-normal);
                    color: var(--g-kit-black-80);

                    &:has(input:checked) {
                        color: white;
                    }
                }
            }
        }

        &.updated {
            button {
                color: black;
            }
        }
    }
</style>
