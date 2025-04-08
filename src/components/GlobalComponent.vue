<template>
  <div class="home">
    <div class="container">
      <button @click="scrollTo('btm-scroll')">Scroll Test</button>
      <BerandaHeader>
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
              <Alert
                color="info"
                label="Lorem ipsum dolor sit amet"
                :hideAction="false"
                v-if="showDismissibleAlert"
              >
                <template #action>
                  <svg
                    v-on:click="showDismissibleAlert = false"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z"
                      fill="#70717D"
                    />
                    <mask
                      id="mask0_0_5362"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="6"
                      y="6"
                      width="13"
                      height="13"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z"
                        fill="white"
                      />
                    </mask>
                    <g mask="url(#mask0_0_5362)">
                      <rect width="24" height="24" fill="#FFFFFF" />
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
                label="Lorem ipsum dolor sit amet, Pastikan data yang diisi telah sesuai dengan data nasabah."
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
              <CalendarDropdown
                v-model="selectedDate"
                id="birthdate"
                placeholder="Pilih Tanggal Lahir"
              />

              <CalendarDropdown
                v-model="selectedDate"
                id="birthdate"
                placeholder="Pilih Tanggal Lahir"
                alignment="center"
              />

              <InputSmallDate
                v-model="selectedDate"
                id="birthdate"
                placeholder="Pilih Tanggal Lahir"
                maxDaysFromToday="10"
              />

              <InputSmallDate
                v-model="selectedDate"
                :title="'Tanggal Lahir'"
                :placeholder="'Pilih tanggal'"
                :disabled="false"
                :required="true"
                :maxDate="'2025-03-20'"
                :minDate="'2025-03-01'"
                @buttomSheetShown="handleBottomSheetShown"
              />

              <TestPicker
                v-model="selectedDate"
                id="birthdate"
                placeholder="davin Tanggal Lahir"
                :max-date="maxDate"
                disableFutureDates
              />

              <p>Selected Date: {{ selectedDate }}</p>
              <DateRangePickerOption
                :disabled="false"
                placeholder="Pilih Tanggal"
                label="Date Range Picker"
                v-model:start-date="startDate"
                v-model:end-date="endDate"
              />

              <DateRangePickerOption
                :disabled="false"
                placeholder="Pilih Tanggal"
                label="Date Range Picker with Separator"
                v-model:start-date="startDate"
                v-model:end-date="endDate"
                firstLabel="Periode Program"
                secondLabel=" "
                separator
              />
              <p>Selected Date: {{ startDate }} - {{ endDate }}</p>
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
                label="Ini Bisa Text Tested"
                class="pb-4"
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
              <p>Selected Number: {{ selectedTime }}</p>

              <div class="d-flex align-items-center gap-3">
                <TimePickerResponsive
                  v-model="selectedTimes"
                  title="Time Picker"
                  placeholder="Choose a time"
                  required
                  class="w-75"
                  error="Please select a valid time"
                  @selectedTimeUpdated="handleSelectedTime"
                />
              </div>
              <p>Selected Time: {{ selectedTimes }}</p>

              <InputText
                id="iniidnumber"
                placeholder="Test placeholder!"
                v-model="number"
                label="Ini Number Only"
                type="number"
              />

              <p>Selected Date: {{ number }}</p>

              <InputText
                id="inisearch"
                label="Ini search"
                placeholder="Cari data"
                v-model="text"
                type="search"
              />

              <p>Search old Value: {{ text }}</p>

              <InputNIK
                id="input-nik"
                label="Ini search nik sendiri"
                placeholder="Cari nik"
                v-model="nik"
                type="nik"
              />

              <p>Search nik Value: {{ nik }}</p>

              <InputNominalStart
                id="input-rupiah"
                label="Input Rupiah"
                v-model="rupiah"
                class="pb-4"
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
                required
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
                      <InputNominalEnd
                        id="4"
                        title="Persentase DP"
                        required=""
                      />
                      <InputNominalEnd
                        id="5"
                        title="Persentase DP"
                        required=""
                      />
                      <InputNominalEnd
                        id="6"
                        title="Persentase DP"
                        required=""
                      />
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
              <BButton @click="modalOpen1 = true">Open Modal</BButton>

              <ModalComponent
                v-model="modalOpen1"
                title="Test Modal"
                size="lg"
                centered
              >
                <template v-slot:body>
                  <InputNominalEnd id="7" title="Persentase DP" required="" />
                  <InputNominalEnd id="8" title="Persentase DP" required="" />
                  <InputNominalEnd id="9" title="Persentase DP" required="" />
                </template>
                <template v-slot:footer>
                  <div class="d-flex flex-column w-100 gap-2 p-3">
                    <Button
                      type="secondary"
                      label="Button Seccondary"
                      class="w-100"
                    />
                    <Button
                      type="secondary"
                      label="Button Seccondary"
                      class="w-100"
                    />
                  </div>
                </template>
              </ModalComponent>

              <BButton @click="modalOpen2 = true">Open Modal</BButton>
              <ModalComponent v-model="modalOpen2" size="sm" centered>
                <template v-slot:body>
                  <div class="text-center">
                    <svg
                      width="157"
                      height="156"
                      viewBox="0 0 157 156"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        opacity="0.5"
                        cx="29"
                        cy="36"
                        r="24"
                        fill="#EEEEEF"
                      />
                      <circle
                        opacity="0.5"
                        cx="130.5"
                        cy="125.5"
                        r="17.5"
                        fill="#EEEEEF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M138.5 133L141.152 137.525L146 140L141.152 142.475L138.5 147L135.848 142.475L131 140L135.848 137.525L138.5 133Z"
                        fill="#EEEEEF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M15.5 7L18.8587 12.8181L25 16L18.8587 19.182L15.5 25L12.1413 19.182L6 16L12.1413 12.8181L15.5 7Z"
                        fill="#EEEEEF"
                      />
                      <path
                        d="M78.49 151.08C119.105 151.08 152.03 118.155 152.03 77.54C152.03 36.925 119.105 4 78.49 4C37.875 4 4.95001 36.925 4.95001 77.54C4.95001 118.155 37.875 151.08 78.49 151.08Z"
                        fill="#BBF0D3"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M135.32 79.2101C135.32 110.9 109.63 136.6 77.93 136.6C46.23 136.6 20.54 110.91 20.54 79.2101C20.54 47.5101 46.23 21.8201 77.93 21.8201C109.63 21.8201 135.32 47.5101 135.32 79.2101Z"
                        fill="#252528"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M134.96 73.46C134.96 105.05 109.35 130.66 77.76 130.66C46.17 130.66 20.56 105.05 20.56 73.46C20.56 41.87 46.17 16.26 77.76 16.26C109.35 16.26 134.96 41.87 134.96 73.46Z"
                        fill="#00AB4E"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M94.44 63.2099C85.97 71.0099 77.68 78.9699 69.47 87.0099L62.45 80.2998C59.01 77.0098 53.37 76.8499 49.92 80.1299C49.88 80.1699 49.83 80.2099 49.8 80.2499C46.37 83.5399 46.53 88.9299 49.96 92.2199L63.4 105.09C66.86 108.4 72.47 108.48 76 105.25C86.62 95.5099 97.03 85.5598 107.22 75.4198C110.6 72.0498 110.52 66.6899 107.06 63.3899L107.02 63.3498C103.57 60.0498 97.97 59.9699 94.45 63.2099H94.44Z"
                        fill="#252528"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M94.44 54.2999C85.97 62.0999 77.68 70.0599 69.47 78.0999L62.45 71.39C59.01 68.1 53.37 67.94 49.92 71.22C49.88 71.26 49.83 71.3 49.8 71.34C46.37 74.63 46.53 80.0199 49.96 83.3099L63.4 96.1799C66.86 99.4899 72.47 99.57 76 96.34C86.62 86.6 97.03 76.6499 107.22 66.4999C110.6 63.1299 110.52 57.77 107.06 54.47L107.02 54.4299C103.57 51.1299 97.97 51.0499 94.45 54.2899L94.44 54.2999Z"
                        fill="white"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13.03 108.74L17.46 116.84L25.56 121.27L17.46 125.7L13.03 133.8L8.59999 125.7L0.5 121.27L8.59999 116.84L13.03 108.74Z"
                        fill="#FFC54F"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M138.94 11.8L144.95 22.7801L155.94 28.79L144.95 34.8L138.94 45.7801L132.93 34.8L121.94 28.79L132.93 22.7801L138.94 11.8Z"
                        fill="#FFC54F"
                      />
                      <path
                        d="M13.03 134.31C12.85 134.31 12.68 134.21 12.59 134.05L8.23 126.08L0.259995 121.72C0.0999945 121.63 0 121.46 0 121.28C0 121.1 0.0999945 120.93 0.259995 120.84L8.23 116.48L12.59 108.51C12.76 108.19 13.29 108.19 13.47 108.51L17.83 116.48L25.81 120.84C25.97 120.93 26.07 121.1 26.07 121.28C26.07 121.46 25.97 121.63 25.81 121.72L17.83 126.08L13.47 134.05C13.38 134.21 13.21 134.31 13.03 134.31ZM1.53999 121.27L8.84 125.26C8.92 125.31 8.98999 125.37 9.03999 125.46L13.03 132.76L17.02 125.46C17.07 125.38 17.13 125.31 17.22 125.26L24.52 121.27L17.22 117.28C17.14 117.23 17.07 117.17 17.02 117.08L13.03 109.78L9.03999 117.08C8.98999 117.16 8.93 117.23 8.84 117.28L1.53999 121.27Z"
                        fill="#252528"
                      />
                      <path
                        d="M138.5 45.98C138.32 45.98 138.15 45.88 138.06 45.72L132.12 34.86L121.26 28.92C121.1 28.83 121 28.66 121 28.48C121 28.3 121.1 28.13 121.26 28.04L132.12 22.1L138.06 11.24C138.23 10.92 138.76 10.92 138.94 11.24L144.88 22.1L155.74 28.04C155.9 28.13 156 28.3 156 28.48C156 28.66 155.9 28.83 155.74 28.92L144.88 34.86L138.94 45.72C138.85 45.88 138.68 45.98 138.5 45.98ZM122.55 28.49L132.73 34.06C132.81 34.11 132.88 34.17 132.93 34.26L138.5 44.44L144.07 34.26C144.12 34.18 144.18 34.11 144.27 34.06L154.45 28.49L144.27 22.92C144.19 22.87 144.12 22.81 144.07 22.72L138.5 12.54L132.93 22.72C132.88 22.8 132.82 22.87 132.73 22.92L122.55 28.49Z"
                        fill="#252528"
                      />
                      <path
                        d="M69.78 99.2001C67.33 99.2001 64.88 98.31 63.04 96.54L49.6 83.67C47.81 81.96 46.79 79.58 46.79 77.17C46.79 74.82 47.73 72.62 49.44 70.98L49.52 70.9001C53.17 67.4301 59.1 67.5001 62.79 71.0201L69.46 77.4001C78.48 68.5701 86.54 60.88 94.1 53.92C97.78 50.53 103.73 50.6 107.36 54.07C109.18 55.8 110.17 58.07 110.2 60.48C110.22 62.87 109.29 65.13 107.57 66.85C97.42 76.95 86.91 87.0001 76.33 96.7001C74.52 98.3601 72.16 99.19 69.79 99.19L69.78 99.2001ZM49.78 71.3401L50.13 71.7001C48.62 73.1501 47.79 75.09 47.79 77.17C47.79 79.32 48.7 81.4301 50.29 82.9501L63.73 95.82C66.99 98.94 72.33 99.0101 75.64 95.9701C86.21 86.2801 96.71 76.2401 106.85 66.1501C108.38 64.6301 109.21 62.62 109.19 60.5C109.17 58.36 108.28 56.3501 106.7 54.8401C103.41 51.6901 98.07 51.63 94.77 54.67C87.13 61.71 78.96 69.5001 69.81 78.4601C69.62 78.6501 69.31 78.6501 69.11 78.4601L62.09 71.75C58.78 68.59 53.47 68.5201 50.25 71.5801L49.78 71.3401Z"
                        fill="#252528"
                      />
                      <path
                        d="M77.75 131.16C45.93 131.16 20.04 105.27 20.04 73.46C20.04 41.65 45.93 15.75 77.75 15.75C109.57 15.75 135.45 41.64 135.45 73.46C135.45 105.28 109.56 131.16 77.75 131.16ZM77.75 16.75C46.48 16.75 21.04 42.19 21.04 73.46C21.04 104.73 46.48 130.16 77.75 130.16C109.02 130.16 134.45 104.72 134.45 73.46C134.45 42.2 109.01 16.75 77.75 16.75Z"
                        fill="#252528"
                      />
                    </svg>
                  </div>
                  <h4 class="mt-4">Konfirmasi</h4>
                  <p>Apakah Anda yakin untuk menolak data prospek ini?</p>
                </template>
                <template v-slot:footer>
                  <div class="d-flex flex-column w-100 gap-2 p-3">
                    <Button
                      width="100"
                      type="secondary"
                      label="Button Seccondary"
                    />
                    <Button width="100" type="primary" label="Button Primary" />
                  </div>
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
              <RadioComponent :items="radioItems" v-model="selectedRadio" />
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
                class="mb-4 mt-4"
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
              <h5>Date Range Picker New 21/03/25</h5>
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

              <DateRangePicker
                v-model:start-date="startDate"
                v-model:end-date="endDate"
                first-label="Waktu Berlaku"
                second-label=" "
                first-placeholder="Start Date"
                second-placeholder="End Date"
                separator
              />
              <DateRangePicker
                v-model:start-date="startDate"
                v-model:end-date="endDate"
                first-label="Waktu Berlaku"
                second-label=" "
                first-placeholder="Start Date"
                second-placeholder="End Date"
                :min-start-date="new Date()"
                :min-end-date="new Date()"
                format-type="short"
                separator
                error-message="custom error"
              />
              <DateRangePicker
                v-model:start-date="startDate"
                v-model:end-date="endDate"
                first-label="Waktu Berlaku"
                second-label=" "
                first-placeholder="Start Date"
                second-placeholder="End Date"
                :min-start-date="new Date()"
                :max-start-date="new Date('2025-03-31')"
                :min-end-date="new Date()"
                :max-end-date="new Date('2025-03-31')"
                format-type="short"
                separator
              />
              <DateRangePicker
                v-model:start-date="startDate"
                v-model:end-date="endDate"
                first-label="Waktu Berlaku"
                second-label=" "
                first-placeholder="Start Date"
                second-placeholder="End Date"
                :min-start-date="new Date()"
                :max-start-date="new Date('2025-03-31')"
                :min-end-date="new Date()"
                :max-end-date="new Date('2025-03-31')"
                format-type="short"
                separator
                @close:start="() => console.log('close start')"
                @close:end="() => console.log('close end')"
              />
              <DateRangePicker
                v-model:start-date="startDate"
                v-model:end-date="endDate"
                first-label="Waktu Berlaku"
                second-label=" "
                first-placeholder="Start Date"
                second-placeholder="End Date"
                separator
                second-alignment="end"
              />

              <p>Start Date: {{ startDate }}</p>
              <p>End Date: {{ endDate }}</p>
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

              <InputCamera general />

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

              <InputCamera
                :compressionMaxKb="1024"
                title="Upload Foto Anda"
                uniqueKey="userPhoto"
                imagePlaceholder="idcard"
                useBottomSheet
                @fileDropped="handleFileDropped"
                @fileRemoved="handleFileRemoved"
                @errorPermission="handleErrorPermission"
                general
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
import TestPicker from "./Dropdown/DatePicker.vue";
import TimePicker from "./Input/TimePicker.vue";
import ModalSlider from "./Modal/ModalSlider.vue";
import InputTimePicker from "./Input/InputTimePicker.vue";
import TimePickerResponsive from "./Input/TimePickerResponsive.vue";
import { ref } from "vue";
import CustomTable from "@/components/Table/CustomTable.vue";

const { scrollTo } = useScrollTo();
const text = ref("ini value");
const nik = ref("1234 1234");
const number = ref("12000000");
const rupiah = ref(12000000);
const myFileSrc = ref();

const showModal = ref(false);
const modalOpen1 = ref(false);
const modalOpen2 = ref(false);
const modalOpen3 = ref(false);
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
const maxDate = twoWeeksAgo.toISOString().split("T")[0]; // Mengisi maxDate dengan tanggal hari ini

const tableParentHead2 = [
  {
    key: "id",
    label: "No",
    row: 2,
    tooltip: {},
  },
  {
    key: "produk",
    label: "Produk",
    row: 2,
    tooltip: {},
  },
  {
    key: "kolektibilitas",
    label: "KOLEKTABILITAS",
    col: 5,
    tooltip: {},
  },
  {
    key: "totalOsl",
    label: "Total OSL Gross",
    row: 2,
    tooltip: {
      title: "Hasil Total OSL Gross = 1 + 2 + 3 + 4 + 5",
      show: true,
    },
  },
  {
    key: "nominal",
    label: "Nominal NPL (7)",
    row: 2,
    tooltip: {},
  },
  {
    key: "nplBulanIni",
    label: "% NPL Bulan Ini",
    row: 2,
    tooltip: {
      title: "Hasil NPL Bulan Ini = (7 : 6) x 100",
      show: true,
    },
  },
  {
    key: "nplBulanLalu",
    label: "% NPL Bulan Lalu (9)",
    row: 2,
    tooltip: {},
  },
  {
    key: "npmAkhirTahun",
    label: "% NPL Akhir Tahun Lalu (10)",
    row: 2,
    tooltip: {},
  },
];

const tableChildHead2 = [
  {
    key: "1",
    label: "LANCAR (1)",
    tooltip: {},
  },
  {
    key: "2",
    label: "DPK (2)",
    tooltip: {},
  },
  {
    key: "3",
    label: "KURANG LANCAR (3)",
    tooltip: {},
  },
  {
    key: "4",
    label: "DIRAGUKAN (4)",
    tooltip: {},
  },
  {
    key: "5",
    label: "MACET (5)",
    tooltip: {},
  },
];

const tableDataOsl2 = [
  {
    1: "1",
    2: "KCA",
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
    1: "2",
    2: "Emasku Ultimate Konven Arisan",
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
    1: "3",
    2: "Emasku sadf Konven Arisan",
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
  },
];

const tableParentHead = [
  {
    key: "id",
    label: "No",
    row: 2,
    tooltip: {},
  },
  {
    key: "produk",
    label: "Produk",
    row: 2,
    tooltip: {},
  },
  {
    key: "realisasi-tahun-lalu",
    label: "REALISASI TAHUN LALU",
    col: 2,
    tooltip: {},
  },
  {
    key: "realisasi",
    label: "REALISASI",
    col: 2,
    tooltip: {},
  },
  {
    key: "target",
    label: "TARGET RKAP",
    col: 2,
    tooltip: {},
  },
  {
    key: "pencapaian",
    label: "Pencapaian(%)",
    col: 2,
    tooltip: {},
  },
  {
    key: "growth",
    label: "Growth(%)",
    col: 3,
    tooltip: {},
  },
  {
    key: "INDIKATOR",
    label: "Indikator",
    row: 2,
    tooltip: {},
  },
];
const tableChildHead = [
  {
    key: "1",
    label: "Bulan Ini (1)",
    tooltip: {},
  },
  {
    key: "2",
    label: "Akhir Tahun (2)",
    tooltip: {},
  },
  {
    key: "3",
    label: "Bulan Ini (3)",
    tooltip: {},
  },
  {
    key: "4",
    label: "Akhir Tahun (4)",
    tooltip: {},
  },
  {
    key: "5",
    label: "Bulan Ini (5)",
    tooltip: {},
  },
  {
    key: "6",
    label: "Akhir Tahun (6)",
    tooltip: {},
  },
  {
    key: "7",
    label: "Bulan Ini",
    tooltip: {
      show: true,
      title: "Pencapaian Bulan Ini = (4 : 5)",
    },
  },
  {
    key: "8",
    label: "Akhir Tahun",
    tooltip: {
      show: true,
      title: "Pencapaian Tahun Ini = (4 : 6)",
    },
  },
  {
    key: "9",
    label: "MtM",
    tooltip: {
      show: true,
      title: "Month to Month = (4 : 3)-1",
    },
  },
  {
    key: "10",
    label: "YtD",
    tooltip: {
      show: true,
      title: "Year to Date = (4 : 2)-1",
    },
  },
  {
    key: "11",
    label: "YoY",
    tooltip: {
      show: true,
      title: "Year to Year = (4 : 1)-1",
    },
  },
];

const tableDataOsl = [
  {
    1: "1",
    2: "KCA",
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
    1: "2",
    2: "Emasku Ultimate Konven Arisan",
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
    1: "3",
    2: "Emasku sadf Konven Arisan",
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
  },
];
const dataFormatter = {
  hasBg: ["9", "10", "11", "12", "13"],
  needFormat: ["3", "4", "5", "6", "7", "8"],
};

const dataFormatter2 = {
  hasBg: [],
  needFormat: [],
};
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

import RadioComponent from "./Radio/Radio.vue";
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
import CalendarDropdown from "./Input/CalendarDropdown.vue";
import InputNIK from "./Input/InputNIK.vue";

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
        { id: 1, label: "Step 1", completed: false },
        { id: 2, label: "Step 2", completed: false },
        { id: 3, label: "Step 3", completed: false },
        { id: 4, label: "Step 4", completed: false },
      ],
      accordionData: [
        {
          header: "Accordion 1",
          labels: [
            { id: 1, label: "Trigger 1", completed: false },
            { id: 2, label: "Trigger 2", completed: false },
          ],
        },
        {
          header: "Accordion 2",
          labels: [
            { id: 3, label: "Trigger 3", completed: false },
            { id: 4, label: "Trigger 4", completed: false },
          ],
        },
        {
          header: "Accordion 3",
          labels: [
            { id: 3, label: "Trigger 3", completed: false },
            { id: 4, label: "Trigger 4", completed: false },
          ],
        },
      ],

      selectedRadio: null, // Nilai yang dipilih dari radio
      radioItems: [
        { value: "option1", text: "Option 1" },
        { value: "option2", text: "Option 2" },
        { value: "option3", text: "Option 3" },
        { value: "option4", text: "Option 4" },
      ],
      selectedFile: null,
      fileError: "", // pastikan deklarasi di sini
      //untuk InputTimePicker
      selectedTime: "",
      selectedTimes: "",
      showPicker: false,
      showDismissibleAlert: true,

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
      teksError: "null",

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
        if (fileSize > 1048576) {
          // Check if file size exceeds 1MB
          this.selectedFile = null;
        } else {
          this.fileError = "";
          this.selectedFile = fileData;
        }
      } else {
        this.selectedFile = null;
        this.fileError = "";
      }
    },
    handleLabelClick(id) {
      this.activeLabel = id;
    },
  },
};
</script>
