<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <input type="file" accept="image/*" id="upload-multiple-image" capture="camera" multiple hidden required
        onchange="imagesPreview2(this, '.box-upload-multiple-image__preview');closeModalThis2('closeModal')" />
    <div class="box-upload-multiple-image">
        <label for="" class="box-upload-multiple-image__input" data-bs-toggle="modal"
            data-bs-target="#modal-upload-profile">
            <img src="../../assets/images/ico-image-upload.svg" alt="" />
        </label>

        <div class="box-upload-multiple-image__preview"></div>
    </div>
    <section class="section-overlay-modal-pds">
        <div class="modal fade" id="modal-upload-profile" data-bs-backdrop="static" data-bs-keyboard="false"
            tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-layout-pds modal-upload-profile">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">
                            Ambil Foto Melalui
                        </h5>
                        <button type="button" id="closeModal" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close">
                            <img src="../../assets/images/close.svg" alt="" />
                        </button>
                    </div>
                    <div class="modal-body">
                        <label for="upload-multiple-image" class="modal-upload-profile__item">
                            <h6>Galeri</h6>
                            <img src="../../assets/images/image-outline.svg" alt="" />
                        </label>
                        <label for="upload-multiple-image" class="modal-upload-profile__item desktop-hide-flex">
                            <h6>Kamera</h6>
                            <img src="../../assets/images/camera-outline.svg" alt="" />
                        </label>
                        <label for="" class="modal-upload-profile__item mobile-hide" data-bs-dismiss="modal"
                            data-bs-toggle="modal" data-bs-target="#modal-webcam" onclick="startWebcam()">
                            <h6>Kamera</h6>
                            <img src="../../assets/images/camera-outline.svg" alt="" />
                        </label>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modal-webcam" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
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
                        <video autoplay="true" id="video-webcam" width="100%">
                            Browser anda tidak mendukung
                        </video>

                        <button class="btn btn-primary" onclick="takeSnapshot('jaminan')" data-bs-dismiss="modal">
                            Ambil Foto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        name: "FilePickerSM",
        props: {
            props: {
                file: {
                    type: [File, Object],
                },
            },
            watch: {
                value(value) {
                    if (!value) {
                        this.$refs.file.value = "";
                    }
                },
            },
            methods: {
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
                    this.$emit("input", null);
                },
            },
        },
    };
</script>