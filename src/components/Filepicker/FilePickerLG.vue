<template>
    <div class="custom-file-upload" :class="{ 'fileName': fileName && !showPreview, 'hns': !showPreview }"
        @dragover.prevent="onDragOver" @dragleave="onDragLeave" @drop.prevent="onFileDrop">
        <div class="custom-file-upload__box-input" :class="{ 'd-none': previewImage }">
            <span v-if="showPreview" class="custom-file-upload__box-input-icon">
                <img src="../../assets/images/ico-image-upload.svg" alt="" />
            </span>
            <span v-else class="custom-file-upload__box-input-icon">
                <img src="../../assets/icon/upload.svg" alt="" />
                <p class="mb-0 ms-2">Tarik file ke sini atau <b class="text-green">pilih dari perangkat</b></p>
            </span>

            <input type="file" id="gallery-photo-add" class="custom-file-upload__box-input-file"
                @change="handleFileChange" ref="file"
                :accept="showPreview ? 'image/*' : '.pdf,.doc,.docx,.xlsx,image/*'" multiple required />
        </div>

        <div v-if="showPreview && previewImage" class="custom-file-upload__box-preview" id="box-preview-image"
            :class="{ 'd-block': previewImage }">
            <img @click="remove" v-if="previewImage || fileName" class="close-img"
                :class="{ 'd-block remove-button btn-close': previewImage || fileName }"
                src="../../assets/icon/cross.svg" />
            <img class="drop-zoon__image" :src="previewImage" alt="Preview" />
        </div>
        <div v-else-if="fileName && !showPreview" class="custom-file-upload__file-name">
            <img @click="remove" v-if="previewImage || fileName" class="close-img"
                :class="{ 'd-block remove-button btn-close': previewImage || fileName }"
                src="../../assets/icon/cross.svg" />
            <span>{{ fileName }}</span>
        </div>
    </div>
    <div v-if="fileError" class="error-text">
        {{ fileError }}
    </div>
</template>

<script>
    export default {
        name: "FilePickerLG",
        props: {
            file: {
                type: [File, Object],
            },
            showPreview: {
                type: Boolean,
                default: true,
            },
            errorText: {
                type: String,
                default: 'File terlalu besar, maksimal 1 MB.',
            }
        },
        data() {
            return {
                previewImage: null,
                fileName: null,
                fileError: null,
            };
        },
        methods: {
            imagesPreview1(files) {
                if (files && files[0]) {
                    this.fileError = null; // Reset error
                    const selectedFile = files[0];

                    // Check file size
                    if (selectedFile.size > 1024 * 1024) { // 1 MB
                        this.fileError = this.errorText;
                        this.previewImage = null;
                        this.fileName = null;
                        return;
                    }

                    this.fileName = selectedFile.name;
                    const fileType = selectedFile.type;

                    if (this.showPreview && fileType.startsWith("image/")) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            this.previewImage = e.target.result;
                            this.$emit("fileSelected", {
                                fileName: this.fileName,
                                previewImage: this.previewImage,
                            });
                        };
                        reader.readAsDataURL(selectedFile);
                    } else {
                        this.previewImage = null;
                        this.$emit("fileSelected", {
                            fileName: this.fileName,
                        });
                    }
                }
            },
            handleFileChange(event) {
                this.previewImage = null;
                this.fileName = null;
                this.fileError = null; // Reset error
                this.imagesPreview1(event.target.files);
            },
            onFileDrop(event) {
                const files = event.dataTransfer.files;
                this.fileError = null; // Reset error for each drop event
                this.previewImage = null; // Reset preview
                this.fileName = null; // Reset filename
                this.imagesPreview1(files);
            },
            onDragOver(event) {
                // Optional: Add styling to indicate drag-and-drop active area
                event.currentTarget.classList.add("drag-over");
            },
            onDragLeave(event) {
                // Optional: Reset styling after drag-and-drop
                event.currentTarget.classList.remove("drag-over");
            },
            remove() {
                this.previewImage = null;
                this.fileName = null;
                this.fileError = null;
                this.$emit("input", null);
                this.$emit("fileSelected", null);
            },
        },
        watch: {
            file: {
                handler(newFile) {
                    if (!newFile) {
                        this.previewImage = null;
                        this.fileName = null;
                        this.fileError = null;
                    }
                },
                immediate: true,
            },
        },
    };
</script>


<style lang="scss" scoped>
    .hide {
        opacity: 0;
    }

    .custom-file-upload{
        &.drag-over {
            border-color: var(--g-kit-lime-50);
        }
    }

    .custom-file-upload__box-preview {
        z-index: 0;
        position: relative !important;
        width: auto !important;

        .close-img {
            position: absolute;
            top: 2px;
            right: 2px;
            cursor: pointer;
            width: 25px;
            height: 25px;
            background: center;
        }
    }

    .custom-file-upload__file-name {
        padding: 10px;
        color: #333;
        font-size: var(--g-kit-font-size-sigma);
        font-weight: var(--g-kit-font-weight-bold);
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

    .fileName {
        background-color: var(--g-kit-lime-10);
        border: 1px solid var(--g-kit-lime-50);
        height: auto;
        min-height: unset;

        .remove-button {
            top: auto;
            padding: 0px;
            width: 20px;
            height: 20px;
            background: center;
        }

        .custom-file-upload__box-input {
            display: none;

            &.custom-file-upload__box-input-icon {
                align-items: center;
            }
        }

        .custom-file-upload__file-name {
            width: -webkit-fill-available;
        }
    }

    .hns {
        .text-green {
            color: var(--g-kit-lime-50);
        }
    }

    .error-text {
        color: red;
        font-size: 0.9em;
        margin-top: 5px;
    }
</style>