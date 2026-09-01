<script setup>
    import { defineProps, defineModel, defineEmits, ref, computed, useAttrs, watch } from 'vue';
    import InputNik from './InputNIK.vue';
    import Button from '../Button/Button.vue';
    import { QrcodeStream } from 'vue-qrcode-reader';
    import useScreen from '@/hooks/use-screen';
    import CustomModal from '../Modal/CustomModal.vue';

    const screenStore = useScreen()
    const modelValue = defineModel();

    const attrs = useAttrs()

    const props = defineProps({
		error: {},
		label: {},
		suffixIcon: {},
		class: {},
		helperText: {},
		color: {
			type: String,
			default: 'default'
		},
		type: {
			default: 'text'
		},
		useDelimiter: {
			default: true
		},
		disabled: {
			type: Boolean,
			default: false
		},
		useAutoCaps: {
			type: Boolean,
			default: false
		},
		required: {
			type: Boolean,
			default: false
		},
		variant: {
			type: String,
			default: 'default'
		},
		rupiah: {
			type: String,
			default: ''
		},
		general: {
			type: Boolean,
			default: false
		},
        numericOnly: {
			type: Boolean,
			default: true
		},
	})

    const filterNumericInput = (value) => {
        if (!props.numericOnly) return value
        if (!value) return ''
        return value.replace(/\D/g, '')
    }

    watch(modelValue, (newValue) => {
        if (props.numericOnly && newValue) {
            const filtered = filterNumericInput(newValue)
            if (filtered !== newValue) {
                modelValue.value = filtered
            }
        }
    })

    const emit = defineEmits(['scan'])

    const passThroughProps = computed(() => ({
        ...attrs,
        ...props,
    }))

    const warningModal5 = ref(false)
    const cameraOpen = ref(false)
    const isCameraActive = ref(false)

    const facingMode = ref('environment')

    const handleCameraOpen = () => {
        if (screenStore.value.isMobile) {
            isCameraActive.value = true
            cameraOpen.value = true
        } else {
            warningModal5.value = true
        }
    }

    function paintBoundingBox(detectedCodes, ctx) {
        for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
        }
    }

    const selectedBarcodeFormats = computed(() => {
        return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
    })

    const barcodeFormats = ref({
        aztec: false,
        code_128: false,
        code_39: false,
        code_93: false,
        codabar: false,
        databar: false,
        databar_expanded: false,
        data_matrix: false,
        dx_film_edge: false,
        ean_13: false,
        ean_8: false,
        itf: false,
        maxi_code: false,
        micro_qr_code: false,
        pdf417: false,
        qr_code: true,
        rm_qr_code: false,
        upc_a: false,
        upc_e: false,
        linear_codes: false,
        matrix_codes: false
    })
    
    const onCloseWarning5 = () => {
        warningModal5.value = false
    }

    function onDetect(detectedCodes) {
        console.log(detectedCodes)
        const sbk = detectedCodes.map((code) => code.rawValue)[0]
        emit('scan', sbk)
        isCameraActive.value = false
        cameraOpen.value = false
    }

    const switchCamera = () => {
      switch (facingMode.value) {
        case 'environment':
          facingMode.value = 'user'
          break
        case 'user':
          facingMode.value = 'environment'
          break
      }
    }

    const onCameraClosed = () => {
        isCameraActive.value = false
    }

    const handleKeypress = (event) => {
        if (props.numericOnly) {
            const charCode = event.which ? event.which : event.keyCode
            // Allow: backspace, delete, tab, escape, enter
            if ([8, 9, 27, 13, 46].includes(charCode)) {
                return
            }
            // Prevent jika bukan angka (0-9)
            if (charCode < 48 || charCode > 57) {
                event.preventDefault()
            }
        }
    }
</script>

<template>
    <InputNik class="input-search-qr" v-bind="passThroughProps" v-model="modelValue" @keypress="handleKeypress">
         <template #prefix>
            <img style="margin-left: 12px;" src="../../assets/icon/search.svg" />
        </template>
        <template #suffix>
            <svg @click="handleCameraOpen()" style="margin-right: 12px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M2 7V2H7V4H4V7H2ZM2 22V17H4V20H7V22H2ZM17 22V20H20V17H22V22H17ZM20 7V4H17V2H22V7H20ZM17.5 17.5H19V19H17.5V17.5ZM17.5 14.5H19V16H17.5V14.5ZM16 16H17.5V17.5H16V16ZM14.5 17.5H16V19H14.5V17.5ZM13 16H14.5V17.5H13V16ZM16 13H17.5V14.5H16V13ZM14.5 14.5H16V16H14.5V14.5ZM13 13H14.5V14.5H13V13ZM19 5V11H13V5H19ZM11 13V19H5V13H11ZM11 5V11H5V5H11ZM9.5 17.5V14.5H6.5V17.5H9.5ZM9.5 9.5V6.5H6.5V9.5H9.5ZM17.5 9.5V6.5H14.5V9.5H17.5Z" fill="#58585B"/>
            </svg>
        </template>
    </InputNik>    

    <BModal class="inputCameraQR" centered v-model="cameraOpen" @hidden="onCameraClosed" hide-footer>
        <template #header="{ close }">
            <svg  :id="`${$attrs.id}_closeCamera`" @click="close" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M20 12C20 11.4477 19.5523 11 19 11H7.83L12.71 6.12C13.1017 5.72829 13.1006 5.09284 12.7075 4.70251C12.3164 4.31412 11.6848 4.31524 11.295 4.705L4.07921 11.9208C4.03546 11.9645 4.03546 12.0355 4.07921 12.0792L11.2947 19.2947C11.6842 19.6842 12.3158 19.6842 12.7053 19.2947C13.0946 18.9054 13.0949 18.2743 12.7059 17.8847L7.83 13H19C19.5523 13 20 12.5523 20 12Z"
                    fill="currentColor"
                />
            </svg>
        <div class="mx-2 fw-bolder">Scan QR</div>
      </template>

        <div class="camera-container">
            <qrcode-stream
                v-if="isCameraActive"
                :constraints="{ facingMode }" 
                @detect="onDetect"
                :formats="selectedBarcodeFormats"
                :track="paintBoundingBox" 
            />
        </div>

        <div class="cameraGuidance mt-3"></div>

        <div class="helper-text">
            <div class="title">{{ `Instruksi` }}</div>
            <div class="subtitle">{{ `Pastikan QR code berada dalam area yang telah ditentukan.` }}</div>
        </div>

        <svg @click="switchCamera()" class="switchCameraBtn" xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 55 55" fill="none">
            <g clip-path="url(#clip0_13972_208991)">
                <path d="M27.5 55C42.6878 55 55 42.6878 55 27.5C55 12.3122 42.6878 0 27.5 0C12.3122 0 0 12.3122 0 27.5C0 42.6878 12.3122 55 27.5 55Z" fill="#252528"/>
                <path d="M31.5315 35.9554C27.9539 37.6645 23.6654 36.9283 20.8606 34.1233C18.1547 31.4175 17.3747 27.331 18.8575 23.8338L19.6175 24.594C19.8464 24.8229 20.1463 24.9372 20.4462 24.9372C20.7461 24.9372 21.0461 24.8227 21.2748 24.5941C21.7324 24.1364 21.7325 23.3945 21.2748 22.9367L18.7889 20.4507C18.4322 20.094 17.8873 20.0056 17.4362 20.2311L14.1217 21.8885C13.5428 22.1779 13.3082 22.8819 13.5976 23.4608C13.8872 24.0397 14.591 24.2744 15.1699 23.9849L16.5466 23.2965C14.9036 27.5818 15.9182 32.4955 19.2033 35.7807C21.4492 38.0266 24.4554 39.2114 27.5025 39.2111C29.2118 39.211 30.9347 38.838 32.5418 38.0703C33.1257 37.7913 33.3731 37.0917 33.0941 36.5077C32.815 35.9236 32.1154 35.6767 31.5315 35.9554Z" fill="white"/>
                <path d="M39.8132 29.3455L38.9902 29.7571C39.7283 25.9888 38.5797 22.0066 35.7799 19.207C32.274 15.7012 26.9136 14.7808 22.4415 16.9172C21.8575 17.1961 21.6101 17.8957 21.8892 18.4797C22.1682 19.0638 22.8678 19.311 23.4516 19.032C27.0293 17.3229 31.3178 18.0592 34.1226 20.8642C36.5157 23.2572 37.4015 26.7298 36.5492 29.9199L35.3656 28.7363C34.908 28.2787 34.1661 28.2787 33.7083 28.7362C33.2506 29.1938 33.2506 29.9357 33.7082 30.3934L36.1941 32.8796C36.1975 32.883 36.2014 32.8859 36.2048 32.8892C36.2142 32.8981 36.224 32.9066 36.2337 32.9154C36.4538 33.1164 36.7362 33.2229 37.0231 33.2229C37.201 33.2229 37.3804 33.1824 37.5469 33.0992L40.8615 31.4418C41.4402 31.1523 41.6749 30.4484 41.3855 29.8695C41.0962 29.2907 40.3921 29.0559 39.8132 29.3455Z" fill="white"/>
            </g>
            <defs>
                <clipPath id="clip0_13972_208991">
                <rect width="55" height="55" fill="white"/>
                </clipPath>
            </defs>
        </svg>
    </BModal>

    <CustomModal v-model="warningModal5" size="sm" centered :use-bottom-sheet="screenStore.isMobile" :show-close-button="false" :hide-divider="true">
        <template #body>
            <div class="text-center pt-2-px">
                <img style="margin-left: 12px;" src="../../assets/icon/search.svg" />
            </div>
            <h4 class="pt-4 pb-2">Perangkat Tidak Mendukung</h4>
            <p class="pb-2">Anda dapat melakukan scan QR dengan mesin scan atau lakukan pelaksanaan melalui handphone.</p>
        </template>
        <template #footer>
            <div class="modal-footer-spacing d-flex flex-column w-100 m-0">
                <Button width="100" type="primary" label="Mengerti" @click="onCloseWarning5" />
            </div>
        </template>
    </CustomModal>
</template>

<style lang="scss">
    .group-input .helper-text {
        color: var(--g-kit-black-60) !important;
    }
    .input-search-qr {
         .input-group {
            .form-control {
                &:hover:not(:disabled):not([readonly]):not(.is-invalid):not(.is-valid) {
                    box-shadow: none;
                }
            }
        }
    }

    .modal.inputCameraQR  {

        border-width: 0px;

        .modal-dialog {
            margin: 0px;
            width: 100%;
            height: 100%;
            max-width: none;

            .modal-content {
                border-radius: 0px;
                background-color: var(--g-kit-broccoli-80);
                height: 100%;

                   .modal-body {
                        background-color: var(--g-kit-black-80);
                        padding: 0px;
                        display: flex !important;
                        align-items: center !important;
                        overflow: hidden;
                    }

                    .modal-footer {
                        padding: 16px;
                        background-color: var(--g-kit-black-80);
                    }

                    .modal-header {

                        position: relative;
                        z-index: 1;
                        overflow: hidden;
                        color: var(--g-kit-white);
                       
                        &::before {
                                content: "";
                                position: absolute;
                                inset: 0;
                                background-image: url('@/assets/images/background-broccolli.svg');
                                background-repeat: no-repeat;
                                background-size: 100% auto;
                                background-position: center center;
                                opacity: 0.2;
                                z-index: -1;
                        }
                    }
            }
        }   

        .camera-container {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            qrcode-stream {
                width: 100%;
                height: auto;
            }
        }

        .cameraGuidance {
            position: absolute;
            top: 45% !important;
            left: 50% !important;
            transform: translate(-50%, -50%);
            width: 100%;
            aspect-ratio: 16 / 10;
            background-color: transparent;
            border-radius: 12px;
            opacity: 0.5;
            box-shadow: 0 0 0 300px rgba(1, 1, 1, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            height: 50%;
        }

        .helper-text {
            position: absolute;
            display: flex;
            flex-direction: column;
            padding-inline: 16px;
            text-align: center;
            color: var(--g-kit-white);
            top: 46px;
            gap: 4px;
            width: 100%;

            .title {
                font-size: var(--g-kit-font-size-kappa);
                font-weight: var(--g-kit-font-weight-bold);
                z-index: 1;
            }

            .subtitle {
                z-index: 1;
                font-size: var(--g-kit-font-size-sigma);
                font-style: normal;
                font-weight: 600;
                line-height: 20px;
            }
        }

        .switchCameraBtn {
            position: absolute;
            width: 100%;
            bottom: 96px;

            &:hover {
                cursor: pointer;
            }
        }

    }

    .p-icon-search {
        padding: 12px 0 12px 12px;
    }

</style>