<script setup>
    /* eslint-disable */
    import { ref, defineEmits, defineOptions, defineModel, defineProps, computed, watch, reactive, onMounted, nextTick } from 'vue'
    import Button from '../Button/Button.vue'
    import { BModal, BOffcanvas } from 'bootstrap-vue-next'
    import blankImage from '../../assets/images/blank_img.svg'
    import brokenImage from '../../assets/images/broken_img.svg'

    defineOptions({
        name: 'InputKtp',
        inheritAttrs: false
    })

    const fileSourceChooserDialog = ref(false)
    const cameraDialog = ref(false)
    const video = ref()
    const fileInput = ref()
    const snappedCameraPict = ref()
    const imgElement = ref()
    const cameraIsReady = ref(false)
    const deviceList = ref([])
    const facingMode = ref()
    const previewDialog = ref(false)

    const props = defineProps({
        compressionMaxKb: {
            required: false,
            default: 1024
        },
        title: {
            type: String,
            default: 'Upload Foto KTP'
        },
        error: {},
        uniqueKey: {},
        userName: {
            type: String,
            default: 'unknown'
        },
        /**
         * Mode component: 'ktp' (normal upload/camera), 'global' (free upload without crop), 'preview' (read-only)
         */
        mode: {
            type: String,
            default: 'ktp',
            validator: (value) => ['ktp', 'global', 'preview'].includes(value)
        },
        /**
         * Path to blank image (shown when no image in preview mode)
         */
        blankImage: {
            type: String,
            required: false,
            default: blankImage
        },
        /**
         * Path to broken image (shown when image fails to load in preview mode)
         */
        brokenImage: {
            type: String,
            required: false,
            default: brokenImage
        },
    })

    const emit = defineEmits(['fileDropped', 'fileRemoved', 'errorPermission'])
    const fileSrc = defineModel()
    const imageSource = ref('camera') // 'camera' or 'gallery'
    const imageState = ref('loaded') // 'loaded' or 'broken'
    const isRealImageLoaded = ref(false)
    
    // Computed: Display image source dengan fallback ke placeholder
    const displayImageSrc = computed(() => {
        if (props.mode === 'preview') {
            // Mode preview:
            // 1. Jika broken → tampilkan broken placeholder
            // 2. Jika ada fileSrc → tampilkan image
            // 3. Jika kosong → tampilkan blank placeholder
            if (imageState.value === 'broken') return props.brokenImage || ''
            if (fileSrc.value) return fileSrc.value
            return props.blankImage || ''
        }
        // Mode KTP/Global: hanya tampilkan fileSrc
        return fileSrc.value || ''
    })

    // Computed: Check if currently showing placeholder (not real image)
    const isImagePlaceholder = computed(() => {
        if (props.mode !== 'preview') return false
        if (imageState.value === 'broken') return true
        if (!fileSrc.value) return true
        return false
    })

    // ---------------------------------------------------------------------------
    // Responsive: auto-detect mobile via matchMedia, NOT props
    // ---------------------------------------------------------------------------
    const isMobile = ref(window.matchMedia('(max-width: 768px)').matches)

    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addEventListener('change', (e) => {
        isMobile.value = e.matches
    })

    // ---------------------------------------------------------------------------
    // Screen orientation (used for camera guidance overlay)
    // ---------------------------------------------------------------------------
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

    // ---------------------------------------------------------------------------
    // Camera constraints — KTP always uses environment (rear) camera
    // ---------------------------------------------------------------------------
    const constraints = computed(() => ({
        video: {
            width: {
                ideal: 1920
            },
            height: {
                ideal: 1080
            },
            facingMode: facingMode.value,
            deviceId: {},
        },
        audio: false,
    }))

    const helperText = computed(() => {
        if (props.mode === 'global') {
            return {
                title: 'Ambil Foto',
                message: 'Ambil foto dengan posisi yang jelas dan terang.'
            }
        }
        return {
            title: 'Foto KTP',
            message: 'Pastikan KTP berada di area foto yang ditentukan dan data terlihat jelas.'
        }
    })

    watch(() => screenSize.potrait, async () => {
        if (cameraIsReady.value) {
            await stopCamera()
            startCamera()
        }
    })

    watch(() => fileSrc.value, () => {
        // Reset load marker every time bound source changes.
        isRealImageLoaded.value = false
        previewDialog.value = false

        if (props.mode === 'preview') {
            imageState.value = 'loaded'
        }
    })

    const normalizeImageSrc = (src = '') => {
        if (!src) return ''

        try {
            return new URL(src, window.location.origin).pathname
        } catch {
            return src.split('?')[0]
        }
    }

    const isPlaceholderImageSrc = (src = '') => {
        const normalizedSrc = normalizeImageSrc(src)
        const normalizedBroken = normalizeImageSrc(props.brokenImage)
        const normalizedBlank = normalizeImageSrc(props.blankImage)

        return Boolean(normalizedSrc) && (normalizedSrc === normalizedBroken || normalizedSrc === normalizedBlank)
    }

    const getEventImageSrc = (event) => event?.target?.currentSrc || event?.target?.src || ''

    // Image error handler — jika gambar real gagal load di preview mode, fallback ke broken placeholder
    const handleImageError = (event) => {
        const failedSrc = getEventImageSrc(event)

        // Placeholder gagal load tidak perlu ubah state agar tidak looping.
        if (isPlaceholderImageSrc(failedSrc)) return

        isRealImageLoaded.value = false

        if (props.mode === 'preview') {
            imageState.value = 'broken'
            previewDialog.value = false
        }
    }

    // Image load success handler — hanya tandai loaded untuk gambar real
    const handleImageLoad = (event) => {
        const loadedSrc = getEventImageSrc(event)

        // Jangan reset state saat yang load adalah placeholder.
        if (isPlaceholderImageSrc(loadedSrc)) return

        imageState.value = 'loaded'
        isRealImageLoaded.value = true
    }

    // ---------------------------------------------------------------------------
    // Utility helpers
    // ---------------------------------------------------------------------------
    const generateRandomFileName = (length = 64, originalExtension = 'png') => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        return `${Array.from({ length }, () =>
    characters.charAt(Math.floor(Math.random() * characters.length))
  ).join('')}.${originalExtension}`
    }

    const blobToDataUrl = (blob) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) => resolve(event.target.result)
            reader.onerror = (error) => reject(error)
            reader.readAsDataURL(blob)
        })

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
                                resolve(new File([blob], generateRandomFileName(), {
                                    type: 'image/png'
                                }))
                            } else {
                                const dataUrl = await blobToDataUrl(blob)
                                compressImg(maxSize, dataUrl, quality - 0.1).then(resolve).catch(reject)
                            }
                        },
                        'image/jpeg',
                        quality
                )
            }
        })

    // ---------------------------------------------------------------------------
    // Camera lifecycle
    // ---------------------------------------------------------------------------
    onMounted(async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        if (devices.length > 0) {
            deviceList.value = devices.filter((device) => device.kind === 'videoinput')
            facingMode.value = 'environment'
        }
    })

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
            const stream = video.value ?.srcObject
            if (stream) {
                stream.getTracks().forEach((track) => track.stop())
                video.value.srcObject = null
            }
            resolve()
        })
    }

    const handleSwitchCamera = async () => {
        await stopCamera()
        facingMode.value = facingMode.value === 'environment' ? 'user' : 'environment'
        startCamera()
    }

    // ---------------------------------------------------------------------------
    // Snap — KTP crop (idcard mode) OR full frame (global mode)
    // ---------------------------------------------------------------------------
    const handleCameraSnap = () => {
        const videoEl = video.value
        if (!videoEl) return

        const videoW = videoEl.videoWidth
        const videoH = videoEl.videoHeight
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const outputScale = window.devicePixelRatio || 10

        // Global mode: capture full frame without crop
        if (props.mode === 'global') {
            canvas.width = videoW * outputScale
            canvas.height = videoH * outputScale
            ctx.imageSmoothingEnabled = false
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(videoEl, 0, 0, videoW, videoH, 0, 0, canvas.width, canvas.height)
        } else {
            // KTP mode: crop to KTP area (25% width × 35% height)
            let guideW = videoW * 0.25
            let guideH = videoH * 0.35
            const scale = isMobile.value ? 1 : 2
            guideW *= scale
            guideH *= scale

            const startX = (videoW - guideW) / 2
            const startY = (videoH - guideH) / 2

            canvas.width = guideW * outputScale
            canvas.height = guideH * outputScale

            ctx.imageSmoothingEnabled = false
            ctx.imageSmoothingQuality = 'high'
            ctx.drawImage(videoEl, startX, startY, guideW, guideH, 0, 0, canvas.width, canvas.height)
        }

        snappedCameraPict.value = canvas.toDataURL('image/png')
        stopCamera()
    }

    // ---------------------------------------------------------------------------
    // Source chooser actions
    // ---------------------------------------------------------------------------
    const fileSourceChooserDialogClick = () => {
        // Prevent upload in preview mode
        if (props.mode === 'preview') return
        if (!fileSrc.value) fileSourceChooserDialog.value = true
    }

    const handleSourceCameraClick = () => {
        // Prevent camera in preview mode
        if (props.mode === 'preview') return
        if (deviceList.value.length === 0) {
            emit('errorPermission', 'No device ready for take image')
            return
        }
        cameraDialog.value = true
        fileSourceChooserDialog.value = false
        startCamera()
    }

    const handleSourceGalleryClick = () => {
        // Prevent gallery in preview mode
        if (props.mode === 'preview') return
        fileInput.value.click()
        fileSourceChooserDialog.value = false
    }

    // ---------------------------------------------------------------------------
    // File actions
    // ---------------------------------------------------------------------------
    const handleFilePicked = async (event) => {
        const file = event.target.files[0]
        if (!file) return
        
        // Reset state untuk image baru
        imageState.value = 'loaded'
        isRealImageLoaded.value = false
        
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = async () => {
            fileSrc.value = reader.result
            imageSource.value = 'gallery'
            const compressedImg = await compressImg(props.compressionMaxKb, reader.result)
            emit('fileDropped', compressedImg, props.uniqueKey)
        }
    }

    const handleRemoveFileClick = () => {
        // Prevent remove in preview mode
        if (props.mode === 'preview') return
        
        // Reset state
        imageState.value = 'loaded'
        isRealImageLoaded.value = false
        
        fileSrc.value = ''
        snappedCameraPict.value = ''
        imageSource.value = 'camera'
        emit('fileRemoved', props.uniqueKey)
    }

    // ---------------------------------------------------------------------------
    // Camera chosen / retake
    // ---------------------------------------------------------------------------
    const handleCameraChosen = async () => {
        // Reset state untuk image baru
        imageState.value = 'loaded'
        isRealImageLoaded.value = false
        
        fileSrc.value = snappedCameraPict.value
        imageSource.value = 'camera'
        const compressedImg = await compressImg(props.compressionMaxKb, snappedCameraPict.value)
        emit('fileDropped', compressedImg, props.uniqueKey)
        cameraDialog.value = false
        snappedCameraPict.value = ''
        facingMode.value = 'environment'
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

        if (fileSrc.value) {
            // Dipanggil dari preview modal (foto sudah ada):
            // Reset foto lalu buka source chooser agar user bisa pilih Galeri atau Kamera
            fileSrc.value       = ''
            previewDialog.value = false
            await nextTick()
            fileSourceChooserDialog.value = true
        } else {
            // Dipanggil dari dalam modal kamera setelah snap (belum konfirmasi):
            // Langsung restart kamera untuk ambil ulang
            await nextTick()
            startCamera()
        }
    }

    // ---------------------------------------------------------------------------
    // Preview modal
    // ---------------------------------------------------------------------------
    const openPreview = () => {
        if (!fileSrc.value) return
        if (isImagePlaceholder.value) return
        if (imageState.value === 'broken') return
        if (!isRealImageLoaded.value) return

        previewDialog.value = true
    }

    // Timestamp helper used in camera view
    const nowFormatted = () => {
        return (
            'Waktu: ' +
            new Date().toLocaleDateString('id-ID', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            }) +
            ', ' +
            new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit'
            })
        )
    }
</script>

<template>
    <!-- ===================================================================
    File picker area
    ==================================================================== -->
    <section>
        <div class="custom-file-upload" @click="fileSourceChooserDialogClick">
            <!-- Empty state: tampilkan hanya jika displayImageSrc kosong (tidak ada real photo, blank, atau broken) -->
            <div v-if="!displayImageSrc" class="custom-file-upload__box-input" :id="`${$attrs.id}_openDialogChooser`" :class="{ 'disabled': props.mode === 'preview' }" :style="{ pointerEvents: props.mode === 'preview' ? 'none' : 'auto', opacity: props.mode === 'preview' ? 0.6 : 1 }">
                <span class="custom-file-upload__box-input-icon">
                    <img src="../../assets/images/ico-image-upload.svg" alt="Upload Icon" />
                </span>
                <input type="file" ref="fileInput" style="display: none" accept="image/*" @change="handleFilePicked"
                    :id="$attrs.id" :disabled="props.mode === 'preview'" />
            </div>

            <!-- Preview thumbnail — tampilkan jika ada displayImageSrc (fileSrc real photo OR blank/broken image) -->
            <div v-else class="custom-file-upload__box-preview d-block" id="box-preview-image">
                <img ref="imgElement" :src="displayImageSrc" alt="Preview" class="imgCaptured idcard" :class="{ 'img-contain': imageSource === 'gallery' }" @click.stop="openPreview" @error="handleImageError" @load="handleImageLoad"
                    :id="`${$attrs.id}_img`" :style="{ cursor: isRealImageLoaded ? 'pointer' : 'default' }" />
                <img v-if="fileSrc && props.mode !== 'preview'" @click.stop="handleRemoveFileClick" :id="`${$attrs.id}_removeFile`"
                    class="close-img" src="../../assets/icon/cross.svg" alt="Hapus Foto" height="24" width="24" />
            </div>
        </div>

        <div class="error-text mt-2" v-if="props.error">
            {{ props.error }}
        </div>
    </section>

    <!-- ===================================================================
    Source chooser — BOffcanvas (mobile) / BModal (desktop)
    ==================================================================== -->
    <section v-if="isMobile">
        <BOffcanvas v-model="fileSourceChooserDialog" placement="bottom" bodyScrolling="true" noCloseOnBackdrop class="bottomsheetSourceChooser">
            <template #title>{{ props.title }}</template>
            <ul class="list-group list-group-flush p-3">
                <li style="height: 56px" @click="handleSourceGalleryClick"
                    class="list-group-item d-flex justify-content-between align-items-center" :id="`${$attrs.id}_file`">
                    Galeri
                    <span>
                        <img src="../../assets/images/icon-galeri.svg" alt="Upload Icon" height="24" width="24" />
                    </span>
                </li>
                <li style="height: 56px" @click="handleSourceCameraClick"
                    class="list-group-item d-flex justify-content-between align-items-center"
                    :id="`${$attrs.id}_camera`">
                    Kamera
                    <span>
                        <img src="../../assets/images/camera-outline.svg" alt="Kamera Icon" height="24" width="24" />
                    </span>
                </li>
            </ul>
        </BOffcanvas>
    </section>

    <section v-else>
        <BModal v-model="fileSourceChooserDialog" size="sm" hide-header ok-only no-stacking hide-footer centered>
            <div class="d-flex justify-content-center flex-column cameraInput">
                <ul class="list-group list-group-flush">
                    <li style="height: 56px" @click="handleSourceGalleryClick"
                        class="list-group-item d-flex justify-content-between align-items-center"
                        :id="`${$attrs.id}_file`">
                        Galeri
                        <img src="../../assets/images/icon-galeri.svg" alt="Upload Icon" height="24" width="24" />
                    </li>
                    <li style="height: 56px" @click="handleSourceCameraClick"
                        class="list-group-item d-flex justify-content-between align-items-center"
                        :id="`${$attrs.id}_camera`">
                        Kamera
                        <img src="../../assets/images/camera-outline.svg" alt="Kamera Icon" height="24" width="24" />
                    </li>
                </ul>
            </div>
        </BModal>
    </section>

    <!-- ===================================================================
    Camera modal — fullscreen (mobile) / centered (desktop)
    ==================================================================== -->
    <!-- MOBILE: fullscreen camera -->
    <BModal v-if="isMobile" @update:model-value="handleCameraDialogValueChange" v-model="cameraDialog"
        class="inputKtpCameraMobile" centered fullscreen hide-header hide-footer id="modal-camera-ktp">
        <!-- Custom header — hijau tua sesuai Figma -->
        <div class="ktp-modal-header">
            <svg :id="`${$attrs.id}_closeCamera`"
                @click="() => { handleCameraDialogValueChange(false); cameraDialog = false }" width="24" height="24"
                viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ktp-back-arrow">
                <path
                    d="M20 12C20 11.4477 19.5523 11 19 11H7.83L12.71 6.12C13.1017 5.72829 13.1006 5.09284 12.7075 4.70251C12.3164 4.31412 11.6848 4.31524 11.295 4.705L4.07921 11.9208C4.03546 11.9645 4.03546 12.0355 4.07921 12.0792L11.2947 19.2947C11.6842 19.6842 12.3158 19.6842 12.7053 19.2947C13.0946 18.9054 13.0949 18.2743 12.7059 17.8847L7.83 13H19C19.5523 13 20 12.5523 20 12Z"
                    fill="white" />
            </svg>
            <span class="ktp-modal-title">Ambil Foto</span>
        </div>

        <!-- Live camera view -->
        <template v-if="!snappedCameraPict">
            <div class="camera-body">
                <video class="video" ref="video" autoplay playsinline></video>

                <!-- Overlay: helper text di atas, card-ktp di tengah, buttons di bawah -->
                <div class="overlay-container" :class="!screenSize.potrait ? 'landscape' : ''">

                    <!-- Helper text (portrait: di atas card | landscape: di kiri) - hide in global mode -->
                    <div v-if="props.mode !== 'global'" class="helper-text landscape" :class="!screenSize.potrait ? 'landscape' : ''">
                        <div class="rect"></div>
                        <div class="title">{{ helperText.title }}</div>
                        <div class="subtitle">{{ helperText.message }}</div>
                    </div>

                    <!-- Card KTP guide - hide in global mode -->
                    <div v-if="props.mode !== 'global'" id="cameraGuidance" class="card-ktp" :class="!screenSize.potrait ? 'landscape' : ''"></div>

                    <!-- Bottom actions: shutter + switch -->
                    <div class="bottom-actions" :class="!screenSize.potrait ? 'landscape' : ''" v-if="cameraIsReady">
                        <img @click="handleCameraSnap" src="../../assets/icon/shutter-button.svg" alt="Take Image"
                            :id="`${$attrs.id}_cameraSnap`" class="shutter-btn" />
                        <img v-if="deviceList.length > 1" @click="handleSwitchCamera" src="../../assets/icon/switch.svg"
                            alt="Switch Camera" :id="`${$attrs.id}_cameraSwitch`" class="switch-camera-btn" />
                    </div>
                </div>
            </div>
        </template>

        <!-- Snapped preview inside camera modal (before confirming) -->
        <template v-else>
            <div class="snap-preview-body">
                <div class="snap-preview-container">
                    <div class="timestamp">
                        <div>{{ props.userName }}</div>
                        <div>{{ nowFormatted() }}</div>
                    </div>
                    <img :src="snappedCameraPict" alt="Captured Image" />
                </div>

            </div>
            <div class="snap-footer">
                <Button @click="handleRetakePhotoClick" type="neutral" label="Ambil Ulang Foto"
                    :id="`${$attrs.id}_cameraRetake`" class="w-100" />
                <Button @click="handleCameraChosen" type="primary" label="Gunakan Foto"
                    :id="`${$attrs.id}_cameraChoose`" class="w-100" />
            </div>
        </template>
    </BModal>

    <!-- DESKTOP: centered camera modal -->
    <BModal v-else @update:model-value="handleCameraDialogValueChange" v-model="cameraDialog" class="inputKtpCamera"
        title="Ambil Foto KTP" centered hide-footer>
        <template v-if="!snappedCameraPict">
            <div class="camera-container idcard">
                <video class="video" ref="video" autoplay></video>
            </div>
            <div class="slot-container">
                <div v-if="props.mode !== 'global'" class="helper-text landscape">
                    <div class="rect"></div>
                    <div class="title">{{ helperText.title }}</div>
                    <div class="subtitle">{{ helperText.message }}</div>
                </div>
                <div v-if="props.mode !== 'global'" id="cameraGuidance" class="card-ktp"></div>
                <img v-if="cameraIsReady" @click="handleCameraSnap" src="../../assets/icon/shutter-button.svg"
                    alt="Take Image" :id="`${$attrs.id}_cameraSnap`" class="shutter-btn" />
            </div>
        </template>

        <div v-else>
            <div class="preview-container idcard">
                <div class="timestamp">
                    <div>{{ props.userName }}</div>
                    <div>{{ nowFormatted() }}</div>
                </div>
                <img :src="snappedCameraPict" alt="Captured Image" />
            </div>
            <div class="footer-button">
                <Button @click="handleRetakePhotoClick" type="neutral" label="Ambil Ulang Foto"
                    :id="`${$attrs.id}_cameraRetake`" />
                <Button @click="handleCameraChosen" type="primary" label="Gunakan Foto"
                    :id="`${$attrs.id}_cameraChoose`" />
            </div>
        </div>
    </BModal>

    <!-- ===================================================================
       Preview modal — shown when clicking thumbnail in file picker
       BModal (desktop) / BOffcanvas bottom (mobile)
    ==================================================================== -->
    <div v-if="fileSrc && previewDialog">
        <!-- DESKTOP: preview in modal -->
        <BModal v-if="!isMobile" v-model="previewDialog" :title="props.mode === 'preview' ? 'Lihat' : 'Lihat Foto'" size="lg"
            body-class="p-0 m-0 remove-overflow" dialog-class="preview-modal-content" header-class="preview-modal-title"
            hide-footer centered>
            <div>
                <div class="preview-container p-3">
                    <div class="img-wrapper">
                        <img :src="displayImageSrc" alt="Preview" class="img-preview" :class="{ 'img-contain': imageSource === 'gallery' }" />
                        <div v-if="props.mode !== 'preview' || fileSrc" class="timestamp">
                            <div>{{ props.userName }}</div>
                            <div>{{ nowFormatted() }}</div>
                        </div>
                    </div>
                </div>
                <div class="footer-button" v-if="props.mode !== 'preview'">
                    <Button @click="handleRetakePhotoClick" type="neutral" label="Ganti Foto"
                        :id="`${$attrs.id}_previewRetake`" class="w-100" />
                </div>
            </div>
        </BModal>

        <!-- MOBILE: preview in bottom offcanvas -->
        <BOffcanvas v-else v-model="previewDialog" placement="bottom" noCloseOnBackdrop
            class="preview-offcanvas preview-mobile">
            <template #title>{{ props.mode === 'preview' ? 'Lihat' : 'Lihat Foto' }}</template>
            <div class="preview-container">
                <div class="img-wrapper">
                    <img :src="displayImageSrc" alt="Preview" class="img-preview" :class="{ 'img-contain': imageSource === 'gallery' }" />
                    <div v-if="props.mode !== 'preview' || fileSrc" class="timestamp">
                        <div>{{ props.userName }}</div>
                        <div>{{ nowFormatted() }}</div>
                    </div>
                </div>
            </div>
            <div class="footer-button" v-if="props.mode !== 'preview'">
                <Button @click="handleRetakePhotoClick" type="neutral" label="Ganti Foto"
                    :id="`${$attrs.id}_previewRetake`" class="w-100" />
            </div>
        </BOffcanvas>
    </div>
</template>

<style lang="scss">
    /* ============================================================
    Camera modal — desktop
    ============================================================ */
    .modal.inputKtpCamera .modal-dialog {
        max-width: 564px;
    }

    .modal.inputKtpCamera .modal-body {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }

    .modal.inputKtpCamera .modal-header {
        color: var(--g-kit-black-80);
        padding: 14px 16px;

        .modal-title {
            color: var(--g-kit-black-80);
            font-size: var(--g-kit-font-size-omicron);
            font-weight: var(--g-kit-font-weight-bold);
        }
    }

    .inputKtpCamera {
        .video {
            width: 100%;
            height: 100%;
            border-radius: 0.5rem;
            background-color: #000;
            object-fit: cover;
        }

        .camera-container {
            position: relative;
            width: 100%;
            height: 100%;
            padding: 16px;
            display: flex;
            justify-content: center;
            align-items: center;

            &.idcard video {
                height: 416px;
            }

            video {
                height: 100%;
                width: 100% !important;
                border-radius: 0.5rem;
                aspect-ratio: 16 / 10;
            }
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
            position: absolute;
            top: 50% !important;
            left: 50% !important;
            transform: translate(-50%, -50%);
            width: 100%;
            max-width: 318px;
            aspect-ratio: 16 / 10;
            background-color: transparent;
            border-radius: 2px;
            opacity: 0.7;
            box-shadow: 0 0 0 106px rgba(1, 1, 1, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 205px;
        }

        .helper-text {
            position: relative;
            display: flex;
            flex-direction: column;
            margin-top: 16px;
            margin-inline: 40px;
            padding-inline: 16px;
            padding-block: 12px;
            text-align: center;
            color: var(--g-kit-white);

            .rect {
                background-color: var(--g-kit-black-80);
                opacity: 0.75;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 0;
                border-radius: 8px;
            }

            .title {
                font-size: var(--g-kit-font-size-omicron);
                font-weight: var(--g-kit-font-weight-bold);
                z-index: 1;
            }

            .subtitle {
                z-index: 1;
                font-size: var(--g-kit-font-size-omega);
                font-weight: 600;
                line-height: 20px;
            }
        }

        .preview-container {
            position: relative;
            padding: 16px;

            &.idcard img {
                aspect-ratio: 16 / 10 !important;
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 0.75rem;
                object-fit: cover;
                aspect-ratio: 16 / 10;
            }

            .timestamp {
                font-size: var(--g-kit-font-size-omnicron);
                padding: 16px 8px;
                bottom: 16px;
                left: 16px;
                right: 16px;
                position: absolute;
                justify-content: space-between;
                display: flex;
                background: color-mix(in srgb, var(--g-kit-black-80) 80%, transparent);
                border-bottom-right-radius: 0.75rem;
                border-bottom-left-radius: 0.75rem;
                color: var(--g-kit-white);
                text-align: center;
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
                0px 2px 6px 0px rgba(0, 0, 0, 0.14),
                0px 0px 2px 0px rgba(0, 0, 0, 0.08);

            .btn {
                width: 100%;
            }
        }

        .modal-body {
            margin-bottom: 0 !important;
            margin-top: 0 !important;
            border-top: 1px solid #eeeeef;
            padding: 0;
        }
    }

    /* ============================================================
    Camera modal — mobile fullscreen
    ============================================================ */
    .modal.inputKtpCameraMobile {

        // Remove all default modal chrome
        .modal-dialog {
            margin: 0 !important;
            max-width: 100vw !important;
            width: 100vw !important;
            height: 100dvh !important;
        }

        .modal-content {
            border-radius: 0 !important;
            border: none !important;
            background-color: #000 !important;
            height: 100dvh !important;
            overflow: hidden;
        }

        .modal-body {
            padding: 0 !important;
            margin: 0 !important;
            height: 100% !important;
            overflow: hidden !important;
            max-height: unset !important;
            display: flex !important;
            flex-direction: column !important;
        }

        .modal-header,
        .modal-footer {
            display: none !important;
        }
    }

    // Custom header — green bar matching Figma
    .ktp-modal-header {
        position: relative;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        flex-shrink: 0;

        background-image: url('../../assets/images/background-broccolli-header.svg');
        color: var(--g-kit-white);
        object-fit: contain;

        .ktp-back-arrow {
            cursor: pointer;
            flex-shrink: 0;
        }

        .ktp-modal-title {
            font-size: 16px;
            font-weight: 700;
            line-height: 24px;
        }
    }

    // Camera fullscreen body (below header)
    .camera-body {
        position: relative;
        flex: 1;
        overflow: hidden;
        background: #000;

        .video {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        // Entire overlay sits above video
        .overlay-container {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            pointer-events: none; // let clicks through except on buttons

            // ── Portrait layout ─────────────────────────────────────────
            // Helper text (top, centered)
            .helper-text {
                position: relative;
                display: flex;
                flex-direction: column;
                margin-top: 48px;
                margin-inline: 40px;
                padding-inline: 16px;
                padding-block: 12px;
                text-align: center;
                color: var(--g-kit-white);

                .rect {
                    background-color: var(--g-kit-black-80);
                    opacity: 0.75;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 0;
                    border-radius: 8px;
                }

                .title {
                    z-index: 4;
                    font-size: var(--g-kit-font-size-omicron);
                    font-weight: var(--g-kit-font-weight-bold);
                }

                .subtitle {
                    z-index: 4;
                    font-size: var(--g-kit-font-size-omega);
                    font-weight: 600;
                    line-height: 20px;
                }
            }

            // KTP card guide — centered with dark vignette around
            .card-ktp {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: calc(100% - 48px);
                max-width: 320px;
                aspect-ratio: 85.6 / 54; // ISO 7810 ID-1 (KTP ratio)
                background: transparent;
                border: 2px solid rgba(255, 255, 255, 0.8);
                border-radius: 8px;
                z-index: 2;
                // Dark vignette outside card — large spread to cover whole screen
                box-shadow: 0 0 0 100vmax rgba(0, 0, 0, 0.65);
                pointer-events: none;
            }

            // Bottom bar: shutter + switch
            .bottom-actions {
                position: absolute;
                bottom: 40px;
                left: 0;
                right: 0;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 32px;
                pointer-events: auto;

                .shutter-btn {
                    width: 64px !important;
                    height: 64px !important;
                    cursor: pointer;
                    flex-shrink: 0;
                    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
                }

                .switch-camera-btn {
                    width: 44px !important;
                    height: 44px !important;
                    cursor: pointer;
                    flex-shrink: 0;
                    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
                }
            }

            // ── Landscape layout ─────────────────────────────────────────
            &.landscape {
                flex-direction: row;
                align-items: flex-start;

                .helper-text {
                    margin-top: 0;
                    padding: 24px 16px;
                    max-width: 160px;
                    text-align: left;
                    flex-shrink: 0;
                }

                .card-ktp {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 50%;
                    max-width: 320px;
                }

                .bottom-actions {
                    bottom: unset;
                    right: 24px;
                    left: unset;
                    top: 50%;
                    transform: translateY(-50%);
                    flex-direction: column;
                    gap: 20px;
                    width: auto;
                }
            }
        }
    }

    // Snapped preview — before confirming (still inside camera modal)
    .snap-preview-body {
        display: flex;
        flex-direction: column;
        height: 100%;
        background: #000;
        align-items: center;
        justify-content: center;

        .snap-preview-container {
            position: relative;
            display: flex;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
                border-radius: 12px;
            }

            .timestamp {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: space-between;
                padding: 8px 12px;
                font-size: var(--g-kit-font-size-omega);
                background: rgba(0, 0, 0, 0.6);
                color: #fff;
            }
        }


    }

    .snap-footer {
        display: flex;
        gap: 8px;
        padding: 16px;
        background: #000;
        flex-shrink: 0;
        flex-direction: column;

        .btn {
            flex: 1;
        }
    }

    /* ============================================================
    Preview dialog — shared modal / offcanvas styles
    ============================================================ */
    .preview-modal-content {
        max-width: 564px !important;
        border-radius: 12px;

        .img-wrapper {
            position: relative;
            border: 1px solid var(--g-kit-black-20);
            border-radius: 8px;
            overflow: hidden;
            line-height: 0;

            .img-preview {
                width: 100%;
                height: auto;
                object-fit: cover;
                border-radius: 8px;
                aspect-ratio: 16 / 10;
                display: block;

                &.img-contain {
                    object-fit: contain;
                }
            }

            .timestamp {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                display: flex;
                justify-content: space-between;
                font-size: var(--g-kit-font-size-omnicron);
                padding: 16px 8px;
                background: color-mix(in srgb, var(--g-kit-black-80) 80%, transparent);
                color: var(--g-kit-white);
                font-weight: 600;
                line-height: 1.4;
            }
        }

        .footer-button {
            border-top: 1px solid #cdcdcd;
            display: flex;
            gap: 0.5rem !important;
            padding: 1rem !important;
            border-radius: 12px;
        }
    }

    .offcanvas.bottomsheetSourceChooser {
        .offcanvas-body {
            padding: 0 !important;
        }
    }

    .preview-offcanvas {

        &.preview-mobile {
            .offcanvas-body {
                display: flex;
                flex-direction: column;
                padding: 0 !important;
                gap: 0 !important;

                .preview-container {
                    padding: 16px;

                    .img-wrapper {
                        position: relative;
                        border-radius: 8px;
                        border: 1px solid var(--g-kit-black-20);
                        overflow: hidden;
                        line-height: 0;

                        .img-preview {
                            width: 100%;
                            height: auto;
                            object-fit: cover;
                            border-radius: 8px;
                            aspect-ratio: 16 / 10;
                            display: block;

                            &.img-contain {
                                object-fit: contain;
                            }
                        }

                        .timestamp {
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            display: flex;
                            justify-content: space-between;
                            padding: 8px 12px;
                            font-size: var(--g-kit-font-size-omega);
                            background: color-mix(in srgb, var(--g-kit-black-80) 80%, transparent);
                            color: var(--g-kit-white);
                            font-weight: 600;
                            line-height: 1.4;
                        }
                    }
                }

                .footer-button {
                    padding: 16px;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem !important;
                    border-top: 1px solid var(--g-kit-black-20);
                    border-top-left-radius: 12px;
                    border-top-right-radius: 12px;
                }
            }
        }

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
            border: 1px solid var(--g-kit-black-20);
            aspect-ratio: 16 / 10;

            &.img-contain {
                object-fit: contain;
            }
        }

        .footer-button {
            display: flex;
            flex-direction: column;
            gap: 0.5rem !important;
        }
    }

    .preview-modal-title {
        border-bottom: 1px solid #eeeeef !important;
    }

    .remove-overflow {
        overflow: unset !important;
    }

    /* ============================================================
    File picker shared styles
    ============================================================ */
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

    .custom-file-upload__box-input {
        &.disabled {
            opacity: 0.6;
            pointer-events: none;
            cursor: not-allowed;
        }
    }

    .imgCaptured {
        width: 135px;
        height: 135px;
        object-fit: cover;
        border-radius: 0.5rem;

        &.idcard {
            width: 180px;
            height: 120px;
        }

        &.img-contain {
            object-fit: contain;
            border: 1px solid var(--g-kit-black-20);
        }
    }

    .remove-button {
        position: absolute;
        top: 4px;
        right: 4px;
        background-color: transparent !important;
        color: white !important;
        border: none;
        border-radius: 50% !important;
        cursor: pointer;
        font-weight: bold;
        opacity: 1 !important;
        z-index: 1;
    }

    .error-text {
        color: #ae1e22;
        font-size: var(--g-kit-font-size-omega);
        line-height: var(--g-kit-line-height-omega);
        font-weight: var(--g-kit-font-weight-normal);
    }

    li:hover {
        cursor: pointer;
    }
</style>