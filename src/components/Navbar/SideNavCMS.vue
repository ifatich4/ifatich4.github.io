<template>
  <nav :class="!isOpened && 'side-nav-opened'">
    <div class="logo">
      <transition name="fade">
             <slot v-if="isOpened" name="logo" />
      </transition>
      <svg @click="isOpened = !isOpened" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="icon system/M/Menu">
        <path id="Combined Shape" fill-rule="evenodd" clip-rule="evenodd" d="M19.5 4.5C20.3284 4.5 21 5.17157 21 6C21 6.7797 20.4051 7.42045 19.6445 7.49313L19.5 7.5H4.5C3.67157 7.5 3 6.82843 3 6C3 5.2203 3.59489 4.57955 4.35554 4.50687L4.5 4.5H19.5ZM19.5 10.5C20.3284 10.5 21 11.1716 21 12C21 12.7797 20.4051 13.4204 19.6445 13.4931L19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12C3 11.2203 3.59489 10.5796 4.35554 10.5069L4.5 10.5H19.5ZM21 18C21 17.1716 20.3284 16.5 19.5 16.5H4.5L4.35554 16.5069C3.59489 16.5796 3 17.2203 3 18C3 18.8284 3.67157 19.5 4.5 19.5H19.5L19.6445 19.4931C20.4051 19.4204 21 18.7797 21 18Z" fill="#70717D"/>
        <mask id="mask0_0_5883" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="3" y="4" width="18" height="16">
        <path id="Combined Shape_2" fill-rule="evenodd" clip-rule="evenodd" d="M19.5 4.5C20.3284 4.5 21 5.17157 21 6C21 6.7797 20.4051 7.42045 19.6445 7.49313L19.5 7.5H4.5C3.67157 7.5 3 6.82843 3 6C3 5.2203 3.59489 4.57955 4.35554 4.50687L4.5 4.5H19.5ZM19.5 10.5C20.3284 10.5 21 11.1716 21 12C21 12.7797 20.4051 13.4204 19.6445 13.4931L19.5 13.5H4.5C3.67157 13.5 3 12.8284 3 12C3 11.2203 3.59489 10.5796 4.35554 10.5069L4.5 10.5H19.5ZM21 18C21 17.1716 20.3284 16.5 19.5 16.5H4.5L4.35554 16.5069C3.59489 16.5796 3 17.2203 3 18C3 18.8284 3.67157 19.5 4.5 19.5H19.5L19.6445 19.4931C20.4051 19.4204 21 18.7797 21 18Z" fill="white"/>
        </mask>
        <g mask="url(#mask0_0_5883)">
        <g id="Color/1. Shades/2. Secondary">
        <rect id="color" width="24" height="24" fill="#58585B"/>
        </g>
        </g>
        </g>
        </svg>
    </div>

    <transition name="fade-slide">
  <div
    class="input-search-side-nav"
    v-if="isOpened && filter"
  >
    <InputText
      :placeholder="props.placeholderFilter"
      v-model="searchQuery"
      type="search"
      class="w-100"
    />
  </div>
</transition>

      <ItemSideNav
        v-for="item in filteredItems"
        :key="item.label"
        :item="item"
        :level="1"
        v-model="model"
        :containerOpened="isOpened"
      />

  </nav>
</template>

<script setup>
import InputText from "../Input/InputText.vue";
import ItemSideNav from "./ItemSideNav.vue";
import { defineProps, ref, computed, defineModel } from "vue";

const model = defineModel() 

const props = defineProps({
  items: {
    type: Array,
    default: () => []
  },
  filter: {
    type: Boolean,
    default: false
  },
  placeholderFilter: {
    type: String,
    default: "Cari menu..."
  },
  logo: {
    type: String,
    default: ""
  },
  opened : {
    type: Boolean,
    default: true
  }
});

const searchQuery = ref("");

const isOpened = ref(props.opened);

function filterItems(items, query) {
  if (!query) return items;

  return items
    .map(item => {
      const match = item.label.toLowerCase().includes(query.toLowerCase());
      const children = item.children ? filterItems(item.children, query) : [];

      if (match) {
        return {
          ...item,
          children: item.children || []
        };
      } else if (children.length > 0) {
        return {
          ...item,
          children
        };
      }
      return null;
    })
    .filter(Boolean);
}

const filteredItems = computed(() => {
  return filterItems(props.items, searchQuery.value);
});
</script>

<style lang="scss" scoped>
nav {
  width: 15rem;
  border: 1px solid var(--g-kit-black-20);
  transition: all 0.3s ease;

  .logo {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    padding-inline: 1.5rem;
    padding-block: 1.25rem;

    svg {
      width: 24px;
      height: 24px;
      flex-shrink: 0;
      cursor: pointer;
    }
  }

  .input-search-side-nav {
    display: flex;
    align-items: center;
    padding-inline: 1rem;
    padding-block: 0.75rem;  
  }

  &.side-nav-opened {
    width: 72px;
    overflow: clip;
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 100px;
}


</style>
