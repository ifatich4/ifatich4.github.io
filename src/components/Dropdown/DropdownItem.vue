<template>
    <li><button class="dropdown-item d-flex justify-content-between align-items-center"><slot></slot></button></li>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.dropdown-menu.show{
    button{
        &.dropdown-item{
            padding: 10px 0px;
            border-bottom: 1px solid #EEEEEF;
            cursor: pointer;
            &:hover{
                background-color:transparent;
            }
        }
    }
}
</style>