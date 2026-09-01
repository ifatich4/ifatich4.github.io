import FilePickerLG from "../components/Filepicker/FilePickerLG.vue";
import FilePickerSM from "../components/Filepicker/FilePickerSM.vue";
import ImageView from "../components/Image/ImageView.vue";
import InputKTP from "../components/Input/InputKTP.vue";
import Button from "../components/Button/Button.vue";
import { ref } from "vue";

// Sample domain image assets
const sampleAssets = {
 goldBar: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=800&auto=format&fit=crop&q=85",
 goldJewelry: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=800&auto=format&fit=crop&q=85",
 certificateDoc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=1200&auto=format&fit=crop&q=85",
 ktpDocument: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&h=630&auto=format&fit=crop&q=80",
 branchBuilding: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&auto=format&fit=crop&q=85",
 nasabahPortrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1067&auto=format&fit=crop&q=85",
 storyVertical: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=720&h=1280&auto=format&fit=crop&q=85",
 ultraWide: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2100&h=900&auto=format&fit=crop&q=85",
 squareCoin: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?w=800&h=800&auto=format&fit=crop&q=85",
 brokenUrl: "https://invalid-domain-simulation-12345.com/broken.jpg",
 sliderImages: [
 "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=800&auto=format&fit=crop&q=85",
 "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=800&auto=format&fit=crop&q=85",
 "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=800&auto=format&fit=crop&q=85"
 ]
};

export default {
 title: 'Playground/Media & File Pickers (4 Komponen)',
 parameters: {
 layout: 'fullscreen',
 docs: {
 description: {
 component: `
###  Showcase Terpadu: 4 Komponen Pengolahan Gambar & Dokumen

Halaman khusus ini mendemonstrasikan **ke-4 komponen** pengolahan gambar dan dokumen Pegadaian UI Kit secara komprehensif dalam tata letak maksimal **3 kolom per baris**:

1. **FilePickerLG** — Form uploader dropzone besar (multi format: Gambar, PDF, CSV, Semua Berkas, Loader Modal/Inline, Pre-filled, dan Preview Modal Action Buttons).
2. **FilePickerSM** — Tombol upload kompak 80×80 px dengan modal pemilihan Galeri & Kamera (Webcam), semua format berkas, dan Preview Modal Action Buttons.
3. **ImageView** — Engine penampil gambar & lightbox modal dengan rasio lengkap (1:1, 3:2 utama, KTP, 2:3 portrait, 16:9, 4:3, 21:9, 3:4, 9:16), whitespace control (hasil crop vs foto mentah), prop preview 120×120 px, multi-slider carousel, dan Preview Modal Action Buttons.
4. **InputKTP** — Kamera capture & scanner dengan panduan frame KTP (ISO 85.6/54), mode general 1:1, timestamp, error state, mode preview-only (filled/blank/broken), dan Preview Modal Action Buttons.
 `,
 },
 },
 },
};

// Layout Card Styles
const CARD = "background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; height: fit-content; flex-direction: column; justify-content: space-between; transition: transform 0.15s ease, box-shadow 0.15s ease; box-sizing: border-box; width: 100%;";
const CARD_CENTER = "background: #ffffff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.04); display: flex; height: fit-content; flex-direction: column; justify-content: space-between; text-align: center; transition: transform 0.15s ease, box-shadow 0.15s ease; box-sizing: border-box; width: 100%;";

/**
 * ALL IN ONE PLAYGROUND — Semua varian ditampilkan secara terstruktur (Maksimal 3 Kolom per Baris)
 */
export const AllComponentsPlayground = {
 render: () => ({
 components: { FilePickerLG, FilePickerSM, ImageView, InputKTP, Button },
 setup() {
 // ===================== FilePickerLG state =====================
 const lgImage = ref(null);
 const lgPdf = ref(null);
 const lgCsv = ref(null);
 const lgAll = ref(null);
 const lgPrefilled = ref(sampleAssets.goldBar);
 const lgModalLoader = ref(null);
 const lgCustomMax = ref(null);
 const lgInlineLoading = ref(null);
 const lgWithAction = ref(sampleAssets.goldBar);

 // ===================== FilePickerSM state =====================
 const smImage = ref(null);
 const smAll = ref(null);
 const smPdf = ref(null);
 const smCsv = ref(null);
 const smPrefilled = ref(sampleAssets.goldJewelry);
 const smModalLoader = ref(null);
 const smCustomMax = ref(null);
 const smWithAction = ref(sampleAssets.goldJewelry);

 // ===================== InputKTP state =====================
 const ktpStandard = ref('');
 const ktpGeneral = ref('');
 const ktpTimestampOnly = ref('');
 const ktpTimestampPrefix = ref(sampleAssets.ktpDocument);
 const ktpError = ref('');
 const ktpPreviewFilled = ref(sampleAssets.ktpDocument);
 const ktpPreviewBlank = ref('');
 const ktpPreviewBroken = ref(sampleAssets.brokenUrl);
 const ktpPreviewTimestamp = ref(sampleAssets.ktpDocument);
 const ktpPreviewWithAction = ref(sampleAssets.ktpDocument);

 const lastEvent = ref('Belum ada event yang dipicu.');

 const handleEvent = (eventName, data) => {
 lastEvent.value = `[${new Date().toLocaleTimeString()}] ${eventName}: ${typeof data === 'object' ? JSON.stringify(data) : data}`;
 console.log(`[Playground Event: ${eventName}]`, data);
 };

 return {
 sampleAssets,
 // LG
 lgImage, lgPdf, lgCsv, lgAll, lgPrefilled, lgModalLoader, lgCustomMax, lgInlineLoading, lgWithAction,
 // SM
 smImage, smAll, smPdf, smCsv, smPrefilled, smModalLoader, smCustomMax, smWithAction,
 // KTP
 ktpStandard, ktpGeneral, ktpTimestampOnly, ktpTimestampPrefix, ktpError,
 ktpPreviewFilled, ktpPreviewBlank, ktpPreviewBroken, ktpPreviewTimestamp, ktpPreviewWithAction,
 lastEvent,
 handleEvent,
 };
 },
 template: `
 <div style="background-color: #f8fafc; min-height: 100vh; padding: 32px 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
 
 <!-- CSS Rule: Maksimal 3 Kolom per Row -->
 <component is="style">
 .h-fit {
 height: fit-content !important;
 }
 .pg-grid-3, .pg-grid-2, .pg-grid-1 {
 align-items: start;
 }
 .pg-grid-3 {
 display: grid;
 grid-template-columns: repeat(3, minmax(0, 1fr));
 gap: 20px;
 margin-bottom: 24px;
 }
 .pg-grid-2 {
 display: grid;
 grid-template-columns: repeat(2, minmax(0, 1fr));
 gap: 20px;
 margin-bottom: 24px;
 }
 .pg-grid-1 {
 display: grid;
 grid-template-columns: minmax(0, 1fr);
 gap: 20px;
 margin-bottom: 24px;
 }
 @media screen and (max-width: 1080px) {
 .pg-grid-3 {
 grid-template-columns: repeat(2, minmax(0, 1fr));
 }
 }
 @media screen and (max-width: 680px) {
 .pg-grid-3,
 .pg-grid-2 {
 grid-template-columns: minmax(0, 1fr);
 }
 }
 </component>

 <div style="max-width: 1280px; margin: 0 auto;">

 <!-- ============================================================= -->
 <!-- HERO BANNER -->
 <!-- ============================================================= -->
 <div style="background: #ffffff; border-radius: 16px; padding: 28px 32px; margin-bottom: 20px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
 <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
 <div>
 <div style="display: inline-flex; align-items: center; gap: 6px; background: #ecfdf5; color: #065f46; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px;">
 <span>Pegadaian UI Kit · Layout Maksimal 3 Kolom per Baris</span>
 </div>
 <h1 style="margin: 0 0 6px 0; color: #0f172a; font-weight: 800; font-size: 26px; line-height: 1.2;">
 Showcase Terpadu: 4 Komponen Upload & Preview Lengkap
 </h1>
 <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">
 Katalog interaktif yang menampilkan seluruh varian, state visual, perbandingan whitespace modal, dan tombol aksi approval (<code>#footer</code>).
 </p>
 </div>
 <div style="background: #f1f5f9; padding: 8px 16px; border-radius: 10px; border: 1px solid #e2e8f0; font-size: 13px; font-weight: 600; color: #475569;">
 Total: <span style="color: #004d43; font-weight: 800;">53 Varian Interaktif</span>
 </div>
 </div>
 </div>

 <!-- ============================================================= -->
 <!-- STICKY TOP NAVIGATION BAR -->
 <!-- ============================================================= -->
 <div style="position: sticky; top: 12px; z-index: 100; background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px); border-radius: 12px; padding: 10px 16px; margin-bottom: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
 <div style="font-weight: 700; font-size: 13px; color: #004d43; display: flex; align-items: center; gap: 6px;">
 <span>Navigasi Cepat (Maksimal 3 Kolom):</span>
 </div>
 <div style="display: flex; gap: 8px; flex-wrap: wrap;">
 <a href="#panel-lg" style="text-decoration: none; padding: 6px 12px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 6px; font-size: 12px; font-weight: 700; color: #065f46;">1. FilePickerLG (9)</a>
 <a href="#panel-sm" style="text-decoration: none; padding: 6px 12px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; font-size: 12px; font-weight: 700; color: #1e40af;">2. FilePickerSM (8)</a>
 <a href="#panel-iv" style="text-decoration: none; padding: 6px 12px; background: #fefce8; border: 1px solid #fde68a; border-radius: 6px; font-size: 12px; font-weight: 700; color: #854d0e;">3. ImageView (26)</a>
 <a href="#panel-ktp" style="text-decoration: none; padding: 6px 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; font-size: 12px; font-weight: 700; color: #166534;">4. InputKTP (10)</a>
 <a href="#panel-events" style="text-decoration: none; padding: 6px 12px; background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 12px; font-weight: 600; color: #475569;">Console</a>
 </div>
 </div>

 <!-- ============================================================= -->
 <!-- 1. FILEPICKER LG — 9 Varian -->
 <!-- ============================================================= -->
 <div id="panel-lg" style="background: #ffffff; border-radius: 16px; padding: 28px; margin-bottom: 32px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
 <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
 <div>
 <h2 style="margin: 0 0 4px 0; color: #0f172a; font-weight: 800; font-size: 20px; display: flex; align-items: center; gap: 8px;">
 <span>1. FilePickerLG (Large Drag & Drop Form Uploader) — 9 Varian</span>
 </h2>
 <p style="margin: 0; color: #64748b; font-size: 13px;">
 Area dropzone besar 160 px untuk upload gambar, dokumen PDF, berkas CSV, dan semua format dokumen.
 </p>
 </div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 6px; border: 1px solid #a7f3d0;">
 Large Dropzone · 9 Varian
 </span>
 </div>

 <!-- Subsection 1A: Tipe & Format Berkas (Max 3 Col: Row 1 = 3, Row 2 = 1) -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
 <span style="font-weight: 700; color: #15803d; font-size: 13px;">Tipe Berkas & Format File (Image, PDF, CSV, Multi-Format)</span>
 </div>
 <div class="pg-grid-3">

 <!-- LG 1: Image Only -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Image Only</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 1: Hanya Gambar (Default)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:image-only="true"</code> • Default props, maxSize 1 MB</div>
 </div>
 <FilePickerLG
 v-model="lgImage"
 :image-only="true"
 errorText="Ukuran melebihi 1 MB"
 @fileDropped="(f) => handleEvent('lgImage-drop', f)"
 @fileRemoved="() => handleEvent('lgImage-remove', null)"
 />
 </div>

 <!-- LG 2: PDF Only -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">PDF Only</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 2: Hanya Dokumen PDF</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:pdf-only="true"</code> • Filter khusus dokumen .pdf</div>
 </div>
 <FilePickerLG
 v-model="lgPdf"
 :image-only="false"
 :pdf-only="true"
 errorText="Hanya file PDF diperbolehkan"
 @fileDropped="(f) => handleEvent('lgPdf-drop', f)"
 @fileRemoved="() => handleEvent('lgPdf-remove', null)"
 />
 </div>

 <!-- LG 3: CSV Only -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">CSV Only</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 3: Hanya Berkas CSV</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:csv-only="true"</code> • Spreadsheet data tabel .csv</div>
 </div>
 <FilePickerLG
 v-model="lgCsv"
 :image-only="false"
 :csv-only="true"
 errorText="File harus berekstensi .csv"
 @fileDropped="(f) => handleEvent('lgCsv-drop', f)"
 @fileRemoved="() => handleEvent('lgCsv-remove', null)"
 />
 </div>

 <!-- LG 4: Semua Format Berkas -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Multi Format</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 4: Multi Format (Semua Berkas)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:image-only="false"</code> • Menerima PDF, DOC, XLS, Gambar</div>
 </div>
 <FilePickerLG
 v-model="lgAll"
 :image-only="false"
 :pdf-only="false"
 :csv-only="false"
 @fileDropped="(f) => handleEvent('lgAll-drop', f)"
 @fileRemoved="() => handleEvent('lgAll-remove', null)"
 />
 </div>
 </div>

 <!-- Subsection 1B: Fitur Lanjutan & Status Loading (Max 3 Col: Row 1 = 3, Row 2 = 1) -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
 <span style="font-weight: 700; color: #1d4ed8; font-size: 13px;">Fitur Lanjutan & Status Loading (Pre-filled, Modal Loader, Max 5MB, Inline)</span>
 </div>
 <div class="pg-grid-3">

 <!-- LG 5: Pre-filled URL Gambar -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Pre-filled File</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 5: Pre-filled URL Gambar</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:file="url"</code> • Otomatis memuat preview gambar awal</div>
 </div>
 <FilePickerLG
 :image-only="true"
 :file="lgPrefilled"
 @fileDropped="(f) => handleEvent('lgPrefilled-drop', f)"
 @fileRemoved="() => handleEvent('lgPrefilled-remove', null)"
 />
 </div>

 <!-- LG 6: Modal Loader -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Modal Loader</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 6: Loader Type Modal</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>loaderType="modal"</code> • Overlay loading animasi modal</div>
 </div>
 <FilePickerLG
 v-model="lgModalLoader"
 :image-only="true"
 loaderType="modal"
 @fileDropped="(f) => handleEvent('lgModal-drop', f)"
 @fileRemoved="() => handleEvent('lgModal-remove', null)"
 />
 </div>

 <!-- LG 7: Custom Max Size (5MB) -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Max Size 5MB</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 7: Custom Max Size (5 MB)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:max-size="5MB"</code> • Batas kapasitas berkas hingga 5 MB</div>
 </div>
 <FilePickerLG
 v-model="lgCustomMax"
 :image-only="true"
 :max-size="5 * 1024 * 1024"
 @fileDropped="(f) => handleEvent('lgMax5-drop', f)"
 @fileRemoved="() => handleEvent('lgMax5-remove', null)"
 />
 </div>

 <!-- LG 8: Inline Loader (isLoading) -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Inline Loading</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 8: Inline Loader State</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>loaderType="inline" :is-loading="true"</code> • Animasi proses</div>
 </div>
 <FilePickerLG
 v-model="lgInlineLoading"
 :image-only="true"
 loaderType="inline"
 :is-loading="true"
 />
 </div>
 </div>

 <!-- Subsection 1C: Action Buttons pada Preview Modal (1 Col) -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
 <span style="font-weight: 700; color: #b91c1c; font-size: 13px;">Action Buttons pada Preview Modal (Slot #footer)</span>
 </div>
 <div class="pg-grid-1">

 <!-- LG 9: Modal Preview dengan Action Buttons -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fef2f2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Modal Slot #footer</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">LG 9: Modal dengan Tombol Aksi (100% Lebar)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Klik foto &rarr; modal preview menampilkan tombol <b>Tutup</b> & <b>Unduh Berkas</b> membentang 100%</div>
 </div>
 <FilePickerLG
 :image-only="true"
 :file="lgWithAction"
 >
 <template #footer="{ hide }">
 <Button type="neutral" size="md" label="Tutup" class="w-100" @click="hide" />
 <Button type="primary" size="md" label="Unduh Berkas" class="w-100" @click="hide" />
 </template>
 </FilePickerLG>
 </div>
 </div>
 </div>

 <!-- ============================================================= -->
 <!-- 2. FILEPICKER SM — 8 Varian -->
 <!-- ============================================================= -->
 <div id="panel-sm" style="background: #ffffff; border-radius: 16px; padding: 28px; margin-bottom: 32px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
 <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
 <div>
 <h2 style="margin: 0 0 4px 0; color: #0f172a; font-weight: 800; font-size: 20px; display: flex; align-items: center; gap: 8px;">
 <span>2. FilePickerSM (Compact 80&times;80 px Upload Button) — 8 Varian</span>
 </h2>
 <p style="margin: 0; color: #64748b; font-size: 13px;">
 Tombol upload kompak 80×80 px dengan modal pemilihan Galeri & Kamera Webcam, pre-filled foto, dan action buttons modal preview.
 </p>
 </div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 6px; border: 1px solid #bfdbfe;">
 Compact 80×80 · 8 Varian
 </span>
 </div>

 <!-- Subsection 2A: Tipe Dokumen (Max 3 Col: Row 1 = 3, Row 2 = 1) -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
 <span style="font-weight: 700; color: #1d4ed8; font-size: 13px;">Tipe Berkas (Hanya Gambar, Semua Berkas, PDF, CSV)</span>
 </div>
 <div class="pg-grid-3">

 <!-- SM 1: Image Mode -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Image Only</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 1: Hanya Gambar</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:image-only="true"</code></div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="true"
 errorText="Gagal upload gambar"
 uniqueKey="sb-sm-img"
 @input="(f) => handleEvent('smImage-input', f)"
 />
 </div>
 </div>

 <!-- SM 2: All Documents -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Multi Format</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 2: Semua Berkas</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:image-only="false"</code></div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="false"
 :csv-only="false"
 uniqueKey="sb-sm-all"
 @input="(f) => handleEvent('smAll-input', f)"
 />
 </div>
 </div>

 <!-- SM 3: PDF Only -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">PDF Only</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 3: Hanya Dokumen PDF</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:pdf-only="true"</code></div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="false"
 :pdf-only="true"
 uniqueKey="sb-sm-pdf"
 errorText="File harus PDF"
 @input="(f) => handleEvent('smPdf-input', f)"
 />
 </div>
 </div>

 <!-- SM 4: CSV Only -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">CSV Only</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 4: Hanya Berkas CSV</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:csv-only="true"</code></div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="false"
 :csv-only="true"
 uniqueKey="sb-sm-csv"
 errorText="Hanya CSV"
 @input="(f) => handleEvent('smCsv-input', f)"
 />
 </div>
 </div>
 </div>

 <!-- Subsection 2B: Fitur Lanjutan (3 Col Pas) -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
 <span style="font-weight: 700; color: #15803d; font-size: 13px;">Fitur Lanjutan (Pre-filled Foto, Modal Loader, Max 5MB)</span>
 </div>
 <div class="pg-grid-3">

 <!-- SM 5: Pre-filled Foto -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Pre-filled File</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 5: Pre-filled Foto</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:file="url"</code></div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="true"
 :file="smPrefilled"
 uniqueKey="sb-sm-prefilled"
 @input="(f) => handleEvent('smPrefilled-input', f)"
 />
 </div>
 </div>

 <!-- SM 6: Modal Loader -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Modal Loader</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 6: Modal Loader</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>loaderType="modal"</code></div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="true"
 loaderType="modal"
 uniqueKey="sb-sm-modal"
 @input="(f) => handleEvent('smModal-input', f)"
 />
 </div>
 </div>

 <!-- SM 7: Custom Max Size (5 MB) -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Max Size 5MB</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 7: Max 5 MB</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:max-size="5MB"</code></div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="true"
 :max-size="5 * 1024 * 1024"
 uniqueKey="sb-sm-max5"
 errorText="Melebihi 5 MB"
 @input="(f) => handleEvent('smMax5-input', f)"
 />
 </div>
 </div>
 </div>

 <!-- Subsection 2C: Action Buttons pada Preview Modal (1 Col) -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
 <span style="font-weight: 700; color: #b91c1c; font-size: 13px;">Action Buttons pada Preview Modal (Slot #footer)</span>
 </div>
 <div class="pg-grid-1">

 <!-- SM 8: Modal Preview dengan Action Buttons -->
 <div class="h-fit" style="${CARD_CENTER}">
 <div>
 <span style="background: #fef2f2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Modal Slot #footer</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">SM 8: Modal Tombol Aksi (100% Lebar)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Klik foto &rarr; tombol <b>Batal</b> & <b>Gunakan Foto</b> membentang 100%</div>
 </div>
 <div style="display: flex; justify-content: center;">
 <FilePickerSM
 :image-only="true"
 :file="smWithAction"
 uniqueKey="sb-sm-action"
 >
 <template #footer="{ hide }">
 <Button type="neutral" size="md" label="Batal" class="w-100" @click="hide" />
 <Button type="primary" size="md" label="Gunakan Foto" class="w-100" @click="hide" />
 </template>
 </FilePickerSM>
 </div>
 </div>
 </div>
 </div>

 <!-- ============================================================= -->
 <!-- 3. IMAGEVIEW — 26 Varian -->
 <!-- ============================================================= -->
 <div id="panel-iv" style="background: #ffffff; border-radius: 16px; padding: 28px; margin-bottom: 32px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
 <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
 <div>
 <h2 style="margin: 0 0 4px 0; color: #0f172a; font-weight: 800; font-size: 20px; display: flex; align-items: center; gap: 8px;">
 <span></span>
 <span>3. ImageView (Display & Modal Preview Aspect Ratio Engine) — 26 Varian</span>
 </h2>
 <p style="margin: 0; color: #64748b; font-size: 13px;">
 Semua rasio aspek (3:2 utama, 1:1, KTP, 2:3), whitespace control (crop vs galeri mentah), trigger thumbnail 120×120 px, multi-slider, dan tombol aksi approval modal.
 </p>
 </div>
 <span style="background: #fefce8; color: #854d0e; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 6px; border: 1px solid #fde68a;">
 Aspect Ratio Engine · 26 Varian
 </span>
 </div>

 <!-- Subsection 3A: Rasio Utama Pegadaian (1:1 & 3:2) — 2 Kolom -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
 <span style="font-weight: 700; color: #15803d; font-size: 13px;">Rasio Utama Pegadaian (1:1 Square & 3:2 Landscape Standar Foto Jaminan)</span>
 </div>
 <div class="pg-grid-2">

 <!-- IV 1: 1:1 Square -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Rasio Utama 1:1</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 1: Emas Batangan (1:1)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Square crop simetris, previewable, zoom badge</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.goldBar"
 aspectRatio="1:1"
 width="100%"
 title="Foto Logam Mulia"
 previewable
 uploader="Penaksir Emas"
 date="01 Sep 2026"
 time="10:30"
 />
 </div>

 <!-- IV 2: 3:2 Landscape Standar Foto Jaminan -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Rasio Utama 3:2 (Landscape)</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 2: Kalung Emas 18K (3:2)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Standar foto kamera mendatar jaminan Pegadaian</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.goldJewelry"
 aspectRatio="3:2"
 width="100%"
 title="Kalung Emas 18K"
 previewable
 uploader="Ahli Madya Taksir"
 date="01 Sep 2026"
 time="13:20"
 />
 </div>
 </div>

 <!-- Subsection 3B: Rasio Dokumen & Identitas (e-KTP & 2:3 Portrait) — 2 Kolom Berpasangan -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
 <span style="font-weight: 700; color: #475569; font-size: 13px;">Rasio Dokumen & Identitas (e-KTP & 2:3 Portrait Sertifikat — Fit vs Letterbox)</span>
 </div>
 <div class="pg-grid-2">

 <!-- IV 3a: KTP Hasil Crop (Tanpa Whitespace) -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">KTP Crop (:whitespace="false")</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 3a: e-KTP Pas (Tanpa Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Hasil crop InputKTP, modal 532×336 px fit 100%</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.ktpDocument"
 aspectRatio="ktp"
 :whitespace="false"
 width="100%"
 title="Preview Crop InputKTP"
 previewable
 uploader="Customer Service"
 date="01 Sep 2026"
 time="08:30"
 />
 </div>

 <!-- IV 3b: KTP Dengan Whitespace Letterbox -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">KTP Mentah (:whitespace="true")</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 3b: e-KTP (Dengan Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Foto belum crop, letterbox putih 532×532 px</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.ktpDocument"
 aspectRatio="ktp"
 :whitespace="true"
 width="100%"
 title="Preview Galeri Mentah"
 previewable
 uploader="Customer Service"
 date="01 Sep 2026"
 time="08:30"
 />
 </div>

 <!-- IV 4a: 2:3 Portrait Hasil Crop (No Whitespace) -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">2:3 Crop (:whitespace="false")</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 4a: Sertifikat (Tanpa Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Hasil crop 2:3 presisi, modal fit tanpa celah</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.certificateDoc"
 aspectRatio="2:3"
 :whitespace="false"
 width="100%"
 title="Sertifikat Tanah (Fit)"
 previewable
 uploader="Staf Operasional"
 date="01 Sep 2026"
 time="09:15"
 />
 </div>

 <!-- IV 4b: 2:3 Portrait Whitespace Letterbox -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">2:3 Letterbox (:whitespace="true")</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 4b: Sertifikat (Dengan Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Kotak 532 px + letterbox putih di samping</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.certificateDoc"
 aspectRatio="2:3"
 :whitespace="true"
 width="100%"
 title="Sertifikat Tanah (Letterbox)"
 previewable
 uploader="Staf Operasional"
 date="01 Sep 2026"
 time="09:15"
 />
 </div>
 </div>

 <!-- Subsection 3C: Rasio Dynamic Lainnya (16:9, 4:3, 21:9, 3:4, 9:16) — Max 3 Kolom -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
 <span style="font-weight: 700; color: #1d4ed8; font-size: 13px;">Rasio Dynamic Lainnya (16:9, 4:3, 21:9, 3:4, 9:16)</span>
 </div>
 <div class="pg-grid-3">

 <!-- IV 5: 16:9 Landscape -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">16:9 Landscape</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 5: Gedung Cabang (16:9)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Widescreen video/foto bangunan outlet</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.branchBuilding"
 aspectRatio="16:9"
 width="100%"
 title="Kantor Cabang Pegadaian"
 previewable
 />
 </div>

 <!-- IV 6: 4:3 Standard -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">4:3 Standard</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 6: Foto Agunan TV/Monitor (4:3)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Format standar display digital/kamera lama</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.goldJewelry"
 aspectRatio="4:3"
 width="100%"
 title="Foto Barang 4:3"
 previewable
 />
 </div>

 <!-- IV 7: 21:9 Ultrawide -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">21:9 Ultrawide</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 7: Banner Panorama (21:9)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Sinematik panorama outlet/cabang</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.ultraWide"
 aspectRatio="21:9"
 width="100%"
 title="Panorama Cabang"
 previewable
 />
 </div>

 <!-- IV 8: 3:4 Portrait -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">3:4 Portrait</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 8: Foto Wajah Nasabah (3:4)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Pasfoto nasabah KYC & verifikasi profil</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.nasabahPortrait"
 aspectRatio="3:4"
 width="100%"
 title="Profil Nasabah"
 previewable
 />
 </div>

 <!-- IV 9: 9:16 Vertical Story -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">9:16 Story</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 9: Promosi Story Mobile (9:16)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Format vertikal penuh smartphone</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.storyVertical"
 aspectRatio="9:16"
 width="100%"
 title="Story Mobile"
 previewable
 />
 </div>
 </div>

 <!-- Subsection 3D: Mode Fit & Opsi Visual — 3 Kolom Pas -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #faf5ff; border-radius: 8px; border: 1px solid #e9d5ff;">
 <span style="font-weight: 700; color: #7c3aed; font-size: 13px;">Mode Fit & Opsi Visual (Contain, Fluid, Rounded=False)</span>
 </div>
 <div class="pg-grid-3">

 <!-- IV 10: Contain -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #faf5ff; color: #7c3aed; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">fit="contain"</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 10: Object-Fit Contain</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Gambar tampil utuh tanpa terpotong</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.branchBuilding"
 aspectRatio="1:1"
 fit="contain"
 width="100%"
 title="Contain Mode"
 previewable
 />
 </div>

 <!-- IV 11: Fluid -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #faf5ff; color: #7c3aed; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">fluid width</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 11: Fluid Width 100%</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:fluid="true"</code> mengisi kontainer induk</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.goldJewelry"
 aspectRatio="3:2"
 fluid
 title="Fluid Responsive"
 previewable
 />
 </div>

 <!-- IV 12: Rounded False -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #faf5ff; color: #7c3aed; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">rounded=false</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 12: Tanpa Rounded (Sudut Tajam)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Border-radius 0 untuk integrasi layout flat</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.goldBar"
 aspectRatio="3:2"
 :rounded="false"
 width="100%"
 title="No Rounded"
 previewable
 />
 </div>
 </div>

 <!-- Subsection 3E: Prop preview (Thumbnail Kompak 120x120px) — Max 3 Kolom -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #fefce8; border-radius: 8px; border: 1px solid #fde68a;">
 <span style="font-weight: 700; color: #854d0e; font-size: 13px;">Prop preview (Thumbnail Kompak 120×120 px &rarr; Modal Berbagai Rasio & Whitespace Control)</span>
 </div>
 <div class="pg-grid-3">

 <!-- IV 13a: Preview 120x120 -> Modal 2:3 Tanpa Whitespace -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">preview + :whitespace="false"</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 13a: Modal 2:3 Fit (Tanpa Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Hasil crop 2:3, modal fit 532×798 px tanpa celah</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.certificateDoc"
 preview
 modalRatio="2/3"
 :whitespace="false"
 title="Sertifikat SHM (Fit)"
 uploader="Verifikator Jaminan"
 date="01 Sep 2026"
 time="11:45"
 />
 </div>

 <!-- IV 13b: Preview 120x120 -> Modal 2:3 Dengan Whitespace -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">preview + :whitespace="true"</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 13b: Modal 2:3 Box (Dengan Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Batas tinggi 532 px + white space di samping</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.certificateDoc"
 preview
 modalRatio="2/3"
 :whitespace="true"
 title="Sertifikat SHM (Box)"
 uploader="Verifikator Jaminan"
 date="01 Sep 2026"
 time="11:45"
 />
 </div>

 <!-- IV 13c: Preview 120x120 -> Modal e-KTP Tanpa Whitespace -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">preview + KTP (:whitespace="false")</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 13c: Modal KTP Fit (Hasil Crop Pas)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Hasil crop InputKTP, modal 532×336 px fit 100%</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.ktpDocument"
 preview
 modalRatio="ktp"
 :whitespace="false"
 title="Crop e-KTP Nasabah"
 uploader="Customer Service"
 date="01 Sep 2026"
 time="09:00"
 />
 </div>

 <!-- IV 13d: Preview 120x120 -> Modal 1:1 Square -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">preview + Modal 1:1</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 13d: Modal 1:1 Square (Emas)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Thumbnail 120 px &rarr; modal 532×532 px square</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.goldBar"
 preview
 modalRatio="1/1"
 title="Emas Batangan 10g"
 uploader="Penaksir Logam"
 date="01 Sep 2026"
 time="10:00"
 />
 </div>

 <!-- IV 13e: Preview 120x120 -> Modal 3:4 Portrait -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">preview + Modal 3:4</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 13e: Modal 3:4 Portrait (Nasabah)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Thumbnail 120 px &rarr; modal 532×709 px portrait</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.nasabahPortrait"
 preview
 modalRatio="3/4"
 title="Pasfoto Nasabah"
 uploader="Petugas KYC"
 date="01 Sep 2026"
 time="14:00"
 />
 </div>

 <!-- IV 13f: Preview 120x120 -> Modal 16:9 Landscape -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">preview + Modal 16:9</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 13f: Modal 16:9 Landscape</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Thumbnail 120 px &rarr; modal 532×299 px</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.branchBuilding"
 preview
 modalRatio="16/9"
 title="Gedung Kantor Cabang"
 uploader="Admin Aset"
 date="01 Sep 2026"
 time="08:00"
 />
 </div>

 <!-- IV 13g: Preview 120x120 -> Modal 2:3 dengan Action Buttons -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fef2f2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">preview + Action Buttons</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 13g: Modal 2:3 + Tombol Approval</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Klik thumbnail 120 px &rarr; modal 2:3 ada tombol aksi 100%</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.certificateDoc"
 preview
 modalRatio="2/3"
 :whitespace="false"
 title="Approval Berkas Jaminan SHM"
 uploader="Notaris Rekanan"
 date="01 Sep 2026"
 time="15:30"
 >
 <template #footer="{ hide }">
 <Button type="danger" size="md" label="Tolak Berkas" class="w-100" @click="hide" />
 <Button type="primary" size="md" label="Setujui Berkas" class="w-100" @click="hide" />
 </template>
 </ImageView>
 </div>
 </div>

 <!-- Subsection 3F: Multi-Image Slider (Whitespace vs Fit) — 2 Kolom -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #eff6ff; border-radius: 8px; border: 1px solid #bfdbfe;">
 <span style="font-weight: 700; color: #1d4ed8; font-size: 13px;"> Multi-Image Slider (Dengan Whitespace Letterbox vs Tanpa Whitespace)</span>
 </div>
 <div class="pg-grid-2">

 <!-- IV 14a: Multi-Image Slider DENGAN Whitespace Letterbox -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fefce8; color: #854d0e; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Slider + :whitespace="true"</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 14a: Slider (Dengan Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Carousel 532 px + letterbox putih, gambar utuh tanpa crop</div>
 </div>
 <ImageView
 :images="sampleAssets.sliderImages"
 aspectRatio="3:2"
 :whitespace="true"
 width="100%"
 title="Perhiasan Emas (Letterbox Slider)"
 previewable
 uploader="Petugas Kasir"
 :dateImages="['01 Sep 2026', '01 Sep 2026', '01 Sep 2026']"
 :timeImages="['10:00', '10:05', '10:10']"
 />
 </div>

 <!-- IV 14b: Multi-Image Slider TANPA Whitespace -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Slider + :whitespace="false"</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 14b: Slider (Tanpa Whitespace)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Carousel cover fill 100%, tanpa batas putih di sisi samping</div>
 </div>
 <ImageView
 :images="sampleAssets.sliderImages"
 aspectRatio="3:2"
 :whitespace="false"
 width="100%"
 title="Perhiasan Emas (Fit Cover Slider)"
 previewable
 uploader="Petugas Kasir"
 :dateImages="['01 Sep 2026', '01 Sep 2026', '01 Sep 2026']"
 :timeImages="['10:00', '10:05', '10:10']"
 />
 </div>
 </div>

 <!-- Subsection 3G: Modal Action Buttons & Edge Cases — 3 Kolom Pas -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
 <span style="font-weight: 700; color: #b91c1c; font-size: 13px;"> Modal Action Buttons & Edge Cases (Approval Workflow, Broken, Empty State)</span>
 </div>
 <div class="pg-grid-3">

 <!-- IV 15: Action Buttons in Modal -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fef2f2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Slot #footer Action Buttons</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 15: Modal Tombol Approval (100%)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Klik foto &rarr; modal menampilkan tombol <b>Tolak</b> & <b>Setujui</b></div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.goldBar"
 aspectRatio="3:2"
 width="100%"
 title="Persetujuan Taksiran Emas"
 previewable
 uploader="Penaksir Madya"
 date="01 Sep 2026"
 time="11:30"
 >
 <template #footer="{ hide }">
 <Button type="danger" size="md" label="Tolak Taksiran" class="w-100" @click="hide" />
 <Button type="primary" size="md" label="Setujui & Taksir" class="w-100" @click="hide" />
 </template>
 </ImageView>
 </div>

 <!-- IV 16: Broken State -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fee2e2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Broken State</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 16: URL Gambar Rusak</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Menampilkan ilustrasi broken visual yang rapi</div>
 </div>
 <ImageView
 :imgSrc="sampleAssets.brokenUrl"
 aspectRatio="3:2"
 width="100%"
 title="Foto Rusak"
 errorText="Gagal memuat berkas"
 />
 </div>

 <!-- IV 17: Empty State -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Empty State</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">IV 17: State Tanpa Gambar</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Belum ada foto yang di-upload</div>
 </div>
 <ImageView
 imgSrc=""
 aspectRatio="3:2"
 width="100%"
 title="Belum Ada Foto"
 placeholderText="Belum ada berkas jaminan"
 />
 </div>
 </div>
 </div>

 <!-- ============================================================= -->
 <!-- 4. INPUTKTP — 10 Varian -->
 <!-- ============================================================= -->
 <div id="panel-ktp" style="background: #ffffff; border-radius: 16px; padding: 28px; margin-bottom: 32px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); border: 1px solid #e2e8f0;">
 <div style="border-bottom: 2px solid #f1f5f9; padding-bottom: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
 <div>
 <h2 style="margin: 0 0 4px 0; color: #0f172a; font-weight: 800; font-size: 20px; display: flex; align-items: center; gap: 8px;">
 <span>4. InputKTP (Camera Capture, KTP Guidance, Auto-Crop & View-Only) — 10 Varian</span>
 </h2>
 <p style="margin: 0; color: #64748b; font-size: 13px;">
 Semua mode (ktp/general/preview), timestamp, takenPrefix, error state, <b>preview-only dengan timestamp di modal</b>, dan <b>tombol aksi verifikasi modal</b>.
 </p>
 </div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 6px; border: 1px solid #a7f3d0;">
 Camera & KYC · 10 Varian
 </span>
 </div>

 <!-- Subsection 4A: Mode Edit (Upload & Kamera) — 3 Kolom Pas -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0;">
 <span style="font-weight: 700; color: #15803d; font-size: 13px;">Mode Interaktif Capture & Form Input (KTP Standard, General 1:1, Error State)</span>
 </div>
 <div class="pg-grid-3">

 <!-- KTP 1: Mode KTP Standard -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Mode KTP (Edit)</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 1: Mode KTP (Crop Guidance)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Frame panduan ISO 85.6/54 + Galeri / Kamera</div>
 </div>
 <InputKTP
 v-model="ktpStandard"
 mode="ktp"
 title="Foto e-KTP Nasabah"
 userName="Ahmad Wijaya"
 uniqueKey="sb-ktp-mode"
 :compressionMaxKb="512"
 @fileDropped="(f, k) => handleEvent('ktpStandard-drop', { f, k })"
 @fileRemoved="(k) => handleEvent('ktpStandard-remove', k)"
 />
 </div>

 <!-- KTP 2: Mode General 1:1 -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #eff6ff; color: #1e40af; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Mode General (1:1)</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 2: Mode General (Bebas 1:1)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Upload foto wajah / umum rasio 1:1</div>
 </div>
 <InputKTP
 v-model="ktpGeneral"
 mode="general"
 title="Upload Foto Nasabah"
 userName="Ahmad Wijaya"
 uniqueKey="sb-general-mode"
 :compressionMaxKb="1024"
 @fileDropped="(f, k) => handleEvent('ktpGeneral-drop', { f, k })"
 @fileRemoved="(k) => handleEvent('ktpGeneral-remove', k)"
 />
 </div>

 <!-- KTP 3: Mode KTP + Error Prop -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fee2e2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Error State</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 3: Dengan Error Validasi</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:error="'Wajib diisi'"</code> • Menampilkan pesan error</div>
 </div>
 <InputKTP
 v-model="ktpError"
 mode="ktp"
 title="Foto KTP (Wajib)"
 userName="Ahmad Wijaya"
 uniqueKey="sb-ktp-error"
 error="Foto KTP wajib diunggah"
 @fileDropped="(f, k) => handleEvent('ktpError-drop', { f, k })"
 />
 </div>
 </div>

 <!-- Subsection 4B: Timestamp Overlay pada Mode Edit — 2 Kolom -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
 <span style="font-weight: 700; color: #475569; font-size: 13px;"> Timestamp Overlay (Mode Edit: Timestamp Only, Timestamp + Taken Prefix)</span>
 </div>
 <div class="pg-grid-2">

 <!-- KTP 4: Timestamp Only -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Timestamp Only</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 4: Timestamp Tanpa Prefix</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:timestamp="true" :takenPrefix="false"</code></div>
 </div>
 <InputKTP
 v-model="ktpTimestampOnly"
 mode="ktp"
 title="Foto KTP + Timestamp"
 userName="Ahmad Wijaya"
 :timestamp="true"
 :takenPrefix="false"
 uniqueKey="sb-timestamp-only"
 @fileDropped="(f, k) => handleEvent('ktpTimestampOnly-drop', { f, k })"
 />
 </div>

 <!-- KTP 5: Timestamp + Taken Prefix -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Timestamp + Prefix</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 5: Timestamp & "Diambil Oleh:"</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;"><code>:timestamp="true" :takenPrefix="true"</code></div>
 </div>
 <InputKTP
 v-model="ktpTimestampPrefix"
 mode="ktp"
 userName="Ahmad Wijaya"
 :timestamp="true"
 :takenPrefix="true"
 uniqueKey="sb-timestamp-prefix"
 @fileDropped="(f, k) => handleEvent('ktpTimestampPrefix-drop', { f, k })"
 />
 </div>
 </div>

 <!-- Subsection 4C: Mode Preview (View Only / Read-Only) — 3 Kolom Pas -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #f5f3ff; border-radius: 8px; border: 1px solid #ddd6fe;">
 <span style="font-weight: 700; color: #6d28d9; font-size: 13px;">Mode Preview (View Only — State Filled, Blank, Broken)</span>
 </div>
 <div class="pg-grid-3">

 <!-- KTP 6: Preview - Filled Standard -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Preview Filled</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 6: State Filled (Ada Foto)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Read-only, klik foto untuk membuka zoom modal</div>
 </div>
 <InputKTP
 v-model="ktpPreviewFilled"
 mode="preview"
 userName="Ahmad Wijaya"
 uniqueKey="sb-preview-filled"
 />
 </div>

 <!-- KTP 7: Preview - Blank -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #f1f5f9; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Preview Blank</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 7: State Blank (Kosong)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Menampilkan placeholder <code>blank_img.svg</code></div>
 </div>
 <InputKTP
 v-model="ktpPreviewBlank"
 mode="preview"
 userName="Ahmad Wijaya"
 uniqueKey="sb-preview-blank"
 />
 </div>

 <!-- KTP 8: Preview - Broken -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fee2e2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Preview Broken</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 8: State Broken Image</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Fallback otomatis ke <code>broken_img.svg</code></div>
 </div>
 <InputKTP
 v-model="ktpPreviewBroken"
 mode="preview"
 userName="Ahmad Wijaya"
 uniqueKey="sb-preview-broken"
 />
 </div>
 </div>

 <!-- Subsection 4D: Preview Khusus: Timestamp & Action Buttons — 2 Kolom -->
 <div style="margin-bottom: 14px; padding: 8px 14px; background: #fef2f2; border-radius: 8px; border: 1px solid #fecaca;">
 <span style="font-weight: 700; color: #b91c1c; font-size: 13px;"> Preview Khusus: Timestamp Eksklusif di Modal & Action Buttons (Slot #footer)</span>
 </div>
 <div class="pg-grid-2">

 <!-- KTP 9: Preview Only DENGAN Timestamp di Modal -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #ecfdf5; color: #065f46; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Timestamp di Modal</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 9: Mode Preview + Timestamp Modal</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Thumbnail bersih, timestamp tampil eksklusif di dalam modal</div>
 </div>
 <InputKTP
 v-model="ktpPreviewTimestamp"
 mode="preview"
 title="Foto e-KTP Terverifikasi"
 userName="Siti Rahmawati"
 :timestamp="true"
 :takenPrefix="true"
 uniqueKey="sb-preview-timestamp"
 />
 </div>

 <!-- KTP 10: Preview Only DENGAN Action Buttons di Modal -->
 <div class="h-fit" style="${CARD}">
 <div>
 <span style="background: #fef2f2; color: #b91c1c; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px; display: inline-block; margin-bottom: 8px;">Modal Action Buttons</span>
 <div style="font-weight: 700; color: #1e293b; font-size: 14px; margin-bottom: 2px;">KTP 10: Modal Tombol Verifikasi (100%)</div>
 <div style="font-size: 12px; color: #64748b; margin-bottom: 14px; min-height: 34px; line-height: 1.35;">Klik foto &rarr; modal menampilkan tombol <b>Tolak</b> & <b>Verifikasi</b></div>
 </div>
 <InputKTP
 v-model="ktpPreviewWithAction"
 mode="preview"
 title="Verifikasi Dokumen KTP"
 userName="Ahmad Wijaya"
 :timestamp="true"
 :takenPrefix="true"
 uniqueKey="sb-preview-action"
 >
 <template #footer="{ close }">
 <Button type="danger" size="md" label="Tolak e-KTP" class="w-100" @click="close" />
 <Button type="primary" size="md" label="Verifikasi & Loloskan" class="w-100" @click="close" />
 </template>
 </InputKTP>
 </div>
 </div>
 </div>

 <!-- ============================================================= -->
 <!-- 5. EVENT DEBUG CONSOLE -->
 <!-- ============================================================= -->
 <div id="panel-events" style="background: #0f172a; border-radius: 16px; padding: 20px 24px; color: #e2e8f0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.12);">
 <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border-bottom: 1px solid #334155; padding-bottom: 8px;">
 <span style="font-weight: 700; color: #38bdf8;">Live Playground Event Dispatcher</span>
 <span style="color: #64748b; font-size: 11px;">Merekam event @fileDropped, @fileRemoved, @input, dll.</span>
 </div>
 <div style="color: #4ade80; word-break: break-all;">
 {{ lastEvent }}
 </div>
 </div>

 </div>
 </div>
 `,
 }),
};
