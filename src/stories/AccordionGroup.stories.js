import Accordion from "../components/Accordion/Accordion.vue";
import AccordionItem from "../components/Accordion/AccordionItem.vue";

 
 export default {
    title: 'Components/Accordion/Group',
    component: Accordion,
    tags: ['autodocs'],
    args: {
      free: false,
      id: "default",
      default : 
      `
        <AccordionItem header="Test header accordion" active>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AccordionItem>
        <AccordionItem header="Test header accordion 2" >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AccordionItem>
        <AccordionItem header="Test header accordion 3" >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </AccordionItem>
      `
    },
    render: (args) => ({
      components: { Accordion, AccordionItem},
      setup() {
        return { args };
      },
      template: `
        <Accordion v-bind="args">
            ${args.default}
        </Accordion>
      `,
    }),
  };

  export const Group = {

  }

  export const VariantBigGroup = {
    args: {
      default: 
      `
        <AccordionItem variant="big" header="Informasi Nasabah" active>
          <div class="row mb-3">
            <div class="col-6">
              <small class="text-muted" style="color: var(--g-kit-black-50);">Nama Lengkap</small>
              <p class="mb-0" style="font-weight: 800; color: var(--g-kit-black-80);">Budi Santoso</p>
            </div>
            <div class="col-6">
              <small class="text-muted" style="color: var(--g-kit-black-50);">Nomor Rekening</small>
              <p class="mb-0" style="font-weight: 800; color: var(--g-kit-black-80);">1234567890</p>
            </div>
          </div>
          <div class="row">
            <div class="col-6">
              <small class="text-muted" style="color: var(--g-kit-black-50);">Status</small>
              <p class="mb-0"><span class="badge bg-success">Aktif</span></p>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem variant="big" header="Dokumen Persyaratan" >
          <ul class="list-group list-group-flush mb-3">
            <li class="list-group-item px-0 d-flex justify-content-between align-items-center" style="border-color: var(--g-kit-black-20);">
              KTP (Kartu Tanda Penduduk)
              <span class="badge bg-success rounded-pill">Terverifikasi</span>
            </li>
            <li class="list-group-item px-0 d-flex justify-content-between align-items-center" style="border-color: var(--g-kit-black-20);">
              NPWP
              <span class="badge bg-warning text-dark rounded-pill">Menunggu</span>
            </li>
          </ul>
          <button class="btn btn-outline-success btn-sm w-100" style="color: var(--g-kit-lime-50); border-color: var(--g-kit-lime-50);">Unggah Dokumen Tambahan</button>
        </AccordionItem>
        <AccordionItem variant="big" header="Riwayat Transaksi" >
          <div class="d-flex justify-content-between border-bottom pb-2 mb-2" style="border-color: var(--g-kit-black-20) !important;">
            <div>
              <strong style="color: var(--g-kit-black-80);">Pembayaran Angsuran</strong><br/>
              <small class="text-muted" style="color: var(--g-kit-black-50);">20 Jul 2026</small>
            </div>
            <div style="color: var(--g-kit-lime-50); font-weight: 800;">Rp 500.000</div>
          </div>
          <div class="d-flex justify-content-between">
            <div>
              <strong style="color: var(--g-kit-black-80);">Pencairan Dana</strong><br/>
              <small class="text-muted" style="color: var(--g-kit-black-50);">15 Jul 2026</small>
            </div>
            <div style="color: var(--g-kit-red-50); font-weight: 800;">- Rp 2.000.000</div>
          </div>
        </AccordionItem>
      `
    }
  }