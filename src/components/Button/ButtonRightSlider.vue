<template>
    <img src="../../assets/icon/right-button.svg" alt="" class="right-button" />
</template>
<script>
    export default {
        name: "ButtonRightSlider"
    };
</script>
<style scoped>
    .right-button {
        position: absolute;
        top: 45%;
        right: -3%;
    }
    @media only screen and (max-width: 1400px) {
        .right-button {
            right: -3.5%  !important;
        }
    }
</style>