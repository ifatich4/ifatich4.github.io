<script setup>
/* eslint-disable */
import { ref, defineEmits, defineOptions, defineModel, defineProps, computed, watch, reactive, onMounted } from 'vue'
import Button from '../Button/Button.vue'
import { BModal, BOffcanvas } from 'bootstrap-vue-next'

defineOptions({ name: 'InputCamera', inheritAttrs: false })

const fileSourceChooserDialog = ref(false)
const cameraDialog = ref(false)
const video = ref()
const fileInput = ref()
const snappedCameraPict = ref()
const imgElement = ref()
const cameraIsReady = ref(false)
const deviceList = ref([])
const facingMode = ref()

const props = defineProps({
  compressionMaxKb: {
    required: false,
    default: 1024
  },
  title: {
    type: String,
    default: 'Upload Foto'
  },
  error: {},
  uniqueKey: {},
  imagePlaceholder: {
    type: String,
    default: 'idcard'
  },
  useBottomSheet: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['fileDropped', 'fileRemoved', 'errorPermission'])
const fileSrc = defineModel()
const isMobileView = computed(() => props.useBottomSheet)

const screenSize = reactive({
    height: window.screen.height,
    width: window.screen.width,
    potrait: window.matchMedia("(orientation:portrait)").matches
  }
)

const onResizeScreen = () => {
  screenSize.height = window.screen.height
  screenSize.width = window.screen.width
  screenSize.potrait = window.matchMedia("(orientation:portrait)").matches
}

window.onresize = onResizeScreen
onResizeScreen()

const constraints = computed(() => {
  if (isMobileView) {
    return {
      video: {
          facingMode: facingMode.value,
          deviceId: {},
      },
      audio: false,
    }
  } else {
    return {
      video: {
          width: 532,
          height: 416,
          facingMode: facingMode.value,
          deviceId: {},
      },
      audio: false,
    }
  }
})

const helperText = computed(() => {
  if (props.imagePlaceholder === 'idcard') {
    return {
      title: 'Foto KTP',
      message: 'Pastikan KTP berada di area foto yang ditentukan dan data terlihat jelas.'
    }
  }

  return {
      title: 'Instruksi',
      message: 'Pastikan foto berada dalam area yang telah ditentukan.'
    }
})

watch(() => screenSize.potrait, async () => {
  if (cameraIsReady.value) {
    await stopCamera()
    startCamera()
  }
})

const generateRandomFileName = (length = 64, originalExtension = 'png') => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return `${Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('')}.${originalExtension}`
}

const handleSourceCameraClick = () => {
  if (deviceList.length === 0) {
    emit('errorPermission', 'No device ready for take image')
    return
  }
  cameraDialog.value = true
  fileSourceChooserDialog.value = false
  startCamera()
}

const handleSourceGalleryClick = () => {
  fileInput.value.click()
  fileSourceChooserDialog.value = false
}

const handleRemoveFileClick = () => {
  fileSrc.value = ''
  snappedCameraPict.value = ''
  emit('fileRemoved', props.uniqueKey)
}

onMounted(async () => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  if (devices.length > 0) {
    deviceList.value = devices.filter((device) => device.kind === 'videoinput')
    facingMode.value = 'environment'
  }
})

const handleSwitchCamera = async() => {
  await stopCamera()
  facingMode.value = facingMode.value === 'environment' ? 'user' : 'environment'
  startCamera()
}

const handleCameraSnap = () => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (isMobileView) {
    canvas.width = video.value.videoWidth
    canvas.height = video.value.videoHeight
    ctx.drawImage(video.value, 0, 0, canvas.width, canvas.height)
  } else {
    const element = document.getElementById('cameraGuidance')
    const rect = element.getBoundingClientRect()
    ctx.drawImage(video.value, 0, 0, video.value.videoWidth, video.value.videoHeight, 0, 0, rect.width, rect.height)
  }
  stopCamera()
  snappedCameraPict.value = canvas.toDataURL('image/jpeg')
}

const blobToDataUrl = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (event) => resolve(event.target.result)
    reader.onerror = (error) => reject(error)

    reader.readAsDataURL(blob)
  })

const handleCameraChosen = async () => {
  fileSrc.value = snappedCameraPict.value
  const compressedImg = await compressImg(
    props.compressionMaxKb,
    snappedCameraPict.value
  )
  emit('fileDropped', compressedImg, props.uniqueKey)
  cameraDialog.value = false
  snappedCameraPict.value = ''
  facingMode.value = 'environment'
}

const startCamera = async () => {
  try {
    cameraIsReady.value = false
    const stream = await navigator.mediaDevices.getUserMedia(constraints.value)
    video.value.srcObject = stream
    cameraIsReady.value = true
  } catch (error) {
    emit('errorPermission', error)
    cameraIsReady.value = false
    cameraDialog.value = false
  }
}

const stopCamera = async () => {
  return new Promise((resolve) => {
    cameraIsReady.value = false
    const stream = video.value?.srcObject
    if (stream) {
      const tracks = stream.getTracks()
      tracks.forEach(async (track) => await track.stop())
      video.value.srcObject = null
    }
    resolve()
  })
}

const handleCameraDialogValueChange = (isShowing) => {
  if (!isShowing) {
    stopCamera()
    facingMode.value = 'environment'
    snappedCameraPict.value = ''
  }
}

const handleFilePicked = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = async () => {
    fileSrc.value = reader.result
    const compressedImg = await compressImg(
      props.compressionMaxKb,
      reader.result
    )
    emit('fileDropped', compressedImg, props.uniqueKey)
  }
}

const handleRetakePhotoClick = () => {
  snappedCameraPict.value = ''
  startCamera()
}

const fileSourceChooserDialogClick = () => {
  fileSourceChooserDialog.value = true
}

const compressImg = (maxSize, dataUrl, quality = 0.7) =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.src = dataUrl

    image.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = image.width
      canvas.height = image.height

      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0, image.width, image.height)

      canvas.toBlob(
        async function (blob) {
          if (blob.size / 1024 <= maxSize || quality <= 0.1) {
            const compressedImgFile = new File(
              [blob],
              generateRandomFileName(),
              {
                type: 'image/png'
              }
            )
            resolve(compressedImgFile)
          } else {
            const dataUrl = await blobToDataUrl(blob)
            compressImg(maxSize, dataUrl, quality - 0.1)
              .then(resolve)
              .catch(reject)
          }
        },
        'image/jpeg',
        quality
      )
    }
  })
</script>

<template>
  <section>
    <div class="custom-file-upload">
      <div
        v-if="!fileSrc"
        @click="fileSourceChooserDialogClick"
        class="custom-file-upload__box-input"
        :id="`${$attrs.id}_openDialogChooser`"
      >
        <span class="custom-file-upload__box-input-icon">
          <img
            v-if="props.imagePlaceholder === 'idcard'"
            src="../../assets/images/ico-image-upload.svg"
            alt="Upload Icon"
          />
          <img
            v-else
            src="../../assets/images/image-add.svg"
            alt="Upload Icon"
          />
        </span>
        <input
          type="file"
          ref="fileInput"
          style="display: none"
          accept="image/*"
          @change="handleFilePicked"
          :id="$attrs.id"
        />
      </div>
      <div
        v-else
        class="custom-file-upload__box-preview d-block bg-red"
        id="box-preview-image"
      >
        <img
          ref="imgElement"
          :src="fileSrc"
          alt="Captured Image"
          class="imgCaptured"
          :id="`${$attrs.id}_img`"
        />
        <img 
        @click="handleRemoveFileClick"
        v-if="fileSrc"
        :id="`${$attrs.id}_removeFile`"
        class="close-img" src="../../assets/icon/cross.svg" />
      </div>
    </div>
    <div class="error-text mt-2" v-if="props.error">
      {{ props.error }}
    </div>
  </section>

  <section v-if="isMobileView">
    <BOffcanvas
      v-model="fileSourceChooserDialog"
      placement="bottom"
      bodyScrolling="true"
      noCloseOnBackdrop
    >
      <template #title>{{ props.title }}</template>
      <ul class="list-group list-group-flush px-3">
        <li
          style="height: 56px;"
          @click="handleSourceGalleryClick"
          class="list-group-item d-flex justify-content-between align-items-center"
          :id="`${$attrs.id}_file`"
        >
          Galeri
          <span>
            <img
              src="../../assets/images/icon-galeri.svg"
              alt="Upload Icon"
              height="24px"
              width="24px"
            />
          </span>
        </li>
        <li
          style="height: 56px;"
          @click="handleSourceCameraClick"
          class="list-group-item d-flex justify-content-between align-items-center"
          :id="`${$attrs.id}_camera`"
        >
          Kamera
          <span>
            <img
              src="../../assets/images/camera-outline.svg"
              alt="Kamera Icon"
              height="24px"
              width="24px"
            />
          </span>
        </li>
      </ul>
    </BOffcanvas>

    <BModal
      @update:model-value="handleCameraDialogValueChange"
      v-model="cameraDialog"
      class="inputCameraMobile"
      centered
      hide-footer
      fullscreen
      id="modal-camera"
    >
      <template #header="{ close }">
        <img
          @click="close"
          src="../../assets/icon/arrow_left.svg"
          alt="Close Camera"
          :id="`${$attrs.id}_closeCamera`"
          v-if="cameraIsReady"
        />
        <div class="mx-2">Ambil Foto</div>
      </template>
      <template v-if="!snappedCameraPict">
        <div class="camera-container" id="camera-container">
          <video class="video" ref="video" autoplay></video>
        </div>
        <div class="slot-container">
          <div id="cameraGuidance" :class="[props.imagePlaceholder === 'idcard' ? 'card-ktp' : 'card-general', !screenSize.potrait ? 'landscape' : '']"></div>
          <div class="helper-text" :class="!screenSize.potrait ? 'landscape' : ''">
            <div class="title">{{ helperText.title }}</div>
            <div class="subtitle">{{ helperText.message }}</div>
          </div>
          <img
            @click="handleCameraSnap"
            src="../../assets/icon/shutter-button.svg"
            alt="Take Image"
            :id="`${$attrs.id}_cameraSnap`"
            class="shutter-btn"
            :class="!screenSize.potrait ? 'landscape' : ''"
            v-if="cameraIsReady"
          />
          <img
            @click="handleSwitchCamera"
            src="../../assets/icon/switch.svg"
            alt="Switch Camera"
            :id="`${$attrs.id}_cameraSwitch`"
            class="switch-camera-btn"
            :class="!screenSize.potrait ? 'landscape' : ''"
            v-if="cameraIsReady && deviceList.length > 1"
          />
        </div>
      </template>
      <div v-else>
        <div class="preview-container">
          <img :src="snappedCameraPict" alt="Captured Image" />
        </div>
        <div class="footer-button">
          <Button
            @click="handleRetakePhotoClick"
            type="neutral"
            label="Ambil Ulang Foto"
            :id="`${$attrs.id}_cameraRetake`"
          />
          <Button
            @click="handleCameraChosen"
            type="primary"
            label="Gunakan Foto"
            :id="`${$attrs.id}_cameraChoose`"
          />
        </div>
      </div>
    </BModal>
  </section>

  <section v-else>
    <BModal
      v-model="fileSourceChooserDialog"
      size="sm"
      hide-header
      ok-only
      no-stacking
      hide-footer
      centered
    >
      <div class="d-flex justify-content-center flex-column cameraInput">
        <ul class="list-group list-group-flush" style="margin-top: 16px;">
          <li
            style="height: 56px"
            @click="handleSourceGalleryClick"
            class="list-group-item d-flex justify-content-between align-items-center"
            :id="`${$attrs.id}_file`"
          >
            Galeri
            <img
              src="../../assets/images/icon-galeri.svg"
              alt="Upload Icon"
              height="24px"
              width="24px"
            />
          </li>
          <li
            style="height: 56px"
            @click="handleSourceCameraClick"
            class="list-group-item d-flex justify-content-between align-items-center"
            :id="`${$attrs.id}_camera`"
          >
            Kamera
            <img
              src="../../assets/images/camera-outline.svg"
              alt="Kamera Icon"
              height="24px"
              width="24px"
            />
          </li>
        </ul>
      </div>
    </BModal>
    <BModal
      @update:model-value="handleCameraDialogValueChange"
      v-model="cameraDialog"
      class="inputCamera"
      title="Ambil Foto"
      centered
      hide-footer
    >
      <template v-if="!snappedCameraPict">
        <div class="camera-container">
          <video class="video" ref="video" autoplay></video>
        </div>
        <div class="slot-container">
          <div id="cameraGuidance" :class="props.imagePlaceholder === 'idcard' ? 'card-ktp' : 'card-general'"></div>
          <img
            @click="handleCameraSnap"
            src="../../assets/icon/shutter-button.svg"
            alt="Take Image"
            :id="`${$attrs.id}_cameraSnap`"
            class="shutter-btn"
            v-if="cameraIsReady"
          />
        </div>
      </template>
      <div v-else>
        <div class="preview-container">
          <img :src="snappedCameraPict" alt="Captured Image" />
        </div>
        <div class="footer-button">
          <Button
            @click="handleRetakePhotoClick"
            type="neutral"
            label="Ambil Ulang Foto"
            :id="`${$attrs.id}_cameraRetake`"
          />
          <Button
            @click="handleCameraChosen"
            type="primary"
            label="Gunakan Foto"
            :id="`${$attrs.id}_cameraChoose`"
          />
        </div>
      </div>
    </BModal>
  </section>

</template>

<style lang="scss">
.inputCamera {
  .video {
    width: 100%;
    height: 100%;
    border-radius: .5rem;
  }

  .preview-container {
    padding: 16px;
    img{
      width: 100%;
      height: 100%;
      border-radius: .5rem;
    }
  }

  .shutter-btn {
    position: absolute !important;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 64px !important;
    height: 64px !important;
  }

  .shutter-btn--mobile {
    position: absolute !important;
    bottom: 5rem !important;
    left: 50% !important;
    transform: translateX(-50%);
    width: 64px !important;
    height: 64px !important;
    top: unset !important;
  }

  .modal-body {
    margin-bottom: 0px !important;
    margin-top: 0px !important;
    border-top: 1px solid #EEEEEF;
    padding: 0px;
  }

  .camera-container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 16px;
  }

  .slot-container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    padding: 16px;
  }

  .footer-button {
    display: flex;
    width: 100%;
    padding: 16px;
    justify-content: center;
    align-items: flex-end;
    gap: 8px;
    background: #fff;
    border-radius: .5rem;
    box-shadow:
      0px 2px 6px 0px rgba(0, 0, 0, 0.14),
      0px 0px 2px 0px rgba(0, 0, 0, 0.08);

    .btn {
      width: 100%;
    }
  }

  .card-ktp {
    width: 320px;
    height: 215px;
    background-color: transparent;
    border-radius: 2px;
    position: absolute;
    left: 18%;
    top: 15%;
    opacity: 0.7;
    box-shadow: 0px 25px 0px 74px rgb(1, 1, 1);
  }
}

.inputCameraMobile {
  .preview-container {
    position: absolute;
    img {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }
  }

  .video {
    height: 100%;
		width: 100%;
    object-fit: cover;
  }

  .modal-body {
    margin: 0px !important;
    padding: 0px;
    height: 100% !important;
    overflow: hidden !important;
    max-height: unset !important;
  }

  .camera-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .slot-container {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    padding: 16px;
  }

  .card-ktp {
    background-color: transparent;
    border-radius: 6px;
    position: absolute;
    left: 10%;
    right: 10%;
    top: 30%;
    bottom: 40%;
    opacity: 0.7;
    box-shadow: 0px 30px 0px 740px rgb(1, 1, 1);
    &.landscape {
      left: 30%;
      top: 10%;
      right: 25%;
      bottom: 20%;
    }
  }

  .card-general {
    width: 100%;
    height: 360px;
    background-color: transparent;
    border-radius: 6px;
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    opacity: 0.7;
    box-shadow: 0px 30px 0px 740px rgb(1, 1, 1);
    &.landscape {
      left: 30%;
      top: 0;
      width: 360px;
      height: 100%;
    }
  }

  .shutter-btn {
    position: absolute !important;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 64px !important;
    height: 64px !important;
    &.landscape {
      left: unset;
      bottom: unset;
      top: 30%;
      right: 40px;
    }
  }

  .switch-camera-btn {
    position: absolute !important;
    bottom: 55px;
    right: 9%;
    transform: translateX(-50%);
    width: 48px !important;
    height: 48px !important;
    &.landscape {
      left: unset;
      bottom: unset;
      top: 70%;
      right: 55px;
    }
  }

  .helper-text {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 48px;
    text-align: center;
    color: var(--text-white, #FFF);
    &.landscape {
      margin-top: unset;
      top: 30%;
      width: 190px;
      text-align: left;
    }
    .title {
      font-size: 20px;
      font-style: normal;
      font-weight: 800;
      line-height: 30px;
    }
    .subtitle {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
    }
  }
  .footer-button {
    position: absolute;
    display: flex;
    width: 100%;
    padding: 16px;
    flex-direction: column;
    gap: 8px;
    bottom: 16px;
    .btn {
      width: 100%;
    }
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
  }
}

.imgCaptured {
  width: 180px;
  height: 135px;
  object-fit: cover;
  border-radius: .5rem;
}

.remove-button {
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: #58585b !important;
  color: white !important;
  border: none;
  border-radius: 50% !important;
  cursor: pointer;
  font-weight: bold;
  opacity: 1 !important;
  z-index: 1;
  background: url("data:image/svg+xml,%3csvg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M18.3327 9.99935C18.3327 14.6017 14.6017 18.3327 9.99935 18.3327C5.39698 18.3327 1.66602 14.6017 1.66602 9.99935C1.66602 5.39698 5.39698 1.66602 9.99935 1.66602C14.6017 1.66602 18.3327 5.39698 18.3327 9.99935ZM6.86279 6.86279C7.10973 6.61586 7.50106 6.60133 7.76498 6.81921L7.81291 6.86279L10.2771 9.32701L12.7413 6.86279L12.7893 6.81921C13.0532 6.60133 13.4445 6.61586 13.6915 6.86279C13.9538 7.12516 13.9538 7.55054 13.6915 7.81291L11.2272 10.2771L13.6915 12.7413C13.9538 13.0037 13.9538 13.4291 13.6915 13.6915C13.4445 13.9384 13.0532 13.9529 12.7893 13.735L12.7413 13.6915L10.2771 11.2272L7.8129 13.6915L7.76498 13.735C7.50105 13.9529 7.10972 13.9384 6.86278 13.6915C6.60042 13.4291 6.60042 13.0037 6.86278 12.7413L9.32701 10.2771L6.86279 7.81291C6.60042 7.55054 6.60042 7.12516 6.86279 6.86279Z' fill='%2358585B'/%3e%3c/svg%3e");
  background-color: transparent !important;
  background-repeat: no-repeat;
  background-position:  center;
}
li:hover {
  cursor: pointer;
}
</style>
