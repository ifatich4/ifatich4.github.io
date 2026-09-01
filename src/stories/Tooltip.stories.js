import TooltipComponent from "../components/Tooltip/TooltipComponent.vue";

export default {
  title: 'Components/Tooltip',
  component: TooltipComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Tooltip component untuk menampilkan informasi tambahan saat hover pada icon.

**Props:**
- \`color\`: Warna icon tooltip (black/white)
- \`tooltipText\`: Teks yang ditampilkan di tooltip
- \`placement\`: Posisi tooltip (top/bottom/left/right)
- \`variant\`: Background tooltip (dark=hitam, light=putih)

**Penggunaan:**
\`\`\`vue
<TooltipComponent 
  color="black" 
  tooltipText="Ini adalah tooltip"
  placement="top"
  variant="dark"
/>
\`\`\`

Atau dengan slot:
\`\`\`vue
<TooltipComponent color="black" placement="top" variant="light">
  Konten tooltip custom
</TooltipComponent>
\`\`\``,
      },
    },
  },
  argTypes: {
    color: { 
      control: "select", 
      options: ["black", "white"],
      description: 'Warna icon tooltip',
    },
    tooltipText: {
      control: 'text',
      description: 'Teks yang ditampilkan di tooltip',
    },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Posisi tooltip',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Background tooltip (dark=hitam, light=putih)',
    },
  },
  args: {
    color: "black",
    tooltipText: "Ini adalah tooltip",
    placement: "top",
    variant: "dark",
  },
};

// Template - sekarang komponen sudah include BTooltip
const Template = (args) => ({
  components: { TooltipComponent },
  setup() {
    return { args };
  },
  template: `
    <div style="padding: 100px; display: flex; justify-content: center;">
      <TooltipComponent 
        :color="args.color"
        :tooltipText="args.tooltipText"
        :placement="args.placement"
        :variant="args.variant"
      />
    </div>
  `,
});

export const TooltipDark = Template.bind({});
TooltipDark.args = {
  color: "black",
  tooltipText: "Tooltip dengan background hitam (default)",
  placement: "top",
  variant: "dark",
};
TooltipDark.parameters = {
  docs: {
    description: {
      story: 'Tooltip dengan background hitam (default)',
    },
  },
};

export const TooltipLight = Template.bind({});
TooltipLight.args = {
  color: "black",
  tooltipText: "Tooltip dengan background putih",
  placement: "top",
  variant: "light",
};
TooltipLight.parameters = {
  docs: {
    description: {
      story: 'Tooltip dengan background putih menggunakan variant="light"',
    },
  },
};

export const TooltipWhiteIcon = Template.bind({});
TooltipWhiteIcon.args = {
  color: "white",
  tooltipText: "Tooltip dengan icon putih",
  placement: "top",
  variant: "dark",
};
TooltipWhiteIcon.parameters = {
  backgrounds: { default: 'dark' },
  docs: {
    description: {
      story: 'Icon tooltip putih untuk penggunaan di background gelap',
    },
  },
};

export const TooltipBottom = Template.bind({});
TooltipBottom.args = {
  color: "black",
  tooltipText: "Tooltip di posisi bawah",
  placement: "bottom",
  variant: "dark",
};

export const TooltipLeft = Template.bind({});
TooltipLeft.args = {
  color: "black",
  tooltipText: "Tooltip di posisi kiri",
  placement: "left",
  variant: "dark",
};

export const TooltipRight = Template.bind({});
TooltipRight.args = {
  color: "black",
  tooltipText: "Tooltip di posisi kanan",
  placement: "right",
  variant: "dark",
};

// Example with slot content
export const WithSlotContent = {
  render: () => ({
    components: { TooltipComponent },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <TooltipComponent color="black" placement="top" variant="light">
          <strong>Custom Content</strong><br/>
          Bisa menggunakan HTML di dalam slot
        </TooltipComponent>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Tooltip dengan konten custom menggunakan slot',
      },
    },
  },
};

// Multiple tooltips with different variants
export const AllVariants = {
  render: () => ({
    components: { TooltipComponent },
    template: `
      <div style="padding: 100px; display: flex; gap: 60px; justify-content: center; align-items: center;">
        <div style="text-align: center;">
          <TooltipComponent 
            color="black" 
            tooltipText="Dark variant (default)" 
            placement="top" 
            variant="dark"
          />
          <p style="margin-top: 8px; font-size: 12px;">Dark</p>
        </div>
        
        <div style="text-align: center;">
          <TooltipComponent 
            color="black" 
            tooltipText="Light variant (white background)" 
            placement="top" 
            variant="light"
          />
          <p style="margin-top: 8px; font-size: 12px;">Light</p>
        </div>
        
        <div style="text-align: center;">
          <TooltipComponent 
            color="black" 
            tooltipText="Bottom placement" 
            placement="bottom" 
            variant="dark"
          />
          <p style="margin-top: 8px; font-size: 12px;">Bottom</p>
        </div>
        
        <div style="text-align: center;">
          <TooltipComponent 
            color="black" 
            tooltipText="Right placement" 
            placement="right" 
            variant="light"
          />
          <p style="margin-top: 8px; font-size: 12px;">Right (Light)</p>
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Semua variant dan placement tooltip dalam satu view',
      },
    },
  },
};
