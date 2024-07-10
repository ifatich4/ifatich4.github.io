<template>
    <div class="custom-file-upload">
        <b-button-close @click="remove" v-if="previewImage" type="button" :class="{ 'd-block remove-button btn-close': previewImage }">
        </b-button-close>
        <div class="custom-file-upload__box-input">
            <span class="custom-file-upload__box-input-icon">
                <img src="../../assets/images/ico-image-upload.svg" alt="" :class="{ hide: previewImage }" />
            </span>
            <input type="file" id="gallery-photo-add" class="custom-file-upload__box-input-file" @change="handleFileChange" ref="file" multiple accept="image/*" required />
        </div>
        <div class="custom-file-upload__box-preview" id="box-preview-image" v-if="previewImage" :class="{ 'd-block': previewImage }">
            <img class="drop-zoon__image" :src="previewImage" alt="Preview" />
        </div>
    </div>
</template>

<script>
    export default {
        name: "FilePickerLG",
        props: {
            file: {
                type: [File, Object],
            },
        },
        data() {
            return {
                previewImage: null,
            };
        },
        methods: {
            imagesPreview1() {
                const input = this.$refs.file;
                const files = input.files;

                if (files && files[0]) {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        this.previewImage = e.target.result;
                    };

                    reader.readAsDataURL(files[0]);
                }
            },
            filesize(size) {
                var i = Math.floor(Math.log(size) / Math.log(1024));
                return (
                    (size / Math.pow(1024, i)).toFixed(2) * 1 +
                    " " + ["B", "kB", "MB", "GB", "TB"][i]
                );
            },
            browse() {
                this.$refs.file.click();
            },
            change(e) {
                this.$emit("input", e.target.files[0]);
            },
            remove() {
                this.previewImage = null;
                this.$emit("input", null);
            },
            handleFileChange() {
                this.previewImage = null;
                this.imagesPreview1();
            },
        },
        watch: {
            file: {
                handler(newFile) {
                    if (!newFile) {
                        this.previewImage = null;
                    }
                },
                immediate: true,
            },
            previewImage(newPreviewImage) {
                if (newPreviewImage) {
                    this.$emit("input", null);
                }
            },
        },
    };
</script>

<style scoped>
    .hide {
        opacity: 0;
    }

    .custom-file-upload__box-preview {
        z-index: auto;
    }

    .remove-button {
        position: absolute;
        top: 4px;
        right: 4px;
        background-color: #ae1e22;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-weight: bold;
        opacity: 1;
        z-index: 999;
    }
</style>