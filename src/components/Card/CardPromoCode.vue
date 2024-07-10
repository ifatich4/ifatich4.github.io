<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="pgd-carousel-get-promo__item">
        <div class="content-top">
            <h5>{{ label }}</h5>
            <p>{{ code }}</p>
        </div>
        <div class="content-bottom">
            <a @click="copyCode" class="btn btn-link">Gunakan</a>
        </div>
    </div>
</template>

<script>
    export default {

        props: {
            label: {
                type: String,
            },
            code: {
                type: String,
            },
        },

        methods: {
            copyCode() {
                const textArea = document.createElement("textarea");
                textArea.value = this.code;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
            },
        }

    };
</script>