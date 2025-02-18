import BerandaHeader from "../components/Navbar/BerandaHeader.vue";
import Button from "../components/Button/Button.vue";
import InputDropdownHeader from "../components/Dropdown/InputDropdownHeader.vue";
import { ref } from "vue";
import InputDropdown from "../components/Dropdown/InputDropdown.vue";

  export default {
    title: 'Components/Navigation/BerandaHeader',
    component: BerandaHeader,
    tags: ['autodocs'],
    argTypes: {
        search: {
            description: "The default Vue slot",
            control: {
                type: 'text',
            },
        },
        riwayat: {
          description: "The default Vue slot",
          control: {
              type: 'text',
          },
        }, 
        notifikasi: {
          description: "The default Vue slot",
          control: {
              type: 'text',
          },
       },
       profil: {
        description: "The default Vue slot",
        control: {
            type: 'text',
        },
     },
    },
    args: {
      user: "Saiful Jamal",
      jabatan: "Pinca",
      label: "Beli Tabungan Emas",
    },
    render: (args) => ({
        components: { BerandaHeader, Button, InputDropdownHeader, InputDropdown },
        setup() {
          // const choosenValue = ref(true)
          const nilaiTerpilih = ref(null)
          const daftarPilihan = [
            { id: 1, img: "beli_emas", nama: "Pilihan Pilihanb", link: "asa" },
            { id: 2, img: "beli_emas", nama: "Pilihan 2", link: "b.html" },
            { id: 3, img: "beli_emas", nama: "Pilihan 3", link: "c.html" },
            { id: 4, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
            { id: 5, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
            { id: 6, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
            { id: 7, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
            { id: 8, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
            { id: 9, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
            { id: 10, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
            { id: 11, img: "beli_emas", nama: "Pilihan 4", link: "d.html" },
          ]
          return { args, daftarPilihan, nilaiTerpilih };
        },
        template: `
            <BerandaHeader v-bind="args">
              <template #search>
                ${args.search}
              </template>
              <template #riwayat>
                ${args.riwayat}
              </template>
              <template #notifikasi>
                ${args.notifikasi}
              </template>
            
              <template #profil>
               ${args.profil}
              </template>
            </BerandaHeader>
        `,
        computed: {
          propsWithoutSlot() {
              const all = this.$props;
              delete all.default
              return all;
          }
        }
        
      }),
  };

  export const BerandaNavbar = {
    args: {
      search:  
      `<InputDropdown
            v-model="nilaiTerpilih"
            :label="'Pilihan Anda'"
            :items="daftarPilihan"
            :itemValue="'id'"
            :itemImg="'img'"
            :itemText="'nama'"
            :itemLink="'link'"
            :placeholder="'Pengajuan kredit'"
            :class="'input-dropdown-kustom'"
            :error="teksError"
        />`,
      riwayat: `<Button type="link" size="md" label="Button Link" />`,
      notifikasi: 
      `<Button class="me-2 mb-2" type="link" size="md" label="Button Link" />
                <Button
                  class="me-2 mb-2"
                  type="secondary"
                  size="md"
                  label="Button Seccondary"
                />
                <Button
                  class="me-2 mb-2"
                  type="secondary"
                  size="md"
                  label="Button Seccondary"
        />
      `,
      profil: 
      `<Button class="me-2 mb-2" type="link" size="md" label="Button Link" />
                <Button
                  class="me-2 mb-2"
                  type="secondary"
                  size="md"
                  label="Button Seccondary"
                />
                <Button
                  class="me-2 mb-2"
                  type="secondary"
                  size="md"
                  label="Button Seccondary"
        />
      `
    }
  };






  
