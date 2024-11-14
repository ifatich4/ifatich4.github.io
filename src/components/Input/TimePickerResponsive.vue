<template>
  <div class="desktop">
    <div :class="['group-input calendar-input', addClass]">
      <label :for="$attrs.id" class="form-label">
        {{ title }}
      </label>

      <div class="input-group custom-input-group-icon">
        <input
          v-model="selectedTime"
          type="text"
          :class="['form-control', classes]"
          v-bind="$attrs"
          :aria-label="title"
          :aria-describedby="title"
          :disabled="disabled"
          :required="required"
          :placeholder="placeholder || ['Pilih ' + (title || '').toLowerCase()]"
          @click="showContent = !showContent"
          readonly
        />

        <div class="input-group-icon">
          <img src="../../assets/icon/icon-system/icon-time-regular.svg" />
        </div>
      </div>

      <div v-if="showContent" class="content-time card">
        <div
          class="card-header d-flex justify-content-between align-items-center"
        >
          <button class="btn p-0" @click="showContent = !showContent">
            <svg
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
                fill="#58585B"
              />
            </svg>
          </button>
        </div>
        <ContentTimePicker
          :initialTime="selectedTime"
          @activeTime="handleActiveTime"
        />

        <div class="p-3">
          <Button
            class="w-100"
            type="primary"
            size="md"
            label="Selesai"
            @click="updateSelectedTime"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="mobile">
    <label :for="$attrs.id" class="form-label">
      {{ title }}
    </label>

    <div class="input-group custom-input-group-icon">
      <input
        type="text"
        :class="['form-control', classes]"
        v-bind="$attrs"
        :aria-label="title"
        :aria-describedby="title"
        :disabled="disabled"
        :required="required"
        :placeholder="placeholder || ['Pilih ' + (title || '').toLowerCase()]"
        v-model="selectedTime"
        @click="toggleOffCanvas"
        readonly
      />

      <div class="input-group-icon">
        <img src="../../assets/icon/icon-system/icon-time-regular.svg" />
      </div>
    </div>

    <BOffcanvas
      v-model="showDatePickerOffcanvas"
      class="w-100 offcanvas-kit"
      placement="bottom"
      :title="'Pilih Tanggal' || title"
      style="height: fit-content"
      @shown="handleOffcanvasToggle(true)"
      @hidden="handleOffcanvasToggle(false)"
    >
      <ContentTimePicker
        :initialTime="selectedTime"
        @activeTime="handleActiveTime"
      />

      <div class="px-3 pb-0 pt-3">
        <Button
          class="w-100"
          type="primary"
          size="md"
          label="Selesai"
          @click="updateSelectedTime"
        />
      </div>
    </BOffcanvas>
  </div>
</template>

<script>
import ContentTimePicker from "./ContentTimePicker.vue";
import Button from "../Button/Button.vue";
import { BOffcanvas } from "bootstrap-vue-next";

export default {
  name: "TimePickerResponsive",
  components: { ContentTimePicker, Button, BOffcanvas },
  props: {
    title: String,
    addClass: String,
    classes: String,
    disabled: Boolean,
    required: Boolean,
    placeholder: String,
    error: String, // Error message
  },
  data() {
    return {
      selectedTime: null,
      tempSelectedTime: "",
      showDatePickerOffcanvas: false,
      showContent: false,
    };
  },
  methods: {
    handleActiveTime(event) {
      this.tempSelectedTime = event.activeTime;
    },
    updateSelectedTime() {
      this.selectedTime = this.tempSelectedTime;
      this.showContent = false;
      this.showDatePickerOffcanvas = false;
      this.$emit("selectedTimeUpdated", this.selectedTime); // Emit the event with the selected time
    },
    toggleOffCanvas() {
      this.showDatePickerOffcanvas = !this.showDatePickerOffcanvas;
    },
    handleOffcanvasToggle(value) {
      this.$emit("bottomSheetShown", value);
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  position: absolute;
  z-index: 999;
  background-color: white;
  margin: 0 auto;
}
</style>
