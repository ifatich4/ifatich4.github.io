<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="box-upload-multiple-image" style="width: 80px; height: 80px; position: relative;">
        <input type="file" :accept="pdfOnly ? 'application/pdf,.pdf' : (csvOnly ? 'text/csv,.csv,application/vnd.ms-excel' : (imageOnly ? 'image/*' : 'application/pdf,.pdf,.doc,.docx,.xlsx,text/csv,.csv,image/*'))" :id="'upload-multiple-image-' + uniqueKey" capture="camera" hidden required
            @change="handleFileChange" ref="file" />
            
        <label v-if="!previewImage && !fileName" :for="'upload-multiple-image-' + uniqueKey" class="box-upload-multiple-image__input" data-bs-toggle="modal"
            :data-bs-target="'#modal-upload-profile-' + uniqueKey" :class="{ 'd-none': activeLoading && loaderType === 'inline' }" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; cursor: pointer; margin: 0;">
            <img v-if="isImageMode" src="../../assets/images/image-upload.svg" alt="" style="width: 100%; height: 100%;" />
            <img v-else src="../../assets/images/file-upload.svg" alt="" style="width: 100%; height: 100%;" />
        </label>

        <div v-if="activeLoading && loaderType === 'inline'" class="loader-dots d-flex align-items-center justify-content-center flex-column" style="width: 100%; height: 100%; background-color: var(--g-kit-lime-10); border: 1px dashed var(--g-kit-lime-50); border-radius: 8px;">
          <div style="display: flex; flex-direction: row;">
            <div class="dot" style="margin-right: -4px;"></div>
            <div class="dot" style="margin-right: -4px;"></div>
            <div class="dot"></div>
          </div>
        </div>

        <div v-if="(previewImage || fileName) && (!activeLoading || loaderType === 'modal')" class="box-upload-multiple-image__preview" style="width: 100%; height: 100%;">
            <div class="drop-zoon" style="position: relative; width: 100%; height: 100%;">
                <img v-if="previewImage" :src="previewImage" class="drop-zoon__image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px; cursor: pointer;" @click="isPreviewOpen = true" />
                <div v-else-if="fileName" class="d-flex align-items-center justify-content-center flex-column" style="width: 100%; height: 100%; background-color: #f1f1f1; border-radius: 8px; text-align: center; cursor: pointer;" :title="fileName" @click="handleFileData">
                    <img src="../../assets/icon/icon-system/icon-document-default.svg" alt="Document" style="width: 28px; height: 28px;" />
                    <span style="font-size: 9px; line-height: 1.2; width: 90%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 4px; color: #555;">{{ fileName }}</span>
                </div>
                <img src="../../assets/icon/cross.svg" alt="X" class="drop-zoon__icon" @click="removePreview" style="position: absolute; top: -8px; right: -8px; cursor: pointer; width: 24px; height: 24px; z-index: 10; background: white; border-radius: 50%;" />
            </div>
        </div>
    </div>
    <div v-if="fileError" class="text-danger mt-1" style="font-size: 0.8em; width: max-content; max-width: 200px;">
        {{ fileError }}
    </div>
    
    <section class="section-overlay-modal-pds">
        <div class="modal fade" :id="'modal-upload-profile-' + uniqueKey" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-layout-pds modal-upload-profile">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            Ambil Foto Melalui
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close">
                            <img src="../../assets/images/close.svg" alt="" />
                        </button>
                    </div>
                    <div class="modal-body">
                        <label :for="'upload-multiple-image-' + uniqueKey" class="modal-upload-profile__item">
                            <h6>Galeri</h6>
                            <img src="../../assets/images/image-outline.svg" alt="" />
                        </label>
                        <label :for="'upload-multiple-image-' + uniqueKey" class="modal-upload-profile__item desktop-hide-flex">
                            <h6>Kamera</h6>
                            <img src="../../assets/images/camera-outline.svg" alt="" />
                        </label>
                        <div class="modal-upload-profile__item mobile-hide" data-bs-dismiss="modal"
                            data-bs-toggle="modal" :data-bs-target="'#modal-webcam-' + uniqueKey">
                            <h6>Kamera</h6>
                            <img src="../../assets/images/camera-outline.svg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" :id="'modal-webcam-' + uniqueKey" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Ambil Foto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                            <img src="../../assets/images/close.svg" alt="" />
                        </button>
                    </div>
                    <div class="modal-body">
                        <video autoplay="true" :id="'video-webcam-' + uniqueKey" width="100%">
                            Browser anda tidak mendukung
                        </video>

                        <button class="btn btn-primary" @click="takeSnapshot" data-bs-dismiss="modal">
                            Ambil Foto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <ModalSlider v-model="isPreviewOpen" :images="[previewImage]" title="Preview Gambar">
        <template v-if="$slots.footer" #footer="footerProps">
            <slot name="footer" v-bind="footerProps" />
        </template>
    </ModalSlider>
    <LoadAnimate v-model="activeLoading" v-if="loaderType === 'modal'" />
</template>
<script>
import LoadAnimate from "../Modal/Load.vue";
import ModalSlider from "../Modal/ModalSlider.vue";

export default {
    name: "FilePickerSM",
    components: {
        LoadAnimate,
        ModalSlider,
    },
    props: {
        uniqueKey: {
            type: String,
            default: () => Math.random().toString(36).substring(2, 9),
        },
        file: {
            type: [File, Object, Array],
        },
        maxSize: {
            type: Number,
            default: 1024 * 1024,
        },
        errorText: {
            type: String,
            default: "",
        },
        imageOnly: {
            type: Boolean,
            default: true,
        },
        pdfOnly: {
            type: Boolean,
            default: false,
        },
        csvOnly: {
            type: Boolean,
            default: false,
        },
        loaderType: {
            type: String,
            default: "inline", // "inline" or "modal"
        },
        isLoading: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        isImageMode() {
            return this.imageOnly && !this.pdfOnly && !this.csvOnly;
        },
        activeLoading: {
            get() {
                return this.isLoading || this.internalLoading;
            },
            set(val) {
                this.internalLoading = val;
            }
        },
        computedErrorText() {
            if (this.errorText) return this.errorText;
            const formattedSize = this.formatFileSize ? this.formatFileSize(this.maxSize) : `${this.maxSize / (1024 * 1024)} MB`;
            return `File terlalu besar, maksimal ${formattedSize}.`;
        }
    },
    data() {
        return {
            internalLoading: false,
            fileError: null,
            previewImage: null,
            fileName: null,
            isPreviewOpen: false,
            currentFileObj: null,
        };
    },
    watch: {
        file: {
            async handler(newFile) {
                if (!newFile) {
                    if (this.$refs.file) this.$refs.file.value = "";
                    this.previewImage = null;
                    this.fileName = null;
                } else if (newFile instanceof File || newFile instanceof Blob) {
                    this.fileError = null;
                    this.setFilePreview(newFile);
                } else if (typeof newFile === "string") {
                    this.fileError = null;
                    await this.setUrlPreview(newFile);
                }
            },
            immediate: true,
        },
    },
    methods: {
        setFilePreview(file) {
            this.previewImage = file.type?.startsWith("image/")
                ? URL.createObjectURL(file)
                : null;
            this.fileName = `${file.name} - ${this.formatFileSize(file.size)}`;
        },
        async setUrlPreview(fileUrl) {
            try {
                this.internalLoading = true;
                const response = await fetch(fileUrl);
                if (!response.ok) throw new Error("Failed to load file");

                const urlParts = fileUrl.split("/");
                const filename = urlParts[urlParts.length - 1].split("?")[0];
                const blob = await response.blob();

                this.previewImage = blob.type?.startsWith("image/")
                    ? URL.createObjectURL(blob)
                    : null;
                this.fileName = `${filename} - ${this.formatFileSize(blob.size)}`;
                this.internalLoading = false;
            } catch (error) {
                console.error("Failed to fetch file:", error);
                this.previewImage = null;
                this.fileName = null;
                this.fileError = "Failed to load file.";
                this.internalLoading = false;
            }
        },
        formatFileSize(sizeInBytes) {
            if (sizeInBytes < 1024) return `${sizeInBytes} Bytes`;
            if (sizeInBytes < 1024 * 1024) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
            return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
        },
        removePreview() {
            this.previewImage = null;
            this.fileName = null;
            this.$emit("input", null);
            this.$refs.file.value = ""; // reset file input
        },
        takeSnapshot() {
            alert("Fitur kamera belum tersedia di Vue.");
        },
        handleFileData() {
            const fileRef = this.currentFileObj || this.file;
            if (typeof fileRef === "string") {
                window.open(fileRef, "_blank");
            } else if (fileRef instanceof File || fileRef instanceof Blob) {
                const fileURL = URL.createObjectURL(fileRef);
                window.open(fileURL, "_blank");
            }
        },
        formatFileSizeOld(size) {
            var i = Math.floor(Math.log(size) / Math.log(1024));
            return (
                (size / Math.pow(1024, i)).toFixed(2) * 1 +
                " " + ["B", "kB", "MB", "GB", "TB"][i]
            );
        },
        browse() {
            if (this.$refs.file) {
                this.$refs.file.click();
            }
        },
        closeModal() {
            const modalId = `modal-upload-profile-${this.uniqueKey}`;
            const modal = document.getElementById(modalId);
            if (modal) {
                const closeBtn = modal.querySelector(".btn-close");
                if (closeBtn) closeBtn.click();
            }
        },
        isValidFileType(file) {
            if (!file) return false;
            const fileName = (file.name || "").toLowerCase();
            const fileType = (file.type || "").toLowerCase();

            if (this.pdfOnly) {
                return fileName.endsWith(".pdf") || fileType === "application/pdf";
            }

            if (this.csvOnly) {
                return (
                    fileName.endsWith(".csv") ||
                    fileType === "text/csv" ||
                    fileType === "application/vnd.ms-excel"
                );
            }

            if (this.isImageMode) {
                const validImageExts = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".webp", ".bmp", ".ico"];
                return (
                    fileType.startsWith("image/") ||
                    validImageExts.some((ext) => fileName.endsWith(ext))
                );
            }

            const allowedExts = [
                ".pdf",
                ".doc",
                ".docx",
                ".xlsx",
                ".csv",
                ".jpg",
                ".jpeg",
                ".png",
                ".gif",
                ".svg",
                ".webp",
                ".bmp",
                ".ico",
            ];
            return (
                fileType.startsWith("image/") ||
                fileType === "application/pdf" ||
                fileType === "text/csv" ||
                fileType === "application/vnd.ms-excel" ||
                allowedExts.some((ext) => fileName.endsWith(ext))
            );
        },
        getFormatErrorText() {
            if (this.pdfOnly) return "Format file harus berupa PDF (.pdf).";
            if (this.csvOnly) return "Format file harus berupa CSV (.csv).";
            if (this.isImageMode) return "Format file harus berupa gambar.";
            return "Format file tidak didukung.";
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            if (!file) return;

            this.fileError = null;

            if (!this.isValidFileType(file)) {
                this.fileError = this.getFormatErrorText();
                if (this.$refs.file) this.$refs.file.value = "";
                return;
            }

            if (file.size > this.maxSize) {
                this.fileError = this.computedErrorText;
                if (this.$refs.file) this.$refs.file.value = "";
                return;
            }

            const fileType = file.type || "";
            const fileName = file.name || "";

            if (
                fileType.startsWith("image/") ||
                /\.(jpg|jpeg|png|gif|svg|webp|bmp|ico)$/i.test(fileName)
            ) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result;
                    this.fileName = null;
                    this.$emit("input", file);
                    this.closeModal();
                };
                reader.readAsDataURL(file);
            } else {
                this.previewImage = null;
                this.fileName = file.name;
                this.currentFileObj = file;
                this.$emit("input", file);
                this.closeModal();
            }
        }
    },
};
</script>

<style scoped>
.loader-dots .dot {
  height: 1rem;
  width: 1rem;
  border-radius: 1rem;
  margin-right: 4px;
  animation-name: bounce;
  animation-duration: 2.1s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}
.loader-dots .dot:nth-child(1) {
  background-color: var(--g-kit-kiwi-50);
  animation-delay: 0.3s;
}
.loader-dots .dot:nth-child(2) {
  background-color: var(--g-kit-lime-50);
  animation-delay: 0.6s;
}
.loader-dots .dot:nth-child(3) {
  background-color: var(--g-kit-broccoli-50);
  animation-delay: 0.9s;
}
@keyframes bounce {
  20% { transform: translateY(-0.6em); }
  40% { transform: translateY(0.4em); opacity: 0.7; }
  60% { transform: translateY(-0.2em); }
  80% { transform: translateY(-0.1em); }
  100% { transform: translateY(0em); }
}
</style>