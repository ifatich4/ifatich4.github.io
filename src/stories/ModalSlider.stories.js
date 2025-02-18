import { ref } from "vue";
import ModalSlider from "../components/Modal/ModalSlider.vue";
import Button from "../components/Button/Button.vue";

  export default {
    title: 'Components/Modal/Slider',
    component: ModalSlider,
    tags: ['autodocs'],
    args: {
      title: "Modal Slider",
      images : [
        'https://picsum.photos/1024/480/?image=58',
        'https://picsum.photos/1024/480/?image=59',
        'https://picsum.photos/1024/480/?image=60',
        'https://picsum.photos/1024/480/?image=61',
      ],
    },
    render: (args) => ({
        components: { ModalSlider, Button },
        setup() {
          const choosenValue = ref(false)
          return { args, choosenValue };
        },
        template: `
            <Button type="primary" label="Click Here" @click="choosenValue = true"></Button>
            <ModalSlider 
              v-bind="args" 
              v-model="choosenValue"
            />
        `,
      }),
  };

  export const Slider = {
  };






  
