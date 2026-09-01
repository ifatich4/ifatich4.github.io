import ImageView from "../components/Image/ImageView.vue";
import Button from "../components/Button/Button.vue";
import sampleImage from "../assets/images/image13.png";
import bannerImage from "../assets/images/image-banner1.png";

// Real-world domain image sources matched specifically with context
const images = {
  // Barang Jaminan & Agunan
  goldBar: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=1200&h=800&auto=format&fit=crop&q=85",
  goldJewelry: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&h=800&auto=format&fit=crop&q=85",
  diamondRing: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=800&auto=format&fit=crop&q=85",
  propertyHouse: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=800&auto=format&fit=crop&q=85",
  vehicleCar: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&auto=format&fit=crop&q=85",

  // Dokumen & Identitas
  ktpDocument: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1000&h=630&auto=format&fit=crop&q=80",
  certificateDoc: "https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&h=1200&auto=format&fit=crop&q=85",
  selfiePortrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&auto=format&fit=crop&q=85",
  nasabahPortrait: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=1200&auto=format&fit=crop&q=85",

  // Lokasi & Promosi
  branchBuilding: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&auto=format&fit=crop&q=85",
  ultrawidePanorama: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1400&h=600&auto=format&fit=crop&q=85",
  storyVertical: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=720&h=1280&auto=format&fit=crop&q=85",
};

export default {
  title: 'Components/ImageView',
  component: ImageView,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### 🖼️ ImageView Component

Komponen \`ImageView\` adalah komponen serbaguna dari Pegadaian UI Kit Vue untuk menampilkan preview dan dokumen gambar secara responsif, estetik, dan interaktif.

#### ✨ Fitur Utama:
- **Preset Rasio Lengkap:** Mendukung \`1:1\`, \`4:3\`, \`3:2\`, \`16:9\`, \`21:9\`, \`9:16\`, \`3:4\`, \`2:3\`, \`ktp\` (85.6:54 ISO ID-1), serta custom rasio dinamis.
- **Mode Prop \`preview\`:** Trigger thumbnail terkunci pada ukuran **120 &times; 120 px (rasio 1:1)**, sedangkan modal preview-nya menyesuaikan \`aspect-ratio\` yang ditentukan.
- **Whitespace Letterboxing (3:2, KTP, 2:3):** Gambar yang tidak memiliki aspek rasio sama dengan modal akan ditampilkan utuh tanpa terpotong (contain) dengan latar belakang **white space** bersih dan tinggi maksimal mengikuti **nilai panjang image (1:1)**.
- **Integrasi ModalSlider / Lightbox:** Terhubung langsung dengan \`ModalSlider\` untuk preview gambar resolusi penuh, multi-slide carousel, informasi timestamp (\`uploader\`, \`date\`, \`time\`), dan slot \`#footer\` untuk tombol aksi approval.
- **State Handling Otomatis:** Deteksi otomatis error URL gambar dengan fallback visual yang rapi (*Broken State*) dan placeholder ketika belum ada gambar (*Empty State*).
        `,
      },
    },
  },
  decorators: [
    () => ({
      template: `
        <div style="width: 100%; max-width: 1080px; padding: 16px;">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'Judul/label di atas gambar',
    },
    modalTitle: {
      control: 'text',
      description: 'Judul modal preview saat dibuka (fallback ke title)',
    },
    imgSrc: {
      control: 'text',
      description: 'URL sumber gambar tunggal (alias: src)',
    },
    images: {
      control: 'object',
      description: 'Array URL gambar jika ingin menampilkan multi-slide carousel pada modal',
    },
    imgAlt: {
      control: 'text',
      description: 'Alt text untuk aksesibilitas gambar (alias: alt)',
    },
    imgBroken: {
      control: 'boolean',
      description: 'State manual ketika gambar rusak / gagal dimuat (alias: broken)',
    },
    aspectRatio: {
      control: {
        type: 'select',
      },
      options: ['1:1', '4:3', '3:2', '16:9', '21:9', '9:16', '3:4', '2:3', 'ktp', 'auto'],
      description: 'Rasio aspek kontainer gambar thumbnail (alias: aspect). Mendukung string preset atau angka decimal.',
      table: {
        defaultValue: { summary: '3:2' },
      },
    },
    modalRatio: {
      control: {
        type: 'select',
      },
      options: ['3:2', 'ktp', '2:3', '1:1', '16:9', '4:3', ''],
      description: 'Rasio khusus untuk modal preview ModalSlider (jika ingin berbeda dari aspectRatio)',
    },
    preview: {
      control: 'boolean',
      description: 'Mode preview: trigger thumbnail menjadi rasio 1:1 ukuran 120x120px, modal preview menyesuaikan aspect-ratio',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    previewable: {
      control: 'boolean',
      description: 'Mengaktifkan klik gambar untuk membuka lightbox preview modal',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    showZoomIcon: {
      control: 'boolean',
      description: 'Menampilkan badge ikon zoom / "Lihat" saat hover',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    fit: {
      control: {
        type: 'select',
      },
      options: ['cover', 'contain', 'fill', 'none', 'scale-down'],
      description: 'Mode penyesuaian CSS object-fit pada thumbnail',
      table: {
        defaultValue: { summary: 'cover' },
      },
    },
    fluid: {
      control: 'boolean',
      description: 'Mengisi 100% lebar kontainer induk',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    rounded: {
      control: 'text',
      description: 'Border radius (true = default 0.75rem, false = 0px, atau kustom seperti "1rem")',
      table: {
        defaultValue: { summary: 'true (0.75rem)' },
      },
    },
    uploader: {
      control: 'text',
      description: 'Nama / ID pengunggah untuk info timestamp di modal',
      table: {
        defaultValue: { summary: 'Unknown' },
      },
    },
    date: {
      control: 'text',
      description: 'Tanggal pengambilan foto (contoh: "01 Sep 2026")',
    },
    time: {
      control: 'text',
      description: 'Waktu pengambilan foto (contoh: "10:30")',
    },
    width: {
      control: 'text',
      description: 'Lebar kustom kontainer (contoh: "14rem", "200px", "100%")',
    },
    height: {
      control: 'text',
      description: 'Tinggi kustom kontainer (contoh: "8rem", "150px")',
    },
    placeholderText: {
      control: 'text',
      description: 'Teks saat tidak ada gambar (Empty State)',
    },
    errorText: {
      control: 'text',
      description: 'Teks error saat gambar gagal dimuat (Broken State)',
    },
    onClick: { action: 'clicked' },
    onPreview: { action: 'preview-opened' },
  },
  args: {
    title: 'Foto Barang Jaminan',
    imgSrc: images.goldBar,
    imgAlt: 'Foto Barang Jaminan Emas',
    imgBroken: false,
    aspectRatio: '3:2',
    fit: 'cover',
    fluid: false,
    preview: false,
    previewable: false,
    showZoomIcon: false,
  },
};

/**
 * 1. Default (Preset 3:2) — Foto Jaminan Logam Mulia
 */
export const Default = {
  args: {
    title: 'Foto Barang Jaminan (Preset 3:2)',
    imgSrc: images.goldBar,
    imgAlt: 'Foto Emas Batangan 24K',
    aspectRatio: '3:2',
    previewable: true,
    showZoomIcon: true,
    uploader: 'Penaksir / Hendra P.',
    date: '01 Sep 2026',
    time: '09:30',
  },
};

/**
 * 2. Semua Varian Rasio Aspek (Aspect Ratio Variants)
 */
export const AspectRatioVariants = {
  render: () => ({
    components: { ImageView },
    setup() {
      return { images };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-weight: 700;">Semua Varian Aspect Ratio</h4>
          <p style="color: #666; margin: 0; font-size: 14px;">
            Setiap varian rasio aspek menggunakan gambar yang sesuai dengan konteks dan orientasi aslinya.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; align-items: start;">
          <ImageView 
            title="1:1 (Square Avatar/Selfie)"
            aspect-ratio="1:1"
            :img-src="images.selfiePortrait"
            img-alt="Selfie Nasabah"
            previewable
            show-zoom-icon
            uploader="Nasabah / Budi"
            date="01 Sep 2026"
            time="08:45"
            width="100%"
          />
          <ImageView 
            title="4:3 (Foto Jaminan Standar)"
            aspect-ratio="4:3"
            :img-src="images.goldJewelry"
            img-alt="Kalung Emas"
            previewable
            show-zoom-icon
            uploader="Penaksir / Hendra"
            date="01 Sep 2026"
            time="09:00"
            width="100%"
          />
          <ImageView 
            title="3:2 (Classic Foto Emas)"
            aspect-ratio="3:2"
            :img-src="images.goldBar"
            img-alt="Emas Batangan"
            previewable
            show-zoom-icon
            uploader="Penaksir / Hendra"
            date="01 Sep 2026"
            time="09:15"
            width="100%"
          />
          <ImageView 
            title="16:9 (Foto Kantor Cabang)"
            aspect-ratio="16:9"
            :img-src="images.branchBuilding"
            img-alt="Gedung Pegadaian"
            previewable
            show-zoom-icon
            uploader="Admin Cabang"
            date="01 Sep 2026"
            time="08:00"
            width="100%"
          />
          <ImageView 
            title="21:9 (Panorama Ultrawide)"
            aspect-ratio="21:9"
            :img-src="images.ultrawidePanorama"
            img-alt="Panorama Lokasi Agunan"
            previewable
            show-zoom-icon
            uploader="Surveyor / Rian"
            date="01 Sep 2026"
            time="11:00"
            width="100%"
          />
          <ImageView 
            title="KTP Ratio (85.6:54 ISO ID-1)"
            aspect-ratio="ktp"
            :img-src="images.ktpDocument"
            img-alt="e-KTP Nasabah"
            previewable
            show-zoom-icon
            uploader="CS Cabang / Dewi"
            date="01 Sep 2026"
            time="09:20"
            width="100%"
          />
          <ImageView 
            title="3:4 (Foto Dokumen Vertikal)"
            aspect-ratio="3:4"
            :img-src="images.nasabahPortrait"
            img-alt="Foto Nasabah"
            previewable
            show-zoom-icon
            uploader="CS Cabang"
            date="01 Sep 2026"
            time="09:25"
            width="100%"
          />
          <ImageView 
            title="2:3 (Sertifikat / Surat)"
            aspect-ratio="2:3"
            :img-src="images.certificateDoc"
            img-alt="Sertifikat Emas"
            previewable
            show-zoom-icon
            uploader="Penaksir / Hendra"
            date="01 Sep 2026"
            time="09:30"
            width="100%"
          />
          <ImageView 
            title="9:16 (Story / Mobile Full)"
            aspect-ratio="9:16"
            :img-src="images.storyVertical"
            img-alt="Story Mobile"
            previewable
            show-zoom-icon
            uploader="Marketing"
            date="01 Sep 2026"
            time="10:00"
            width="100%"
          />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Katalog visual seluruh varian aspect ratio preset yang didukung secara native oleh ImageView dengan gambar yang relevan.',
      },
    },
  },
};

/**
 * 3. Mode Prop `preview` (Trigger 1:1 Ukuran 120x120px)
 */
export const PreviewPropMode = {
  args: {
    fit: "cover"
  },
  render:() => ({
    components: { ImageView },
    setup() {
      return { images };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-weight: 700;">Mode Prop preview (Trigger 120&times;120px)</h4>
          <p style="color: #666; margin: 0; font-size: 14px;">
            Ketika prop <code>preview="true"</code> diberikan, ukuran thumbnail pemicu otomatis terkunci pada <strong>120 &times; 120 px (1:1)</strong>, namun saat diklik modal preview-nya mengikuti <code>aspect-ratio</code> dokumen aslinya.
          </p>
        </div>

        <div style="display: flex; gap: 20px; flex-wrap: wrap; align-items: start;">
          <!-- 2:3 Modal Tanpa Whitespace (Hasil Crop) -->
          <div style="padding: 16px; border: 1px solid #bbf7d0; border-radius: 12px; background: #f0fdf4; width: 220px;">
            <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">2:3 Tanpa Whitespace</span>
            <div style="font-size: 12px; font-weight: 700; color: #166534; margin-bottom: 8px;">Trigger 120x120 &rarr; Modal 2:3 Fit</div>
            <ImageView 
              title="Sertifikat (Fit)"
              preview
              modalRatio="2/3"
              :whitespace="false"
              :img-src="images.certificateDoc"
              img-alt="Surat Sertifikat"
              show-zoom-icon
              uploader="Penaksir / Hendra"
              date="01 Sep 2026"
              time="14:00"
            />
          </div>

          <!-- 2:3 Modal Dengan Whitespace (Letterbox) -->
          <div style="padding: 16px; border: 1px solid #fde68a; border-radius: 12px; background: #fefce8; width: 220px;">
            <span style="background: #fef3c7; color: #b45309; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">2:3 Whitespace Letterbox</span>
            <div style="font-size: 12px; font-weight: 700; color: #854d0e; margin-bottom: 8px;">Trigger 120x120 &rarr; Modal 2:3 Box</div>
            <ImageView 
              title="Sertifikat (Letterbox)"
              preview
              modalRatio="2/3"
              :whitespace="true"
              :img-src="images.certificateDoc"
              img-alt="Surat Sertifikat"
              show-zoom-icon
              uploader="Penaksir / Hendra"
              date="01 Sep 2026"
              time="14:00"
            />
          </div>

          <!-- KTP Modal Tanpa Whitespace (Hasil Crop InputKTP) -->
          <div style="padding: 16px; border: 1px solid #bbf7d0; border-radius: 12px; background: #f0fdf4; width: 220px;">
            <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">KTP Tanpa Whitespace</span>
            <div style="font-size: 12px; font-weight: 700; color: #166534; margin-bottom: 8px;">Trigger 120x120 &rarr; Modal KTP Fit</div>
            <ImageView 
              title="e-KTP (Hasil Crop)"
              preview
              modalRatio="ktp"
              :whitespace="false"
              :img-src="images.ktpDocument"
              img-alt="Dokumen KTP"
              show-zoom-icon
              uploader="CS Cabang"
              date="01 Sep 2026"
              time="11:15"
            />
          </div>

          <!-- KTP Modal Dengan Whitespace (Foto Mentah) -->
          <div style="padding: 16px; border: 1px solid #fde68a; border-radius: 12px; background: #fefce8; width: 220px;">
            <span style="background: #fef3c7; color: #b45309; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">KTP Whitespace Letterbox</span>
            <div style="font-size: 12px; font-weight: 700; color: #854d0e; margin-bottom: 8px;">Trigger 120x120 &rarr; Modal KTP Box</div>
            <ImageView 
              title="e-KTP (Foto Mentah)"
              preview
              modalRatio="ktp"
              :whitespace="true"
              :img-src="images.ktpDocument"
              img-alt="Dokumen KTP"
              show-zoom-icon
              uploader="CS Cabang"
              date="01 Sep 2026"
              time="11:15"
            />
          </div>

          <!-- 1:1 Square Modal -->
          <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; width: 220px;">
            <span style="background: #e2e8f0; color: #334155; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">1:1 Square</span>
            <div style="font-size: 12px; font-weight: 700; color: #004d43; margin-bottom: 8px;">Trigger 120x120 &rarr; Modal 1:1</div>
            <ImageView 
              title="Foto Jaminan Emas"
              preview
              modalRatio="1/1"
              :img-src="images.goldBar"
              img-alt="Foto Jaminan Emas"
              show-zoom-icon
              uploader="Penaksir 01"
              date="01 Sep 2026"
              time="10:30"
            />
          </div>

          <!-- 3:4 Portrait Modal -->
          <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; width: 220px;">
            <span style="background: #e0e7ff; color: #4338ca; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">3:4 Portrait</span>
            <div style="font-size: 12px; font-weight: 700; color: #4338ca; margin-bottom: 8px;">Trigger 120x120 &rarr; Modal 3:4</div>
            <ImageView 
              title="Foto Nasabah"
              preview
              modalRatio="3/4"
              :img-src="images.nasabahPortrait"
              img-alt="Foto Nasabah Portrait"
              show-zoom-icon
              uploader="Petugas KYC"
              date="01 Sep 2026"
              time="14:30"
            />
          </div>

          <!-- 16:9 Modal -->
          <div style="padding: 16px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; width: 220px;">
            <span style="background: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">16:9 Landscape</span>
            <div style="font-size: 12px; font-weight: 700; color: #0284c7; margin-bottom: 8px;">Trigger 120x120 &rarr; Modal 16:9</div>
            <ImageView 
              title="Gedung Cabang"
              preview
              modalRatio="16/9"
              :img-src="images.branchBuilding"
              img-alt="Foto Lokasi Gedung"
              show-zoom-icon
              uploader="Admin Cabang"
              date="01 Sep 2026"
              time="15:45"
            />
          </div>

          <!-- 2:3 Modal Tanpa Whitespace DENGAN Action Buttons -->
          <div style="padding: 16px; border: 1px solid #fed7aa; border-radius: 12px; background: #fff7ed; width: 220px;">
            <span style="background: #ffedd5; color: #c2410c; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 4px; display: inline-block; margin-bottom: 6px;">Preview + Footer Action</span>
            <div style="font-size: 12px; font-weight: 700; color: #9a3412; margin-bottom: 8px;">120x120 &rarr; Modal 2:3 Action</div>
            <ImageView 
              title="Approval Berkas"
              preview
              modalRatio="2/3"
              :whitespace="false"
              :img-src="images.certificateDoc"
              img-alt="Surat Sertifikat"
              show-zoom-icon
              uploader="Notaris"
              date="01 Sep 2026"
              time="16:00"
            >
              <template #footer="{ hide }">
                <Button type="danger" size="md" label="Tolak" class="w-100" @click="hide" />
                <Button type="primary" size="md" label="Setujui" class="w-100" @click="hide" />
              </template>
            </ImageView>
          </div>
        </div>
      </div>
    `,
  }),
  parameters:{
    docs: {
      description: {
        story: 'Demonstrasi lengkap varian prop `preview` (thumbnail kompak 120x120 px) dengan berbagai rasio modal, perbandingan tanpa whitespace (:whitespace="false") vs dengan whitespace letterbox (:whitespace="true"), serta integrasi tombol aksi approval footer.',
      },
    },
  }
};

/**
 * 4. Whitespace Letterboxing pada Modal Preview (3:2, KTP, dan 2:3)
 */
export const WhitespaceModalPreview = {
  render: () => ({
    components: { ImageView },
    setup() {
      return { images };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-weight: 700;">Whitespace Letterboxing (3:2, KTP, & 2:3)</h4>
          <p style="color: #666; margin: 0; font-size: 14px;">
            Jika gambar asli tidak memiliki rasio yang sama dengan modal (misal foto portrait dimasukkan ke modal 3:2 landscape atau sebaliknya), modal akan menampilkan <strong>white space bersih</strong> (contain) dan membatasi tinggi maksimal hingga <strong>nilai panjang image (1:1 / square)</strong> agar foto tidak pernah terpotong.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <!-- Case 1: Modal 3:2 dengan Foto Portrait -->
          <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 12px; background: #fff;">
            <span style="display: inline-block; padding: 4px 8px; font-size: 11px; font-weight: 700; background: #e6f4ea; color: #137333; border-radius: 6px; margin-bottom: 8px;">Modal 3:2</span>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Foto Portrait dalam Modal 3:2</div>
            <p style="font-size: 12px; color: #666; margin-bottom: 12px;">Sisi kiri-kanan akan memiliki white space.</p>
            <ImageView 
              title="Foto Nasabah Portrait"
              aspect-ratio="3:2"
              fluid
              :img-src="images.nasabahPortrait"
              img-alt="Portrait in 3:2 Modal"
              previewable
              show-zoom-icon
              uploader="CS Cabang"
              date="01 Sep 2026"
              time="10:00"
            />
          </div>

          <!-- Case 2: Modal KTP dengan Foto Square -->
          <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 12px; background: #fff;">
            <span style="display: inline-block; padding: 4px 8px; font-size: 11px; font-weight: 700; background: #e8f0fe; color: #1a73e8; border-radius: 6px; margin-bottom: 8px;">Modal KTP</span>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Foto Persegi dalam Modal KTP</div>
            <p style="font-size: 12px; color: #666; margin-bottom: 12px;">Gambar utuh tanpa crop, sisi samping terisi white space.</p>
            <ImageView 
              title="Foto Selfie 1:1"
              aspect-ratio="ktp"
              fluid
              :img-src="images.selfiePortrait"
              img-alt="Square in KTP Modal"
              previewable
              show-zoom-icon
              uploader="Nasabah"
              date="01 Sep 2026"
              time="11:30"
            />
          </div>

          <!-- Case 3: Modal 2:3 dengan Foto Landscape -->
          <div style="padding: 16px; border: 1px solid #e0e0e0; border-radius: 12px; background: #fff;">
            <span style="display: inline-block; padding: 4px 8px; font-size: 11px; font-weight: 700; background: #fef7e0; color: #b06000; border-radius: 6px; margin-bottom: 8px;">Modal 2:3 (Portrait)</span>
            <div style="font-weight: 600; font-size: 14px; margin-bottom: 4px;">Foto Landscape dalam Modal 2:3</div>
            <p style="font-size: 12px; color: #666; margin-bottom: 12px;">Sisi atas & bawah terisi white space, tinggi maksimal nilai panjang (1:1).</p>
            <ImageView 
              title="Foto Mobil Agunan"
              aspect-ratio="2:3"
              fluid
              :img-src="images.vehicleCar"
              img-alt="Landscape Car in 2:3 Modal"
              previewable
              show-zoom-icon
              uploader="Surveyor Kendaraan"
              date="01 Sep 2026"
              time="14:15"
            />
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Uji interaksi modal pada foto dengan aspek rasio berbeda dari modalnya. Menjamin gambar tidak terdistorsi ataupun terpotong.',
      },
    },
  },
};

/**
 * 5. Real Case: CMS Pengajuan Gadai Pegadaian (Form Dokumen Nasabah)
 */
export const RealCasePengajuanGadai = {
  render: () => ({
    components: { ImageView, Button },
    setup() {
      return { images };
    },
    template: `
      <div style="padding: 24px; border: 1px solid #dcdcdc; border-radius: 16px; background: #fcfcfc;">
        <div style="margin-bottom: 20px; border-bottom: 1px solid #e5e5e5; padding-bottom: 12px;">
          <h4 style="margin: 0 0 4px 0; color: #004d43; font-weight: 700;">Pengajuan Gadai Emas — Berkas Jaminan Nasabah</h4>
          <p style="margin: 0; color: #666; font-size: 13px;">No. Pengajuan: <strong>PGD-2026-0901-0842</strong> | Nasabah: <strong>Budi Santoso</strong></p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
          <!-- 1. Foto Barang Jaminan Emas -->
          <div style="background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #eaeaea;">
            <ImageView 
              title="Foto Barang Jaminan (Emas)"
              preview
              aspect-ratio="3:2"
              :img-src="images.goldBar"
              img-alt="Foto Barang Jaminan Emas"
              show-zoom-icon
              uploader="Penaksir / Hendra"
              date="01 Sep 2026"
              time="09:15"
            />
            <div style="margin-top: 12px; font-size: 12px; color: #555;">
              <div><strong>Jenis:</strong> Logam Mulia 24K</div>
              <div><strong>Berat:</strong> 25.00 gram</div>
            </div>
          </div>

          <!-- 2. Dokumen e-KTP -->
          <div style="background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #eaeaea;">
            <ImageView 
              title="Foto e-KTP Nasabah"
              preview
              aspect-ratio="ktp"
              :img-src="images.ktpDocument"
              img-alt="e-KTP Nasabah"
              show-zoom-icon
              uploader="CS Cabang / Dewi"
              date="01 Sep 2026"
              time="09:10"
            />
            <div style="margin-top: 12px; font-size: 12px; color: #555;">
              <div><strong>NIK:</strong> 3174092108900004</div>
              <div><strong>Status:</strong> Terverifikasi Dukcapil</div>
            </div>
          </div>

          <!-- 3. Surat / Sertifikat Jaminan -->
          <div style="background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #eaeaea;">
            <ImageView 
              title="Sertifikat / Kwitansi"
              preview
              aspect-ratio="2:3"
              :img-src="images.certificateDoc"
              img-alt="Sertifikat Emas"
              show-zoom-icon
              uploader="Penaksir / Hendra"
              date="01 Sep 2026"
              time="09:18"
            />
            <div style="margin-top: 12px; font-size: 12px; color: #555;">
              <div><strong>No. Seri:</strong> ANTAM-894210</div>
              <div><strong>Tahun:</strong> 2024</div>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Contoh nyata implementasi ImageView dengan prop `preview` pada form verifikasi berkas pengajuan gadai CMS Pegadaian.',
      },
    },
  },
};

/**
 * 6. Real Case: Modal dengan Footer Action Buttons (Verifikasi Berkas e-KTP)
 */
export const RealCaseModalFooterAction = {
  render: () => ({
    components: { ImageView, Button },
    setup() {
      return { images };
    },
    template: `
      <div style="padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background: #fff; max-width: 400px;">
        <h5 style="margin: 0 0 12px 0; font-weight: 700;">Verifikasi Berkas KTP</h5>
        <ImageView 
          title="Dokumen e-KTP Nasabah"
          aspect-ratio="ktp"
          fluid
          :img-src="images.ktpDocument"
          img-alt="e-KTP Nasabah"
          previewable
          show-zoom-icon
          uploader="CS-004 / Rina"
          date="01 Sep 2026"
          time="10:45"
        >
          <template #footer="{ hide }">
            <Button class="me-2 mb-2" type="neutral" label="Tolak Dokumen" size="md" @click="hide" />
            <Button class="me-2 mb-2" type="primary" label="Verifikasi Dokumen" size="md" @click="hide" />
          </template>
        </ImageView>
        <p style="margin: 12px 0 0 0; font-size: 12px; color: #666;">
          Klik foto untuk melihat modal dengan tombol aksi <strong>Tolak</strong> dan <strong>Verifikasi</strong> di bagian footer.
        </p>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Slot `#footer` memungkinkan penambahan tombol aksi interaktif (misal tombol approval verifikasi) di bagian bawah modal preview.',
      },
    },
  },
};

/**
 * 7. Real Case: Multi-Slide Carousel Jaminan (Dengan Whitespace & Tanpa Whitespace)
 */
export const RealCaseMultiSlideCarousel = {
  render: () => ({
    components: { ImageView },
    setup() {
      return {
        imageList: [
          images.goldBar,
          images.certificateDoc,
          images.goldJewelry,
          images.diamondRing,
        ],
        dateImages: ['01 Sep 2026', '01 Sep 2026', '01 Sep 2026', '01 Sep 2026'],
        timeImages: ['09:30', '09:32', '09:35', '09:40'],
      };
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="margin: 0 0 8px 0; font-weight: 700;">Multi-Image Carousel / Slider Preview</h4>
          <p style="color: #666; margin: 0; font-size: 14px;">
            Mendukung navigasi multi-gambar dengan tombol prev/next keyboard & kontrol slider, timestamp spesifik per slide, serta opsi kontrol <strong>whitespace letterbox</strong>.
          </p>
        </div>

        <div style="display: flex; gap: 24px; flex-wrap: wrap; align-items: start;">
          <!-- 1. Slider DENGAN Whitespace Letterbox (:whitespace="true") -->
          <div style="padding: 20px; border: 1px solid #fde68a; border-radius: 12px; background: #fefce8; max-width: 360px; flex: 1; min-width: 300px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #fef3c7; color: #b45309; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">:whitespace="true"</span>
              <span style="font-size: 12px; font-weight: 700; color: #854d0e;">Slider + Whitespace Letterbox</span>
            </div>
            <ImageView 
              title="Slider Jaminan (Dengan Whitespace)"
              aspect-ratio="3:2"
              :whitespace="true"
              fluid
              :images="imageList"
              :date-images="dateImages"
              :time-images="timeImages"
              uploader="Penaksir Madya"
              previewable
              show-zoom-icon
            />
            <div style="margin-top: 12px; font-size: 12px; color: #713f12; line-height: 1.4;">
              <b>Letterbox Putih 532×532 px:</b> Gambar beragam orientasi (portrait 2:3 sertifikat, square 1:1 emas, landscape 3:2 kalung) ditampilkan <b>utuh tanpa crop</b> di dalam modal carousel.
            </div>
          </div>

          <!-- 2. Slider TANPA Whitespace (:whitespace="false") -->
          <div style="padding: 20px; border: 1px solid #bbf7d0; border-radius: 12px; background: #f0fdf4; max-width: 360px; flex: 1; min-width: 300px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">:whitespace="false"</span>
              <span style="font-size: 12px; font-weight: 700; color: #166534;">Slider Tanpa Whitespace (Cover)</span>
            </div>
            <ImageView 
              title="Slider Jaminan (Tanpa Whitespace)"
              aspect-ratio="3:2"
              :whitespace="false"
              fluid
              :images="imageList"
              :date-images="dateImages"
              :time-images="timeImages"
              uploader="Penaksir Madya"
              previewable
              show-zoom-icon
            />
            <div style="margin-top: 12px; font-size: 12px; color: #14532d; line-height: 1.4;">
              <b>Cover Fill 100%:</b> Gambar mengisi penuh kontainer slide carousel tanpa batas atau ruang putih di sisi tepi.
            </div>
          </div>

          <!-- 3. Prop preview (120x120px) dengan Multi-Slider Whitespace -->
          <div style="padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff; max-width: 360px; flex: 1; min-width: 300px;">
            <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 8px;">
              <span style="background: #e0f2fe; color: #0284c7; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 4px;">preview + :whitespace="true"</span>
              <span style="font-size: 12px; font-weight: 700; color: #0369a1;">Thumbnail 120px &rarr; Slider Box</span>
            </div>
            <ImageView 
              title="Form Jaminan Multi-Foto"
              preview
              :whitespace="true"
              :images="imageList"
              :date-images="dateImages"
              :time-images="timeImages"
              uploader="Penaksir Madya"
              show-zoom-icon
            />
            <div style="margin-top: 12px; font-size: 12px; color: #475569; line-height: 1.4;">
              <b>Form Thumbnail Ringkas:</b> Tampilan luar tetap kotak 120×120 px. Saat diklik membuka modal carousel slider multi-foto dengan letterbox putih bersih.
            </div>
          </div>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Perbandingan lengkap slider multi-gambar: mode dengan whitespace letterbox (:whitespace="true") untuk menampung gambar beragam orientasi secara utuh, mode tanpa whitespace (:whitespace="false") untuk cover penuh, dan pemicu thumbnail form kompak 120x120 px.',
      },
    },
  },
};

/**
 * 8. Semua State (Normal, Empty, dan Broken)
 */
export const AllComponentStates = {
  render: () => ({
    components: { ImageView },
    setup() {
      return { images };
    },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; width: 100%;">
        <ImageView 
          title="Normal State"
          aspect-ratio="16:9"
          fluid
          :img-src="images.branchBuilding"
          img-alt="Normal State"
          previewable
          show-zoom-icon
          uploader="Admin Cabang"
          date="01 Sep 2026"
          time="08:00"
        />
        <ImageView 
          title="Empty State (Tanpa Gambar)"
          aspect-ratio="16:9"
          fluid
          img-src=""
        />
        <ImageView 
          title="Broken State (Gagal Dimuat)"
          aspect-ratio="16:9"
          fluid
          img-src="https://invalid-broken-url.com/broken.png"
          :img-broken="true"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Perbandingan visual ketiga state: Normal (dengan gambar), Empty State (placeholder SVG saat kosong), dan Broken State (error SVG saat gambar gagal di-load).',
      },
    },
  },
};

/**
 * 9. Object Fit Comparison
 */
export const ObjectFitComparison = {
  render: () => ({
    components: { ImageView },
    setup() {
      return { images };
    },
    template: `
      <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <ImageView 
          title="fit: cover (Default)"
          aspect-ratio="1:1"
          fit="cover"
          :img-src="images.goldBar"
          img-alt="Cover"
          width="11.25rem"
        />
        <ImageView 
          title="fit: contain"
          aspect-ratio="1:1"
          fit="contain"
          :img-src="images.goldBar"
          img-alt="Contain"
          width="11.25rem"
        />
        <ImageView 
          title="fit: fill"
          aspect-ratio="1:1"
          fit="fill"
          :img-src="images.goldBar"
          img-alt="Fill"
          width="11.25rem"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Perbandingan efek properti CSS `object-fit` pada thumbnail kontainer 1:1.',
      },
    },
  },
};
