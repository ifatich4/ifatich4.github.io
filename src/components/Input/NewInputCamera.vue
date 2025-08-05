<script setup>
/* eslint-disable */
import {
    computed,
    defineEmits,
    defineModel,
    defineProps,
    nextTick,
    onMounted,
    reactive,
    ref,
    watch
} from 'vue'
import Button from '../Button/Button.vue'
import { BModal, BOffcanvas } from 'bootstrap-vue-next'

const fileSourceChooserDialog = ref(false)
const cameraDialog = ref(false)
const video = ref()
const fileInput = ref()
const localFileType = ref()
const snappedCameraPict = ref()
const imgElement = ref()
const cameraIsReady = ref(false)
const deviceList = ref([])
const facingMode = ref()
const previewDialog = ref(false)
const isDragging = ref(false)
const dropZone = ref(null)

const props = defineProps({
    compressionMaxKb: {
        required: false,
        default: 1024
    },
    title: {
        type: String,
        default: 'Upload Foto'
    },
    fileType: {
        type: String,
        default: 'image/*'
    },
    error: {},
    uniqueKey: {},
    deviceCoordinate: {
        type: Object,
        default: () => null,
    },
    imagePlaceholder: {
        type: String,
        default: 'idcard'
    },
    useBottomSheet: {
        type: Boolean,
        default: false
    },
    userName: {
        type: String,
        required: true
    },
    disableOptions: {
        type: String,
        default: ''
    },
    useWatermark: {
        type: Boolean,
        default: false
    },
    noteText: {
        type: String,
        default: ''
    }
})

const locationData = ref(null)
const isGalleryDisabled = computed(() => props.disableOptions.includes('gallery'))
const isCameraDisabled = computed(() => props.disableOptions.includes('camera'))
const isFileDisabled = computed(() => props.fileType !== 'image/*')
const emit = defineEmits(['fileDropped', 'fileRemoved', 'errorPermission'])
const fileSrc = defineModel()
const isMobileView = computed(() => props.useBottomSheet)
const fileSrcType = ref('')
const fileSize = ref(0)
const isFromCamera = ref(false)
const internalError = ref('')
const redirectGmaps = () => {
    if (locationData.value) {
        window.open(
            `https://www.google.com/maps?q=${locationData.value.lat},${locationData.value.lng}`,
            '_blank'
        )
    }
}

const screenSize = reactive({
    height: window.screen.height,
    width: window.screen.width,
    potrait: window.matchMedia('(orientation:portrait)').matches
})

const onResizeScreen = () => {
    screenSize.height = window.screen.height
    screenSize.width = window.screen.width
    screenSize.potrait = window.matchMedia('(orientation:portrait)').matches
}

window.onresize = onResizeScreen
onResizeScreen()

const constraints = computed(() => {
    if (isMobileView) {
        return {
            video: {
                facingMode: facingMode.value,
                deviceId: {}
            },
            audio: false
        }
    } else {
        return {
            video: {
                width: 532,
                height: 416,
                facingMode: facingMode.value,
                deviceId: {}
            },
            audio: false
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

watch(
    () => screenSize.potrait,
    async () => {
        if (cameraIsReady.value) {
            await stopCamera()
            await startCamera()
        }
    }
)

const generateRandomFileName = (length = 64, originalExtension = 'png') => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const array = new Uint8Array(length)
    window.crypto.getRandomValues(array)
    return `${Array.from(array, (byte) => characters.charAt(byte % characters.length)).join('')}.${originalExtension}`
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

const handleSourceGalleryClick = async () => {
    localFileType.value = 'image/*'
    await nextTick()
    fileInput.value.click()
    fileSourceChooserDialog.value = false
}

const handleSourceFileClick = async () => {
    localFileType.value = props.fileType
    await nextTick()
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

const handleSwitchCamera = async () => {
    await stopCamera()
    facingMode.value = facingMode.value === 'environment' ? 'user' : 'environment'
    await startCamera()
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
        ctx.drawImage(
            video.value,
            0,
            0,
            video.value.videoWidth,
            video.value.videoHeight,
            0,
            0,
            rect.width,
            rect.height
        )
    }

    if (props.useWatermark) {
        const timestamp = new Date().toLocaleString()
        const watermarkHeight = 40

        ctx.fillStyle = 'rgba(255, 0, 0, 0.7)'
        ctx.fillRect(0, canvas.height - watermarkHeight, canvas.width, watermarkHeight)

        ctx.fillStyle = '#ffffff'
        ctx.font = '16px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        const text = `Diambil oleh ${props.userName} - ${timestamp}`
        ctx.fillText(text, canvas.width / 2, canvas.height - watermarkHeight / 2)
    }

    locationData.value =
        props.deviceCoordinate
            ?
            {
                lat: props.deviceCoordinate.latitude,
                lng: props.deviceCoordinate.longitude
            } : null

    fileSrcType.value = 'image/jpeg'
    snappedCameraPict.value = canvas.toDataURL('image/jpeg')
    stopCamera()
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
    internalError.value = null
    isFromCamera.value = true
    const compressedImg = await compressImg(props.compressionMaxKb, snappedCameraPict.value)
    emit('fileDropped', compressedImg, props.uniqueKey)
    cameraDialog.value = false
    snappedCameraPict.value = ''
    facingMode.value = 'environment'
}

const startCamera = async () => {
    try {
        cameraIsReady.value = false
        video.value.srcObject = await navigator.mediaDevices.getUserMedia(constraints.value)
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
            tracks.forEach((track) => track.stop())
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

const handleRetakePhotoClick = async () => {
    snappedCameraPict.value = ''
    await nextTick()
    await startCamera()
    if (fileSrc.value) {
        fileSrc.value = ''
        previewDialog.value = false
        cameraDialog.value = true
    }
}

const fileSourceChooserDialogClick = () => {
    if (!fileSrc.value) {
        fileSourceChooserDialog.value = true
    }
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
                    if (!blob) {
                        reject(new Error('Gagal mengompresi gambar. Mungkin format tidak didukung.'))
                        return
                    }

                    if (blob.size / 1024 <= maxSize || quality <= 0.1) {
                        const compressedImgFile = new File([blob], generateRandomFileName(), {
                            type: 'image/jpeg'
                        })
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
        image.onerror = () => reject(new Error('Gagal memuat gambar. Pastikan Data URL valid.'))
    })

const handleDrag = (e) => {
    e.preventDefault()

    if (!isDragging.value && !isGalleryDisabled.value) {
        isDragging.value = true
    }
}

const handleDragLeave = (e) => {
    e.preventDefault()
    if (!dropZone.value?.contains(e.relatedTarget) && !isGalleryDisabled.value) {
        isDragging.value = false
    }
}

const handleDrop = async (e) => {
    e.preventDefault()
    if (isGalleryDisabled.value) return
    isDragging.value = false

    const files = e.dataTransfer.files
    if (files.length > 0) {
        const file = files[0]
        await handleFileProcessing(file)
    }
}

const handleFileProcessing = async (file) => {
    locationData.value = null;
    internalError.value = null
    fileSrcType.value = file.type;
    fileSize.value = Math.round(file.size / 1024);
    isFromCamera.value = false;

    const allowedTypes = props.fileType.split(',');

    const isValidType = allowedTypes.some((type) => {
        type = type.trim();

        if (type.startsWith('.')) {
            return file.name?.toLowerCase().endsWith(type.toLowerCase());
        }

        if (type.includes('*')) {
            const regex = new RegExp(type.replace('*', '.*'));
            return regex.test(file.type);
        }

        return file.type === type;
    });

    if (!isValidType) {
        internalError.value = 'Invalid file type. Allowed: ' + props.fileType + ', Received: ' + file.type;
        return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
        if (props.fileType === 'image/*') {
            fileSrc.value = e.target.result;
            const compressedImg = await compressImg(props.compressionMaxKb, reader.result);
            emit('fileDropped', compressedImg, props.uniqueKey);
        } else {
            if (file.size > 20 * 1024 * 1024) {
                internalError.value = 'File size exceeds the maximum limit of 20 MB'
                return;
            }
            fileSrc.value = file;
            emit('fileDropped', file, props.uniqueKey);
        }
    };
    reader.readAsDataURL(file);
};

const handleFilePicked = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    await handleFileProcessing(file)
}

const openPreview = () => {
    if (fileSrc.value) {
        previewDialog.value = true
    }
}

const openFile = () => {
    if (!fileSrc.value) return

    if (typeof fileSrc.value === 'string') {
        window.open(fileSrc.value, '_blank')
    } else {
        const fileUrl = URL.createObjectURL(fileSrc.value)
        const newWindow = window.open(fileUrl, '_blank')
        setTimeout(() => URL.revokeObjectURL(fileUrl), 10000)
    }
}
</script>

<template>
    <section>
        <div
            ref="dropZone"
            @dragenter.prevent="handleDrag"
            @dragleave.prevent="handleDragLeave"
            @dragover.prevent="handleDrag"
            @drop.prevent="handleDrop"
            @click="fileSourceChooserDialogClick"
            :class="{ 'dragging-over': isDragging, 'cursor-pointer': !fileSrc }"
            class="custom-file-upload mt-0"
        >
            <div v-if="isDragging" class="drag-overlay">Lepaskan file di sini untuk mengupload</div>
            <div
                v-else-if="!fileSrc"
                class="custom-file-upload__box-input"
                :id="`${$attrs.id}_openDialogChooser`"
            >
                <div>
                    <div class="custom-file-upload__box-input-icon">
                        <img
                            v-if="props.imagePlaceholder === 'idcard'"
                            src="../../assets/images/ico-image-upload.svg"
                            alt="Upload Icon"
                            draggable="false"
                        />
                        <img
                            v-else-if="props.fileType === 'image/*'"
                            src="../../assets/images/image-add.svg"
                            alt="Upload Icon"
                        />
                        <div v-else class="d-flex gap-2">
                            <img src="../../assets/icon/upload.svg" alt="" />
                            <p class="mb-0 text-black mw-1">
                                Tarik file ke sini, <b class="text-green">ambil foto</b> atau
                                <b class="text-green">pilih dari perangkat</b>
                            </p>
                        </div>
                    </div>
                    <input
                        type="file"
                        ref="fileInput"
                        style="display: none"
                        :accept="localFileType"
                        @change="handleFilePicked"
                        :id="$attrs.id"
                        draggable="false"
                    />
                </div>
            </div>
            <div
                v-else
                :class="
          props.fileType === 'image/*'|| isFromCamera
            ? 'custom-file-upload__box-preview d-block'
            : 'custom-file-upload__box-no-preview d-block'
        "
                id="box-preview-image"
            >
                <img
                    v-if="props.fileType === 'image/*' || isFromCamera"
                    ref="imgElement"
                    :src="fileSrc"
                    alt="Captured Image"
                    class="imgCaptured"
                    @click.stop="openPreview"
                    :id="`${$attrs.id}_img`"
                    draggable="false"
                />
                <div v-else class="d-flex flex-column align-items-center gapc-0">
                    <img
                        src="../../assets/images/file-image.svg"
                        alt="File Icon"
                        class="file-icon"
                        :id="`${$attrs.id}_fileIcon`"
                        draggable="false"
                        v-if="fileSrcType.startsWith('image/')"
                    />
                    <img
                        src="../../assets/images/file-non-image.svg"
                        alt="File Icon"
                        class="file-icon"
                        :id="`${$attrs.id}_fileIcon`"
                        draggable="false"
                        v-else
                    />
                    <span @click="openFile" class="text-green text-underline">
            {{ fileSrc.name + ' - ' + fileSize + ' KB' }}
          </span>
                </div>
                <img
                    @click.stop="handleRemoveFileClick"
                    v-if="fileSrc"
                    alt="Remove Button"
                    :id="`${$attrs.id}_removeFile`"
                    class="close-img"
                    src="../../assets/icon/cross.svg"
                    draggable="false"
                />
            </div>
        </div>
        <div v-if="props.noteText && !(internalError || props.error)" class="note-text mt-2">
            {{ noteText
            }}<span @click="redirectGmaps" v-if="fileSrc && locationData" class="loc-text">
        Lihat Lokasi</span
        >
        </div>
        <div class="error-text mt-2" v-if="internalError || props.error">
            {{ internalError || props.error }}
        </div>

    </section>

    <section v-if="isMobileView">
        <BOffcanvas
            v-model="fileSourceChooserDialog"
            placement="bottom"
            bodyScrolling="true"
            body-class="p-1-t"
            noCloseOnBackdrop
        >
            <template #title>{{ props.title }}</template>
            <ul class="list-group list-group-flush">
                <li
                    @click="handleSourceGalleryClick"
                    class="list-group-item d-flex justify-content-between align-items-center cpb-1"
                    :id="`${$attrs.id}_file`"
                    v-if="!isGalleryDisabled"
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
                    @click="handleSourceCameraClick"
                    class="list-group-item d-flex justify-content-between align-items-center cpb-1"
                    :id="`${$attrs.id}_camera`"
                    v-if="!isCameraDisabled"
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
                <li
                    @click="handleSourceFileClick"
                    class="list-group-item d-flex justify-content-between align-items-center cpb-1"
                    :id="`${$attrs.id}_file`"
                    v-if="isFileDisabled"
                >
                    Pilih FIle
                    <span>
          <img
              src="../../assets/images/icon-file.svg"
              alt="Upload Icon"
              height="24px"
              width="24px"
          />
          </span>
                </li>
                <li v-show="false" />
            </ul>
        </BOffcanvas>

        <BModal
            @update:model-value="handleCameraDialogValueChange"
            v-model="cameraDialog"
            class="inputCameraMobile"
            centered
            hide-footer
            fullscreen
            header-class="modal-head"
            id="modal-camera"
        >
            <template #header="{ close }">
                <img
                    @click="close"
                    src="../../assets/icon/arrow_left.svg"
                    alt="Close Camera"
                    :id="`${$attrs.id}_closeCamera`"
                    v-if="cameraIsReady"
                    style="
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(200%)
              contrast(100%);
          "
                />
                <div class="mx-2">Ambil Foto</div>
            </template>
            <template v-if="!snappedCameraPict">
                <div class="camera-container" id="camera-container">
                    <video class="video" ref="video" autoplay></video>
                </div>
                <div class="slot-container">
                    <div
                        id="cameraGuidance"
                        :class="[
              props.imagePlaceholder === 'idcard' ? 'card-ktp' : 'card-general',
              !screenSize.potrait ? 'landscape' : ''
            ]"
                    ></div>
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
            body-class="p-3 m-0"
        >
            <div class="d-flex justify-content-center flex-column cameraInput">
                <ul class="list-group list-group-flush">
                    <li
                        @click="handleSourceGalleryClick"
                        class="list-group-item d-flex justify-content-between align-items-center cptb-1"
                        :id="`${$attrs.id}_file`"
                        v-if="!isGalleryDisabled"
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
                        @click="handleSourceCameraClick"
                        class="list-group-item d-flex justify-content-between align-items-center cptb-1"
                        :id="`${$attrs.id}_camera`"
                        v-if="!isCameraDisabled"
                    >
                        Kamera
                        <img
                            src="../../assets/images/camera-outline.svg"
                            alt="Kamera Icon"
                            height="24px"
                            width="24px"
                        />
                    </li>
                    <li
                        @click="handleSourceFileClick"
                        class="list-group-item d-flex justify-content-between align-items-center cptb-1"
                        :id="`${$attrs.id}_file`"
                        v-if="isFileDisabled"
                    >
                        Pilih FIle
                        <img
                            src="../../assets/images/icon-file.svg"
                            alt="Upload Icon"
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
                    <div id="cameraGuidance"></div>
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
    <div v-if="fileSrc">
        <BModal
            v-if="!isMobileView"
            v-model="previewDialog"
            title="Lihat Foto"
            size="lg"
            body-class="p-0 m-0 remove-overflow"
            dialog-class="preview-modal-content"
            header-class="preview-modal-title"
            hide-footer
            centered
        >
            <div>
                <div class="preview-container p-3">
                    <img :src="fileSrc" alt="Preview Gambar" class="img-preview" />
                </div>
                <div class="footer-button">
                    <Button
                        @click="handleRetakePhotoClick"
                        type="neutral"
                        label="Ambil Ulang Foto"
                        :id="`${$attrs.id}_cameraRetake`"
                        class="w-100"
                    />
                    <Button
                        v-if="fileSrc && locationData"
                        @click="redirectGmaps"
                        label="Lihat Lokasi"
                        type="neutral"
                        id="btn_CekDukcapilNasabah"
                        class="w-100"
                    />
                </div>
            </div>
        </BModal>
        <BOffcanvas
            v-else
            v-model="previewDialog"
            placement="bottom"
            noCloseOnBackdrop
            class="preview-offcanvas"
        >
            <template #title>Lihat Foto</template>
            <div class="preview-container">
                <img :src="fileSrc" alt="Preview Gambar" class="img-preview" />
            </div>
            <div class="footer-button">
                <Button
                    @click="handleRetakePhotoClick"
                    type="neutral"
                    label="Ambil Ulang Foto"
                    :id="`${$attrs.id}_cameraRetake`"
                    class="w-100"
                />
                <Button
                    v-if="fileSrc && locationData"
                    @click="redirectGmaps"
                    label="Lihat Lokasi"
                    type="neutral"
                    id="btn_CekDukcapilNasabah"
                    class="w-100"
                />
            </div>
        </BOffcanvas>
    </div>
</template>

<style lang="scss">
.inputCamera {
    .video {
        width: 100%;
        height: 100%;
        border-radius: 0.5rem;
    }

    .preview-container {
        padding: 16px;

        img {
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
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
        margin-bottom: 0 !important;
        margin-top: 0 !important;
        border-top: 1px solid #eeeeef;
        padding: 0;
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
        border-radius: 0.5rem;
        box-shadow:
            0 2px 6px 0 rgba(0, 0, 0, 0.14),
            0 0 2px 0 rgba(0, 0, 0, 0.08);

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
        box-shadow: 0 25px 0 74px rgb(1, 1, 1);
    }
}

.inputCameraMobile {
    .modal-head {
        background: url(https://storage.googleapis.com/exa-project/assets/background-login.svg)
        no-repeat center center;
        justify-content: flex-start;
        color: white;
    }
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
        margin: 0 !important;
        padding: 0;
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
        box-shadow: 0 30px 0 740px rgb(1, 1, 1);

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
        box-shadow: 0 30px 0 740px rgb(1, 1, 1);

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
        color: var(--text-white, #fff);

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
            color: white;
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
    cursor: zoom-in;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.02);
    }

    .close-img {
        position: absolute;
        top: 2px;
        right: 2px;
        cursor: pointer;
        width: 25px;
        height: 25px;
    }
}

.custom-file-upload__box-no-preview {
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
    border-radius: 0.5rem;
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
    background-repeat: no-repeat;
    background-position: center;
}

li:hover {
    cursor: pointer;
}

.dragging-over {
    position: relative;

    .drag-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(144, 238, 144, 0.5);
        color: var(--primary);
        font-weight: bold;
        z-index: 2;
    }
}

.preview-modal-content {
    max-width: 564px !important;
    border-radius: 12px;

    .img-preview {
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 8px;
    }

    .footer-button {
        border-top: 1px solid #cdcdcd;
        display: flex;
        gap: 0.5rem !important;
        padding: 1rem !important;
        border-radius: 12px;
    }

    .preview-button {
        display: flex;
        justify-content: space-between;
    }
}

.preview-offcanvas {
    .offcanvas-body {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .img-preview {
        width: 100%;
        height: auto;
        object-fit: contain;
        border-radius: 8px;
    }

    .footer-button {
        display: flex;
        flex-direction: column;
        gap: 0.5rem !important;
    }
}

.custom-file-upload__box-input {
    position: relative;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
        border-color: var(--primary);
    }
}
.note-text {
    color: #58585b;
    font-size: var(--g-kit-font-size-omega);
    line-height: var(--g-kit-line-height-omega);
    font-weight: var(--g-kit-font-weight-normal);
}

.loc-text {
    color: #00ab4e;
    font-weight: 800;
    cursor: pointer;
}

.remove-overflow {
    overflow: unset !important;
}

.cursor-pointer {
    cursor: pointer;
}
.cpt-1 {
    padding: 0 0 1rem !important;
}
.cpb-1 {
    padding: 1rem 0 1rem !important;
}
.cptb-1 {
    padding: 1rem 0 1rem !important;
}
.p-1-t {
    padding: 0 1rem 1rem !important;
}
.preview-modal-title {
    border-bottom: 1px solid #eeeeef !important;
}
.error-text {
    color: #ae1e22;
    font-size: var(--g-kit-font-size-omega);
    line-height: var(--g-kit-line-height-omega);
    font-weight: var(--g-kit-font-weight-normal);
}
.text-green {
    color: #00ab4e;
    font-size: 14px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 800;
    line-height: 20px;
    word-wrap: break-word;
}
.text-black {
    color: #252528;
    font-size: 14px;
    font-family: 'Nunito Sans', sans-serif;
    font-weight: 600;
    line-height: 20px;
    word-wrap: break-word;
}
.mw-1 {
    max-width: 174px;
}
.gapc-0 {
    gap: 2px !important;
}
.text-underline {
    text-decoration: underline;
    cursor: pointer;
}
</style>
