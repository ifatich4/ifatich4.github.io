<template>
  <ul class="draggable-list">
    <transition-group name="list" tag="div">
      <li
        v-for="(item, index) in model"
        :key="item.id"
        class="draggable-item"
        :class="{
          dragging: dragIndex === index,
          'drag-over': dragOverIndex === index,
          'drag-over-last': dragOverIndex === model.length && index === model.length - 1
        }"
        @dragover.prevent="onDragOver($event, index)"
        @dragleave="onDragLeave"
        @drop="onDrop"
        @dragend="onDragEnd"
        draggable="true"
        @dragstart="onDragStart($event, index)"
      >
        <span class="item-text">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19.2725 16.5455C19.4653 16.5455 19.6507 16.6416 19.7871 16.8121C19.9233 16.9826 20 17.2137 20 17.4547C20 17.6957 19.9234 17.9268 19.7871 18.0973C19.6507 18.2678 19.4653 18.3639 19.2725 18.3639H4.72754C4.53465 18.3639 4.34928 18.2678 4.21289 18.0973C4.07659 17.9268 4.00003 17.6957 4 17.4547C4 17.2137 4.07665 16.9826 4.21289 16.8121C4.34928 16.6416 4.53465 16.5455 4.72754 16.5455H19.2725ZM19.2725 11.0905C19.4653 11.0905 19.6507 11.1866 19.7871 11.3571C19.9234 11.5275 19.9999 11.7587 20 11.9996C20 12.2407 19.9235 12.4727 19.7871 12.6432C19.6507 12.8136 19.4653 12.9088 19.2725 12.9088H4.72754C4.53471 12.9088 4.34927 12.8136 4.21289 12.6432C4.0765 12.4727 4 12.2407 4 11.9996C4.00008 11.7587 4.07657 11.5275 4.21289 11.3571C4.34928 11.1866 4.53466 11.0905 4.72754 11.0905H19.2725ZM19.2725 5.63635C19.4653 5.63635 19.6507 5.73247 19.7871 5.90295C19.9234 6.07342 20 6.30455 20 6.54553C20 6.78653 19.9234 7.01766 19.7871 7.18811C19.6507 7.3586 19.4653 7.45471 19.2725 7.45471H4.72754C4.53465 7.45471 4.34928 7.3586 4.21289 7.18811C4.0766 7.01766 4.00002 6.78653 4 6.54553C4 6.30455 4.07663 6.07342 4.21289 5.90295C4.34928 5.73247 4.53465 5.63635 4.72754 5.63635H19.2725Z" fill="#58585B"/>
          </svg>
          {{ item.name }}
        </span>

        <div class="actions">
          <Button icon size="sm" type="neutral" @click.stop="moveUp(index)" :disabled="index === 0">
            <template #icon>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.12 15.7025L12 11.8225L15.88 15.7025C16.27 16.0925 16.9 16.0925 17.29 15.7025C17.68 15.3125 17.68 14.6825 17.29 14.2925L12.7 9.70253C12.31 9.31253 11.68 9.31253 11.29 9.70253L6.7 14.2925C6.31 14.6825 6.31 15.3125 6.7 15.7025C7.09 16.0825 7.73 16.0925 8.12 15.7025Z" fill="black"/>
              <mask id="mask0_0_5358" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="9" width="12" height="7">
              <path d="M8.12 15.7025L12 11.8225L15.88 15.7025C16.27 16.0925 16.9 16.0925 17.29 15.7025C17.68 15.3125 17.68 14.6825 17.29 14.2925L12.7 9.70253C12.31 9.31253 11.68 9.31253 11.29 9.70253L6.7 14.2925C6.31 14.6825 6.31 15.3125 6.7 15.7025C7.09 16.0825 7.73 16.0925 8.12 15.7025Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_0_5358)">
              <rect width="24" height="24" fill="currentColor"/>
              </g>
            </svg>
            </template>
          </Button>
          <Button icon size="sm" type="neutral" @click.stop="moveDown(index)" :disabled="index === model.length - 1">
            <template #icon>
              <svg style="transform: rotate(180deg);;" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.12 15.7025L12 11.8225L15.88 15.7025C16.27 16.0925 16.9 16.0925 17.29 15.7025C17.68 15.3125 17.68 14.6825 17.29 14.2925L12.7 9.70253C12.31 9.31253 11.68 9.31253 11.29 9.70253L6.7 14.2925C6.31 14.6825 6.31 15.3125 6.7 15.7025C7.09 16.0825 7.73 16.0925 8.12 15.7025Z" fill="black"/>
              <mask id="mask0_0_5358" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="9" width="12" height="7">
              <path d="M8.12 15.7025L12 11.8225L15.88 15.7025C16.27 16.0925 16.9 16.0925 17.29 15.7025C17.68 15.3125 17.68 14.6825 17.29 14.2925L12.7 9.70253C12.31 9.31253 11.68 9.31253 11.29 9.70253L6.7 14.2925C6.31 14.6825 6.31 15.3125 6.7 15.7025C7.09 16.0825 7.73 16.0925 8.12 15.7025Z" fill="white"/>
              </mask>
              <g mask="url(#mask0_0_5358)">
              <rect width="24" height="24" fill="currentColor"/>
              </g>
            </svg>
            </template>
          </Button>
        </div>
      </li>
    </transition-group>
  </ul>
</template>

<script setup>
import { ref, defineModel } from "vue";
import Button from "../Button/Button.vue";


const model = defineModel({
  type: Array,
  required: true,
  default: () => [],
});

const dragIndex = ref(null);
const dragOverIndex = ref(null);

function onDragStart(e, index) {
  dragIndex.value = index;
  e.dataTransfer?.setData("text/plain", index.toString());
}

function onDragOver(e, index) {
  const rect = e.currentTarget.getBoundingClientRect();
  const offset = e.clientY - rect.top;

  if (index === model.value.length - 1 && offset > rect.height / 2) {
    dragOverIndex.value = model.value.length; // indikator di bawah terakhir
  } else {
    dragOverIndex.value = index; // indikator di atas item
  }
}

function onDragLeave() {
  dragOverIndex.value = null;
}

function onDrop() {
  if (dragIndex.value === null || dragOverIndex.value === null) return;

  const fromIndex = dragIndex.value;
  const movedItem = model.value.splice(fromIndex, 1)[0];

  if (dragOverIndex.value === model.value.length + 1 || dragOverIndex.value === model.value.length) {
    model.value.push(movedItem);
  } else {
    model.value.splice(dragOverIndex.value, 0, movedItem);
  }

  dragIndex.value = null;
  dragOverIndex.value = null;
}

function onDragEnd() {
  dragIndex.value = null;
  dragOverIndex.value = null;
}

function moveUp(index) {
  if (index === 0) return;
  const temp = model.value[index];
  model.value.splice(index, 1);
  model.value.splice(index - 1, 0, temp);
}

function moveDown(index) {
  if (index === model.value.length - 1) return;
  const temp = model.value[index];
  model.value.splice(index, 1);
  model.value.splice(index + 1, 0, temp);
}
</script>

<style scoped lang="scss">
.draggable-list {
  list-style: none;
  margin: 0;
  border: 1px solid var(--g-kit-black-20);
  border-radius: 8px;
  overflow: hidden;
}

ul.draggable-list {
  padding: 0;
}

.draggable-item {
  display: flex;
  align-model: center;
  justify-content: space-between;
  padding: 1rem; // padding isi normal
  background: var(--g-kit-white);
  position: relative; // supaya pseudo element bisa absolute
  cursor: grab;
  
    &:active {
      cursor: grabbing;
    }
}

.draggable-item::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 16px;   // padding kiri garis
  right: 16px;  // padding kanan garis
  height: 1px;
  background-color: var(--g-kit-black-20);
}

.draggable-item:last-child::after {
  content: none; // hilangkan garis di item terakhir
}

.draggable-item:last-child {
  border-bottom: none;
}

.item-text {
  flex: 1;
  user-select: text;

  svg {
    margin-right: 0.75rem;
    vertical-align: middle;
    cursor: grab;
  }
}

.icon-drag {
  margin-right: .75rem;
  cursor: grab;
}

.item-text:active {
  cursor: grabbing;
}

.actions {
  display: flex;
  gap: .75rem;
  margin-left: 8px;
}

.actions > * {
  width: 1.5rem;
  height: 1.5rem;

  &:first-child{
    svg {
      margin-bottom: 3px;
    }
  }

  svg {
    margin-left: 3px;
  }
}


/* efek highlight garis */
.draggable-item.drag-over::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  height: 63px;
  background: var(--g-kit-black-20);
  transition: all 0.2s ease;
}

.draggable-item.drag-over::before {
  top: 0;
}

.draggable-item.drag-over-last::after {
  bottom: 0;
}

/* efek ketika sedang di-drag */
.draggable-item.dragging {
  opacity: 0.6;
  background: #E6F6EA;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.list-move {
  transition: transform 0.25s ease;
}
</style>
