import DropdownGroupItem from "../components/Dropdown/DropdownGroupItem.vue";
import { ref } from "vue";

export default {
  title: 'Components/Dropdown/DropdownGroupItem',
  component: DropdownGroupItem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Dropdown dengan grup item. Cocok untuk menu dengan kategori.',
      },
    },
  },
};

export const Default = {
  render: () => ({
    components: { DropdownGroupItem },
    template: `
      <div style="max-width: 300px;">
        <DropdownGroupItem />
      </div>
    `,
  }),
};
