<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="sprint-nav">
        <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'light'" class="fixed-top my-3 exa-header desktop container">
            <BNavbarBrand href="#">
                <img :src="require('../../assets/images/BG-Broccolli.svg')" />
            </BNavbarBrand>
            <BNavbarToggle target="nav-collapse" />
            <BCollapse id="nav-collapse" is-nav>
    
                <BNavbarNav>
                    <slot name="search"></slot>
                </BNavbarNav>
    
                <!-- Right aligned nav items -->
                <BNavForm class="d-flex">
                    <BNavItemDropdown class="dd-nav" text="Riwayat">
                        
                        <b-card>
                            <slot name="riwayat"></slot>
                        </b-card>
                    </BNavItemDropdown>
    
                    <BNavItemDropdown class="dd-nav notif" text="Notifikasi" >
                        <b-card>
                            <slot name="notifikasi"></slot>
                        </b-card>
                    </BNavItemDropdown>
    
                    <BNavItemDropdown class="dd-nav last-child">
                        <template v-slot:button-content>
                            <b>  {{ user||'Thoriq Shadad' }} </b>
                            {{ jabatan||'Business Process Outsourcing' }}
                        </template>

                        <b-card class="content-profil">
                            <slot name="profil"></slot>
                        </b-card>
                    </BNavItemDropdown>
                </BNavForm>
            </BCollapse>
        </BNavbar>

        <BNavbar toggleable="lg" variant="primary" v-b-color-mode="'light'" class="navbar fixed-bottom exa-header my-2 mx-2 mobile">
            <BNavbarBrand href="#">
                <img :src="require('../../assets/images/logo-pgd/exa.svg')" />
            </BNavbarBrand>
        </BNavbar>
    </div>
</template>

<script>
    import {
        BNavbar,
        BNavbarBrand,
        BNavbarToggle,
        BNavbarNav,
        BNavForm,
    } from 'bootstrap-vue-next';

    export default {
        name: "BerandaHeader",
        components: {
    BNavbar,
    BNavbarBrand,
    BNavbarToggle,
    BNavbarNav,
    BNavForm,
},
        props: {
            username: {
                type: String
            },
            jabatan: {
                type: String
            },
            label: {
                type: String,
                default: "Beli Tabungan Emas",
            },
            action: {
                type: Function,
                default: function () {
                    window.history.go(-1);
                },
            },
        },
    };
</script>

<style lang="scss">

    .container {
        --g-bs-gutter-x: 0 !important;
        --g-bs-gutter-y: 0;
    }

    nav.navbar{
        &.exa-header {
            background-image: url('../../assets/images/background-broccolli-header.svg');
            background-repeat: no-repeat;
            background-size: cover;
            padding: .4rem;
            border-radius: 1rem;
            background-color: var(--g-kit-broccoli-50) !important;

            .navbar-brand img{
                height: 60px;
            }

            form {
                li.dd-nav {
                    list-style-type: none;
                    display: flex;
                    align-items: center;

                    &:first-child {
                        &::before {
                            content: url('../../assets/icon/notification_outline.svg');
                            width: 24px;
                            height: 24px;
                        }
                    }

                    &:not(:first-child):not(:last-child) {
                        &::before {
                            content: url('../../assets/icon/history_flat.svg');
                            width: 24px;
                            height: 24px;
                        }
                    }
                    &:last-child {
                        border-left: 2px solid white;
                    }

                    &.last-child {
                        .dropdown-menu.show.overflow-auto{
                            .btn {
                                font-size: var(--g-kit-font-size-omicron);
                                line-height: var(--g-kit-line-height-omicron);
                                font-weight: var(--g-kit-font-weight-bold);
                            }
                        }
                        .btn-group {
                            .btn {
                                display: flex;
                                flex-direction: column;
                                font-size: var(--g-kit-font-size-omega);
                                line-height: var(--g-kit-line-height-omega);
                                font-weight: var(--g-kit-font-weight-normal);
                                b {
                                    font-size: var(--g-kit-font-size-sigma);
                                    line-height: var(--g-kit-line-height-sigma);
                                }
                            }
                        }
                    }
                }
                
            }
    
            ul {
                flex-wrap: nowrap;
            }

            form {
                gap: 1.5rem;
            }

            li {
                list-style-type: none;
    
                button {
                    width: 100%;
                }
                
                .dd-nav {
                    .card-header {
                        background-color: white;
    
                        .nav-item {
                            width: 100%;
                        }
                    }
                
                    .dropdown-menu {
                        padding: 0px;
        
                        &.show.overflow-auto {
                            position: absolute;
                            inset: 0px auto auto 0px;
                            margin: 0px;
                            border-radius: 6px;
                            max-width: 360px !important;
                            width: 360px !important;
                            margin-top: 34px;
                        }
                    }
        
                }
            }
    
            &.sticky-top {
                top: 1rem;
                position: fixed;
            }

            @media only screen and (max-width: 768px) {
                &.sticky-top {
                    bottom: 1rem;
                }
            }

            .navbar-nav {
                width: 360px;
                .group-input {
                    margin-bottom: 0;
                    width: 100%;
                    label {
                        display: none
                    }

                    .select2-container {
                        width: 100% !important;
                    }
                    
                    .select2-container--open .select2-dropdown {
                        left: auto;
                    }
                }
            }
        }
    }
</style>