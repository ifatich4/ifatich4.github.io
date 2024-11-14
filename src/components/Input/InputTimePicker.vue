<template>
  <BOffcanvas v-model="model" placement="bottom" class="w-100 offcanvas-kit" :title="'Pilih Tanggal' || title"
    style="height: fit-content;">
    <div id="scroll-container" class="scroll-container d-flex">
      <div class="wrap-container" ref="wrapScrollHours">
        <ul id="hours" ref="hoursScroll">
          <li v-for="(item, index) in hours" :key="index" :class="{ active: activeHourIndex === index }"
            @click="activateInput('hours', index)">
            <span v-if="!isEditing('hours', index)" class="item">{{ item }}</span>
            <InputText v-else v-model="editableValue" @input="handleInput('hours')" @blur="saveEdit('hours', index)"
              @keyup.enter="saveEdit('hours', index)" />
          </li>
        </ul>
      </div>
      <p class="mb-0"><b>:</b></p>
      <div class="wrap-container" ref="wrapScrollMinutes">
        <ul id="minutes" ref="minutesScroll">
          <li v-for="(item, index) in minutes" :key="index" :class="{ active: activeMinuteIndex === index }"
            @click="activateInput('minutes', index)">
            <span v-if="!isEditing('minutes', index)" class="item">{{ item }}</span>
            <InputText v-else v-model="editableValue" @input="handleInput('minutes')" @blur="saveEdit('minutes', index)"
              @keyup.enter="saveEdit('minutes', index)" />
          </li>
        </ul>
      </div>
    </div>
    <div class="px-3 pb-0 pt-3">
      <Button class="w-100" type="primary" size="lg" label="Selesai" @click="model = false" />
    </div>
  </BOffcanvas>
</template>

<script setup>
  import {
    defineModel
  } from 'vue'
  const model = defineModel()
</script>


<script>
  import {
    BOffcanvas
  } from 'bootstrap-vue-next';
  import Button from '../Button/Button.vue';
  import InputText from './InputText.vue'


  export default {
    name: 'InputTimePicker',
    components: {
      BOffcanvas,
      Button
    },
    props: {
      defaultHour: {
        type: String,
        default: '23'
      },
      defaultMinute: {
        type: String,
        default: '50'
      }
    },
    data() {
      return {
        model: false,
        hours: ['23', '00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15',
          '16', '17', '18', '19', '20', '21', '22', '23', '00', '01'
        ],
        minutes: ['58','59', '00','01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', 
                  '15','16', '17', '18', '19', '20', '21', '22', '23', ' 24', '25', '26', '27', '28', '29', '30', '31', 
                  '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '46', '46', '47', '48', 
                  '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '59', '00', '01', '02'],
        activeHourIndex: 0,
        activeMinuteIndex: 0,
        hoursOpts: {
          itemCount: null,
          itemHeight: null,
          items: [],
        },
        minutesOpts: {
          itemCount: null,
          itemHeight: null,
          items: [],
        },
        editingIndex: null,
        editingList: null,
        editableValue: ''
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.initItems('hours');
        this.initItems('minutes');
        this.setDefaultValues();
        this.$refs.wrapScrollHours.onscroll = this.debounce(() => this.scrollWrap('hours'), 50);
        this.$refs.wrapScrollMinutes.onscroll = this.debounce(() => this.scrollWrap('minutes'), 50);
        this.scrollToActiveItem('hours');
        this.scrollToActiveItem('minutes');
        this.setDefaultValues();
      });
    },
    methods: {
      isEditing(listName, index) {
        return this.editingList === listName && this.editingIndex === index;
      },
      activateInput(listName, index) {
        if (this[`active${listName.charAt(0).toUpperCase() + listName.slice(1)}Index`] === index) {
          this.editingList = listName;
          this.editingIndex = index;
          this.editableValue = this[listName][index];
        }
      },
      handleInput(listName) {
        const index = this[listName].indexOf(this.editableValue);
        if (index !== -1) {
          this[`active${listName.charAt(0).toUpperCase() + listName.slice(1)}Index`] = index;
          this.scrollToActiveItem(listName);
        }
      },
      saveEdit(listName) {
        if (this.editableValue) {
          const newIndex = this[listName].indexOf(this.editableValue);
          if (newIndex !== -1) {
            this[`active${listName.charAt(0).toUpperCase() + listName.slice(1)}Index`] = newIndex;
          }
        }
        this.editingList = null;
        this.editingIndex = null;
        this.updateActiveClass(listName);
        this.scrollToActiveItem(listName);
        this.emitActiveTime();
      },

      click() {
        this.model = !this.model;
      },
      scrollWrap(listName) {
        this.editingList = null;
        this.editingIndex = null;
        const scrollW = this.$refs[`wrapScroll${listName.charAt(0).toUpperCase() + listName.slice(1)}`];
        const listOpts = this[`${listName}Opts`];
        if (scrollW.scrollTop + scrollW.clientHeight >= scrollW.scrollHeight) {
          scrollW.scrollTop = 1;
        } else if (scrollW.scrollTop <= 0) {
          scrollW.scrollTop = scrollW.scrollHeight - scrollW.clientHeight + 2;
        }
        const itemsScrolled = Math.floor(scrollW.scrollTop / listOpts.itemHeight) + 1;
        this[`active${listName.charAt(0).toUpperCase() + listName.slice(1)}Index`] = itemsScrolled % listOpts.itemCount;
        this.updateActiveClass(listName);

        const activeIndex = itemsScrolled % listOpts.itemCount;

        if (listName === 'hours') {
          this.activeHourIndex = activeIndex;
        } else if (listName === 'minutes') {
          this.activeMinuteIndex = activeIndex;
        }

        this.scrollToActiveItem(listName);
        this.emitActiveTime();
      },
      scrollToActiveItem(listName) {
        const listOpts = this[`${listName}Opts`];
        const activeIndex = this[`active${listName.charAt(0).toUpperCase() + listName.slice(1)}Index`];
        const activeItem = listOpts.items[activeIndex];

        if (activeItem) {
          activeItem.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
          });
        }
      },
      initItems(listName) {
        const scrollUl = this.$refs[`${listName}Scroll`];
        const listOpts = this[`${listName}Opts`];

        listOpts.items = Array.from(scrollUl.querySelectorAll('li'));
        listOpts.itemHeight = listOpts.items[0] ?.clientHeight || 50;
        listOpts.itemCount = listOpts.items.length;
      },
      updateActiveClass(listName) {
        const listOpts = this[`${listName}Opts`];
        const scrollW = this.$refs[`wrapScroll${listName.charAt(0).toUpperCase() + listName.slice(1)}`];
        const viewportHeight = scrollW.clientHeight;
        const scrollTop = scrollW.scrollTop;

        const viewportStart = scrollTop;
        const viewportEnd = scrollTop + viewportHeight;

        listOpts.items.forEach(item => {
          item.classList.remove('active');
        });

        listOpts.items.forEach((item, index) => {
          const itemTop = item.offsetTop;
          const itemBottom = itemTop + listOpts.itemHeight;

          if (itemBottom > viewportStart && itemTop < viewportEnd) {
            const relativeIndex = index % listOpts.itemCount;
            if (relativeIndex === this[`active${listName.charAt(0).toUpperCase() + listName.slice(1)}Index`]) {
              item.classList.add('active');
            }
          }
        });
      },
      emitActiveTime() {
        const activeHour = this.hours[this.activeHourIndex] || '00';
        const activeMinute = this.minutes[this.activeMinuteIndex] || '00';
        const formattedTime = `${activeHour}:${activeMinute.padStart(2, '0')}`;

        this.$emit('activeTime', {
          activeTime: formattedTime
        });
      },
      setDefaultValues() {
        this.activeHourIndex = this.hours.indexOf(this.defaultHour);
        this.activeMinuteIndex = this.minutes.indexOf(this.defaultMinute);

        if (this.activeHourIndex === -1) this.activeHourIndex = 0;
        if (this.activeMinuteIndex === -1) this.activeMinuteIndex = 0;

        this.$nextTick(() => {
          this.$refs.wrapScrollHours.scrollTop = this.activeHourIndex * this.hoursOpts.itemHeight;
          this.$refs.wrapScrollMinutes.scrollTop = this.activeMinuteIndex * this.minutesOpts.itemHeight;
        });

        this.emitActiveTime();
      },
      debounce(func, wait) {
        let timeout;
        return function () {
          const context = this,
            args = arguments;
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(context, args), wait);
        };
      }
    }
  };
</script>

<style scoped lang="scss">
  .scroll-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .wrap-container {
    position: relative;
    max-height: 280px;
    width: 125px;
    overflow-y: hidden;
    overflow: auto;
    -webkit-mask-image: -webkit-gradient(linear, left bottom, left top, color-stop(0.5, black), color-stop(1, transparent));

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .wrap-container ul {
    list-style: none;
    position: relative;
    transition: transform .3s;
    top: 100px;
  }

  .wrap-container ul,
  .wrap-container ul li {
    margin: 0;
    padding: 0;
    text-align: center;
  }

  .wrap-container ul li {
    height: 50px;
    line-height: 50px;
    transition: transform .3s;
    overflow: hidden;
    font-size: var(--g-kit-font-size-omicron);
    color: var(--g-kit-black-50);

    &.active {
      font-size: var(--g-kit-font-size-kappa);
      font-weight: var(--g-kit-font-weight-bold);
      color: var(--g-kit-black-80);

      .group-input {
        padding-left: 2rem;
        padding-right: 2rem;
      }
    }
  }

  .wrap-container ul li:last-of-type {
    height: unset;
    padding-bottom: 20px;
  }

  .wrap-container ul li.active .item {
    transform: scale(1.9);
  }

  .wrap-container ul li .item {
    position: relative;
    transition: transform 200ms;
    display: inline-block;
  }
</style>