<template lang="">
    <div class="add-amount-item" data-bs-toggle="modal" data-bs-target="#modal-tambah-saham">
        <img src="/assets/images/ico-add-green.svg" alt="" />
        <a>{{ label }}</a>
    </div>
</template>
<script>
    export default {
        props: {
            label: String,
        },
    };
</script>