<script setup>
    import {
        computed,
        defineOptions,
        defineProps,
        ref,
        defineEmits,
        useAttrs
    } from 'vue'
    import {
        BDropdown,
        BDropdownItem,
        BFormInput,
        BDropdownItemButton
    } from 'bootstrap-vue-next'

    defineOptions({
        name: 'InputDropdownHeader',
    })

    const attrs = useAttrs()
    const props = defineProps([
        'label',
        'items',
        'itemValue',
        'itemImg',
        'itemText',
        'itemLink',
        'modelValue',
        'placeholder',
        'class'
    ])
    const emit = defineEmits(['update:modelValue'])

    const search = ref()
    const selectedText = ref()

    const filteredItems = computed(() =>
        search.value ?
        props.items.filter((i) =>
            i[props.itemText].toLowerCase().includes(search.value.toLowerCase())
        ) :
        props.items
    )

    const selectedValue = computed({
        get: () => (props.modelValue ? props.modelValue : null),
        set: (newValue) => {
            emit('update:modelValue', newValue)
        }
    })

    const handleOptionClick = (option) => {
        selectedValue.value = option[props.itemValue]
        selectedText.value = option[props.itemText]
        if (attrs.onChange && attrs.onInput && attrs.onBlur) {
            attrs.onChange()
            attrs.onInput()
            attrs.onBlur()
        }
    }
</script>

<template>
    <div :class="['group-input', props.class]">
        <label v-if="props.label" :for="$attrs.id" class="form-label">
            {{ props.label }}
        </label>
        <BDropdown :value="selectedValue"
            toggle-class="w-100 btn-neutral gkit-dd ddHeader d-flex justify-content-between align-items-center"
            class="prevent-zero gkit-dd ddHeader" v-bind="$attrs">
            <template #button-content>
                {{ props.placeholder }}
                <span>
                    <img src="../../assets/icon/search.svg" />
                </span>
            </template>

            <b-form-input @click.stop v-model="search" type="search" :placeholder="props.placeholder" />
            <template #bFormInput>
                {{ props.placeholder }}
                <span>
                    <img src="../../assets/icon/search.svg" />
                </span>
            </template>
            <div class="p-3 listSearchBody">

                <p v-if="search && search.trim().length > 0" class="mb-0">
                    Hasil pencarian untuk "<b>{{ search }}</b>"
                </p>

                <div class="card-body" v-if="filteredItems.length === 0">

                    <img class="my-3" src="../../assets/images/tidak-ada-riwayat.svg"/>

                   <h5 class="mb-2">Tidak ada hasil untuk "{{ search }}"</h5>
                   Informasi yang kamu cari tidak ditemukan silakan masukan kata kunci lain.

                </div>
                
                <div class="d-flex flex-wrap justify-content-between search-result">
                    <BDropdownItem v-for="(option, index) in filteredItems" :key="index" @click="handleOptionClick(option)">
                        <BDropdownItemButton buttonClass="d-flex search-items">
                            <a class="d-flex flex-column text-wrap" :href="option[props.itemLink]">
                                <img class="imgSearch" :src="require(`../../assets/icon/${option[props.itemImg]}.svg`)" alt="Icon" />
                                {{ option[props.itemText] }}
                            </a>
                        </BDropdownItemButton>
                    </BDropdownItem>
                </div>
            </div>


        </BDropdown>
    </div>
</template>

<style lang="scss">

    .icon-search {
        position: fixed;
        top: 0rem;
        left: 1rem;
        width: 24px;
        height: 24px;
    }

    .search-result {
        gap: 12px;
        .search-items{
            max-width: 110px;
            text-align: center;
            margin-top: 0px !important;
            a {
                align-items: center;
                width: 100px;
            }
        }
        .imgSearch{
            width: 64px;
            height: 64px;
        }
    }


    .btn-group {
        width: 100%;
    }

    .ddHeader {
        .listSearchBody{
            border-left: 1px solid var(--g-kit-black-20);
            border-right: 1px solid var(--g-kit-black-20);
            border-bottom: 1px solid var(--g-kit-black-20);
            border-radius: 6px;

            a {
                font-size: var(--g-kit-font-size-omicron);
                line-height: var(--g-kit-line-height-omicron);
                font-weight: var(--g-kit-font-weight-normal);
                color: var(--g-kit-black-80);
            }

            .card-body {
                h5 {
                    color: var(--g-kit-black-80);
                }
                color: var(--g-kit-black-60);
            }
        }
        .dropdown-menu {
            &.show {
                padding: 0px;
                border: 0px;
                border-radius: 6px;
                margin-top: -48px;

                filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.14)) drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.08));
            }
        }
    }
</style>