<template>
  <div
    class="custom-file-upload"
    :class="{ fileName: fileName && !isImageMode, hns: !isImageMode }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onFileDrop"
  >
    <div
      class="custom-file-upload__box-input"
      :class="{ 'd-none': previewImage || (activeLoading && loaderType === 'inline') }"
    >
      <span v-if="isImageMode" class="custom-file-upload__box-input-icon">
        <img src="../../assets/images/image-upload.svg" alt="" style="width: 80px; height: 80px;" />
      </span>
      <span v-else class="custom-file-upload__box-input-icon">
        <img src="../../assets/icon/upload.svg" alt="Upload" class="upload-icon" />
        <p class="mb-0 upload-text">
          Tarik file ke sini atau <b class="text-green">pilih dari perangkat</b>
        </p>
      </span>

      <input
        type="file"
        id="gallery-photo-add"
        class="custom-file-upload__box-input-file"
        @change="handleFileChange"
        ref="file"
        :accept="
          pdfOnly
            ? 'application/pdf,.pdf'
            : csvOnly
            ? 'text/csv,.csv,application/vnd.ms-excel'
            : imageOnly
              ? 'image/*'
              : 'application/pdf,.pdf,.doc,.docx,.xlsx,text/csv,.csv,image/*'
        "
        multiple
        required
      />
    </div>

    <div v-if="activeLoading && loaderType === 'inline'" class="loader-dots custom-file-upload__loading py-4" style="min-height: 120px;">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>

    <div
      v-if="isImageMode && previewImage && !activeLoading"
      class="custom-file-upload__box-preview"
      id="box-preview-image"
      :class="{ 'd-block': previewImage }"
    >
      <img
        @click="remove"
        v-if="previewImage || fileName"
        class="close-img"
        :class="{ 'd-block remove-button btn-close': previewImage || fileName }"
        src="../../assets/icon/cross.svg"
      />
      <img class="drop-zoon__image" :src="previewImage" alt="Preview" style="cursor: pointer;" @click="isPreviewOpen = true" />
    </div>
    <div
      v-else-if="fileName && !isImageMode && !activeLoading"
      class="custom-file-upload__file-name"
    >
      <div v-if="!showFileURL">
        <img
          @click="remove"
          v-if="previewImage || fileName"
          class="close-img"
          :class="{
            'd-block remove-button btn-close': previewImage || fileName,
          }"
          src="../../assets/icon/cross.svg"
        />
        <span>{{ fileName }}</span>
      </div>
      <div v-else class="d-flex align-items-center justify-content-between">
        <span>{{ fileName }}</span>
        <a @click="handleFileData" class="text-green show-preview"
          >Lihat file</a
        >
      </div>
    </div>
  </div>
  <div v-if="fileError" class="error-text">
    {{ fileError }}
  </div>
  <LoadAnimate v-model="activeLoading" v-if="loaderType === 'modal'" />

  <ModalSlider v-model="isPreviewOpen" :images="[previewImage]" title="Preview Gambar">
    <template v-if="$slots.footer" #footer="footerProps">
      <slot name="footer" v-bind="footerProps" />
    </template>
  </ModalSlider>
</template>

<script>
import LoadAnimate from "../Modal/Load.vue";
import ModalSlider from "../Modal/ModalSlider.vue";

export default {
  name: "FilePickerLG",
  components: {
    LoadAnimate,
    ModalSlider,
  },
  props: {
    file: {
      type: [File, Object],
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
    errorText: {
      type: String,
      default: "",
    },
    uniqueKey: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 9),
    },
    maxSize: {
      type: Number,
      default: 1024 * 1024,
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
      previewImage: null,
      fileName: null,
      fileError: null,
      showFileURL: false,
      urlFile: null,
      internalLoading: false,
      isPreviewOpen: false,
    };
  },
  emits: ["fileDropped", "fileRemoved", "errorPermission", "showUrlData"],
  methods: {
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
    imagesPreview1(files) {
      if (files && files[0]) {
        this.fileError = null;
        const selectedFile = files[0];

        if (!this.isValidFileType(selectedFile)) {
          this.fileError = this.getFormatErrorText();
          this.previewImage = null;
          this.fileName = null;
          if (this.$refs.file) this.$refs.file.value = "";
          return;
        }

        if (selectedFile.size > this.maxSize) {
          this.fileError = this.computedErrorText;
          this.previewImage = null;
          this.fileName = null;
          if (this.$refs.file) this.$refs.file.value = "";
          return;
        }

        const fileType = selectedFile.type || "";
        const fileName = selectedFile.name || "";

        if (
          this.isImageMode &&
          (fileType.startsWith("image/") ||
            /\.(jpg|jpeg|png|gif|svg|webp|bmp|ico)$/i.test(fileName))
        ) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImage = e.target.result;
            this.fileName = selectedFile.name;
            this.$emit("fileDropped", selectedFile, this.uniqueKey);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          this.previewImage = null;
          this.fileName = selectedFile.name;
          this.$emit("fileDropped", selectedFile, this.uniqueKey);
        }
      }
    },
    handleFileChange(event) {
      this.previewImage = null;
      this.fileName = null;
      this.fileError = null;
      const files = event.target.files;
      this.imagesPreview1(files);
    },
    onFileDrop(event) {
      const files = event.dataTransfer.files;
      this.fileError = null;
      this.previewImage = null;
      this.fileName = null;
      this.imagesPreview1(files);
    },
    remove() {
      this.previewImage = null;
      this.fileName = null;
      this.fileError = null;
      this.$refs.file.value = null;
      this.$emit("fileRemoved", this.uniqueKey);
    },
    formatFileSize(sizeInBytes) {
      if (sizeInBytes < 1024) {
        return `${sizeInBytes} Bytes`;
      } else if (sizeInBytes < 1024 * 1024) {
        return `${(sizeInBytes / 1024).toFixed(2)} KB`;
      } else {
        return `${(sizeInBytes / (1024 * 1024)).toFixed(2)} MB`;
      }
    },
    handleFileData() {
      this.$emit("showUrlData", this.urlFile);
    },
    resetFileState() {
      this.previewImage = null;
      this.fileName = null;
      this.fileError = null;
      this.showFileURL = false;
      this.urlFile = null;
      this.internalLoading = false;
    },
    setFilePreview(file) {
      this.urlFile = file;
      this.previewImage = file.type?.startsWith("image/")
        ? URL.createObjectURL(file)
        : null;
      this.fileName = `${file.name} - ${this.formatFileSize(file.size)}`;
      this.showFileURL = false;
    },
    async setUrlPreview(fileUrl) {
      try {
        this.internalLoading = true;
        const response = await fetch(fileUrl);

        if (!response.ok) {
          throw new Error(response.statusText || "Failed to load file");
        }

        this.urlFile = fileUrl;
        const urlParts = fileUrl.split("/");
        const filename = urlParts[urlParts.length - 1].split("?")[0];
        const blob = await response.blob();

        this.previewImage = blob.type?.startsWith("image/")
          ? URL.createObjectURL(blob)
          : null;
        this.fileName = `${filename} - ${this.formatFileSize(blob.size)}`;
        this.showFileURL = true;
        this.internalLoading = false;
      } catch (error) {
        console.error("Failed to fetch file:", error);
        this.resetFileState();
        this.fileError = "Failed to load file.";
        this.internalLoading = false;
      }
    },
  },
  watch: {
    file: {
      async handler(newFile) {
        if (!newFile) {
          this.resetFileState();
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
};
</script>

<style lang="scss" scoped>
.hide {
  opacity: 0;
}

.custom-file-upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 160px;
  min-height: 160px;
  box-sizing: border-box;
  position: relative;
  border: 2px dashed #bbbdc0;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  transition: border-color 0.3s ease-in-out;

  &.drag-over {
    border-color: var(--g-kit-lime-50);
  }
}

.custom-file-upload__box-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  position: relative;
  text-align: center;
  box-sizing: border-box;

  &:hover {
    opacity: 0.75;
    transition: opacity 0.3s ease;
  }
}

.custom-file-upload__box-input-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  max-width: 100%;
  gap: 10px;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  .upload-icon {
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    display: inline-block;
  }

  .upload-text {
    margin: 0;
    font-size: var(--g-kit-font-size-sigma, 14px);
    line-height: 1.4;
    color: var(--g-kit-black-70, #58585b);
    text-align: center;

    .text-green {
      color: var(--g-kit-lime-50);
      font-weight: 700;
    }
  }
}

.custom-file-upload__box-input-file {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
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

.show-preview {
  z-index: 999;
  cursor: pointer;
  font-weight: 800;
  font-size: 12px;
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

.loader-dots {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader-dots .dot {
  height: 1rem;
  width: 1rem;
  border-radius: 1.5rem;
  margin-right: -4px;
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
