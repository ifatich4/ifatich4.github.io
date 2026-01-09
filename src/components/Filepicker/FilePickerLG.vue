<template>
  <div
    class="custom-file-upload"
    :class="{ fileName: fileName && !imageOnly, hns: !imageOnly }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop.prevent="onFileDrop"
  >
    <div
      class="custom-file-upload__box-input"
      :class="{ 'd-none': previewImage }"
    >
      <span v-if="imageOnly" class="custom-file-upload__box-input-icon">
        <img src="../../assets/images/ico-image-upload.svg" alt="" />
      </span>
      <span v-else class="custom-file-upload__box-input-icon">
        <img src="../../assets/icon/upload.svg" alt="" />
        <p class="mb-0 ms-2">
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
          csvOnly
            ? '.csv'
            : imageOnly
              ? 'image/*'
              : '.pdf,.doc,.docx,.xlsx,.csv,image/*'
        "
        multiple
        required
      />
    </div>

    <div
      v-if="imageOnly && previewImage"
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
      <img class="drop-zoon__image" :src="previewImage" alt="Preview" />
    </div>
    <div
      v-else-if="fileName && !imageOnly"
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
</template>

<script>
export default {
  name: "FilePickerLG",
  props: {
    file: {
      type: [File, Object],
    },
    imageOnly: {
      type: Boolean,
      default: true,
    },
    csvOnly: {
      type: Boolean,
      default: false,
    },
    errorText: {
      type: String,
      default: "File terlalu besar, maksimal 1 MB.",
    },
    uniqueKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      previewImage: null,
      fileName: null,
      fileError: null,
    };
  },
  emits: ["fileDropped", "fileRemoved", "errorPermission", "showUrlData"],
  methods: {
    imagesPreview1(files) {
      if (files && files[0]) {
        this.fileError = null;
        const selectedFile = files[0];

        if (selectedFile.size > 1024 * 1024) {
          this.fileError = this.errorText;
          this.previewImage = null;
          this.fileName = null;
          return;
        }

        this.fileName = selectedFile.name;
        const fileType = selectedFile.type;

        if (this.imageOnly && fileType.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImage = e.target.result;
            this.$emit("fileDropped", selectedFile, this.uniqueKey);
          };
          reader.readAsDataURL(selectedFile);
        } else {
          this.previewImage = null;
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
  },
  watch: {
    file: {
      async handler(newFile) {
        if (!newFile) {
          this.previewImage = null;
          this.fileName = null;
          this.fileError = null;
        } else {
          const response = await fetch(newFile);
          if (response.ok) {
            this.urlFile = newFile;
            const urlParts = newFile.split("/");
            const filename = urlParts[urlParts.length - 1].split("?")[0];
            const blob = await response.blob();

            this.previewImage = URL.createObjectURL(blob);
            this.fileName = `${filename} - ${this.formatFileSize(blob.size)}`;
            this.showFileURL = true;
          } else {
            console.error("Failed to fetch file:", response.statusText);
            this.fileError = `Failed to load file: ${response.statusText}`;
          }
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
</style>
