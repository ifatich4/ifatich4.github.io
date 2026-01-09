<template>
<li 
  :class="[
    `item-sidenav menu-level-${props.level}`, 
    model === props.item.label ? 'active' : '',
    isOpen ? 'open' : '',
  ]"
  @click.stop="item.children ? toggle() : setActive(props.item)"
>
  <div class="label-menu">
    <div class="flex align-items-center gap-2">
      <span v-if="item.icon && props.level === 1" v-html="item.icon" class="icon-menu w-4 h-4"></span>
      <a v-if="item.href && props.containerOpened" :href="item.href">{{ item.label }}</a>
      <span v-else-if="props.containerOpened">{{ item.label }}</span>
    </div>

    <svg
      v-if="props.level < 3 && props.item.children && props.containerOpened"
      class="chevron"
      width="24" height="24" viewBox="0 0 24 24" fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.1225 9.70253L12.0025 13.5825L15.8825 9.70253C16.2725 9.31253 16.9025 9.31253 17.2925 9.70253C17.6825 10.0925 17.6825 10.7225 17.2925 11.1125L12.7025 15.7025C12.3125 16.0925 11.6825 16.0925 11.2925 15.7025L6.7025 11.1125C6.3125 10.7225 6.3125 10.0925 6.7025 9.70253C7.0925 9.32253 7.7325 9.31253 8.1225 9.70253Z" fill="black"/>
    </svg>
  </div>

  <ul v-if="props.item.children && props.item.children.length && props.containerOpened" class="submenu">
    <ItemSideNav
      v-for="child in props.item.children"
      :key="child.label"
      :item="child"
      :level="props.level + 1"
      v-model="model"
      :containerOpened="props.containerOpened"
    />
  </ul>
</li>


</template>

<script setup>
import { defineProps, defineModel, ref } from 'vue'

const props = defineProps({
  item: { type: Object, required: true },
  level: { type: Number, default: 1 },
  containerOpened: { type: Boolean }
})

const model = defineModel()

const isOpen = ref(false)

function setActive(item) {
  if (!item.children || item.children.length === 0) {
    model.value = item.label
  }
}

function toggle() {
  isOpen.value = !isOpen.value
}
</script>


<style lang="scss">

.item-sidenav {
  list-style: none !important;
  margin: 0;
  padding: 0;

  &.active {
    background-color: var(--g-kit-lime-10);
  }

  &.active .label-menu {
    color: var(--g-kit-lime-50) !important;
  
    a {
      color: var(--g-kit-lime-50) !important;
    }
  }

     &.open > .label-menu {
       color: var(--g-kit-lime-50) !important;
  
    span {
      color: var(--g-kit-lime-50) !important;
    }
  }

  .label-menu {
    font-weight: var(--g-kit-font-weight-normal);
    color: var(--g-kit-black-60);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: .5rem;
    padding-inline: 1.5rem;
    padding-block: 1rem;

    svg {
      color: inherit;
    }

    a {
      font-weight: var(--g-kit-font-weight-normal);
      color: var(--g-kit-black-60);
    }
  }

  .chevron { transition: transform .2s ease; }
  &.open > .label-menu > .chevron {
    transform: rotate(180deg);
  }

  .submenu {
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height .3s ease, opacity .2s ease;
    margin-bottom: 0 !important;
  }

  &.open > .submenu {
    max-height: 10000px;    
    opacity: 1;
  }
}

.menu-level-1 { padding-left: 0; font-weight: bold; }
.menu-level-2 { color: gray; }
.menu-level-3 { 
  font-size: 0.9em; 

    .label-menu {
      padding-left: .75rem;
    }
}
</style>
