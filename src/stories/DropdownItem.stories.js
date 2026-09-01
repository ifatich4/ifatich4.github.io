import DropdownItem from "../components/Dropdown/DropdownItem.vue";
import { ref } from "vue";

export default {
  title: 'Components/Dropdown/DropdownItem',
  component: DropdownItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Item dropdown tunggal. Biasanya digunakan dalam DropdownGroupItem.',
      },
    },
  },
};

export const Default = {
  render: () => ({
    components: { DropdownItem },
    template: `
      <div style="max-width: 300px;">
        <DropdownItem />
      </div>
    `,
  }),
};
