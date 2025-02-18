<template>
  <div class="home">
    <div class="container">
      <button @click="scrollTo('btm-scroll')">Scroll Test</button>
      <BerandaHeader >
        <template #search>
          <InputDropdownHeader
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
          />
        </template>
        <template #riwayat>
          <Button type="link" size="md" label="Button Link" />
        </template>
        <template #notifikasi>
          <Button class="me-2 mb-2" type="link" size="md" label="Button Link" />
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
        </template>
       
        <template #profil>
          <Button class="me-2 mb-2" type="link" size="md" label="Button Link" />
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
        </template>
      </BerandaHeader>
      <LoadAnimate />

      <div class="row">
        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5>Button</h5>
              <p class="mb-0">
                <code
                  >&lt;Button type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <Button
                class="me-2 mb-2"
                type="primary"
                size="md"
                label="Button Primary"
                loading
              />
              <Button
                class="me-2 mb-2"
                type="secondary"
                size="md"
                label="Button Seccondary"
                icon
              >
                <template #icon>
                  <img src="path/to/icon.svg" />
                </template>
              </Button>
              <Button
                class="me-2 mb-2"
                type="neutral"
                size="md"
                label="Button Neutral"
              />
              <Button
                class="me-2 mb-2"
                type="tertiary"
                size="md"
                label="Button Tertiary"
              />
              <Button
                class="me-2 mb-2"
                type="link"
                size="md"
                label="Button Link"
              />
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5>Button</h5>
              <p class="mb-0">
                <code>&lt;Alert color="primary" label="md" &gt;</code>
              </p>
            </div>
            <div class="card-body">

              <Alert color="success" label="Lorem ipsum dolor sit amet" />
              <Alert color="info" label="Lorem ipsum dolor sit amet" />
              <Alert color="warning" label="Lorem ipsum dolor sit amet" />
              <Alert color="link" label="Lorem ipsum dolor sit amet" />
              <Alert color="danger" label="Lorem ipsum dolor sit amet" />
              <Alert  color="info" label="Lorem ipsum dolor sit amet" :hideAction=false v-if="showDismissibleAlert"> 
                <template #action>
                  <svg  v-on:click="showDismissibleAlert = false"  width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z" fill="#70717D"/>
                    <mask id="mask0_0_5362" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="6" width="13" height="13">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z" fill="white"/>
                    </mask>
                    <g mask="url(#mask0_0_5362)">
                    <rect width="24" height="24" fill="#FFFFFF"/>
                    </g>
                  </svg>
                </template>
              </Alert>

              <Alert
                class="variant"
                color="success"
                label="Lorem ipsum dolor sit amet"
              />
              <Alert
                class="variant"
                color="info"
                label="Lorem ipsum dolor sit amet"
              />
              <Alert
                class="variant"
                color="warning"
                label="Lorem ipsum dolor sit amet"
              />
              <Alert
                class="variant"
                color="danger"
                label="Lorem ipsum dolor sit amet"
              />
              <div class="card">
                <CardProduct/>
              </div>
              
              <CardEvent/>
              <CardArticleHighlight/>
              <CardFile/>
              <CardProduct/>
              <CardProductKonvensional/>
              <CardProductSyariah/>
              <CardPromo/>
              <CardPromoCode/>
              <CardVoucher/>
              <CardArticle/>

              <AlertVarian />
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="card">
            <div class="card-header">
              <h5>Input Field</h5>
              <p class="mb-0">
                <code
                  >&lt;Button type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <InputSmallDate
                v-model="selectedDate"
                id="birthdate"
                placeholder="sadf Tanggal Lahir"
              />
                <TestPicker
                    v-model="selectedDate"
                    id="birthdate"
                    placeholder="davin Tanggal Lahir"
                    :max-date="maxDate"
                />
              <p>Selected Date: {{ selectedDate }}</p>
              <DateRangePickerOption
                :disabled="false"
                placeholder="Pilih Tanggal Lahir"
                label="Date Range Picker"
                v-model:start-date="startDate"
                v-model:end-date="endDate"
              />
              <p>Selected Date: {{ startDate }} - {{ endDatex }}</p>
              <div class="row">
                <div class="col-md-4">
                  <TimePicker
                    label="Time Picker"
                    label-time="Waktu Akhir"
                    placeholder="Waktu Akhir"
                    v-model:timepicker="timePicker"
                  />
                  Timepicker : {{ timePicker }}
                </div>
              </div>
              <div>
                <BFormCheckbox
                  id="checkbox-1"
                  v-model="status"
                  name="checkbox-1"
                  value="accepted"
                  unchecked-value="not_accepted"
                >
                  I accept the terms and use
                </BFormCheckbox>

                <div>
                  State: <strong>{{ status }}</strong>
                </div>
              </div>
              <InputSmallText
                id="13"
                title="Test Juduls"
                icon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/640px-WhatsApp_icon.png"
                iconLabel="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/640px-WhatsApp_icon.png"
                iconRight="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/640px-WhatsApp_icon.png"
                required=""
                type="number"
              />

              <InputText
                id="ini-id"
                placeholder="hello world!"
                label="Ini Bisa Text"
              />

              <InputText
                id="ini-id"
                placeholder="hello world!"
                label="Ini Bisa Text"
                disabled
              />
              
              <InputText
                id="iniidnumber"
                color="red"
                placeholder="Test placeholder!"
                v-model="number"
                label="Ini Number Only"
                type="number"
              />
              <InputText
                id="iniidnumber"
                color="green"
                placeholder="Test placeholder!"
                v-model="number"
                label="Ini Number Only"
                type="number"
              />
              <InputText
                id="iniidnumber"
                color="blue"
                placeholder="Test placeholder!"
                v-model="number"
                label="Ini Number Only"
                type="number"
              />
              <InputText
                id="iniidnumber"
                color="orange"
                placeholder="Test placeholder!"
                v-model="number"
                label="Ini Number Only"
                type="number"
              />
              <InputText
                id="iniidnumber"
                placeholder="Test placeholder!"
                v-model="number"
                label="Ini Number Only"
                type="number"
              />

              <p>Selected Date: {{ number }}</p>

              <BButton @click="showPicker = true">Show Modal</BButton>
              <InputTimePicker
                v-model="showPicker"
                title="Pilih Waktu"
                :defaultHour="'14'"
                :defaultMinute="'30'"
                @activeTime="handleActiveTime"
              />
              <p>Selected Time: {{ selectedTime }}</p>

              <div class="d-flex align-items-center gap-3">
                <TimePickerResponsive
                  v-model="selectedTimes"
                  title="Time picker"
                  placeholder="Choose a time"
                  required
                  class="w-75"
                  error="Please select a valid time"
                  @selectedTimeUpdated="handleSelectedTime"
                />
              </div>
              <p>Selected Time: {{ selectedTimes }}</p>

              <InputText
                id="inisearch"
                placeholder="Cari data"
                v-model="text"
                type="search"
              />

              <InputNominalStart
                id="input-rupiah"
                label="Input Rupiah"
                v-model="rupiah"
              />
              {{ rupiah }}
              <InputNominalEnd id="15" title="Persentase DP" required="" />
              <InputTextArea id="16" />
              <Dropdown
                v-model="nilaiTerpilih"
                :label="'Pilihan Anda'"
                :items="daftarPilihan"
                :itemValue="'id'"
                :itemText="'nama'"
                :placeholder="'Pengajuan kredit'"
                :class="'input-dropdown-kustom'"
                :error="teksError"
              />
              <Dropdown
                v-model="nilaiTerpilih"
                :label="'Pilihan Anda'"
                :items="daftarPilihan"
                :itemValue="'id'"
                :itemText="'nama'"
                :placeholder="'Pengajuan kredit'"
                :class="'input-dropdown-kustom'"
                :error="teksError"
                disabled
              />
              <Dropdown
                v-model="nilaiTerpilih"
                :label="'Pilihan Anda'"
                :items="daftarPilihan"
                :itemValue="'id'"
                :itemText="'nama'"
                :placeholder="'Pengajuan kredit'"
                :class="'input-dropdown-kustom'"
                :error="teksError"
                color="red"
              />
              <Dropdown
                v-model="nilaiTerpilih"
                :label="'Pilihan Anda'"
                :items="daftarPilihan"
                :itemValue="'id'"
                :itemText="'nama'"
                :placeholder="'Pengajuan kredit'"
                :class="'input-dropdown-kustom'"
                :error="teksError"
                color="green"
              />
              <Dropdown
                v-model="nilaiTerpilih"
                :label="'Pilihan Anda'"
                :items="daftarPilihan"
                :itemValue="'id'"
                :itemText="'nama'"
                :placeholder="'Pengajuan kredit'"
                :class="'input-dropdown-kustom'"
                :error="teksError"
                color="blue"
              />
              <Dropdown
                v-model="nilaiTerpilih"
                :label="'Pilihan Anda'"
                :items="daftarPilihan"
                :itemValue="'id'"
                :itemText="'nama'"
                :placeholder="'Pengajuan kredit'"
                :class="'input-dropdown-kustom'"
                :error="teksError"
                color="orange"
              />
              <p>Selected: {{ nilaiTerpilih }}</p>

              <Accordion class="mb-2" v-model="modelAccordion">
                <AccordionItem header="Test header accordion" active>
                  <InputSmallDate
                    v-model="selectedDate"
                    id="birthdate"
                    placeholder="Pilih Tanggal Lahir"
                  />
                  <Dropdown
                    v-model="nilaiTerpilih"
                    :label="'Pilihan Anda'"
                    :items="daftarPilihan"
                    :itemValue="'id'"
                    :itemText="'nama'"
                    :placeholder="'Pengajuan kredit'"
                    :class="'input-dropdown-kustom'"
                    :error="teksError"
                  />
                </AccordionItem>
                <AccordionItem header="Test header accordion 2" active>
                  <InputSmallDate
                    v-model="selectedDate"
                    id="birthdate"
                    placeholder="Pilih Tanggal Lahir"
                  />
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-header">
                  <h5>Button</h5>
                  <p class="mb-0">
                    <code
                      >&lt;Button type="primary" size="md"
                      label="Button"&gt;</code
                    >
                  </p>
                </div>
                <div class="card-body">
                  <Breadcrumb
                    :items="[
                      'Beranda 1',
                      'Produk 2',
                      'Layanan Jasa 3',
                      'Safe Deposit Box 4',
                    ]"
                  />
                </div>
              </div>
            </div>

            <div class="col-lg-12 mt-4">
              <div class="card">
                <div class="card-header">
                  <h5>Button</h5>
                  <p class="mb-0">
                    <code
                      >&lt;Button type="primary" size="md"
                      label="Button"&gt;</code
                    >
                  </p>
                </div>
                <div class="card-body">
                  <AddAmount />
                </div>
              </div>
            </div>

            <div class="col-lg-12 mt-4">
              <div class="card">
                <div class="card-header">
                  <h5>Accordion</h5>
                  <p class="mb-0">
                    <code
                      >&lt;Button type="primary" size="md"
                      label="Button"&gt;</code
                    >
                  </p>
                  <p>
                    {{ modelAccordion }}
                  </p>
                </div>
                <div class="card-body">
                  <Accordion class="mb-2" v-model="modelAccordion">
                    <AccordionItem header="Test header accordion" active>
                      <InputNominalStart id="1" title="Nominal" required="" />
                      <InputNominalStart id="2" title="Nominal" required="" />
                      <InputNominalStart id="3" title="Nominal" required="" />
                    </AccordionItem>
                    <AccordionItem header="Test header accordion 2" active>
                      <InputNominalEnd id="4" title="Persentase DP" required="" />
                      <InputNominalEnd id="5" title="Persentase DP" required="" />
                      <InputNominalEnd id="6" title="Persentase DP" required="" />
                    </AccordionItem>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>File Picker</h5>
              <p class="mb-0">
                <code
                  >&lt;Button type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <FilePickerLG 
                v-model="selectedFile" 
                :showPreview="false" 
                errorText="ini text eror props"
                @fileDropped="handleFileDropped"
                @fileRemoved="handleFileRemoved"
                @errorPermission="handleErrorPermission"
              />
              <FilePickerLG
                v-model="selectedFile"
                :showPreview="false"
                file="https://study.com/cimages/multimages/16/fbaddressbar8652080276605805209.png"
                errorText="ini text eror props"
                @fileDropped="handleFileDropped"
                @fileRemoved="handleFileRemoved"
                @showUrlData="handleShowFile"
                @errorPermission="handleErrorPermission"
              />
              <FilePickerLG
                v-model="selectedFile"
                @fileDropped="handleFileDropped"
                @fileRemoved="handleFileRemoved"
                @errorPermission="handleErrorPermission"
              />

              <div v-if="selectedFile && selectedFile.fileName">
                  <p>Selected File: {{ selectedFile.fileName }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Modal</h5>
              <p class="mb-0">
                <code>&lt;Ini section modal"&gt;</code>
              </p>
            </div>
            <div class="card-body">
              <ModalComponent
                title="Test Modal"
                btnValue="Test Modal"
                class="mb-2"
              >
                <template v-slot:body>
                  <InputNominalEnd id="7" title="Persentase DP" required="" />
                  <InputNominalEnd id="8" title="Persentase DP" required="" />
                  <InputNominalEnd id="9" title="Persentase DP" required="" />
                </template>
                <template v-slot:footer>
                  <div class="row w-100">
                    <div class="col-xl-6 col-12">
                      <Button
                        type="secondary"
                        size="100"
                        label="Button Seccondary"
                      />
                    </div>
                    <div class="col-xl-6 col-12">
                      <Button
                        type="primary"
                        size="100"
                        label="Button Primary"
                      />
                    </div>
                  </div>
                </template>
              </ModalComponent>

              <ModalComponent
                title="Test Modal"
                btnValue="Test Modal"
                class="mb-2"
              >
                <template v-slot:body>
                  <div class="text-center">
                    <svg
                      width="328"
                      height="164"
                      viewBox="0 0 328 164"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.2189 161.504C33.6809 163.667 265.053 165.826 301.876 161.504C312.777 160.224 321.503 148.276 322.776 146.203C330.736 133.238 327.751 53.2794 325.761 26.266C324.69 11.7278 309.838 5.19571 302.871 3.03482C289.548 -1.09779 53.2799 -1.26366 22.2229 4.11573C8.32787 6.52168 3.29087 17.8712 2.29087 24.1796C-0.0421274 38.8847 -1.42113 129.331 2.31887 141.514C5.30487 151.239 12.7689 159.343 23.2189 161.504Z"
                        fill="#BBF0D3"
                      />
                      <mask
                        id="mask0_898_7325"
                        style="mask-type: luminance"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="328"
                        height="164"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M23.2189 161.504C33.6809 163.667 265.053 165.826 301.876 161.504C312.777 160.224 321.503 148.276 322.776 146.203C330.736 133.238 327.751 53.2794 325.761 26.266C324.69 11.7278 309.838 5.19571 302.871 3.03482C289.548 -1.09779 53.2799 -1.26366 22.2229 4.11573C8.32787 6.52168 3.29087 17.8712 2.29087 24.1796C-0.0421274 38.8847 -1.42113 129.331 2.31887 141.514C5.30487 151.239 12.7689 159.343 23.2189 161.504Z"
                          fill="white"
                        />
                      </mask>
                      <g mask="url(#mask0_898_7325)">
                        <path
                          d="M0 164H328V6.10352e-05H0V164Z"
                          fill="#F8FBEA"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M47.8862 111C56.6325 106.237 66.1848 98.1124 68.7759 87.5849C72.1621 73.831 60.6193 72.6537 62.9968 67.84C66.0667 61.6236 76.2895 59.1186 76.9566 50.1987C77.7418 39.7062 67.6058 37.2455 68.111 32.0353C68.8226 24.6919 69.5237 9.12262 62.9309 7.19232C55.7248 5.08211 54.4318 20.9035 52.5424 27.2134C50.5652 33.8218 42.0512 27.5945 37.7634 34.94C32.1282 44.5948 42.1313 53.2976 39.1537 59.1224C35.924 65.4399 22.5929 64.1019 18.5281 75.8395C15.9046 83.4147 16.4894 92.0382 21.6106 101.042C29.3927 104.373 39.3173 107.558 47.8862 111Z"
                          fill="#84D7CC"
                        />
                        <path
                          d="M42 87.0001C42 87.0001 54.1483 58.8298 62 25.0001"
                          stroke="white"
                          stroke-width="0.78057"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M19.9733 42.7952C21.5888 47.9582 28.5414 43.0925 32.0429 48.8322C36.6453 56.3754 28.4766 63.1755 30.9078 67.7271C33.5455 72.6634 44.4325 71.6182 47.7523 80.7887C49.4349 85.4381 49.5014 90.593 47.4253 96.0001H9.41599C8.20471 94.1249 7.26746 92.1094 6.71614 89.9663C3.95143 79.2195 13.3774 78.2999 11.4359 74.5386C8.92846 69.6811 0.580799 67.7238 0.0354233 60.7541C-0.605621 52.5559 7.67176 50.6335 7.25935 46.5624C6.67776 40.8243 6.10536 28.6589 11.4894 27.1506C11.8526 27.049 12.198 27.0001 12.5256 27.0001C17.5069 26.9995 18.5269 38.1686 19.9733 42.7952Z"
                          fill="#B3EC91"
                        />
                        <path
                          d="M32 106C32 106 19.852 76.4664 12 41.0001"
                          stroke="white"
                          stroke-width="0.63014"
                          stroke-linecap="round"
                        />
                        <path
                          d="M18 62.0001L26 52.0001"
                          stroke="white"
                          stroke-width="0.63014"
                          stroke-linecap="round"
                        />
                        <path
                          d="M0 77.0001L328 10.0001V192.5H0L0 77.0001Z"
                          fill="#CFE163"
                        />
                        <path
                          d="M0 77.0001L328 10.0001L328 125.5L0 192.5L0 77.0001Z"
                          fill="#E5EFAC"
                        />
                        <rect
                          x="48.1437"
                          y="100.301"
                          width="100"
                          height="45.4545"
                          rx="10.9091"
                          transform="rotate(-12.1032 48.1437 100.301)"
                          fill="#00883E"
                        />
                        <rect
                          x="47"
                          y="94.9673"
                          width="100"
                          height="45.4545"
                          rx="10.9091"
                          transform="rotate(-12.1032 47 94.9673)"
                          fill="#00AB4E"
                        />
                        <path
                          d="M75.793 109.017L72.6499 109.691L72.2626 107.885L80.7674 106.061L81.1547 107.867L78.0116 108.541L79.7744 116.762L77.5558 117.237L75.793 109.017Z"
                          fill="white"
                        />
                        <path
                          d="M81.9346 105.811L88.8466 104.328L89.2156 106.049L84.4654 107.068L84.9686 109.415L89.4344 108.457L89.8034 110.178L85.3377 111.136L85.8775 113.653L90.6277 112.634L90.9967 114.355L84.0847 115.837L81.9346 105.811Z"
                          fill="white"
                        />
                        <path
                          d="M101.219 112.163L98.8014 112.681L96.3801 109.854C96.185 109.638 95.9767 109.499 95.7553 109.437C95.5318 109.366 95.2683 109.363 94.9649 109.428L93.8698 109.663L94.7054 113.56L92.5152 114.029L90.3651 104.003L94.9731 103.015C96.1488 102.763 97.0912 102.833 97.8004 103.227C98.517 103.608 98.98 104.288 99.1894 105.264C99.3521 106.023 99.275 106.704 98.9581 107.307C98.6507 107.909 98.1303 108.372 97.3969 108.698C97.9468 108.719 98.468 108.999 98.9604 109.538L101.219 112.163ZM95.6006 107.536C96.2358 107.4 96.6723 107.193 96.91 106.913C97.1456 106.625 97.2126 106.244 97.111 105.77C97.0073 105.286 96.7898 104.966 96.4586 104.809C96.1274 104.651 95.6442 104.641 95.0089 104.777L92.8898 105.232L93.4815 107.991L95.6006 107.536Z"
                          fill="white"
                        />
                        <path
                          d="M100.337 101.864L102.556 101.389L104.706 111.415L102.487 111.891L100.337 101.864Z"
                          fill="white"
                        />
                        <path
                          d="M114.501 98.8271L116.651 108.854L114.703 109.272L113.428 103.327L112.045 108.116L110.623 108.421L107.41 104.677L108.673 110.565L106.724 110.982L104.574 100.956L106.323 100.581L110.866 106.018L112.78 99.1961L114.501 98.8271Z"
                          fill="white"
                        />
                        <path
                          d="M124.891 104.766L120.226 105.766L119.749 108.189L117.516 108.668L119.974 97.6536L121.751 97.2723L128.51 106.311L126.319 106.78L124.891 104.766ZM123.805 103.243L121.393 99.8335L120.591 103.933L123.805 103.243Z"
                          fill="white"
                        />
                        <rect
                          x="172.144"
                          y="73.3006"
                          width="100"
                          height="45.4545"
                          rx="10.9091"
                          transform="rotate(-12.1032 172.144 73.3006)"
                          fill="#8B181B"
                        />
                        <rect
                          x="171"
                          y="67.9673"
                          width="100"
                          height="45.4545"
                          rx="10.9091"
                          transform="rotate(-12.1032 171 67.9673)"
                          fill="#AE1E22"
                        />
                        <path
                          d="M203.349 81.2545L200.206 81.9285L199.818 80.1223L208.323 78.2985L208.71 80.1047L205.567 80.7787L207.33 88.9991L205.111 89.4749L203.349 81.2545Z"
                          fill="white"
                        />
                        <path
                          d="M215.706 87.3368C214.711 87.5502 213.799 87.5277 212.97 87.2691C212.148 86.999 211.456 86.5226 210.893 85.84C210.328 85.148 209.934 84.2804 209.71 83.2375C209.486 82.1945 209.491 81.2464 209.725 80.393C209.956 79.5301 210.392 78.8118 211.033 78.238C211.683 77.6623 212.506 77.2676 213.501 77.0542C214.497 76.8407 215.404 76.8642 216.224 77.1249C217.053 77.3835 217.75 77.8588 218.315 78.5509C218.878 79.2335 219.271 80.0963 219.495 81.1392C219.718 82.1822 219.714 83.1351 219.483 83.998C219.249 84.8513 218.809 85.5707 218.161 86.1559C217.52 86.7297 216.702 87.1233 215.706 87.3368ZM215.337 85.6159C216.172 85.437 216.763 85.0027 217.111 84.3132C217.468 83.6217 217.528 82.7213 217.29 81.6119C217.052 80.5026 216.634 79.7096 216.036 79.2329C215.436 78.7467 214.714 78.5941 213.87 78.775C213.027 78.956 212.431 79.3912 212.083 80.0807C211.742 80.7587 211.691 81.6524 211.929 82.7617C212.166 83.871 212.585 84.6688 213.186 85.155C213.786 85.6412 214.503 85.7948 215.337 85.6159Z"
                          fill="white"
                        />
                        <path
                          d="M220.115 75.7698L222.334 75.294L224.097 83.5144L228.577 82.5537L228.964 84.3599L222.265 85.7964L220.115 75.7698Z"
                          fill="white"
                        />
                        <path
                          d="M236.488 80.4257L231.823 81.4261L231.346 83.8491L229.113 84.3279L231.571 73.3132L233.349 72.9319L240.107 81.9704L237.917 82.4401L236.488 80.4257ZM235.403 78.9031L232.991 75.4931L232.189 79.5923L235.403 78.9031Z"
                          fill="white"
                        />
                        <path
                          d="M247.516 80.3815L242.173 76.6926L243.164 81.3148L240.946 81.7905L238.796 71.7639L241.014 71.2882L241.96 75.697L245.224 70.3854L247.841 69.8243L244.204 75.6174L250.176 79.8112L247.516 80.3815Z"
                          fill="white"
                        />
                        <path
                          d="M306.162 68.1365C304.02 68.9168 301.541 68.2794 300.051 66.4088C298.604 64.5866 297.213 63.694 293.82 62.414C291.02 61.3542 289.599 58.2263 290.654 55.4154C291.714 52.6159 294.842 51.1939 297.653 52.2496C302.087 53.9206 305.461 55.7467 308.557 59.664C310.416 62.0167 310.018 65.4352 307.676 67.2895C307.21 67.6649 306.695 67.9424 306.162 68.1365Z"
                          fill="#F2CBA8"
                        />
                        <path
                          d="M298.973 72.9639C297.091 73.6493 294.909 73.2631 293.358 71.7873C291.962 70.4597 290.186 69.5663 287.934 68.4227C285.984 67.4386 283.766 66.3208 281.317 64.6713C278.832 62.9961 278.171 59.6297 279.842 57.1338C281.517 54.6492 284.895 53.9835 287.379 55.6587C289.249 56.9159 291.06 57.8351 292.821 58.7214C295.511 60.078 298.293 61.4779 300.852 63.9219C303.02 65.9951 303.103 69.4308 301.03 71.5982C300.441 72.2365 299.732 72.6873 298.973 72.9639Z"
                          fill="#F2CBA8"
                        />
                        <path
                          d="M285.469 76.0343C283.826 76.633 281.928 76.4259 280.425 75.3303C279.658 74.7753 278.987 74.2749 278.337 73.793C275.77 71.8911 275.33 72.7729 271.366 70.4555C268.775 68.9473 266.491 63.371 267.999 60.7803C269.507 58.1897 272.837 57.3231 275.428 58.8313C279.896 61.44 282.058 63.0402 284.781 65.0523C285.412 65.5156 286.062 65.9975 286.798 66.5381C289.224 68.2989 289.768 71.6952 288.008 74.1211C287.338 75.0325 286.444 75.6792 285.469 76.0343Z"
                          fill="#F2CBA8"
                        />
                        <path
                          d="M291.88 114.227C281.026 111.673 273.474 91.7529 263.319 77.9034C277.123 65.1206 289.614 57.579 308.361 60.0566C311.184 64.2728 314.134 76.7661 316.726 88.0527C317.113 89.738 317.976 91.2756 319.214 92.4829L335.517 108.382L323.5 152L291.88 114.227Z"
                          fill="#F2CBA8"
                        />
                        <path
                          d="M264.008 87.2577C269.205 93.0669 273.286 93.9336 274.678 93.6407L296 115C291.294 115.003 282.562 112.464 276.131 111.726C268.092 110.803 261.596 103.542 258.604 98.8545C255.613 94.1673 246.178 84.1251 249.318 80.4133C252.459 76.7015 257.511 79.9963 264.008 87.2577Z"
                          fill="#F2CBA8"
                        />
                        <path
                          d="M247.216 41.8421C248.908 44.7946 250.964 47.4089 253.415 50.0467C255.834 52.67 258.532 55.32 261.183 58.0514C263.846 60.7787 266.484 63.5792 269.066 66.4384C271.655 69.2822 274.159 72.2085 276.64 75.143C278.897 77.8128 278.564 81.7982 275.898 84.0659C273.229 86.3223 269.243 85.9897 266.976 83.324C266.837 83.1561 266.711 82.9841 266.588 82.8234L266.564 82.7935C262.389 76.689 258.028 70.7805 253.362 64.9834C251.041 62.0673 248.619 59.1884 246.223 56.0301C243.828 52.9101 241.535 49.3293 239.836 45.5451C238.912 43.4681 239.837 41.0386 241.914 40.115C243.859 39.2523 246.112 40.0105 247.15 41.802L247.216 41.8421Z"
                          fill="#F2CBA8"
                        />
                        <mask
                          id="mask1_898_7325"
                          style="mask-type: alpha"
                          maskUnits="userSpaceOnUse"
                          x="267"
                          y="51"
                          width="43"
                          height="26"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M280.425 75.3303C281.928 76.4259 283.826 76.633 285.469 76.0343C286.444 75.6792 287.338 75.0325 288.008 74.1211C289.18 72.5055 289.331 70.4595 288.584 68.7528C290.531 69.7457 292.099 70.5899 293.358 71.7871C294.909 73.263 297.091 73.6492 298.973 72.9638C299.732 72.6871 300.441 72.2364 301.03 71.5981C301.958 70.628 302.454 69.4039 302.524 68.1616C303.69 68.5659 304.978 68.5679 306.162 68.1364C306.695 67.9423 307.21 67.6648 307.677 67.2894C310.018 65.4351 310.416 62.0166 308.557 59.6639C305.461 55.7466 302.087 53.9204 297.653 52.2495C294.842 51.1938 291.714 52.6157 290.654 55.4153C290.406 56.0761 290.295 56.7544 290.306 57.4192C289.346 56.8971 288.371 56.3254 287.379 55.6586C284.895 53.9834 281.517 54.6491 279.842 57.1337C279.05 58.3164 278.782 59.6947 278.983 60.9958C277.961 60.3423 276.804 59.6346 275.428 58.8313C272.837 57.3231 269.507 58.1897 267.999 60.7803C266.491 63.371 268.775 68.9473 271.366 70.4555C273.325 71.6009 274.423 71.9647 275.343 72.2694C276.284 72.5812 277.039 72.8311 278.337 73.793C278.459 73.8834 278.582 73.9746 278.706 74.0666C279.242 74.4647 279.802 74.8795 280.425 75.3303Z"
                            fill="#F2CBA8"
                          />
                        </mask>
                        <g mask="url(#mask1_898_7325)">
                          <path
                            d="M295.114 59.8784C294.165 58.6836 291.248 58.0773 288.722 56.4299C291.042 57.5106 296.03 58.5176 296.814 59.2591C297.597 60.0006 297.108 63.0032 296.765 64.4118C296.61 63.3985 296.063 61.0733 295.114 59.8784Z"
                            fill="#E79E5C"
                          />
                          <path
                            d="M283.214 64.2137C282.1 62.5655 279.759 61.1929 278.729 60.7126C280.326 60.9864 283.758 61.8329 284.707 63.0277C285.656 64.2226 287.34 70.8411 288.063 74.001C286.911 71.4253 284.328 65.8619 283.214 64.2137Z"
                            fill="#E79E5C"
                          />
                          <path
                            d="M276.47 75.6567C273.705 69.4751 269.268 65.8709 267.395 64.8414C268.993 65.1153 272.507 66.1884 273.787 68.29C275.066 70.3915 276.109 74.0768 276.47 75.6567Z"
                            fill="#E79E5C"
                          />
                        </g>
                      </g>
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M157.401 10.4034C155.686 10.1579 153.972 10.1816 152.259 10.478C150.325 10.8119 148.578 11.511 147.015 12.5737C145.453 13.6364 144.146 14.8749 143.092 16.2869C142.041 17.7003 141.269 19.2112 140.778 20.8188C140.286 22.4281 140.143 23.9438 140.352 25.3681C140.422 25.7739 140.597 26.0777 140.876 26.2787C141.155 26.4813 141.459 26.5539 141.787 26.4974L146.218 25.7316C146.692 25.6499 147.01 25.481 147.173 25.2223C147.334 24.9655 147.468 24.5988 147.573 24.1206C148.437 20.4245 150.418 18.3075 153.518 17.772C155.451 17.4381 157.086 17.6665 158.426 18.4575C159.764 19.2494 160.567 20.4144 160.833 21.954C160.98 22.805 160.877 23.6272 160.526 24.4172C160.174 25.2089 159.695 26.0223 159.088 26.8567C158.482 27.6919 157.816 28.5695 157.093 29.4862C156.368 30.4048 155.714 31.4046 155.132 32.4858C154.548 33.5672 154.095 34.7524 153.773 36.0381C153.452 37.3247 153.391 38.7647 153.59 40.3576C153.631 40.8105 153.835 41.1715 154.201 41.4414C154.566 41.7131 154.949 41.8129 155.352 41.7432L159.509 41.0252C159.909 40.9558 160.21 40.7377 160.409 40.3688C160.608 40.0007 160.706 39.5883 160.702 39.1284C160.658 38.219 160.851 37.3295 161.283 36.4615C161.716 35.5951 162.244 34.7418 162.87 33.9031C163.494 33.0653 164.157 32.1779 164.861 31.2432C165.562 30.3078 166.187 29.3024 166.735 28.2271C167.281 27.1528 167.678 25.978 167.927 24.7028C168.176 23.4301 168.162 21.9816 167.881 20.3609C167.538 18.3753 166.852 16.6886 165.824 15.3008C164.795 13.9138 163.563 12.8121 162.126 11.9965C160.689 11.1808 159.113 10.6499 157.401 10.4034ZM161.536 44.9308C161.188 44.6575 160.813 44.5552 160.412 44.6247L155.708 45.4374C155.306 45.5071 154.987 45.7294 154.752 46.1035C154.517 46.4786 154.437 46.8892 154.514 47.3343L155.439 52.6828C155.516 53.1295 155.728 53.4889 156.076 53.7622C156.424 54.0365 156.798 54.1381 157.199 54.0694L161.905 53.2556C162.306 53.187 162.623 52.9656 162.859 52.5905C163.095 52.2163 163.175 51.8056 163.098 51.3597L162.173 46.0112C162.096 45.5653 161.884 45.206 161.536 44.9308Z"
                        fill="#E07E26"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M204.894 28.1402C203.743 27.5875 202.533 27.2243 201.263 27.0527C199.829 26.8587 198.446 26.9628 197.112 27.3634C195.778 27.7642 194.584 28.3451 193.531 29.1041C192.479 29.8647 191.601 30.7558 190.899 31.7769C190.196 32.7991 189.76 33.833 189.592 34.8807C189.551 35.1815 189.606 35.4337 189.758 35.6368C189.909 35.8412 190.107 35.9596 190.35 35.9926L193.634 36.4366C193.986 36.4842 194.246 36.4359 194.418 36.2902C194.589 36.1454 194.764 35.9173 194.944 35.6046C196.371 33.1977 198.233 32.1488 200.531 32.4595C201.964 32.6534 203.063 33.1764 203.829 34.0294C204.594 34.8829 204.9 35.8798 204.746 37.0211C204.661 37.6519 204.406 38.2071 203.984 38.6846C203.561 39.1631 203.044 39.6288 202.432 40.0808C201.821 40.5334 201.159 41.0028 200.447 41.4869C199.733 41.9719 199.052 42.5299 198.403 43.1609C197.753 43.7916 197.172 44.5245 196.661 45.3569C196.149 46.19 195.787 47.1889 195.574 48.3528C195.503 48.6802 195.566 48.9791 195.763 49.25C195.96 49.522 196.207 49.6772 196.506 49.7174L199.587 50.1343C199.884 50.1742 200.144 50.0877 200.366 49.8724C200.587 49.6577 200.747 49.3895 200.847 49.0654C201.017 48.4162 201.35 47.8338 201.846 47.3194C202.342 46.8062 202.903 46.3235 203.529 45.8726C204.153 45.4221 204.816 44.9453 205.518 44.4441C206.218 43.9421 206.881 43.3738 207.504 42.7393C208.126 42.1052 208.666 41.3674 209.124 40.5262C209.581 39.6868 209.892 38.6653 210.054 37.4638C210.253 35.9918 210.145 34.654 209.73 33.4504C209.314 32.2474 208.692 31.1996 207.862 30.3077C207.033 29.4158 206.043 28.6932 204.894 28.1402ZM200.147 53.3293C199.962 53.0598 199.721 52.9049 199.424 52.8649L195.937 52.3933C195.639 52.3531 195.366 52.4388 195.118 52.6497C194.869 52.8611 194.722 53.1321 194.677 53.4621L194.142 57.427C194.097 57.7582 194.166 58.0577 194.35 58.3271C194.534 58.5969 194.774 58.7513 195.071 58.7919L198.56 59.2631C198.857 59.3037 199.129 59.2185 199.378 59.0071C199.627 58.7963 199.774 58.5254 199.819 58.1948L200.355 54.2299C200.399 53.8993 200.33 53.5997 200.147 53.3293Z"
                        fill="#F2CBA8"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M124.226 63.4282C123.208 63.586 122.239 63.8966 121.316 64.3621C120.275 64.8871 119.403 65.5873 118.699 66.4622C117.996 67.3369 117.468 68.2674 117.114 69.2524C116.762 70.2379 116.585 71.2304 116.585 72.2291C116.584 73.2292 116.765 74.1152 117.131 74.8883C117.242 75.1068 117.393 75.2493 117.587 75.3151C117.78 75.3819 117.966 75.3704 118.142 75.2815L120.528 74.078C120.783 73.9495 120.934 73.7984 120.982 73.6232C121.029 73.4492 121.042 73.2175 121.019 72.9275C120.869 70.6773 121.628 69.1306 123.297 68.2889C124.337 67.7641 125.306 67.6104 126.205 67.8277C127.103 68.0457 127.761 68.5686 128.179 69.3975C128.41 69.8556 128.494 70.3408 128.431 70.8505C128.369 71.3615 128.238 71.9067 128.037 72.4862C127.837 73.066 127.611 73.6802 127.359 74.3266C127.106 74.9743 126.908 75.6558 126.765 76.3712C126.62 77.087 126.569 77.839 126.608 78.6255C126.649 79.4125 126.864 80.2414 127.253 81.1121C127.355 81.3624 127.533 81.5322 127.788 81.6222C128.043 81.7133 128.278 81.7035 128.495 81.5941L130.733 80.4653C130.948 80.3565 131.081 80.1804 131.13 79.9362C131.18 79.6926 131.164 79.4413 131.082 79.1805C130.899 78.6714 130.855 78.1324 130.95 77.5641C131.045 76.9968 131.197 76.4204 131.408 75.8352C131.618 75.2508 131.84 74.6315 132.078 73.9784C132.315 73.3251 132.495 72.6455 132.62 71.9394C132.744 71.2341 132.766 70.4977 132.687 69.7297C132.608 68.9633 132.349 68.1425 131.908 67.2701C131.369 66.2012 130.687 65.3616 129.862 64.7511C129.037 64.1413 128.145 63.7288 127.187 63.5144C126.229 63.3 125.242 63.2714 124.226 63.4282ZM132.562 82.3335C132.316 82.2386 132.086 82.2454 131.87 82.3544L129.337 83.6318C129.121 83.7412 128.978 83.9227 128.91 84.1761C128.841 84.4301 128.867 84.6772 128.988 84.9168L130.441 87.7961C130.562 88.0366 130.744 88.2042 130.99 88.299C131.235 88.3947 131.465 88.3875 131.681 88.279L134.214 87.0007C134.43 86.8922 134.572 86.7113 134.641 86.4573C134.71 86.2038 134.685 85.9564 134.564 85.7164L133.111 82.8371C132.99 82.5971 132.807 82.4296 132.562 82.3335Z"
                        fill="#E79E5C"
                      />
                    </svg>
                  </div>
                  <h4 class="mt-4">Konfirmasi</h4>
                  <p>Apakah Anda yakin untuk menolak data prospek ini?</p>
                  <InputTextArea
                    id="19"
                    title="Catatan Penolakan"
                    class="mt-4"
                  />
                </template>
                <template v-slot:footer>
                  <div class="row w-100">
                    <div class="col-xl-6 col-12">
                      <Button
                        type="secondary"
                        size="100"
                        label="Button Seccondary"
                      />
                    </div>
                    <div class="col-xl-6 col-12">
                      <Button
                        type="primary"
                        size="100"
                        label="Button Primary"
                      />
                    </div>
                  </div>
                </template>
              </ModalComponent>

              <ModalComponent title="Test Modal 11">
                <template v-slot:trigger>
                  <Button>Open Modal</Button>
                </template>

                <template v-slot:body>
                  <InputNominalEnd id="10" title="Persentase DP" required="" />
                  <InputNominalEnd id="11" title="Persentase DP" required="" />
                  <InputNominalEnd id="12" title="Persentase DP" required="" />
                </template>
              </ModalComponent>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>File Picker</h5>
              <p class="mb-0">
                <code
                  >&lt;Button type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <InputDatePicker />
              <InputSmallText
                id="143"
                title="Test Judul"
                icon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/640px-WhatsApp_icon.png"
                iconLabel="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/640px-WhatsApp_icon.png"
                iconRight="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/640px-WhatsApp_icon.png"
                type="date"
                required=""
              />

              <InputSmallDate id="someId" />
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>List</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <ListGroupOrdered />
              <ListGroupUnit />
              <ListGroupUnordered />
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Table Basic</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <Dropdown
                errorFetch="test"
                :executeFetch="executeFetch"
                v-model="selectedOption"
                :id="'custom-id'"
                :label="'label'"
                :title="selectedOption"
                :items="dropdownItems"
                item-text="label"
                item-value="id"
              />
              <AutoCompleteComponent
                v-model="selectedValue"
                :items="dropdownItems"
                label="Item"
                item-text="label"
                item-value="id"
                :disabled="false"
                size="md"
                placeholder="Pilih salah satu"
              />
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Table Data Basic</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <!-- <TableData :data="tableData" :columns="tableColumns" @row-click="handleRowClick" @action-click:view="handleViewAction" @action-click:edit="handleEditAction" /> -->
              <div class="card overflow-x-auto p-3 mt-4">
                <TableData
                  :data="tableData"
                  :columns="tableColumns"
                  @row-click="handleRowClick"
                  @action-click:view="handleViewAction"
                  @action-click:edit="handleEditAction"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Data Table Basic</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <DataTable
                :data="tableDatas"
                :columns="tableColumnss"
                leftContent="name"
                rightContent="city"
              >
                <template v-slot:tableActionButtons="{ item }">
                  <div class="d-flex">
                    <Button
                      class="w-100 me-2"
                      type="neutral"
                      size="sm"
                      label="Edit"
                      @click="handleEditAction(item)"
                    />
                    <Button
                      class="w-100"
                      type="secondary"
                      size="sm"
                      label="Delete"
                      @click="handleViewAction(item)"
                    />
                  </div>
                </template>
              </DataTable>
            </div>
          </div>
        </div>

        <div class="col-lg-12 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Table Basic</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <DataTable
                :data="tableDatas"
                :columns="tableColumnss"
                leftContent="name"
                rightContent="city"
              >
                <template v-slot:tableActionButtons="{ item }">
                  <div class="d-flex">
                    <Button
                      class="w-100"
                      type="neutral"
                      size="sm"
                      label="Edit"
                      @click="handleEditAction(item)"
                    />
                    <Button
                      class="w-100"
                      type="secondary"
                      size="sm"
                      label="Delete"
                      @click="handleViewAction(item)"
                    />
                  </div>
                </template>
              </DataTable>
            </div>
          </div>
        </div>

          <div class="col-lg-12 mt-4">
              <div class="card">
                  <div class="card-header">
                      <h5>Custom Table</h5>
                  </div>
                  <div class="card-body">
                      <div class="table-responsive">

                      <CustomTable
                          :data="tableDataOsl2"
                          :parent-head="tableParentHead2"
                          :child-head="tableChildHead2"
                          :dataFormatter="dataFormatter2"
                      />
                      </div>
                  </div>
              </div>
          </div>

        <div class="col-lg-12 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Stepper</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <StepperComponents :activeStep="1" />
            </div>
          </div>
        </div>

        <div class="col-lg-12 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Radio Button</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <RadioComponent
                :items="radioItems"
                v-model="selectedRadio"
              />
            </div>
          </div>
        </div>

        <div class="col-lg-12 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Stepper Varian</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <SideStepper title="Langkah" :labels="dropdownItems">
                <template v-slot:1>
                  <StepperComponents :activeStep="1" />
                </template>
                <template v-slot:2>
                  <StepperComponents :activeStep="2" />
                </template>
                <template v-slot:3>
                  <StepperComponents :activeStep="3" />
                </template>
              </SideStepper>

              <SideStepper 
                title="Test Side Step Variant"
                :labels="dropdownItemss"
                variant="dua"
                :accordions="accordionData"
                :activeLabel="activeLabel"
                @update:activeLabel="handleLabelClick"
                class= "mb-4 mt-4"
              >
                <template #1>
                    <StepperComponents :activeStep="1" />
                </template>
                <template #2>
                    <StepperComponents :activeStep="2" />
                </template>
                <template #3>
                    <StepperComponents :activeStep="3" />
                </template>
                <template #4>
                    <StepperComponents :activeStep="4" />
                </template>
              </SideStepper>

              <SideStepperTest title="Langkah" :labels="dropdownItems">
                <template v-slot:1>
                  <StepperComponents :activeStep="1" />
                </template>
                <template v-slot:2>
                  <StepperComponents :activeStep="2" />
                </template>
                <template v-slot:3>
                  <StepperComponents :activeStep="3" />
                </template>
              </SideStepperTest>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Date Range Picker</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div class="card-body">
              <DateRangePicker
                v-model:start-date="startDate"
                v-model:end-date="endDate"
              />

              <p>Selected Date: {{ startDate }}</p>
              <p>Selected Date: {{ endDate }}</p>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Table Basic</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div id="btm-scroll" class="card-body">
              <BButton @click="showModal = true">Show Modal</BButton>

              <ModalSlider
                v-model="showModal"
                title="Foto Jaminan"
                :persistent="true"
                :centered="true"
                :images="[
                  'https://picsum.photos/1024/480/?image=58',
                  'https://picsum.photos/1024/480/?image=59',
                  'https://picsum.photos/1024/480/?image=60',
                  'https://picsum.photos/1024/480/?image=61',
                ]"
              />

              <InputCamera
                v-model="myFileSrc"
                @fileDropped="handleFileDropped"
              />
              <InputCamera
                v-model="myFileSrc"
                @fileDropped="handleFileDropped"
                :use-bottom-sheet="true"
              />

              <InputCamera 
                :compressionMaxKb="1024" 
                title="Upload Foto Anda"
                uniqueKey="userPhoto"
                imagePlaceholder="idcard"
                useBottomSheet
                @fileDropped="handleFileDropped"
                @fileRemoved="handleFileRemoved"
                @errorPermission="handleErrorPermission"
              />

              <p>{{ generatedFileName }}</p>
              <p>{{ receivedImgFile }}</p>
            </div>
          </div>
        </div>

        <div class="col-lg-6 mt-4">
          <div class="card">
            <div class="card-header">
              <h5>Table Basic</h5>
              <p class="mb-0">
                <code
                  >&lt;List type="primary" size="md" label="Button"&gt;</code
                >
              </p>
            </div>
            <div id="btm-scroll" class="card-body">
              <TabPembinaan :labels="tabItems" :currently-selected="4">
                <template v-slot:1>
                  <StepperComponents :activeStep="1" />
                </template>
                <template v-slot:2>
                  <StepperComponents :activeStep="2" />
                </template>
                <template v-slot:3>
                  <StepperComponents :activeStep="3" />
                </template>
                <template v-slot:4>
                  <StepperComponents :activeStep="4" />
                </template>
                <template v-slot:5>
                  <StepperComponents :activeStep="5" />
                </template>
                <template v-slot:6>
                  <StepperComponents :activeStep="6" />
                </template>
              </TabPembinaan>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import useScrollTo from "../hooks/useScrollTo";
import DateRangePickerOption from "./Input/DateRangePickerOption.vue";
import TestPicker from './Dropdown/DatePicker.vue';
import TimePicker from "./Input/TimePicker.vue";
import ModalSlider from "./Modal/ModalSlider.vue";
import InputTimePicker from "./Input/InputTimePicker.vue";
import TimePickerResponsive from "./Input/TimePickerResponsive.vue";
import { ref } from "vue";
import CustomTable from "@/components/Table/CustomTable.vue";

const { scrollTo } = useScrollTo();
const text = ref("ini value");
const number = ref("12000000");
const rupiah = ref(12000000);
const myFileSrc = ref();

const showModal = ref(false);
const showPicker = ref(false);

const handleFileDropped = (file) => {
  console.log("file droppped", file);
};

const executeFetch = () => {
  console.log("execute fetch");
};

// const selectedFile = ref(null);
// const fileError = ref('');

const today = new Date();
const twoWeeksAgo = new Date(today);
twoWeeksAgo.setDate(today.getDate() - 14);
const maxDate = twoWeeksAgo.toISOString().split('T')[0]// Mengisi maxDate dengan tanggal hari ini

const tableParentHead2 = [
    {
        key: "id",
        label: "No",
        row: 2,
        tooltip: {}
    },
    {
        key: "produk",
        label: "Produk",
        row: 2,
        tooltip: {}
    },
    {
        key: "kolektibilitas",
        label: "KOLEKTABILITAS",
        col: 5,
        tooltip: {}
    },
    {
        key: "totalOsl",
        label: "Total OSL Gross",
        row: 2,
        tooltip: {
            title: 'Hasil Total OSL Gross = 1 + 2 + 3 + 4 + 5',
            show: true,
        }
    },
    {
        key: "nominal",
        label: "Nominal NPL (7)",
        row: 2,
        tooltip: {}
    },
    {
        key: "nplBulanIni",
        label: "% NPL Bulan Ini",
        row: 2,
        tooltip: {
            title: 'Hasil NPL Bulan Ini = (7 : 6) x 100',
            show: true,
        }
    },
    {
        key: "nplBulanLalu",
        label: "% NPL Bulan Lalu (9)",
        row: 2,
        tooltip: {}
    },
    {
        key: "npmAkhirTahun",
        label: "% NPL Akhir Tahun Lalu (10)",
        row: 2,
        tooltip: {}
    },
]

const tableChildHead2= [
    {
        key: "1",
        label: "LANCAR (1)",
        tooltip: {}
    },
    {
        key: "2",
        label: "DPK (2)",
        tooltip: {}
    },
    {
        key: "3",
        label: "KURANG LANCAR (3)",
        tooltip: {}
    },
    {
        key: "4",
        label: "DIRAGUKAN (4)",
        tooltip: {}
    },
    {
        key: "5",
        label: "MACET (5)",
        tooltip: {}
    }
]

const tableDataOsl2= [
    {
        1 : "1",
        2 : "KCA",
        3: "112717270000",
        4: "99305230000",
        5: "131295500000",
        6: "130978720000",
        7: "115.88",
        8: "112.87",
        9: "131.12",
        10: "126.17",
        11: "0.24",
        12: "32.21",
    },
    {
        1 : "2",
        2 : "Emasku Ultimate Konven Arisan",
        3: "112717270000",
        4: "99305230000",
        5: "131295500000",
        6: "130978720000",
        7: "115.88",
        8: "112.87",
        9: "131.12",
        10: "96.17",
        11: "0.24",
        12: "29.21",
    },
    {
        1 : "3",
        2 : "Emasku sadf Konven Arisan",
        3: "112717270000",
        4: "99305230000",
        5: "131295500000",
        6: "130978720000",
        7: "115.88",
        8: "112.87",
        9: "11.12",
        10: "26.17",
        11: "0.24",
        12: "92.21",
    }
]

const tableParentHead = [
        {
            key: "id",
            label: "No",
            row: 2,
            tooltip: {}
        },
        {
            key: "produk",
            label: "Produk",
            row: 2,
            tooltip: {}
        },
        {
            key: "realisasi-tahun-lalu",
            label: "REALISASI TAHUN LALU",
            col: 2,
            tooltip: {}
        },
        {
            key: "realisasi",
            label: "REALISASI",
            col: 2,
            tooltip: {}
        },
        {
            key: "target",
            label: "TARGET RKAP",
            col: 2,
            tooltip: {}
        },
        {
            key: "pencapaian",
            label: "Pencapaian(%)",
            col: 2,
            tooltip: {}
        },
        {
            key: "growth",
            label: "Growth(%)",
            col: 3,
            tooltip: {}
        },
        {
            key: "INDIKATOR",
            label: "Indikator",
            row: 2,
            tooltip: {}
        },
    ]
const tableChildHead= [
        {
            key: "1",
            label: "Bulan Ini (1)",
            tooltip: {}
        },
        {
            key: "2",
            label: "Akhir Tahun (2)",
            tooltip: {}
        },
        {
            key: "3",
            label: "Bulan Ini (3)",
            tooltip: {}
        },
        {
            key: "4",
            label: "Akhir Tahun (4)",
            tooltip: {}
        },
        {
            key: "5",
            label: "Bulan Ini (5)",
            tooltip: {}
        },
        {
            key: "6",
            label: "Akhir Tahun (6)",
            tooltip: {}
        },
        {
            key: "7",
            label: "Bulan Ini",
            tooltip: {
                show: true,
                title: 'Pencapaian Bulan Ini = (4 : 5)',
            }
        },
        {
            key: "8",
            label: "Akhir Tahun",
            tooltip: {
                show: true,
                title: 'Pencapaian Tahun Ini = (4 : 6)',
            }
        },
        {
            key: "9",
            label: "MtM",
            tooltip: {
                show: true,
                title: 'Month to Month = (4 : 3)-1',
            }
        },
        {
            key: "10",
            label: "YtD",
            tooltip: {
                show: true,
                title: 'Year to Date = (4 : 2)-1',
            }
        },
        {
            key: "11",
            label: "YoY",
            tooltip: {
                show: true,
                title: 'Year to Year = (4 : 1)-1',
            }
        },
    ]

    const tableDataOsl= [
        {
            1 : "1",
            2 : "KCA",
            3: "112717270000",
            4: "99305230000",
            5: "131295500000",
            6: "130978720000",
            7: "115.88",
            8: "112.87",
            9: "131.12",
            10: "126.17",
            11: "0.24",
            12: "32.21",
            13: "160.48",
            14: "yellow",
        },
        {
            1 : "2",
            2 : "Emasku Ultimate Konven Arisan",
            3: "112717270000",
            4: "99305230000",
            5: "131295500000",
            6: "130978720000",
            7: "115.88",
            8: "112.87",
            9: "131.12",
            10: "96.17",
            11: "0.24",
            12: "29.21",
            13: "96.48",
            14: "green",
        },
        {
            1 : "3",
            2 : "Emasku sadf Konven Arisan",
            3: "112717270000",
            4: "99305230000",
            5: "131295500000",
            6: "130978720000",
            7: "115.88",
            8: "112.87",
            9: "11.12",
            10: "26.17",
            11: "0.24",
            12: "92.21",
            13: "86.48",
            14: "red",
        }
    ]
const dataFormatter = {
    hasBg : ['9','10','11','12','13'],
    needFormat : ['3','4','5','6','7','8'],
}

const dataFormatter2= {
    hasBg : [],
    needFormat : [],
}
</script>

<script>
import Button from "./Button/Button.vue";
import Alert from "./Alert/AlertVarian.vue";
import AlertVarian from "./Alert/Alert.vue";
import Breadcrumb from "./Breadcrumb/Breadcrumb.vue";

import AddAmount from "./AddAmount/AddAmountCounter.vue";
import InputSmallText from "./Input/InputSmallText.vue";
import InputText from "./Input/InputText.vue";
import InputNominalStart from "./Input/InputNominalStart.vue";
import InputNominalEnd from "./Input/InputNominalEnd.vue";
import InputTextArea from "./Input/InputTextArea.vue";
import Dropdown from "./Dropdown/InputDropdown.vue";

import Accordion from "./Accordion/Accordion.vue";
import AccordionItem from "./Accordion/AccordionItem.vue";
import FilePickerLG from "./Filepicker/FilePickerLG.vue";
import ModalComponent from "./Modal/ModalComponent.vue";
import InputDatePicker from "./Input/InputDatePicker.vue";
import InputSmallDate from "./Input/InputSmallDate.vue";
import ListGroupOrdered from "./ListGroup/ListGroupOrdered.vue";
import ListGroupUnit from "./ListGroup/ListGroupUnit.vue";
import ListGroupUnordered from "./ListGroup/ListGroupUnordered.vue";
import TableData from "./Table/TableData.vue";
import DataTable from "./Table/DataTable.vue";
import BerandaHeader from "./Navbar/BerandaHeader.vue";
import AutoCompleteComponent from "./SelectOption/AutoComplete.vue";
import StepperComponents from "./Stepper/Stepper.vue";
import StepperRadio from "./Stepper/StepperVarian.vue";
import SideStepper from "./SideStepper/SideStepper.vue";
import SideStepperTest from "./SideStepper/SideStepperTest.vue";

import InputDropdownHeader from "./Dropdown/InputDropdownHeader.vue";

import LoadAnimate from "./Modal/Load.vue";
import DateRangePicker from "./Input/DateRangePicker.vue";

import InputCamera from "./Input/InputCamera.vue";
import TabPembinaan from "./Navbar/TabPembinaan.vue";

import RadioComponent from "./Radio/Radio.vue"
import CardArticle from "./Card/CardArticle.vue";
import CardProduct from "./Card/CardProduct.vue";
import NavBackNavigator from "./Navbar/NavBackNavigator.vue";
import NavbarCorporate from "./Navbar/NavbarCorporate.vue";
import TabProduct from "./Tab/TabProduct.vue";
import CardEvent from "./Card/CardEvent.vue";
import CardAccount from "./Card/CardAccount.vue";
import CardArticleHighlight from "./Card/CardArticleHighlight.vue";
import CardFile from "./Card/CardFile.vue";
import CardProductKonvensional from "./Card/CardProductKonvensional.vue";
import CardProductSyariah from "./Card/CardProductSyariah.vue";
import CardPromo from "./Card/CardPromo.vue";
import CardPromoCode from "./Card/CardPromoCode.vue";
import CardVoucher from "./Card/CardVoucher.vue";






export default {
  name: "App",
  components: {
    CardProduct,
    CardEvent,
    CardArticleHighlight,
    CardFile,
    CardProduct,
    CardProductKonvensional,
    CardProductSyariah,
    CardPromo,
    CardPromoCode,
    CardVoucher,
    CardArticle,
    Button,
    Alert,
    AlertVarian,
    Breadcrumb,
    AddAmount,
    InputSmallText,
    InputText,
    InputTextArea,
    InputNominalStart,
    InputTextArea,
    InputNominalEnd,
    Accordion,
    AccordionItem,
    FilePickerLG,
    ModalSlider,
    ModalComponent,
    NavBackNavigator,
    NavbarCorporate,
    InputDatePicker,
    InputSmallDate,
    ListGroupOrdered,
    ListGroupUnit,
    ListGroupUnordered,
    TableData,
    DataTable,
    Dropdown,
    BerandaHeader,
    AutoCompleteComponent,
    StepperComponents,
    StepperRadio,
    SideStepper,
    LoadAnimate,
    SideStepperTest,
    InputDropdownHeader,
    DateRangePicker,
    InputCamera,
    TabPembinaan,
    InputTimePicker,
    TabProduct,
    TimePickerResponsive,
    RadioComponent,
  },
  data() {
    return {
      activeLabel: null,
      dropdownItemss: [
          { id: 1, label: 'Step 1', completed: false },
          { id: 2, label: 'Step 2', completed: false },
          { id: 3, label: 'Step 3', completed: false },
          { id: 4, label: 'Step 4', completed: false }
      ],
      accordionData: [
        {
          header: 'Accordion 1',
          labels: [
            { id: 1, label: 'Trigger 1', completed: false },
            { id: 2, label: 'Trigger 2', completed: false }
          ]
        },
        {
          header: 'Accordion 2',
          labels: [
            { id: 3, label: 'Trigger 3', completed: false },
            { id: 4, label: 'Trigger 4', completed: false }
          ]
        },
        {
          header: 'Accordion 3',
          labels: [
            { id: 3, label: 'Trigger 3', completed: false },
            { id: 4, label: 'Trigger 4', completed: false }
          ]
        }
      ],
      
      selectedRadio: null, // Nilai yang dipilih dari radio
      radioItems: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
        { value: 'option4', text: 'Option 4' },
      ],
      selectedFile: null,
      fileError: '',  // pastikan deklarasi di sini
      //untuk InputTimePicker
      selectedTime: "",
      selectedTimes: "",
      showPicker: false,
      showDismissibleAlert : true,

      startDate: ref(null),
      endDate: ref(null),
      timePicker: ref(""),

      generatedFileName: "",
      receivedImgFile: "",

      nilaiTerpilih: null,
      daftarPilihan: [
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
      ],
      propertiNilaiPilihan: "id",
      propertiTeksPilihan: "nama",
      teksPlaceholder: "Pilih salah satu",
      kelasKustom: "input-dropdown-kustom",
      teksError: null,

      selectedRadio: "",
      selectedOption: null,
      TabsItems: [
        {
          label: "Item 112ioue",
        },
        {
          label: "Item 2askdn",
        },
        {
          label: "Item 3alksmndl",
        },
      ],
      dropdownItems: [
        { id: "1", label: "Step 1" },
        { id: "2", label: "Step 2" },
        { id: "3", label: "Step 3" },
      ],
      tabItems: [
        { id: "1", label: "Kondisi Usaha / Ekonomi", completed: true },
        { id: "2", label: "Aktivitas Pembinaan", completed: false },
        { id: "3", label: "Keadaan Debitur", completed: false },
        { id: "4", label: "Kondisi Usaha / Ekonomi", completed: false },
        { id: "5", label: "Kondisi Agunan", completed: false },
        { id: "6", label: "Catatan", completed: false },
      ],
      dropdownOptions: [
        {
          value: "option1",
          label: "Option 1",
        },
        {
          value: "option2",
          label: "Option 2",
        },
        {
          value: "option3",
          label: "Option 3",
        },
      ],
      selectedDate: null,
      tableData: [
        {
          id: 1,
          name: "John Doe",
          age: 30,
          ages: 123,
          agess: 123,
        },
        {
          id: 2,
          name: "Jane Doe",
          age: 25,
          ages: 123,
          agess: 123,
        },
        {
          id: 3,
          name: "Jane Doe",
          age: 25,
          ages: 123,
          agess: 123,
        },
        {
          id: 4,
          name: "Jane Doe",
          age: 25,
          ages: 123,
          agess: 123,
        },
        {
          id: 5,
          name: "Jane Doe",
          age: 25,
          ages: 123,
          agess: 123,
        },
        {
          id: 6,
          name: "Jane Doe",
          age: 25,
          ages: 123,
          agess: 123,
        },
        {
          id: 7,
          name: "Jane Doe",
          age: 25,
          ages: 123,
          agess: 123,
        },
      ],
      tableColumns: [
        {
          key: "id",
          label: "ID",
          isAction: false,
        },
        {
          key: "name",
          label: "Name",
          isAction: false,
        },
        {
          key: "age",
          label: "Age",
          isAction: false,
        },
        {
          key: "ages",
          label: "Ages",
          isAction: false,
        },
        {
          key: "agess",
          label: "Agess",
          isAction: false,
        },
        {
          key: "actions",
          label: "Actions",
          isAction: true,
          showAction: true,
          actions: [
            {
              name: "view",
              label: "View",
              type: "neutral",
              size: "sm",
            },
            {
              name: "edit",
              label: "Edit",
              type: "outline-primary",
              size: "sm",
            },
          ],
        },
      ],
      tableDatas: [
        {
          id: 1,
          name: "John Doe",
          city: "New York",
          occupation: "Software Engineer",
          salary: 80000,
        },
        {
          id: 2,
          name: "Jane Smith",
          city: "Angeles",
          occupation: "Data Scientist",
          salary: 95000,
        },
        {
          id: 3,
          name: "Bob Johnson",
          city: "Chicago",
          occupation: "Graphic Designer",
          salary: 60000,
        },
        {
          id: 4,
          name: "Alice Williams",
          city: "Francisco",
          occupation: "UX Designer",
          salary: 85000,
        },
        {
          id: 5,
          name: "Charlie Brown",
          city: "Seattle",
          occupation: "Marketing Manager",
          salary: 90000,
        },
        {
          id: 6,
          name: "Eva Davis",
          city: "Miami",
          occupation: "Financial Analyst",
          salary: 75000,
        },
        {
          id: 7,
          name: "Daniel Miller",
          city: "Denver",
          occupation: "Product Manager",
          salary: 100000,
        },
        {
          id: 8,
          name: "Grace Wilson",
          city: "Austin",
          occupation: "HR Specialist",
          salary: 70000,
        },
        {
          id: 9,
          name: "Henry Jackson",
          city: "Boston",
          occupation: "Business Analyst",
          salary: 82000,
        },
        {
          id: 10,
          name: "Isabel White",
          city: "Portland",
          occupation: "Project Coordinator",
          salary: 65000,
        },
        {
          id: 41,
          name: "Oliver Lee",
          city: "San Diego",
          occupation: "Software Developer",
          salary: 85000,
        },
        {
          id: 42,
          name: "Sophia Hall",
          city: "Phoenix",
          occupation: "Data Engineer",
          salary: 92000,
        },
        {
          id: 43,
          name: "Liam Turner",
          city: "Dallas",
          occupation: "UX/UI Designer",
          salary: 78000,
        },
        {
          id: 44,
          name: "Mia Foster",
          city: "Houston",
          occupation: "Sales Manager",
          salary: 88000,
        },
        {
          id: 45,
          name: "Lucas Murphy",
          city: "Philadelphia",
          occupation: "QA Engineer",
          salary: 80000,
        },
        {
          id: 46,
          name: "Ava Wright",
          city: "Detroit",
          occupation: "Marketing Specialist",
          salary: 76000,
        },
        {
          id: 47,
          name: "Jackson Evans",
          city: "Nashville",
          occupation: "Financial Analyst",
          salary: 84000,
        },
        {
          id: 48,
          name: "Ella Simmons",
          city: "Memphis",
          occupation: "Project Manager",
          salary: 93000,
        },
        {
          id: 49,
          name: "Logan Clark",
          city: "Baltimore",
          occupation: "IT Consultant",
          salary: 98000,
        },
        {
          id: 50,
          name: "Aria Allen",
          city: "Charlotte",
          occupation: "Product Designer",
          salary: 90000,
        },
      ],
      tableColumnss: [
        {
          data: "id",
          title: "ID",
        },
        {
          data: "name",
          title: "Name",
        },
        {
          data: "city",
          title: "City",
        },
        {
          data: "occupation",
          title: "Occupation",
        },
        {
          data: "salary",
          title: "Salary",
        },
      ],
    };
  },
  methods: {
    handleShowFile(item) {
      console.log("data", item);
    },
    handleRowClick(item) {
      console.log("Row clicked:", item);
    },
    handleViewAction(item) {
      console.log("View action clicked for item:", item);
    },
    handleEditAction(item) {
      console.log("Edit action clicked for item:", item);
    },

    handleGeneratedFileName(fileName) {
      this.generatedFileName = fileName;
    },
    handleImgFile(imgFile) {
      this.generatedFileName = imgFile;
    },
    markAsCompleted(stepId) {
      const step = this.dropdownItems.find((item) => item.id === stepId);
      if (step) {
        step.completed = true;
      }
    },
    markAsCompleted(tabId) {
      this.$refs.tabPembinaan.markAsCompleted(tabId);
    },
    handleActiveTime(event) {
      this.selectedTime = event.activeTime;
    },
    handleSelectedTime(time) {
      this.selectedTimes = time;
    },
    handleFileSelected(fileData) {
      // Handle file selection and error checking
      if (fileData && fileData.fileName) {
          const fileSize = this.$refs.filePicker.$refs.file.files[0].size;
          if (fileSize > 1048576) { // Check if file size exceeds 1MB
              this.selectedFile = null;
          } else {
              this.fileError = '';
              this.selectedFile = fileData;
          }
      } else {
          this.selectedFile = null;
          this.fileError = '';
      }
    },
    handleLabelClick(id) {
      this.activeLabel = id;
    }
  },
};
</script>
