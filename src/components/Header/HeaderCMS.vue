<template>
    <div :class="[`header-cms flex justify-content-end`,props.fixed && `fixed-header` ]">
        <div class="profile-wrapper flex align-items-center" @click="subMenuIsOpen = !subMenuIsOpen">
            <div class="avatar">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Joko_Widodo_2019_official_portrait.jpg/250px-Joko_Widodo_2019_official_portrait.jpg" alt="Joko Widodo">
            </div>
            <div class="name-wrapper flex flex-column">
                <div :class="[`main-name`, subMenuIsOpen && `focused`]">Super Admin</div>
                <div class="sub-name">Kantor Pusat</div>
            </div>
            <svg :class="[`icon-chevron`,subMenuIsOpen && `rotate-180`]" width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.4151 6.46832L8.00177 9.05498L10.5884 6.46832C10.8484 6.20832 11.2684 6.20832 11.5284 6.46832C11.7884 6.72832 11.7884 7.14832 11.5284 7.40832L8.46844 10.4683C8.20844 10.7283 7.78844 10.7283 7.52844 10.4683L4.46844 7.40832C4.20844 7.14832 4.20844 6.72832 4.46844 6.46832C4.72844 6.21498 5.1551 6.20832 5.4151 6.46832Z" fill="black"/>
                <mask id="mask0" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="4" y="6" width="8" height="5">
                    <path d="M5.4151 6.46832L8.00177 9.05498L10.5884 6.46832C10.8484 6.20832 11.2684 6.20832 11.5284 6.46832C11.7884 6.72832 11.7884 7.14832 11.5284 7.40832L8.46844 10.4683C8.20844 10.7283 7.78844 10.7283 7.52844 10.4683L4.46844 7.40832C4.20844 7.14832 4.20844 6.72832 4.46844 6.46832C4.72844 6.21498 5.1551 6.20832 5.4151 6.46832Z" fill="white"/>
                </mask>
                <g mask="url(#mask0)">
                    <rect width="16" height="16" fill="#58585B"/>
                </g>
             </svg>
        </div>
        <div v-if="subMenuIsOpen" class="sub-menu">
             <div class="triangle"/>
            <ul>
                <li v-for="(menu, index) in props.subMenu" :key="index">
                    <a :href="menu.route">
                        <span v-if="menu.icon" v-html="menu.icon" class="icon-sub-menu w-4 h-4"></span>
                        <span>{{ menu.name }}</span>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup>

import {ref, defineProps, onMounted, onUnmounted} from "vue"

const subMenuIsOpen = ref(false)

const props = defineProps({
    fixed: {
        type: Boolean,
        default: false
    },
    subMenu: {
        type: Array,
        default: () => [],
        validator: (value) =>
        Array.isArray(value) &&
        value.every(
            item =>
            typeof item === 'object' &&
            'name' in item &&
            'route' in item &&
            typeof item.name === 'string' &&
            typeof item.route === 'string'
        )
  }
});

const handleClickOutside = (event) => {
  const profileWrapper = document.querySelector('.profile-wrapper')
  const subMenu = document.querySelector('.sub-menu')

  if (
    subMenuIsOpen.value &&
    !profileWrapper.contains(event.target) &&
    !subMenu?.contains(event.target)
  ) {
    subMenuIsOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>

<style lang="scss" scoped>

.header-cms{
    background-color: var(--g-kit-white);
    padding-block: 1rem;
    padding-inline: 2.5rem;

    .sub-menu{
        position: absolute;
        top: 3.75rem;
        right: 1rem;
        background-color: var(--g-kit-white);
        height: fit-content;
        border-radius: 0.375rem;
        z-index: 999;
        filter: drop-shadow(0 0 2px rgba(0, 0, 0, 0.08)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.14));

        .triangle {
            position: absolute;
            top: -0.8rem;
            right: 1.5rem; // atur posisi horizontal segitiga
            width: 1rem;
            height: 1rem;
            border-radius: px;
            border-left: 12px solid transparent;
            border-right: 12px solid transparent;
            border-bottom: 12px solid var(--g-kit-white); // warna segitiga
        }

        ul{
            list-style: none;
            padding-inline: 1.5rem;
            padding-block: 0.5;
            margin: 0rem;

            li {
                padding-block: 1rem;
                border-bottom: 1px solid var(--g-kit-black-20);

                a{
                    font-weight: var(--g-kit-font-weight-normal);
                    color: var(--g-kit-black);
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;

                    .icon-sub-menu{
                         color: var(--g-kit-black);

                         &:hover{
                             color: var(--g-kit-lime-50);
                         }
                    }
                }

                &:hover{
                    cursor: pointer;
                    color: var(--g-kit-lime-50);
                }
            } 
        }
    }

    &.fixed-header {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
    }

    .icon-chevron{
        transition: transform 0.3s ease;
    }

 .icon-chevron.rotate-180 {
  transform: rotate(180deg);
}

   .avatar {
  width: 1.5rem;
  height: 1.5rem;
  overflow: hidden; 
  border-radius: 50%;
  margin-right: 1rem;
  display: inline-block;
  position: relative;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

    .name-wrapper{
        margin-right: 1rem;
        .main-name{
            font-size: var(--g-kit-font-size-sigma);
            line-height: var(--g-kit-line-height-sigma);
            font-weight: var(--g-kit-font-weight-bold);
            color: var(--g-kit-black);

            &.focused{
                 color: var(--g-kit-lime-50);
            }
        }

        .sub-name{
            font-size: var(--g-kit-font-size-omega);
            line-height: var(--g-kit-line-height-omega);
            color: var(--g-kit-black-60);
        }
    }

    .name-wrapper:hover{
        color: var(--g-kit-lime-50);
        cursor: pointer;
    }
}
    
</style>