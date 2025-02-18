import AlertVarian from "../components/Alert/AlertVarian.vue";
import { ref } from 'vue'; // T


 export default {
    title: 'Components/Alert',
    component: AlertVarian,
    tags: ['autodocs'],
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    argTypes: {
      label: {
        control: "text"
      },
      color: {
        control: 'select',
        options: [
          "success", "info", "danger", "warning",
        ],
      },
      variant: {
        control: "text"
      },
      hideAction: {
        control: 'boolean',
      },
    },
    args: {
      label: "Lorem ipsum dolor sit amet",
      color: 'success',
      hideAction: true,
    },
  };

  export const Danger = {
    args: {
      color: 'danger',
    },
  };

  export const Success = {
    args: {
      color: 'success',
    },
  };

  export const Info = {
    args: {
      color: 'info',
    },
  };

  export const Warning = {
    args: {
      color: 'warning',
    },
  };

  export const WithAction = {
    args: {
      label: "Lorem ipsum dolor sit amet",
      color: 'info',
      hideAction: false,
    },
  
    render: (args) => ({
      components: { AlertVarian },
      setup() {
        const isAlertOpen = ref(true); 
        const closeAlert = () => {
          isAlertOpen.value = false; 
        };
        return {
          args,
          isAlertOpen,
          closeAlert,
        };
      },
      template: `
        <AlertVarian v-bind="args" v-if="isAlertOpen"> 
          <template #action >
            <div style="cursor: pointer;" v-on:click="closeAlert">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z" fill="#70717D"/>
                <mask id="mask0_0_5362" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="6" y="6" width="13" height="13">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.97814 6.27576C7.50308 5.88357 6.79868 5.90971 6.3542 6.3542C5.88193 6.82646 5.88193 7.59215 6.3542 8.06441L10.7898 12.5L6.3542 16.9356C5.88193 17.4079 5.88193 18.1735 6.3542 18.6458C6.79868 19.0903 7.50308 19.1164 7.97814 18.7242L8.06441 18.6458L12.5 14.2102L16.9356 18.6458L17.0219 18.7242C17.4969 19.1164 18.2013 19.0903 18.6458 18.6458C19.1181 18.1735 19.1181 17.4079 18.6458 16.9356L14.2102 12.5L18.6458 8.06441C19.1181 7.59215 19.1181 6.82646 18.6458 6.3542C18.2013 5.90971 17.4969 5.88357 17.0219 6.27576L16.9356 6.3542L12.5 10.7898L8.06441 6.3542L7.97814 6.27576Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_0_5362)">
                <rect width="24" height="24" fill="white"/>
                </g>
              </svg>
            </div>
          </template>
        </AlertVarian>
      `,
    }),
  };