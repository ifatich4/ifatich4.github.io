import Radio from "../components/Radio/Radio.vue";

const statusActiveIcon = new URL("../assets/icon/icon-system/icon-status-active.svg", import.meta.url).href;
const statusInactiveIcon = new URL("../assets/icon/icon-system/icon-status-inactive.svg", import.meta.url).href;
const checkIcon = new URL("../assets/icon/icon-system/icon-check-round.svg", import.meta.url).href;
const infoIcon = new URL("../assets/icon/icon-system/icon-info.svg", import.meta.url).href;

  export default {
    title: 'Components/Radio',
    component: Radio,
    tags: ['autodocs'],
    argTypes: {
      items: {
        control: 'object',
        description: 'Array of radio option objects with value and text',
        table: {
          type: { summary: 'Array<{value: string|number|boolean, text: string}>' },
          defaultValue: { summary: '[]' }
        }
      },
      modelValue: {
        control: 'text',
        description: 'Selected radio value (v-model)',
        table: {
          type: { summary: 'string|number|boolean' },
          defaultValue: { summary: 'null' }
        }
      },
      activeIcon: {
        control: 'text',
        description: 'Default icon source for selected options',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'icon-radio-on.svg' }
        }
      },
      inactiveIcon: {
        control: 'text',
        description: 'Default icon source for unselected options',
        table: {
          type: { summary: 'string' },
          defaultValue: { summary: 'icon-radio-off.svg' }
        }
      }
    },
    args: {
      items: [
        { value: 'option1', text: 'Option 1' },
        { value: 'option2', text: 'Option 2' },
        { value: 'option3', text: 'Option 3' },
        { value: 'option4', text: 'Option 4' },
      ],
      modelValue : "option1"
    },
    render: (args) => ({
            components: { Radio },
            setup() {
              return { args };
            },
            template: `
                <div class="d-flex flex-column">
                  <Radio v-bind="args" v-model="args.modelValue"/>
                  <b class="py-2">Selected Radio: {{args.modelValue}}</b>
                </div>
            `,      
          }),

  };

  export const RadioComponent = {
    args : {
      modelValue: 0
    }
  };

  export const CustomIcon = {
    args: {
      modelValue: 'default',
      items: [
        {
          value: 'default',
          text: 'Belum Diisi',
          activeIcon: statusActiveIcon,
          inactiveIcon: statusInactiveIcon,
        },
        {
          value: 'incomplete',
          text: 'Belum Lengkap',
          activeIcon: statusActiveIcon,
          inactiveIcon: statusActiveIcon,
        },
        {
          value: 'complete',
          text: 'Form Sudah Lengkap',
          activeIcon: checkIcon,
          inactiveIcon: checkIcon,
        },
        {
          value: 'info',
          text: 'SLA',
          icon: infoIcon,
        },
      ],
    },
    render: (args) => ({
      components: { Radio },
      setup() {
        return { args };
      },
      template: `
        <div class="d-flex flex-column gap-3" style="max-width: 560px;">
          <Radio v-bind="args" v-model="args.modelValue">
            <template #icon="{ item, checked, iconSrc }">
              <span
                v-if="item.value === 'info'"
                class="radio-story-mask-icon"
                :style="{
                  WebkitMaskImage: 'url(' + iconSrc + ')',
                  maskImage: 'url(' + iconSrc + ')',
                  backgroundColor: checked ? '#00AB4E' : '#939597',
                  display: 'inline-block',
                  width: '24px',
                  height: '24px',
                  WebkitMaskRepeat: 'no-repeat',
                  maskRepeat: 'no-repeat',
                  WebkitMaskSize: '24px 24px',
                  maskSize: '24px 24px',
                }"
              />
              <img v-else :src="iconSrc" alt="" style="display: block; width: 24px; height: 24px;" />
            </template>
          </Radio>
          <b class="py-2">Selected Radio: {{args.modelValue}}</b>
        </div>
      `,
    }),
    parameters: {
      docs: {
        description: {
          story: 'Set activeIcon/inactiveIcon per item, or use the icon slot for full custom rendering.',
        },
      },
    },
  };
