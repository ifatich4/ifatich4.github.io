import { ref } from "vue";
import ModalSlider from "../components/Modal/ModalSlider.vue";
import Button from "../components/Button/Button.vue";
import imageBanner1 from "../assets/images/image-banner1.png";
import imageBanner2 from "../assets/images/image-banner2.png";
import imageBanner3 from "../assets/images/image-banner3.png";
import image13 from "../assets/images/image13.png";

export default {
  title: 'Components/Modal/Slider',
  component: ModalSlider,
  tags: ['autodocs'],
  args: {
    title: "Modal Slider",
    images: [
      imageBanner1,
      imageBanner2,
      imageBanner3,
      image13,
    ],
  },
  render: (args) => ({
    components: { ModalSlider, Button },
    setup() {
      const choosenValue = ref(false);
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

export const Slider = {};
