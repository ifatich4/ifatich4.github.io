<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <header class="main-app-bar">
        <nav class="navbar navbar-expand-lg navbar-light container">
            <a class="navbar-brand" href="/">
                <img :src="image" alt="" />
            </a>
            <button class="navbar-toggler-pgd collapsed" type="button" data-toggle="collapse"
                data-target="#navbarSupportedContentTest" aria-controls="navbarSupportedContentTest"
                aria-expanded="false" aria-label="Toggle navigation" onclick="showMenu()">
                <span class="navbar-toggler-icon pgd-corporate hided"></span>
            </button>
            <div class="collapse navbar-collapse-pgd" id="navbarSupportedContentTest">
                <div class="small-app-bar-box">
                    <div class="small-app-bar-box-top">
                        <div class="small-app-bar-box-top-item-left">
                            <div class="left">
                                <img src="/assets/images/other-square.svg" alt="" />
                                <h5>Menu Lainnya</h5>
                            </div>
                            <i class="chevron-icon"></i>
                            <div class="overlay-header-sm-mobile">
                                <div class="modal-menu-lainnya">
                                    <div class="modal-menu-lainnya__box">
                                        <template v-for="(item, index) in (items || [])" :key="index">
                                            <div v-if="item && !item.action" class="modal-menu-lainnya__box-content">
                                                <img :src="item.icon" alt="" />
                                                <p>{{ item.label }}</p>
                                            </div>
                                            <a v-else-if="item" class="modal-menu-lainnya__box-content" :href="item.action"><img
                                                    :src="item.icon" alt="" />
                                                <p>{{ item.label }}</p>
                                            </a>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="small-app-bar-box-top-item-right">
                            <div class="left">
                                <img src="/assets/images/flag_id.svg" alt="" />
                                <h5>ID</h5>
                            </div>
                            <i class="chevron-icon"></i>
                            <div class="overlay-header-sm-mobile">
                                <div class="modal-language">
                                    <div class="modal-language__box">
                                        <div class="modal-language__box-content">
                                            <img src="/assets/images/flag_id2.svg" alt="" />
                                            <p class="active">ID</p>
                                        </div>
                                        <div class="modal-language__box-content">
                                            <img src="/assets/images/flag_en.svg" alt="" />
                                            <p>EN</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="small-app-bar-box-bottom">
                        <div class="small-app-bar-box-bottom-item">
                            <div class="left">
                                <img class="icon" src="/assets/images/lock_icon.svg" alt="" />
                                <h5>Masuk</h5>
                            </div>
                            <i class="chevron-icon"></i>
                            <div class="overlay-header-sm-mobile">
                                <div class="modal-type-in">
                                    <div class="modal-type-in__box">
                                        <div class="modal-type-in__box-content">
                                            <img src="/assets/images/logo-pegadaian-digital.svg" alt="" />
                                        </div>
                                        <div class="modal-type-in__box-content">
                                            <img src="/assets/images/logo-pegadaian-digital-syariah.svg" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-app-bar-box">
                    <div class="main-app-bar-box-search">
                        <form>
                            <div class="input-group left-icon">
                                <span class="input-group-text"><img src="/assets/images/icon-search-dark.svg"
                                        alt="" /></span><input type="search" class="form-control"
                                    placeholder="Cari kebutuhanmu di sini..." value="" />
                            </div>
                        </form>
                    </div>
                    <div class="main-app-bar-box-menu">
                        <div class="accordion accordion-flush" id="accordionMobileMenu">
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-menuOne">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseMenuOne" aria-expanded="false"
                                        aria-controls="flush-collapseMenuOne">
                                        Produk dan Layanan
                                    </button>
                                </h2>
                                <div id="flush-collapseMenuOne" class="accordion-collapse collapse"
                                    aria-labelledby="flush-menuOne" data-bs-parent="#accordionMobileMenu">
                                    <div class="accordion-body">
                                        <h5 class="title-menu">PINJAMAN GADAI</h5>
                                        <div class="link-menu">
                                            <a href="/produk/gadai-emas">Gadai Emas</a><a
                                                href="/produk/gadai-tabungan-emas">Gadai Tabungan Emas</a><a
                                                href="/">Gadai Titipan Emas</a><a href="/produk/gadai-non-emas">Gadai
                                                Non Emas</a><a href="/produk/gadai-efek">Gadai Efek</a><a
                                                href="/produk/gadai-kendaraan">Gadai Kendaraan</a><a
                                                href="/produk/pembiayaan-porsi-haji">Pembiayaan Porsi Haji</a><a
                                                href="/produk/pembiayaan-wisata-religi">Pembiayaan Wisata Religi</a>
                                        </div>
                                        <h5 class="title-menu">PINJAMAN NON GADAI</h5>
                                        <div class="link-menu">
                                            <a href="/produk/pinjaman-usaha">Pinjaman Usaha</a><a
                                                href="/produk/pinjaman-serbaguna">Pinjaman Serbaguna</a><a
                                                href="/produk/gadai-sertifikat">Gadai Sertifikat</a><a
                                                href="/produk/cicil-emas">Cicil Emas</a><a href="/">Cicil
                                                Kendaraan</a><a href="/">Pinjaman Modal Produktif</a>
                                        </div>
                                        <h5 class="title-menu">LAYANAN JASA</h5>
                                        <div class="link-menu">
                                            <a href="/produk/tabungan-emas">Tabungan Emas</a><a
                                                href="/produk/jasa-taksiran">Jasa Taksiran</a><a
                                                href="/produk/jasa-sertifikasi">Jasa Sertifikasi</a><a
                                                href="/produk/jasa-titipan">Jasa Titipan</a><a
                                                href="/produk/safe-deposit-box">Safe Deposit Box</a><a
                                                href="/produk/jasa-pembayaran-online">Jasa Pembayaran Online</a><a
                                                href="/produk/jasa-pengiriman-uang">Jasa Pengiriman Uang</a><a
                                                href="/produk/titipan-emas-fisik">Titipan Emas Fisik</a>
                                        </div>
                                        <h5 class="title-menu">KORPORASI</h5>
                                        <div class="link-menu">
                                            <a href="/">Pinjaman Kredit Instansi</a><a
                                                href="/produk/pinjaman-modal-produktif">Pinjaman Modal Produktif</a><a
                                                href="/">Kerja Sama/Partnership</a>
                                        </div>
                                        <h5 class="title-menu">HARGA EMAS</h5>
                                        <div class="link-menu">
                                            <a href="/produk/harga-emas-batangan-dan-tabungan-tabungan-emas">Harga Emas
                                                Batangan dan Tabungan Emas</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-menuTwo">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseMenuTwo" aria-expanded="false"
                                        aria-controls="flush-collapseMenuTwo">
                                        Hubungan Investor
                                    </button>
                                </h2>
                                <div id="flush-collapseMenuTwo" class="accordion-collapse collapse"
                                    aria-labelledby="flush-menuTwo" data-bs-parent="#accordionMobileMenu">
                                    <div class="accordion-body">
                                        <h5 class="title-menu">KINERJA KEUANGAN</h5>
                                        <div class="link-menu">
                                            <a href="/kinerja-keuangan/laporan-tahunan">Laporan Tahunan</a><a
                                                href="/kinerja-keuangan/laporan-keuangan">Laporan Keuangan</a><a
                                                href="/kinerja-keuangan/laporan-penawaran-umum">Laporan Penawaran
                                                Umum</a><a href="/kinerja-keuangan/rapat-umum-pemegang-saham">Rapat Umum
                                                Pemegang Saham</a><a
                                                href="/kinerja-keuangan/rapat-umum-pemegang-obligasi">Informasi
                                                Obligasi</a><a
                                                href="/kinerja-keuangan/propektus-penawaran-umum">Prospektus Penawaran
                                                Umum</a>
                                        </div>
                                        <h5 class="title-menu">KEBERLANJUTAN</h5>
                                        <div class="link-menu">
                                            <a href="/keberlanjutan/sustainability-report">Sustainability Report</a><a
                                                href="/keberlanjutan/kemitraan">Kemitraan</a><a
                                                href="/keberlanjutan/bina-lingkungan">Bina Lingkungan</a><a
                                                href="/keberlanjutan/lingkungan-hidup">Lingkungan Hidup</a><a
                                                href="/keberlanjutan/ketenagakerjaan-kesehatan-keselamtan-kerja">Ketenagakerjaan,
                                                Kesehatan, dan Keselamatan Kerja</a><a
                                                href="/keberlanjutan/tanggung-jawab-produk-layanan">Pengembangan Sosial
                                                dan Kemasyarakatan</a><a
                                                href="/keberlanjutan/pengembangan-sosial-dan-kemasyarakatan">Tanggung
                                                Jawab Produk dan/atau Layanan</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header" id="flush-menuThree">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseMenuThree" aria-expanded="false"
                                        aria-controls="flush-collapseMenuThree">
                                        Profil Korporasi
                                    </button>
                                </h2>
                                <div id="flush-collapseMenuThree" class="accordion-collapse collapse"
                                    aria-labelledby="flush-menuThree" data-bs-parent="#accordionMobileMenu">
                                    <div class="accordion-body">
                                        <h5 class="title-menu">TENTANG KAMI</h5>
                                        <div class="link-menu">
                                            <a href="/profile/sejarah-pegadaian">Sejarah Pegadaian</a><a
                                                href="/profile/visi-misi">Visi & Misi</a><a
                                                href="/profile/budaya-perusahaan">Budaya Perusahaan</a><a
                                                href="/profile/struktur-organisasi">Struktur Organisasi</a><a
                                                href="/profile/struktur-grup-perusahaan">Struktur Grup Perusahaan</a><a
                                                href="/profile/penghargaan">Penghargaan</a><a
                                                href="/profile/dokumen-anggaran-dasar">Dokumen Anggaran Dasar</a>
                                            <div class="sub-link-menu">
                                                <div class="accordion accordion-flush" id="accordionManejemen">
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="flush-headingManajemenOne">
                                                            <button class="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#flush-collapseManajemenOne"
                                                                aria-expanded="false"
                                                                aria-controls="flush-collapseManajemenOne">
                                                                Manajemen
                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseManajemenOne"
                                                            class="accordion-collapse collapse"
                                                            aria-labelledby="flush-headingManajemenOne"
                                                            data-bs-parent="#accordionManejemen">
                                                            <div class="accordion-body">
                                                                <a href="/profile/komisaris">Jajaran Komisaris</a><a
                                                                    href="/profile/direksi">Jajaran Direksi</a><a
                                                                    href="/profile/komite">Komite</a><a
                                                                    href="/profile/sekertaris-perusahaan">Sekretaris
                                                                    Perusahaan</a><a target="_blank"
                                                                    href="https://ppid.pegadaian.co.id/">Layanan
                                                                    Informasi Publik</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 class="title-menu">TATA KELOLA</h5>
                                        <div class="link-menu">
                                            <a href="/tata-kelola/pedoman-kerja">Pedoman Kerja</a>
                                            <div class="sub-link-menu">
                                                <div class="accordion accordion-flush"
                                                    id="accordionPengangkatandanPemberhentian">
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header"
                                                            id="flush-headingPengangkatandanPemberhentianOne">
                                                            <button class="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#flush-collapsePengangkatandanPemberhentianOne"
                                                                aria-expanded="false"
                                                                aria-controls="flush-collapsePengangkatandanPemberhentianOne">
                                                                Pengangkatan & Pemberhentian
                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapsePengangkatandanPemberhentianOne"
                                                            class="accordion-collapse collapse"
                                                            aria-labelledby="flush-headingPengangkatandanPemberhentianOne"
                                                            data-bs-parent="#accordionPengangkatandanPemberhentian">
                                                            <div class="accordion-body">
                                                                <a
                                                                    href="/tata-kelola/pengangkatan-dan-pemberhentian-sekretaris-perusahaan">Sekretaris
                                                                    Perusahaan</a><a
                                                                    href="/tata-kelola/pengangkatan-dan-pemberhentian-anggota-komite-audit">Anggota
                                                                    Komite Audit</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="/tata-kelola/kode-etik">Kode Etik</a><a
                                                href="/tata-kelola/sistem-pelaporan-pelanggan">Sistem Pelaporan
                                                Pelanggaran</a>
                                            <div class="sub-link-menu">
                                                <div class="accordion accordion-flush" id="accordionKebijakan">
                                                    <div class="accordion-item">
                                                        <h2 class="accordion-header" id="flush-headingKebijakanOne">
                                                            <button class="accordion-button collapsed" type="button"
                                                                data-bs-toggle="collapse"
                                                                data-bs-target="#flush-collapseKebijakanOne"
                                                                aria-expanded="false"
                                                                aria-controls="flush-collapseKebijakanOne">
                                                                Kebijakan
                                                            </button>
                                                        </h2>
                                                        <div id="flush-collapseKebijakanOne"
                                                            class="accordion-collapse collapse"
                                                            aria-labelledby="flush-headingKebijakanOne"
                                                            data-bs-parent="#accordionKebijakan">
                                                            <div class="accordion-body">
                                                                <a href="/tata-kelola/kebijakan-manajemen-resiko">Manajemen
                                                                    Risiko</a><a
                                                                    href="/tata-kelola/kebijakan-anti-korupsi">Anti
                                                                    Korupsi</a><a
                                                                    href="/tata-kelola/kebijakan-seleksi-pemasok">Seleksi
                                                                    Pemasok</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a href="/tata-kelola/adaptasi-kebiasaan-baru">Adaptasi Kebiasaan Baru</a><a
                                                href="/">e-Announcement</a>
                                        </div>
                                        <h5 class="title-menu">PENGADAAN</h5>
                                        <div class="link-menu">
                                            <a href="/pengadaan/pengadaan-barang-jasa">Pengadaan Barang dan Jasa</a><a
                                                href="/pengadaan/kebijakan-seleksi-pemasok">Kebijakan Seleksi Pemasok
                                                dan Hak Kreditur</a><a
                                                href="/pengadaan/kebijakan-peningkatan-kemampuan-vendor">Kebijakan
                                                Peningkatan Kemampuan Vendor</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="menu-link"><a href="/berita">Berita</a></div>
                    </div>
                </div>
            </div>
            <div class="collapse navbar-collapse head-menu" id="navbarSupportedContent">
                <div class="head-menu__item" onclick="showMenuLgProduk(this)">
                    <h5 class="">Produk dan Layanan</h5>
                    <i class="icon"></i>
                </div>
                <div class="head-menu__item" onclick="showMenuLgHubunganInvestor(this)">
                    <h5 class="">Hubungan Investor</h5>
                    <i class="icon"></i>
                </div>
                <div class="head-menu__item" onclick="showMenuLgProfile(this)">
                    <h5 class="">Profil Korporasi</h5>
                    <i class="icon"></i>
                </div>
                <a class="head-menu__item" href="/berita">
                    <h5 class="">Berita</h5>
                </a>
                <div class="head-menu__item">
                    <i class="nav-search-icon"></i>
                    <div class="search-box">
                        <form>
                            <div class="input-group left-icon">
                                <span class="input-group-text"><img src="/assets/images/icon-search-dark.svg"
                                        alt="" /></span><input type="search" class="form-control"
                                    placeholder="Cari kebutuhanmu di sini..." value="" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    </header>
    <div class="submenu-box">
        <div class="produk-layanan" onclick="showMenuLgProduk()">
            <div class="produk-layanan-item">
                <h5>PINJAMAN GADAI</h5>
                <div class="menu-item">
                    <a href="/produk/gadai-emas">Gadai Emas</a>
                    <a href="/produk/gadai-tabungan-emas">Gadai Tabungan Emas</a>
                    <a href="/">Gadai Titipan Emas</a>
                    <a href="/produk/gadai-non-emas">Gadai Non Emas</a>
                    <a href="/produk/gadai-efek">Gadai Efek</a>
                    <a href="/produk/gadai-kendaraan">Gadai Kendaraan</a>
                    <a href="/produk/pembiayaan-porsi-haji"> Pembiayaan Porsi Haji </a>
                    <a href="/produk/pembiayaan-wisata-religi">
                        Pembiayaan Wisata Religi
                    </a>
                </div>
            </div>
            <div class="produk-layanan-item">
                <h5>PINJAMAN NON GADAI</h5>
                <div class="menu-item">
                    <a href="/produk/pinjaman-usaha">Pinjaman Usaha</a>
                    <a href="/produk/pinjaman-serbaguna">Pinjaman Serbaguna</a>
                    <a href="/produk/gadai-sertifikat">Gadai Sertifikat</a>
                    <a href="/produk/cicil-emas">Cicil Emas</a>
                    <a href="/">Cicil Kendaraan</a>
                    <a href="/produk/pinjaman-modal-produktif">
                        Pinjaman Modal Produktif
                    </a>
                    <a href="/produk/pinjaman-modal-kerja"> Pinjaman Modal Kerja </a>
                </div>
            </div>
            <div class="produk-layanan-item">
                <h5>LAYANAN JASA</h5>
                <div class="menu-item">
                    <a href="/produk/tabungan-emas">Tabungan Emas</a>
                    <a href="/produk/jasa-taksiran">Jasa Taksiran</a>
                    <a href="/produk/jasa-sertifikasi">Jasa Sertifikasi</a>
                    <a href="/produk/jasa-titipan">Jasa Titipan</a>
                    <a href="/produk/safe-deposit-box">Safe Deposit Box</a>
                    <a href="/produk/jasa-pembayaran-online"> Jasa Pembayaran Online </a>
                    <a href="/produk/jasa-pengiriman-uang"> Jasa Pengiriman Uang </a>
                    <a href="/produk/titipan-emas-fisik">Titipan Emas Fisik</a>
                </div>
            </div>
            <div class="produk-layanan-item">
                <h5>KORPORASI</h5>
                <div class="menu-item">
                    <a href="/">Pinjaman Kredit Instansi</a>
                    <a href="/">Kerja Sama/Partnership</a>
                </div>

                <h5 class="bottom-title">HARGA EMAS</h5>
                <div class="menu-item">
                    <a href="/produk/harga-emas-batangan-dan-tabungan-tabungan-emas">
                        Harga Emas Batangan dan Tabungan Emas
                    </a>
                </div>
            </div>
        </div>

        <div class="hubungan-investor" onclick="showMenuLgHubunganInvestor()">
            <div class="hubungan-investor-item">
                <h5>KINERJA KEUANGAN</h5>
                <div class="menu-item">
                    <a href="/kinerja-keuangan/laporan-tahunan"> Laporan Tahunan </a>
                    <a href="/kinerja-keuangan/laporan-keuangan"> Laporan Keuangan </a>
                    <a href="/kinerja-keuangan/laporan-penawaran-umum">
                        Laporan Penawaran Umum
                    </a>
                    <a href="/kinerja-keuangan/rapat-umum-pemegang-saham">
                        Rapat Umum Pemegang Saham
                    </a>
                    <a href="/kinerja-keuangan/rapat-umum-pemegang-obligasi">
                        Informasi Obligasi
                    </a>
                    <a href="/kinerja-keuangan/propektus-penawaran-umum">
                        Prospektus Penawaran Umum
                    </a>
                </div>
            </div>
            <div class="hubungan-investor-item">
                <h5>KEBERLANJUTAN</h5>
                <div class="menu-item">
                    <a href="/keberlanjutan/sustainability-report">
                        Sustainability Report
                    </a>
                    <a href="/keberlanjutan/kemitraan">Kemitraan</a>
                    <a href="/keberlanjutan/bina-lingkungan">Bina Lingkungan</a>
                    <a href="/keberlanjutan/lingkungan-hidup">Lingkungan Hidup</a>
                    <a href="/keberlanjutan/ketenagakerjaan-kesehatan-keselamtan-kerja">
                        Ketenagakerjaan, Kesehatan, dan Keselamatan Kerja
                    </a>
                    <a href="/keberlanjutan/tanggung-jawab-produk-layanan">
                        Pengembangan Sosial dan Kemasyarakatan
                    </a>
                    <a href="/keberlanjutan/pengembangan-sosial-dan-kemasyarakatan">
                        Tanggung Jawab Produk dan/atau Layanan
                    </a>
                </div>
            </div>
        </div>

        <div class="profile-korporasi" onclick="showMenuLgProfile()">
            <div class="profile-korporasi-item">
                <h5>TENTANG KAMI</h5>
                <div class="menu-item">
                    <a href="/profile/sejarah-pegadaian">Sejarah Pegadaian</a>
                    <a href="/profile/visi-misi">Visi & Misi</a>
                    <a href="/profile/budaya-perusahaan">Budaya Perusahaan</a>
                    <a href="/profile/struktur-organisasi">Struktur Organisasi</a>
                    <a href="/profile/struktur-grup-perusahaan">
                        Struktur Grup Perusahaan
                    </a>
                    <a href="/profile/penghargaan">Penghargaan</a>
                    <a href="/profile/dokumen-anggaran-dasar"> Dokumen Anggaran Dasar </a>
                    <div class="sub-menu-item">
                        Manajemen
                        <i class="icon-chevron"></i>
                        <div class="sub-menu-item-box sub-menu-item-box-bottom">
                            <a href="/profile/komisaris">Jajaran Komisaris</a>
                            <a href="/profile/direksi">Jajaran Direksi</a>
                            <a href="/profile/komite">Komite</a>
                            <a href="/profile/sekertaris-perusahaan">
                                Sekretaris Perusahaan
                            </a>
                        </div>
                    </div>
                    <a href="https://ppid.pegadaian.co.id/" target="_blank">
                        Layanan Informasi Publik
                    </a>
                </div>
            </div>
            <div class="profile-korporasi-item">
                <h5>TATA KELOLA</h5>
                <div class="menu-item">
                    <a href="/tata-kelola/pedoman-kerja">Pedoman Kerja</a>
                    <div class="sub-menu-item">
                        Pengangkatan & Pemberhentian
                        <i class="icon-chevron"></i>
                        <div class="sub-menu-item-box sub-menu-item-box-top">
                            <a href="/tata-kelola/pengangkatan-dan-pemberhentian-sekretaris-perusahaan">
                                Sekretaris Perusahaan
                            </a>
                            <a href="/tata-kelola/pengangkatan-dan-pemberhentian-anggota-komite-audit">
                                Anggota Komite Audit
                            </a>
                        </div>
                    </div>
                    <a href="/tata-kelola/kode-etik">Kode Etik</a>
                    <a href="/tata-kelola/sistem-pelaporan-pelanggan">
                        Sistem Pelaporan Pelanggaran
                    </a>
                    <div class="sub-menu-item">
                        Kebijakan
                        <i class="icon-chevron"></i>
                        <div class="sub-menu-item-box sub-menu-item-box-top">
                            <a href="/tata-kelola/kebijakan-manajemen-resiko">
                                Manajemen Risiko
                            </a>
                            <a href="/tata-kelola/kebijakan-anti-korupsi"> Anti Korupsi </a>
                            <a href="/tata-kelola/kebijakan-seleksi-pemasok" class="sub-menu-box__item">
                                Seleksi Pemasok
                            </a>
                        </div>
                    </div>
                    <a href="/tata-kelola/adaptasi-kebiasaan-baru">
                        Adaptasi Kebiasaan Baru
                    </a>
                    <a href="/">e-Announcement</a>
                </div>
            </div>
            <div class="profile-korporasi-item">
                <h5>PENGADAAN</h5>
                <div class="menu-item">
                    <a href="/pengadaan/pengadaan-barang-jasa">
                        Pengadaan Barang dan Jasa
                    </a>
                    <a href="/pengadaan/kebijakan-seleksi-pemasok">
                        Kebijakan Seleksi Pemasok dan Hak Kreditur
                    </a>
                    <a href="/pengadaan/kebijakan-peningkatan-kemampuan-vendor">
                        Kebijakan Peningkatan Kemampuan Vendor
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "NavbarCorporate",
        props: {
            image: {
                type: String,
                default: "/assets/images/logo-pegadaian-small.svg",
            },
            items: {
                type: Array,
                default: function () {
                    return [{
                            label: "Kerjasama",
                            action: "",
                            icon: "/assets/images/world.svg",
                            child: null,
                        },
                        {
                            label: "Promo",
                            action: "",
                            icon: "/assets/images/bag-dark.svg",
                            child: null,
                        },
                        {
                            label: "Artikel",
                            action: "action",
                            icon: "",
                            child: [{
                                    label: "Emas",
                                    action: "child_action",
                                },
                                {
                                    label: "Inspirasi",
                                    action: "child_action",
                                },
                                {
                                    label: "Wirausaha",
                                    action: "child_action",
                                },
                            ],
                        },
                        {
                            label: "Acara",
                            action: "action_2",
                            child: null,
                        },
                        {
                            label: "Simulasi",
                            action: "action",
                            child: [{
                                    label: "Harga Emas Batangan",
                                    action: "child_action",
                                },
                                {
                                    label: "Simulasi Tabungan Emas",
                                    action: "child_action",
                                },
                            ],
                        },
                    ];
                },
            },
            searchHandler: {
                type: Function,
                default: function () {
                    return "search";
                },
            },
        },
    };
</script>
<style lang=""></style>