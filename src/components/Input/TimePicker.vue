<script setup>
/* eslint-disable */
import { ref, defineProps, defineModel } from "vue";

import Dropdown from "../Dropdown/InputDropdown.vue";
import Button from "../Button/Button.vue";

const props = defineProps({
  label: {},
  labelTime: {},
  useBottomSheet: {
    type: Boolean,
    default: false,
  },
});

const timepicker = defineModel("timepicker");

const showTimePicker = ref(false);
const hoursTime = ref("00");
const minutesTime = ref("00");
const handleShown = (value) => {
  showTimePicker.value = value;
};

const handleUpHour = () => {
  hoursTime.value = (parseInt(hoursTime.value) + 1).toString().padStart(2, "0");
  if (parseInt(hoursTime.value) > 23) {
    hoursTime.value = "00";
  }
};

const handleDownHour = () => {
  hoursTime.value = (parseInt(hoursTime.value) - 1).toString().padStart(2, "0");
  if (parseInt(hoursTime.value) < 0) {
    hoursTime.value = "23";
  }
};

const handleUpMinute = () => {
  minutesTime.value = (parseInt(minutesTime.value) + 1)
    .toString()
    .padStart(2, "0");
  if (parseInt(minutesTime.value) > 59) {
    minutesTime.value = "00";
  }
};

const handleDownMinute = () => {
  minutesTime.value = (parseInt(minutesTime.value) - 1)
    .toString()
    .padStart(2, "0");
  if (parseInt(minutesTime.value) < 0) {
    minutesTime.value = "59";
  }
};

const saveValue = () => {
  timepicker.value = `${hoursTime.value}.${minutesTime.value}`;
};
</script>

<template>
  <div class="group-input">
    <div class="label-container">
      <label class="form-label">
        {{ props.label }}
      </label>
    </div>
    <Dropdown
      :id="$attrs.id"
      @shown="handleShown(true)"
      class="input-filter"
      :placeholder="timepicker"
    >
      <div class="d-flex justify-content-between align-items-center">
        <b>{{ props.labelTime }}</b>
        <button class="btn p-0" @click="showTimePicker">
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
      <div class="timepicker">
        <div class="row d-flex align-items-center">
          <div class="col-lg-5">
            <div class="hour">
              <button class="button-up" @click="handleUpHour">
                <img
                  class="icon-dropdown"
                  src="../../assets/icon/chevron_up.svg"
                />
              </button>
              <div
                class="box-time d-flex justify-content-center align-items-center"
              >
                {{ hoursTime }}
              </div>
              <button class="button-down" @click="handleDownHour">
                <img
                  class="icon-dropdown"
                  src="../../assets/icon/chevron_down.svg"
                />
              </button>
            </div>
          </div>
          <div class="col-lg-2 d-flex justify-content-center">
            <span>:</span>
          </div>
          <div class="col-lg-5">
            <div class="hour">
              <button class="button-up" @click="handleUpMinute">
                <img
                  class="icon-dropdown"
                  src="../../assets/icon/chevron_up.svg"
                />
              </button>
              <div
                class="box-time d-flex justify-content-center align-items-center"
              >
                {{ minutesTime }}
              </div>
              <button class="button-down" @click="handleDownMinute">
                <img
                  class="icon-dropdown"
                  src="../../assets/icon/chevron_down.svg"
                />
              </button>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-12">
            <Button
              @click="saveValue"
              class="me-2 mb-2 w-100"
              type="primary"
              size="md"
              label="Simpan"
            />
          </div>
        </div>
      </div>
    </Dropdown>
  </div>
</template>
<style scoped>
.hour {
  display: grid;
  justify-content: center;
}

.box-time {
  width: 48px;
  height: 48px;
}

.button-up {
  border: none;
  background: transparent;
  cursor: pointer;
  width: 48px;
  height: 48px;
}
.button-down {
  border: none;
  background: transparent;
  cursor: pointer;
  width: 48px;
  height: 48px;
}
</style>
